<?php
// 인스타그램 챌린지 게시글 URL 제출 처리
header('Content-Type: application/json; charset=utf-8');

define('DB_HOST', 'wehome-aurora-cluster.cluster-cmdvw4tlnzma.ap-northeast-2.rds.amazonaws.com');
define('DB_USER', 'kozaza');
define('DB_PASS', 'P*uj&6uDofO*l&T5w_as');
define('DB_NAME', 'kozaza');

function json_err($msg, $code = 400) {
    http_response_code($code);
    echo json_encode(['ok' => false, 'msg' => $msg], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_err('Method not allowed', 405);
}

$body = json_decode(file_get_contents('php://input'), true) ?: [];
// form-data도 허용
if (empty($body)) $body = $_POST;

$raw_url = trim($body['instagram_url'] ?? '');
if (!$raw_url) json_err('인스타그램 링크를 입력해주세요.');

// 인스타그램 shortcode 추출: /p/XXXX/ 또는 /reel/XXXX/
if (!preg_match('#instagram\.com/(?:p|reel|reels|tv)/([A-Za-z0-9_\-]+)#', $raw_url, $m)) {
    json_err('올바른 인스타그램 게시글 URL이 아닙니다. 예: https://www.instagram.com/p/XXXXX/');
}
$shortcode = $m[1];

// XSS 방지
$name  = htmlspecialchars(trim($body['submitter_name'] ?? ''), ENT_QUOTES, 'UTF-8');
$email = filter_var(trim($body['submitter_email'] ?? ''), FILTER_SANITIZE_EMAIL);
$note  = htmlspecialchars(trim($body['submitter_note'] ?? ''), ENT_QUOTES, 'UTF-8');
$ip    = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '';

// 이메일당 하루 5개 제한 (스팸 방지)
if ($email) {
    try {
        $pdo = new PDO(
            'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
            DB_USER, DB_PASS,
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
        );
        $cnt = $pdo->prepare("SELECT COUNT(*) FROM kpopstay_challenge_posts WHERE submitter_email=? AND created_at > NOW()-INTERVAL 1 DAY");
        $cnt->execute([$email]);
        if ($cnt->fetchColumn() >= 5) {
            json_err('하루 제출 한도(5개)를 초과했습니다.');
        }
    } catch (Exception $e) {
        json_err('서버 오류');
    }
} else {
    $pdo = new PDO(
        'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
        DB_USER, DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
}

try {
    $stmt = $pdo->prepare("
        INSERT INTO kpopstay_challenge_posts
            (instagram_url, shortcode, submitter_name, submitter_email, submitter_note, ip)
        VALUES (?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([$raw_url, $shortcode, $name ?: null, $email ?: null, $note ?: null, $ip]);
    echo json_encode(['ok' => true, 'msg' => '제출 완료! 검토 후 갤러리에 표시됩니다.'], JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    // Duplicate key = 이미 등록된 게시물
    if ($e->getCode() === '23000') {
        json_err('이미 등록된 게시글입니다.');
    }
    error_log('[challenge-submit] ' . $e->getMessage());
    json_err('저장 실패. 잠시 후 다시 시도해주세요.');
}
