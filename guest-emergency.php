<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'msg' => 'Method not allowed']);
    exit;
}

$body = json_decode(file_get_contents('php://input'), true);
if (!$body) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'msg' => '잘못된 요청입니다.']);
    exit;
}

function clean($v) {
    return htmlspecialchars(trim((string)$v), ENT_QUOTES, 'UTF-8');
}

function get_pdo() {
    return new PDO(
        'mysql:host=wehome-aurora-cluster.cluster-cmdvw4tlnzma.ap-northeast-2.rds.amazonaws.com;dbname=kozaza;charset=utf8mb4',
        'kozaza', 'P*uj&6uDofO*l&T5w_as',
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
}

$action = $body['action'] ?? 'send';

// ── 본인 확인 조회 ───────────────────────────────────────────
if ($action === 'lookup') {
    $email = clean($body['email'] ?? '');
    if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['ok' => false, 'msg' => '올바른 이메일 주소를 입력해 주세요.']);
        exit;
    }

    try {
        $pdo = get_pdo();
        $stmt = $pdo->prepare("
            SELECT guest_name, email, nationality, check_in, check_out
            FROM kpopstay_guests
            WHERE LOWER(email) = LOWER(?)
            ORDER BY created_at DESC LIMIT 1
        ");
        $stmt->execute([$email]);
        $guest = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($guest) {
            $sub = '';
            if ($guest['nationality']) $sub = $guest['nationality'];
            if ($guest['check_in'] && $guest['check_out']) {
                $sub .= ($sub ? ' · ' : '') . $guest['check_in'] . ' ~ ' . $guest['check_out'];
            }
            echo json_encode([
                'ok'    => true,
                'guest' => [
                    'name'        => $guest['guest_name'],
                    'email'       => $guest['email'],
                    'nationality' => $sub,
                ],
            ]);
        } else {
            echo json_encode(['ok' => false, 'msg' => '등록된 게스트 정보를 찾을 수 없습니다.<br>신청 시 사용한 이메일을 확인해 주세요.']);
        }
    } catch (Exception $e) {
        error_log('[kpopstay guest emergency lookup] ' . $e->getMessage());
        echo json_encode(['ok' => false, 'msg' => '조회 중 오류가 발생했습니다.']);
    }
    exit;
}

// ── 긴급 요청 전송 ───────────────────────────────────────────
$guestName  = clean($body['guestName']  ?? '');
$guestEmail = clean($body['guestEmail'] ?? '');
$situation  = clean($body['situation']  ?? '');

if (!$guestName || !$guestEmail || !$situation) {
    echo json_encode(['ok' => false, 'msg' => '필수 항목을 모두 입력해 주세요.']);
    exit;
}

// 수신 번호
$recipients = [
    '01033793399',  // 조산구 위홈 대표
    '01021128935',  // 부산시 담당자 (임시)
];

$now = date('m/d H:i');
$msg = "[K-POPSTAY 게스트긴급] {$now}\n게스트: {$guestName} ({$guestEmail})\n상황: {$situation}";

// NHN Toast SMS API
$sms_appkey = 'RxJXel5A8F25a6UO';
$sms_host   = 'https://sms.api.nhncloudservice.com';
$sender_no  = '15445665';

$recipient_list = [];
foreach ($recipients as $phone) {
    $recipient_list[] = ['internationalRecipientNo' => $phone];
}

$payload = json_encode([
    'body'          => $msg,
    'sendNo'        => $sender_no,
    'recipientList' => $recipient_list,
    'userId'        => 'guest_emergency',
]);

$path = "/sms/v2.4/appKeys/{$sms_appkey}/sender/sms";
$ch = curl_init($sms_host . $path);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
    CURLOPT_TIMEOUT        => 10,
]);
$response  = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curl_err  = curl_error($ch);
curl_close($ch);

// DB 기록
try {
    $pdo = get_pdo();
    $pdo->prepare("
        INSERT INTO kpopstay_emergency_requests
            (host_name, host_phone, address, situation, sms_response, ip, created_at)
        VALUES (?, ?, '[GUEST]', ?, ?, ?, NOW())
    ")->execute([$guestName, $guestEmail, $situation, $response, $_SERVER['REMOTE_ADDR'] ?? '']);
} catch (Exception $e) {
    error_log('[kpopstay guest emergency] DB error: ' . $e->getMessage());
}

if ($curl_err || $http_code >= 400) {
    error_log("[kpopstay guest emergency] SMS fail code={$http_code} err={$curl_err}");
    echo json_encode(['ok' => false, 'msg' => 'SMS 발송 실패. 고객센터(1544-5665)로 직접 연락 부탁드립니다.']);
    exit;
}

echo json_encode(['ok' => true]);
