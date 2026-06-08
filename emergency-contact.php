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

$hostName  = clean($body['hostName']  ?? '');
$hostPhone = clean($body['hostPhone'] ?? '');
$situation = clean($body['situation'] ?? '');

if (!$hostName || !$hostPhone || !$situation) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'msg' => '필수 항목을 모두 입력해 주세요.']);
    exit;
}

// 수신 번호 (조산구 대표, 부산시 담당자)
$recipients = [
    '01033793399',  // 조산구 위홈 대표
    '01021128935',  // 부산시 담당자 (임시)
];

// SMS 메시지
$now = date('m/d H:i');
$msg = "[K-POPSTAY 긴급요청] {$now}\n호스트: {$hostName} ({$hostPhone})\n상황: {$situation}";

// NHN Toast SMS API
$sms_appkey  = 'RxJXel5A8F25a6UO';
$sms_host    = 'https://sms.api.nhncloudservice.com';
$sender_no   = '15445665';

$recipient_list = [];
foreach ($recipients as $phone) {
    $recipient_list[] = ['internationalRecipientNo' => $phone];
}

$payload = json_encode([
    'body'          => $msg,
    'sendNo'        => $sender_no,
    'recipientList' => $recipient_list,
    'userId'        => 'emergency',
]);

$path = "/sms/v2.4/appKeys/{$sms_appkey}/sender/sms";
$url  = $sms_host . $path;

$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
    CURLOPT_TIMEOUT        => 10,
]);
$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curl_err  = curl_error($ch);
curl_close($ch);

// DB 기록 (선택)
try {
    $pdo = new PDO(
        'mysql:host=wehome-aurora-cluster.cluster-cmdvw4tlnzma.ap-northeast-2.rds.amazonaws.com;dbname=kozaza;charset=utf8mb4',
        'kozaza', 'P*uj&6uDofO*l&T5w_as',
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    $pdo->prepare("
        INSERT INTO kpopstay_emergency_requests
            (host_name, host_phone, address, situation, sms_response, ip, created_at)
        VALUES (?, ?, ?, ?, ?, ?, NOW())
    ")->execute([$hostName, $hostPhone, '', $situation, $response, $_SERVER['REMOTE_ADDR'] ?? '']);
} catch (Exception $e) {
    // DB 저장 실패해도 SMS 발송 결과로 응답
    error_log('[kpopstay emergency] DB error: ' . $e->getMessage());
}

if ($curl_err || $http_code >= 400) {
    error_log("[kpopstay emergency] SMS fail code={$http_code} err={$curl_err} res={$response}");
    echo json_encode(['ok' => false, 'msg' => 'SMS 발송 실패. 고객센터(1544-5665)로 직접 연락 부탁드립니다.']);
    exit;
}

echo json_encode(['ok' => true]);
