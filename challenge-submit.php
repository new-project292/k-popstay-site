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

function fix_image_orientation($path, $mime) {
    if (!function_exists('exif_read_data')) return;
    if (!in_array($mime, ['image/jpeg', 'image/jpg'])) return;
    $exif = @exif_read_data($path);
    $orientation = $exif['Orientation'] ?? 1;
    if ($orientation === 1) return;
    $img = @imagecreatefromjpeg($path);
    if (!$img) return;
    switch ($orientation) {
        case 3: $img = imagerotate($img, 180, 0); break;
        case 6: $img = imagerotate($img, -90, 0); break;
        case 8: $img = imagerotate($img, 90, 0);  break;
        default: return;
    }
    imagejpeg($img, $path, 92);
    imagedestroy($img);
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

// ── 사진 직접 업로드 (다중) ──────────────────────────────
if ($type === 'upload') {
    $caption = clean($_POST['caption'] ?? '');
    $allowed_mimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic'];

    // 다중 파일 배열 재구성
    $raw = $_FILES['photos'] ?? null;
    if (empty($raw) || !is_array($raw['name'])) {
        json_err('사진 파일을 선택해주세요.');
    }

    $files = [];
    for ($i = 0; $i < count($raw['name']); $i++) {
        if ($raw['error'][$i] === UPLOAD_ERR_OK) {
            $files[] = [
                'tmp'  => $raw['tmp_name'][$i],
                'name' => $raw['name'][$i],
                'size' => $raw['size'][$i],
            ];
        }
    }
    if (!$files) json_err('사진 파일을 선택해주세요.');
    if (count($files) > 5) $files = array_slice($files, 0, 5); // 최대 5장

    $photo_urls = [];
    foreach ($files as $file) {
        $mime = mime_content_type($file['tmp']);
        if (!in_array($mime, $allowed_mimes)) continue;
        if ($file['size'] > MAX_FILE_SIZE) continue;

        $ext      = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION) ?: 'jpg');
        $safeName = date('Ymd_His') . '_' . bin2hex(random_bytes(6)) . '.' . $ext;
        $destPath = UPLOAD_DIR . $safeName;

        if (move_uploaded_file($file['tmp'], $destPath)) {
            // EXIF 회전 보정 (아이폰 등 세로 사진 뒤집힘 방지)
            fix_image_orientation($destPath, $mime);
            $photo_urls[] = UPLOAD_URL . $safeName;
        }
    }

    if (!$photo_urls) json_err('파일 저장 실패. 지원 형식: JPG, PNG, WEBP, GIF');

    // 첫 번째 사진을 photo_path(대표), 전체를 photos JSON으로 저장
    $photos_json = json_encode($photo_urls, JSON_UNESCAPED_UNICODE);

    try {
        $stmt = $pdo->prepare("
            INSERT INTO kpopstay_challenge_posts
                (post_type, photo_path, photos, caption, submitter_name, submitter_email, submitter_note, ip)
            VALUES ('upload', ?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $photo_urls[0], $photos_json,
            $caption ?: null, $name ?: null, $email ?: null, $note ?: null, $ip
        ]);
    } catch (PDOException $e) {
        error_log('[challenge-submit] ' . $e->getMessage());
        json_err('저장 실패. 잠시 후 다시 시도해주세요.');
    }

    $cnt = count($photo_urls);
    echo json_encode(['ok' => true, 'msg' => $cnt . '장 제출 완료! 검토 후 갤러리에 표시됩니다.'], JSON_UNESCAPED_UNICODE);
    exit;
}
