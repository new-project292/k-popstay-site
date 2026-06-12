<?php
// 챌린지 게시물 관리자 페이지 (기본 비밀번호 보호)
define('ADMIN_PASS', 'kpopstay2026!');
define('DB_HOST', 'wehome-aurora-cluster.cluster-cmdvw4tlnzma.ap-northeast-2.rds.amazonaws.com');
define('DB_USER', 'kozaza');
define('DB_PASS', 'P*uj&6uDofO*l&T5w_as');
define('DB_NAME', 'kozaza');

session_start();

if ($_POST['pass'] ?? '' === ADMIN_PASS) {
    $_SESSION['challenge_admin'] = true;
}
if (isset($_GET['logout'])) {
    unset($_SESSION['challenge_admin']);
    header('Location: /challenge-admin.php'); exit;
}

$authed = !empty($_SESSION['challenge_admin']);

$pdo = null;
if ($authed) {
    $pdo = new PDO(
        'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
        DB_USER, DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    // 승인 / 거절 / 삭제 처리
    $action = $_POST['action'] ?? '';
    $pid    = (int)($_POST['post_id'] ?? 0);
    if ($pid && in_array($action, ['approve','reject','delete'])) {
        if ($action === 'approve') {
            $pdo->prepare("UPDATE kpopstay_challenge_posts SET status='approved', approved_at=NOW() WHERE id=?")->execute([$pid]);
        } elseif ($action === 'reject') {
            $pdo->prepare("UPDATE kpopstay_challenge_posts SET status='rejected' WHERE id=?")->execute([$pid]);
        } elseif ($action === 'delete') {
            $pdo->prepare("DELETE FROM kpopstay_challenge_posts WHERE id=?")->execute([$pid]);
        }
        header('Location: /challenge-admin.php'); exit;
    }

    $tab    = $_GET['tab'] ?? 'pending';
    $status = in_array($tab, ['pending','approved','rejected']) ? $tab : 'pending';
    $posts  = $pdo->prepare("SELECT id, post_type, shortcode, photo_path, caption, submitter_name, submitter_email, submitter_note, status, created_at FROM kpopstay_challenge_posts WHERE status=? ORDER BY created_at DESC LIMIT 500");
    $posts->execute([$status]);
    $posts = $posts->fetchAll(PDO::FETCH_ASSOC);

    $counts = $pdo->query("SELECT status, COUNT(*) cnt FROM kpopstay_challenge_posts GROUP BY status")->fetchAll(PDO::FETCH_KEY_PAIR);
}
?><!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>챌린지 관리 — K-POPSTAY</title>
<style>
body{font-family:'Segoe UI',sans-serif;background:#f5f5f5;margin:0;padding:20px;color:#333}
h1{color:#761183;margin-bottom:20px}
.login-box{max-width:360px;margin:80px auto;background:#fff;border-radius:12px;padding:40px;box-shadow:0 4px 20px rgba(0,0,0,.08)}
.login-box input{width:100%;padding:10px 14px;border:1.5px solid #ddd;border-radius:8px;font-size:1rem;margin-bottom:12px;box-sizing:border-box}
.btn{background:#761183;color:#fff;border:none;padding:10px 20px;border-radius:8px;cursor:pointer;font-size:.9rem;font-weight:700}
.btn:hover{background:#5A0D63}
.btn-approve{background:#16a34a}.btn-approve:hover{background:#15803d}
.btn-reject{background:#dc2626}.btn-reject:hover{background:#b91c1c}
.btn-delete{background:#6b7280}.btn-delete:hover{background:#374151}
.tabs{display:flex;gap:8px;margin-bottom:20px}
.tab{padding:8px 18px;border-radius:8px;font-weight:600;font-size:.9rem;text-decoration:none;color:#555;background:#fff;border:1.5px solid #ddd}
.tab.active{background:#761183;color:#fff;border-color:#761183}
.tab .cnt{display:inline-block;background:rgba(0,0,0,.15);border-radius:10px;padding:1px 7px;font-size:.75rem;margin-left:4px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px}
.card{background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.06)}
.card-thumb{width:100%;aspect-ratio:1;border:none;display:block}
.card-thumb-img{width:100%;aspect-ratio:1;object-fit:cover;display:block}
.card-type{display:inline-block;font-size:.7rem;font-weight:700;padding:2px 8px;border-radius:6px;margin-bottom:6px}
.card-type-insta{background:#fce7f3;color:#be185d}
.card-type-upload{background:#ede9fe;color:#6d28d9}
.card-body{padding:14px}
.card-meta{font-size:.78rem;color:#888;margin-bottom:10px;line-height:1.6}
.card-actions{display:flex;gap:6px;flex-wrap:wrap}
.card-actions form{margin:0}
.logout{float:right;font-size:.82rem;color:#888;text-decoration:underline}
</style>
</head>
<body>
<?php if (!$authed): ?>
<div class="login-box">
  <h2 style="margin-bottom:20px;color:#761183">챌린지 관리자</h2>
  <form method="post">
    <input type="password" name="pass" placeholder="비밀번호" autofocus>
    <button type="submit" class="btn" style="width:100%">로그인</button>
  </form>
</div>
<?php else: ?>
<h1>위홈 웰컴레터 & 보라해 챌린지 관리 <a href="?logout=1" class="logout">로그아웃</a></h1>
<div class="tabs">
  <a href="?tab=pending"  class="tab <?= $status==='pending'  ?'active':'' ?>">검토 대기<span class="cnt"><?= $counts['pending']  ?? 0 ?></span></a>
  <a href="?tab=approved" class="tab <?= $status==='approved' ?'active':'' ?>">승인됨<span class="cnt"><?= $counts['approved'] ?? 0 ?></span></a>
  <a href="?tab=rejected" class="tab <?= $status==='rejected' ?'active':'' ?>">거절됨<span class="cnt"><?= $counts['rejected'] ?? 0 ?></span></a>
</div>
<?php if (empty($posts)): ?>
<p style="color:#888">게시물이 없습니다.</p>
<?php else: ?>
<div class="grid">
<?php foreach ($posts as $p): ?>
<div class="card">
  <?php if ($p['post_type'] === 'upload'): ?>
    <img class="card-thumb-img" src="<?= htmlspecialchars($p['photo_path']) ?>" alt="upload">
  <?php else: ?>
    <iframe class="card-thumb"
      src="https://www.instagram.com/p/<?= htmlspecialchars($p['shortcode'] ?? '') ?>/embed/captioned/"
      frameborder="0" scrolling="no" allowtransparency="true"
      loading="lazy"></iframe>
  <?php endif; ?>
  <div class="card-body">
    <div class="card-meta">
      <span class="card-type <?= $p['post_type']==='upload' ? 'card-type-upload' : 'card-type-insta' ?>">
        <?= $p['post_type']==='upload' ? 'Upload' : 'Instagram' ?>
      </span><br>
      #<?= $p['id'] ?><?= $p['shortcode'] ? ' &middot; '.$p['shortcode'] : '' ?><br>
      <?= $p['submitter_name'] ? htmlspecialchars($p['submitter_name']) . ' &middot; ' : '' ?>
      <?= $p['submitter_email'] ? htmlspecialchars($p['submitter_email']) . '<br>' : '' ?>
      <?= $p['caption'] ? '<em>' . htmlspecialchars($p['caption']) . '</em><br>' : '' ?>
      <?= $p['submitter_note'] ? '<em>' . htmlspecialchars($p['submitter_note']) . '</em><br>' : '' ?>
      제출: <?= $p['created_at'] ?>
    </div>
    <div class="card-actions">
      <?php if ($status !== 'approved'): ?>
      <form method="post">
        <input type="hidden" name="post_id" value="<?= $p['id'] ?>">
        <input type="hidden" name="action" value="approve">
        <button type="submit" class="btn btn-approve">승인</button>
      </form>
      <?php endif; ?>
      <?php if ($status !== 'rejected'): ?>
      <form method="post">
        <input type="hidden" name="post_id" value="<?= $p['id'] ?>">
        <input type="hidden" name="action" value="reject">
        <button type="submit" class="btn btn-reject">거절</button>
      </form>
      <?php endif; ?>
      <form method="post" onsubmit="return confirm('삭제하시겠습니까?')">
        <input type="hidden" name="post_id" value="<?= $p['id'] ?>">
        <input type="hidden" name="action" value="delete">
        <button type="submit" class="btn btn-delete">삭제</button>
      </form>
    </div>
  </div>
</div>
<?php endforeach; ?>
</div>
<?php endif; ?>
<?php endif; ?>
</body>
</html>
