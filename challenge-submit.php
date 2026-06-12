<?php
header('Content-Type: application/json; charset=utf-8');

define('DB_HOST', 'wehome-aurora-cluster.cluster-cmdvw4tlnzma.ap-northeast-2.rds.amazonaws.com');
define('DB_USER', 'kozaza');
define('DB_PASS', 'P*uj&6uDofO*l&T5w_as');
define('DB_NAME', 'kozaza');
define('UPLOAD_DIR', __DIR__ . '/uploads/challenge/');
define('UPLOAD_URL', '/uploads/challenge/');
define('MAX_FILE_SIZE', 10 * 1024 * 1024); // 10MB

function json_err($msg, $code = 400) {
    http_response_code($code);
    echo json_encode(['ok' => false, 'msg' => $msg], JSON_UNESCAPED_UNICODE);
    exit;
}

function clean($v) {
    return htmlspecialchars(trim((string)$v), ENT_QUOTES, 'UTF-8');
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_err('Method not allowed', 405);

$ip       = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '';
$type     = $_POST['post_type'] ?? '';
$name     = clean($_POST['submitter_name'] ?? '');
$email    = filter_var(trim($_POST['submitter_email'] ?? ''), FILTER_SANITIZE_EMAIL);
$note     = clean($_POST['submitter_note'] ?? '');

if (!in_array($type, ['instagram', 'upload'])) json_err('post_type 오류');

$pdo = new PDO(
    'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
    DB_USER, DB_PASS,
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
);

// 이메일당 하루 5개 제한
if ($email) {
    $cnt = $pdo->prepare("SELECT COUNT(*) FROM kpopstay_challenge_posts WHERE submitter_email=? AND created_at > NOW()-INTERVAL 1 DAY");
    $cnt->execute([$email]);
    if ($cnt->fetchColumn() >= 5) json_err('하루 제출 한도(5개)를 초과했습니다.');
}

// ── 인스타그램 링크 ──────────────────────────────────────
if ($type === 'instagram') {
    $raw_url = trim($_POST['instagram_url'] ?? '');
    if (!$raw_url) json_err('인스타그램 링크를 입력해주세요.');

    if (!preg_match('#instagram\.com/(?:p|reel|reels|tv)/([A-Za-z0-9_\-]+)#', $raw_url, $m)) {
        json_err('올바른 인스타그램 게시글 URL이 아닙니다.');
    }
    $shortcode = $m[1];

    try {
        $stmt = $pdo->prepare("
            INSERT INTO kpopstay_challenge_posts
                (post_type, instagram_url, shortcode, submitter_name, submitter_email, submitter_note, ip)
            VALUES ('instagram', ?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([$raw_url, $shortcode, $name ?: null, $email ?: null, $note ?: null, $ip]);
    } catch (PDOException $e) {
        if ($e->getCode() === '23000') json_err('이미 등록된 게시글입니다.');
        error_log('[challenge-submit] ' . $e->getMessage());
        json_err('저장 실패. 잠시 후 다시 시도해주세요.');
    }

    echo json_encode(['ok' => true, 'msg' => '제출 완료! 검토 후 갤러리에 표시됩니다.'], JSON_UNESCAPED_UNICODE);
    exit;
}

// ── 사진 직접 업로드 ─────────────────────────────────────
if ($type === 'upload') {
    $caption = clean($_POST['caption'] ?? '');

    if (empty($_FILES['photo']) || $_FILES['photo']['error'] !== UPLOAD_ERR_OK) {
        json_err('사진 파일을 선택해주세요.');
    }

    $file = $_FILES['photo'];
    $mime = mime_content_type($file['tmp_name']);
    $allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic'];

    if (!in_array($mime, $allowed)) json_err('JPG, PNG, WEBP, GIF, HEIC 파일만 가능합니다.');
    if ($file['size'] > MAX_FILE_SIZE) json_err('파일 크기는 10MB 이하여야 합니다.');

    $ext      = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION) ?: 'jpg');
    $safeName = date('Ymd_His') . '_' . bin2hex(random_bytes(8)) . '.' . $ext;
    $destPath = UPLOAD_DIR . $safeName;

    if (!move_uploaded_file($file['tmp_name'], $destPath)) json_err('파일 저장 실패');

    // JPEG/PNG EXIF 회전 보정 (Pillow 없으면 그냥 저장)
    $photo_url = UPLOAD_URL . $safeName;

    try {
        $stmt = $pdo->prepare("
            INSERT INTO kpopstay_challenge_posts
                (post_type, photo_path, caption, submitter_name, submitter_email, submitter_note, ip)
            VALUES ('upload', ?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([$photo_url, $caption ?: null, $name ?: null, $email ?: null, $note ?: null, $ip]);
    } catch (PDOException $e) {
        error_log('[challenge-submit] ' . $e->getMessage());
        json_err('저장 실패. 잠시 후 다시 시도해주세요.');
    }

    echo json_encode(['ok' => true, 'msg' => '사진이 제출됐습니다! 검토 후 갤러리에 표시됩니다.'], JSON_UNESCAPED_UNICODE);
    exit;
}
