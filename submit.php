<?php
header('Content-Type: application/json; charset=utf-8');

define('DB_HOST', 'wehome-aurora-cluster.cluster-cmdvw4tlnzma.ap-northeast-2.rds.amazonaws.com');
define('DB_USER', 'kozaza');
define('DB_PASS', 'P*uj&6uDofO*l&T5w_as');
define('DB_NAME', 'kozaza');
define('UPLOAD_DIR', __DIR__ . '/uploads/army-proof/');
define('UPLOAD_URL', '/uploads/army-proof/');
define('MAX_FILE_SIZE', 5 * 1024 * 1024); // 5MB
define('HOST_PHOTO_DIR', __DIR__ . '/uploads/host-photos/');
define('HOST_PHOTO_URL', '/uploads/host-photos/');
define('MAX_PHOTO_SIZE', 10 * 1024 * 1024); // 10MB

function json_error($msg, $code = 400) {
    http_response_code($code);
    echo json_encode(['ok' => false, 'msg' => $msg], JSON_UNESCAPED_UNICODE);
    exit;
}

function json_ok($data = []) {
    echo json_encode(array_merge(['ok' => true], $data), JSON_UNESCAPED_UNICODE);
    exit;
}

function clean($v) {
    return htmlspecialchars(trim((string)$v), ENT_QUOTES, 'UTF-8');
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_error('Method not allowed', 405);
}

// Guest application closed (2026-06-07)
if (isset($_POST['type']) && $_POST['type'] === 'guest') {
    json_error('Guest applications are now closed. Selected ARMY will be notified by email.', 403);
}

function send_confirmation_email($to_email, $guest_name) {
    $subject   = '[K-POPSTAY BUSAN 2026] Application Received — You\'re in the queue!';
    $from      = 'K-POPSTAY BUSAN <noreply@wehome.me>';
    $first_name = trim(explode(' ', $guest_name)[0]);

    $html = '<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#F2F4F6;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F2F4F6;padding:40px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">
      <tr>
        <td style="background:#761183;padding:32px 40px;text-align:center;">
          <div style="font-size:13px;font-weight:700;color:rgba(255,255,255,0.7);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:8px;">K-POPSTAY BUSAN 2026</div>
          <div style="font-size:26px;font-weight:800;color:#ffffff;letter-spacing:-0.02em;">Application Received!</div>
          <div style="font-size:13px;color:rgba(255,255,255,0.8);margin-top:8px;">Busan Concert &middot; Jun 12&ndash;14, 2026 &middot; Powered by Wehome</div>
        </td>
      </tr>
      <tr>
        <td style="padding:36px 40px;">
          <p style="font-size:15px;color:#333D4B;line-height:1.7;margin:0 0 20px;">Hi ' . htmlspecialchars($first_name, ENT_QUOTES, 'UTF-8') . ',</p>
          <p style="font-size:15px;color:#333D4B;line-height:1.7;margin:0 0 24px;">
            Thank you for applying to <strong>K-POPSTAY BUSAN 2026</strong>!<br>
            Your application has been successfully received and is now under review.
          </p>
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF2FC;border:1.5px solid #E8C4EE;border-radius:12px;margin-bottom:28px;">
            <tr><td style="padding:20px 24px;">
              <div style="font-size:13px;font-weight:700;color:#761183;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:12px;">What happens next?</div>
              <table cellpadding="0" cellspacing="0">
                <tr><td style="padding:5px 0;font-size:14px;color:#4E5968;vertical-align:top;">
                  <span style="display:inline-block;width:22px;height:22px;background:#761183;color:#fff;border-radius:50%;font-size:11px;font-weight:700;text-align:center;line-height:22px;margin-right:10px;">1</span>
                  Our team reviews all applications after the submission period closes.
                </td></tr>
                <tr><td style="padding:5px 0;font-size:14px;color:#4E5968;vertical-align:top;">
                  <span style="display:inline-block;width:22px;height:22px;background:#761183;color:#fff;border-radius:50%;font-size:11px;font-weight:700;text-align:center;line-height:22px;margin-right:10px;">2</span>
                  Selected guests will be matched with a verified Busan host.
                </td></tr>
                <tr><td style="padding:5px 0;font-size:14px;color:#4E5968;vertical-align:top;">
                  <span style="display:inline-block;width:22px;height:22px;background:#761183;color:#fff;border-radius:50%;font-size:11px;font-weight:700;text-align:center;line-height:22px;margin-right:10px;">3</span>
                  You\'ll receive a confirmation email with host details and next steps.
                </td></tr>
              </table>
            </td></tr>
          </table>
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#fffbeb;border:1.5px solid #fcd34d;border-radius:12px;margin-bottom:28px;">
            <tr><td style="padding:16px 20px;">
              <div style="font-size:13px;font-weight:700;color:#78350f;margin-bottom:6px;">Security Deposit Reminder</div>
              <div style="font-size:13px;color:#92400e;line-height:1.6;">
                Selected guests are required to pay a security deposit of <strong>KRW 50,000 per person</strong> upon confirmation. The full amount will be refunded as a <strong>Busan Tourism Gift Card</strong> at check-in.
              </div>
            </td></tr>
          </table>
          <p style="font-size:14px;color:#8B95A1;line-height:1.7;margin:0 0 8px;">
            Priority is given to international ARMY. We will do our best to accommodate as many applicants as possible.
          </p>
          <p style="font-size:14px;color:#8B95A1;line-height:1.7;margin:0 0 28px;">
            If you have any questions, feel free to reach out at <a href="mailto:cs@wehome.me" style="color:#761183;font-weight:600;">cs@wehome.me</a>
          </p>
          <p style="font-size:15px;color:#333D4B;line-height:1.7;margin:0;">
            See you in Busan! 💜<br>
            <strong>K-POPSTAY BUSAN 2026 Team</strong><br>
            <span style="font-size:13px;color:#8B95A1;">Powered by Wehome.me</span>
          </p>
        </td>
      </tr>
      <tr>
        <td style="background:#F2F4F6;padding:20px 40px;text-align:center;border-top:1px solid #E5E8EB;">
          <div style="font-size:11px;color:#8B95A1;line-height:1.8;">
            (주)위홈 | 서울 마포구 양화로 136 SVCS 507<br>
            고객센터: 1544-5665 | <a href="mailto:cs@wehome.me" style="color:#8B95A1;">cs@wehome.me</a><br>
            &copy; 2026 Wehome Inc. All rights reserved.
          </div>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>';

    $text = "[K-POPSTAY BUSAN 2026] Application Received!\n\n"
          . "Hi {$first_name},\n\n"
          . "Thank you for applying to K-POPSTAY BUSAN 2026!\n"
          . "Your application has been successfully received and is now under review.\n\n"
          . "WHAT HAPPENS NEXT?\n"
          . "1. Our team reviews all applications after the submission period closes.\n"
          . "2. Selected guests will be matched with a verified Busan host.\n"
          . "3. You'll receive a confirmation email with host details and next steps.\n\n"
          . "SECURITY DEPOSIT REMINDER\n"
          . "Selected guests are required to pay a security deposit of KRW 50,000 per person.\n"
          . "The full amount will be refunded as a Busan Tourism Gift Card at check-in.\n\n"
          . "Questions? cs@wehome.me\n\n"
          . "See you in Busan!\n"
          . "K-POPSTAY BUSAN 2026 Team | Powered by Wehome.me";

    try {
        require_once '/home/wehome/app/libraries/aws-sdk/sdk.class.php';
        $ses = new AmazonSES();
        $ses->set_region(AmazonSES::REGION_AP_NE2);
        $ses->send_email(
            $from,
            ['ToAddresses' => [$to_email]],
            [
                'Subject'  => ['Data' => $subject,  'Charset' => 'UTF-8'],
                'Body'     => [
                    'Text' => ['Data' => $text, 'Charset' => 'UTF-8'],
                    'Html' => ['Data' => $html, 'Charset' => 'UTF-8'],
                ],
            ]
        );
    } catch (Exception $e) {
        // 이메일 발송 실패는 무시 (저장은 이미 완료됨)
        error_log('[kpopstay] confirm email fail to=' . $to_email . ' err=' . $e->getMessage());
    }
}

$ip   = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '';
$type = $_POST['type'] ?? '';

// multipart/form-data가 아닌 JSON fallback (host 신청용)
if (empty($type)) {
    $body = json_decode(file_get_contents('php://input'), true);
    if ($body) {
        $type = $body['type'] ?? '';
    }
}

$pdo = new PDO(
    'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
    DB_USER,
    DB_PASS,
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
);

// ═══════════════════════════════════════════════════════════════
// GUEST 신청 (multipart/form-data — 파일 첨부 포함)
// ═══════════════════════════════════════════════════════════════
if ($type === 'guest') {
    // language / languages 둘 다 허용 (HTML 필드명이 'language'로 전송됨)
    if (empty($_POST['languages']) && !empty($_POST['language'])) {
        $_POST['languages'] = $_POST['language'];
    }

    $required = ['stayType','guestCount','gender','bedRequired','checkIn','checkOut','guestName','nationality','phone','email','languages','armyProof'];
    foreach ($required as $f) {
        if (empty($_POST[$f])) json_error("필수 항목 누락: $f");
    }

    // YYYYMMDD(숫자) → YYYY-MM-DD 변환 허용
    $checkIn  = $_POST['checkIn'];
    $checkOut = $_POST['checkOut'];
    if (preg_match('/^\d{8}$/', $checkIn)) {
        $checkIn = substr($checkIn,0,4).'-'.substr($checkIn,4,2).'-'.substr($checkIn,6,2);
    }
    if (preg_match('/^\d{8}$/', $checkOut)) {
        $checkOut = substr($checkOut,0,4).'-'.substr($checkOut,4,2).'-'.substr($checkOut,6,2);
    }
    if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $checkIn) || !preg_match('/^\d{4}-\d{2}-\d{2}$/', $checkOut)) {
        json_error('날짜 형식 오류');
    }
    if ($checkOut <= $checkIn) {
        json_error('체크아웃은 체크인 이후여야 합니다');
    }

    // ── 이메일 중복 검증 ──────────────────────────────────────
    $emailCheck = $pdo->prepare("SELECT id FROM kpopstay_guests WHERE email = ? LIMIT 1");
    $emailCheck->execute([trim($_POST['email'])]);
    if ($emailCheck->fetch()) {
        json_error('This email has already been submitted. Only one application per person is allowed.');
    }

    // ── 파일 필수 검증 ────────────────────────────────────────
    if (empty($_FILES['armyProofFile']) || $_FILES['armyProofFile']['error'] !== UPLOAD_ERR_OK) {
        json_error('아미 인증 파일을 첨부해주세요.');
    }

    // ── 파일 업로드 처리 ──────────────────────────────────────
    $armyProofFilePath = null;
    if (!empty($_FILES['armyProofFile']) && $_FILES['armyProofFile']['error'] === UPLOAD_ERR_OK) {
        $file     = $_FILES['armyProofFile'];
        $mimeType = mime_content_type($file['tmp_name']);
        $allowed  = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/heic', 'application/pdf'];

        if (!in_array($mimeType, $allowed)) {
            json_error('허용되지 않는 파일 형식입니다. (JPG/PNG/GIF/WEBP/HEIC/PDF)');
        }
        if ($file['size'] > MAX_FILE_SIZE) {
            json_error('파일 크기는 5MB 이하여야 합니다.');
        }

        $ext      = pathinfo($file['name'], PATHINFO_EXTENSION) ?: 'jpg';
        $safeName = date('Ymd_His') . '_' . bin2hex(random_bytes(6)) . '.' . strtolower($ext);
        $destPath = UPLOAD_DIR . $safeName;

        if (!move_uploaded_file($file['tmp_name'], $destPath)) {
            json_error('파일 저장 실패');
        }
        $armyProofFilePath = UPLOAD_URL . $safeName;
    }

    $companion_gender = trim($_POST['companionGender'] ?? '');

    $stmt = $pdo->prepare("
        INSERT INTO kpopstay_guests
            (stay_type, guest_count, gender, companion_gender, bed_required,
             check_in, check_out, guest_name, nationality, phone, email,
             languages, army_proof, army_proof_file, wehome_id, referral, comments, ip)
        VALUES
            (:stay_type, :guest_count, :gender, :companion_gender, :bed_required,
             :check_in, :check_out, :guest_name, :nationality, :phone, :email,
             :languages, :army_proof, :army_proof_file, :wehome_id, :referral, :comments, :ip)
    ");
    $stmt->execute([
        ':stay_type'         => clean($_POST['stayType']),
        ':guest_count'       => (int)$_POST['guestCount'],
        ':gender'            => clean($_POST['gender']),
        ':companion_gender'  => $companion_gender ?: null,
        ':bed_required'      => clean($_POST['bedRequired']),
        ':check_in'          => $checkIn,
        ':check_out'         => $checkOut,
        ':guest_name'        => clean($_POST['guestName']),
        ':nationality'       => clean($_POST['nationality']),
        ':phone'             => clean($_POST['phone']),
        ':email'             => clean($_POST['email']),
        ':languages'         => clean($_POST['languages']),
        ':army_proof'        => clean($_POST['armyProof']),
        ':army_proof_file'   => $armyProofFilePath,
        ':wehome_id'         => clean($_POST['wehomeId'] ?? ''),
        ':referral'          => clean($_POST['referral'] ?? ''),
        ':comments'          => clean($_POST['comments'] ?? ''),
        ':ip'                => $ip,
    ]);

    $new_id = $pdo->lastInsertId();
    send_confirmation_email(clean($_POST['email']), clean($_POST['guestName']));
    json_ok(['id' => $new_id]);
}

// ═══════════════════════════════════════════════════════════════
// HOST 신청 (JSON body)
// ═══════════════════════════════════════════════════════════════
if ($type === 'host') {
    // JSON body에서 읽기 (host-apply.html은 multipart/form-data로 전송)
    if (empty($body)) {
        $body = [];
        $body['hostType']         = $_POST['hostType']         ?? null;
        $body['isSpecial']        = $_POST['isSpecial']        ?? null;
        $body['hostProfileId']    = $_POST['hostProfileId']    ?? null;
        $body['name']             = $_POST['hostName']         ?? $_POST['name']     ?? null;
        $body['email']            = $_POST['hostEmail']        ?? null;
        $body['isArmy']           = $_POST['isArmy']           ?? null;
        $body['phone']            = $_POST['hostPhone']        ?? $_POST['phone']    ?? null;
        $body['address']          = $_POST['hostAddress']      ?? $_POST['address']  ?? null;
        $body['houseType']        = $_POST['houseType']        ?? null;
        $body['houseSize']        = $_POST['houseSize']        ?? null;
        $body['floor']            = $_POST['floor']            ?? null;
        $body['elevator']         = $_POST['elevator']         ?? null;
        $body['roomCount']        = $_POST['roomCount']        ?? null;
        $body['bathroomCount']    = $_POST['bathroomCount']    ?? null;
        $body['capacity']         = $_POST['capacity']         ?? null;
        $body['availFrom']        = $_POST['availFrom']        ?? null;
        $body['availTo']          = $_POST['availTo']          ?? null;
        $body['fireExtinguisher'] = $_POST['fireExtinguisher'] ?? null;
        $body['hostPresence']     = $_POST['hostPresence']     ?? null;
        $body['needRegistration'] = $_POST['needRegistration'] ?? null;
        $body['subwayStation']    = $_POST['subwayStation']    ?? null;
        $body['subwayDistance']   = $_POST['subwayDistance']   ?? null;
        $body['features']         = $_POST['hostFeatures']     ?? $_POST['features'] ?? null;
        $body['comment']          = $_POST['hostComment']      ?? $_POST['comment']  ?? null;
        $body['rooms']            = $_POST['rooms']            ?? null;
        $body['hostGender']       = $_POST['hostGender']       ?? null;
    }

    $required = ['hostType','name','phone','address'];
    foreach ($required as $f) {
        if (empty($body[$f])) json_error("필수 항목 누락: $f");
    }

    $isSpecial     = null;
    $hostProfileId = '';
    if ($body['hostType'] === 'existing-host') {
        $isSpecial = ($body['isSpecial'] === 'yes') ? 1 : 0;
        $hostProfileId = clean($body['hostProfileId'] ?? '');
    }

    // 사진 업로드 처리 (옵션)
    $photoUrls = [];
    if (!empty($_FILES['housePhotos'])) {
        if (!is_dir(HOST_PHOTO_DIR)) {
            mkdir(HOST_PHOTO_DIR, 0755, true);
        }
        $allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        $files = $_FILES['housePhotos'];
        // 다중 파일: 배열 재구조화
        $fileList = [];
        if (is_array($files['name'])) {
            for ($i = 0; $i < count($files['name']); $i++) {
                if ($files['error'][$i] === UPLOAD_ERR_OK) {
                    $fileList[] = [
                        'name'     => $files['name'][$i],
                        'tmp_name' => $files['tmp_name'][$i],
                        'size'     => $files['size'][$i],
                    ];
                }
            }
        }
        foreach (array_slice($fileList, 0, 10) as $file) {
            $mime = mime_content_type($file['tmp_name']);
            if (!in_array($mime, $allowedMimes)) continue;
            if ($file['size'] > MAX_PHOTO_SIZE) continue;
            $ext      = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION) ?: 'jpg');
            $safeName = date('Ymd_His') . '_' . bin2hex(random_bytes(6)) . '.' . $ext;
            $dest     = HOST_PHOTO_DIR . $safeName;
            if (move_uploaded_file($file['tmp_name'], $dest)) {
                $photoUrls[] = HOST_PHOTO_URL . $safeName;
            }
        }
    }
    $photosJson = !empty($photoUrls) ? json_encode($photoUrls, JSON_UNESCAPED_UNICODE) : null;

    $stmt = $pdo->prepare("
        INSERT INTO kpopstay_hosts
            (host_type, is_special, host_profile_id, name, email, is_army, gender,
             phone, address, house_type, house_size, floor, elevator,
             room_count, bathroom_count, capacity, avail_from, avail_to,
             fire_extinguisher, host_presence, need_registration,
             subway_station, subway_distance, features, comment, rooms, house_photos, ip)
        VALUES
            (:host_type, :is_special, :host_profile_id, :name, :email, :is_army, :gender,
             :phone, :address, :house_type, :house_size, :floor, :elevator,
             :room_count, :bathroom_count, :capacity, :avail_from, :avail_to,
             :fire_extinguisher, :host_presence, :need_registration,
             :subway_station, :subway_distance, :features, :comment, :rooms, :house_photos, :ip)
    ");
    $stmt->execute([
        ':host_type'          => clean($body['hostType']),
        ':is_special'         => $isSpecial,
        ':host_profile_id'    => $hostProfileId,
        ':name'               => clean($body['name']),
        ':email'              => clean($body['email'] ?? ''),
        ':is_army'            => clean($body['isArmy'] ?? ''),
        ':gender'             => clean($body['hostGender'] ?? ''),
        ':phone'              => clean($body['phone']),
        ':address'            => clean($body['address']),
        ':house_type'         => clean($body['houseType'] ?? ''),
        ':house_size'         => clean($body['houseSize'] ?? ''),
        ':floor'              => clean($body['floor'] ?? ''),
        ':elevator'           => clean($body['elevator'] ?? ''),
        ':room_count'         => $body['roomCount'] ? (int)$body['roomCount'] : null,
        ':bathroom_count'     => $body['bathroomCount'] ? (int)$body['bathroomCount'] : null,
        ':capacity'           => $body['capacity'] ? (int)$body['capacity'] : null,
        ':avail_from'         => clean($body['availFrom'] ?? ''),
        ':avail_to'           => clean($body['availTo'] ?? ''),
        ':fire_extinguisher'  => clean($body['fireExtinguisher'] ?? ''),
        ':host_presence'      => clean($body['hostPresence'] ?? ''),
        ':need_registration'  => clean($body['needRegistration'] ?? ''),
        ':subway_station'     => clean($body['subwayStation'] ?? ''),
        ':subway_distance'    => clean($body['subwayDistance'] ?? ''),
        ':features'           => clean($body['features'] ?? ''),
        ':comment'            => clean($body['comment'] ?? ''),
        ':rooms'              => $body['rooms'] ?? null,
        ':house_photos'       => $photosJson,
        ':ip'                 => $ip,
    ]);

    json_ok(['id' => $pdo->lastInsertId()]);
}

json_error('알 수 없는 type');
