<?php
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-cache, no-store, must-revalidate');

function get_pdo() {
    return new PDO(
        'mysql:host=wehome-aurora-cluster.cluster-cmdvw4tlnzma.ap-northeast-2.rds.amazonaws.com;dbname=kozaza;charset=utf8mb4',
        'kozaza', 'P*uj&6uDofO*l&T5w_as',
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]
    );
}

function np($val) {
    return preg_replace('/[^0-9]/', '', (string)$val);
}

function format_phone($raw) {
    $digits = np($raw);
    if ($digits === '') return '';
    if (strlen($digits) === 10 && strpos($digits, '10') === 0) {
        $digits = '0' . $digits;
    }
    if (strlen($digits) === 11 && strpos($digits, '010') === 0) {
        return substr($digits, 0, 3) . '-' . substr($digits, 3, 4) . '-' . substr($digits, 7, 4);
    }
    if (strlen($digits) === 10 && strpos($digits, '01') === 0) {
        return substr($digits, 0, 3) . '-' . substr($digits, 3, 6) . '-' . substr($digits, 6, 4);
    }
    return trim((string)$raw);
}

function fmt_date($val) {
    if (!$val) return '';
    if ($val instanceof DateTimeInterface) {
        return $val->format('Y-m-d');
    }
    $s = substr((string)$val, 0, 10);
    return $s;
}

function normalize_region_code($raw) {
    $code = trim((string)$raw);
    if ($code === '') return '';
    if (preg_match('/^부산\d+/', $code)) return $code;
    if (preg_match('/^\d+$/', $code)) return '신청' . $code;
    return $code;
}

function resolve_full_address($listing) {
    $full = preg_replace('/\s+/', ' ', trim((string)($listing['full_address_kr'] ?? '')));
    if ($full !== '') return $full;
    $parts = [];
    $province = trim((string)($listing['province_city_kr'] ?? ''));
    $detail = trim((string)($listing['address_kr'] ?? $listing['address'] ?? ''));
    if ($province !== '') $parts[] = $province;
    if ($detail !== '' && strpos($province, $detail) === false) $parts[] = $detail;
    return preg_replace('/\s+/', ' ', implode(' ', $parts));
}

function resolve_status($assignment, $reservation) {
    if ($reservation) return '결제완료';
    if (!$assignment) return '미배정';
    $st = $assignment['status'] ?? '';
    if ($st === 'active') return '안내중 (미결제)';
    if (in_array($st, ['cancelled', 'expired', 'removed'], true)) {
        return '배정취소';
    }
    return '미배정';
}

function assignment_pick_score($row, array $reservations) {
    $lid = (int)($row['list_id'] ?? 0);
    $gid = (int)($row['guest_user_id'] ?? 0);
    $has_res = ($gid > 0 && isset($reservations[$lid . ':' . $gid]));
    $active = (($row['status'] ?? '') === 'active');
    return ($has_res ? 100 : 0) + ($active ? 10 : 0);
}

function fmt_list_time($raw, $default) {
    $s = trim((string)$raw);
    if ($s === '' || $s === '0') {
        return $default;
    }
    if (preg_match('/^(\d{1,2}):(\d{2})/', $s, $m)) {
        return sprintf('%02d:%02d', (int)$m[1], (int)$m[2]);
    }
    return $default;
}

function load_listings(PDO $pdo) {
    $sql = "
        SELECT l.id AS list_id,
               l.title,
               l.title_kr,
               l.max_guests,
               l.beds,
               l.user_id AS host_id,
               CONCAT(TRIM(u.Lname), TRIM(u.Fname)) AS host_name,
               u.mobile_phone AS phone,
               u.email AS host_email,
               l.address,
               l.address_kr,
               l.full_address_kr,
               l.province_city_kr,
               l.checkin AS list_checkin,
               l.checkout AS list_checkout
        FROM list l
        INNER JOIN list_picks lp ON lp.list_id = l.id AND lp.name = 'kpopstay-homestay'
        LEFT JOIN users u ON u.id = l.user_id
        WHERE l.is_deleted != '1'
           OR EXISTS (
                SELECT 1 FROM kpopstay_match_assignments a
                WHERE a.list_id = l.id AND a.status = 'active'
           )
           OR EXISTS (
                SELECT 1 FROM reservation r
                WHERE r.list_id = l.id
                  AND r.status IN (1, 3, 5, 6, 16)
                  AND r.checkin_date >= '2026-06-01'
           )
        ORDER BY l.id ASC
    ";
    return $pdo->query($sql)->fetchAll();
}

function load_assignments(PDO $pdo, array $reservations) {
    $rows = $pdo->query("
        SELECT id, sheet_row, list_id, guest_user_id, guest_count, guest_name,
               status, checkin, checkout, room_label
        FROM kpopstay_match_assignments
        ORDER BY list_id ASC, id DESC
    ")->fetchAll();
    $grouped = [];
    foreach ($rows as $row) {
        $grouped[(int)$row['list_id']][] = $row;
    }
    $by_list = [];
    foreach ($grouped as $lid => $items) {
        $best = null;
        $best_score = -1;
        foreach ($items as $row) {
            $score = assignment_pick_score($row, $reservations) * 1000000 + (int)$row['id'];
            if ($score > $best_score) {
                $best_score = $score;
                $best = $row;
            }
        }
        if ($best && assignment_pick_score($best, $reservations) > 0) {
            $by_list[$lid] = $best;
        }
    }
    return $by_list;
}

function load_reservations(PDO $pdo) {
    $rows = $pdo->query("
        SELECT r.id AS res_id, r.list_id, r.guest_id, r.status, r.confirm_code,
               DATE(r.checkin_date) AS checkin, DATE(r.checkout_date) AS checkout,
               r.num_adults
        FROM reservation r
        INNER JOIN list_picks lp ON lp.list_id = r.list_id AND lp.name = 'kpopstay-homestay'
        WHERE r.status IN (1, 3, 5, 6, 16)
          AND r.guest_payment_done = 1
          AND r.checkin_date >= '2026-06-01'
        ORDER BY r.id DESC
    ")->fetchAll();
    $out = [];
    foreach ($rows as $row) {
        $key = (int)$row['list_id'] . ':' . (int)$row['guest_id'];
        if (!isset($out[$key])) {
            $out[$key] = $row;
        }
    }
    return $out;
}

function load_host_app_ids(PDO $pdo) {
    $rows = $pdo->query("
        SELECT u.id AS user_id, MAX(kh.id) AS kh_id
        FROM users u
        INNER JOIN kpopstay_hosts kh
          ON REPLACE(REPLACE(REPLACE(kh.phone, '-', ''), ' ', ''), '+', '')
           = REPLACE(REPLACE(REPLACE(u.mobile_phone, '-', ''), ' ', ''), '+', '')
        GROUP BY u.id
    ")->fetchAll();
    $out = [];
    foreach ($rows as $r) {
        if (!empty($r['kh_id'])) {
            $out[(int)$r['user_id']] = (int)$r['kh_id'];
        }
    }
    return $out;
}

function load_guest_enrichment(PDO $pdo, array $guest_ids) {
    $users = [];
    $guest_ids = array_values(array_unique(array_filter(array_map('intval', $guest_ids))));
    if ($guest_ids) {
        $ph = implode(',', array_fill(0, count($guest_ids), '?'));
        $stmt = $pdo->prepare("SELECT id, email, mobile_phone FROM users WHERE id IN ($ph)");
        $stmt->execute($guest_ids);
        foreach ($stmt->fetchAll() as $u) {
            $users[(int)$u['id']] = $u;
        }
    }

    $profiles = [];
    if ($guest_ids) {
        try {
            $chk = $pdo->query("
                SELECT COUNT(*) AS cnt FROM information_schema.columns
                WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'profiles' AND COLUMN_NAME = 'nationality'
            ")->fetch();
            if (((int)($chk['cnt'] ?? 0)) > 0) {
                $ph = implode(',', array_fill(0, count($guest_ids), '?'));
                $stmt = $pdo->prepare("SELECT id, nationality FROM profiles WHERE id IN ($ph) AND nationality IS NOT NULL AND nationality != ''");
                $stmt->execute($guest_ids);
                foreach ($stmt->fetchAll() as $p) {
                    $profiles[(int)$p['id']] = trim((string)$p['nationality']);
                }
            }
        } catch (Exception $e) {
            // profiles optional
        }
    }

    $kg_by_uid = [];
    $kg_by_name = [];
    try {
        foreach ($pdo->query("
            SELECT guest_name, email, phone, nationality, wehome_id
            FROM kpopstay_guests
        ")->fetchAll() as $g) {
            $uid = (int)($g['wehome_id'] ?? 0);
            if ($uid > 0) {
                $kg_by_uid[$uid] = $g;
            }
            $name_key = mb_strtolower(trim((string)($g['guest_name'] ?? '')), 'UTF-8');
            if ($name_key !== '' && !isset($kg_by_name[$name_key])) {
                $kg_by_name[$name_key] = $g;
            }
        }
    } catch (Exception $e) {
        // kpopstay_guests optional
    }

    return ['users' => $users, 'profiles' => $profiles, 'kg_by_uid' => $kg_by_uid, 'kg_by_name' => $kg_by_name];
}

function enrich_guest($guest_id, $guest_name, $enrich) {
    $nationality = '';
    $guestEmail = '';
    $guestPhone = '';

    if ($guest_id > 0) {
        $u = $enrich['users'][$guest_id] ?? null;
        if ($u) {
            $guestEmail = trim((string)($u['email'] ?? ''));
            $guestPhone = trim((string)($u['mobile_phone'] ?? ''));
        }
        if (isset($enrich['profiles'][$guest_id])) {
            $nationality = $enrich['profiles'][$guest_id];
        }
        if (isset($enrich['kg_by_uid'][$guest_id])) {
            $kg = $enrich['kg_by_uid'][$guest_id];
            if ($nationality === '') $nationality = trim((string)($kg['nationality'] ?? ''));
            if ($guestPhone === '') $guestPhone = trim((string)($kg['phone'] ?? ''));
            if ($guestEmail === '') $guestEmail = trim((string)($kg['email'] ?? ''));
        }
    }

    if ($guest_name !== '') {
        $name_key = mb_strtolower(trim($guest_name), 'UTF-8');
        if (isset($enrich['kg_by_name'][$name_key])) {
            $kg = $enrich['kg_by_name'][$name_key];
            if ($nationality === '') $nationality = trim((string)($kg['nationality'] ?? ''));
            if ($guestPhone === '') $guestPhone = trim((string)($kg['phone'] ?? ''));
            if ($guestEmail === '') $guestEmail = trim((string)($kg['email'] ?? ''));
        }
    }

    return [
        'nationality' => $nationality !== '' ? $nationality : '-',
        'guestEmail'  => $guestEmail !== '' ? $guestEmail : '-',
        'guestPhone'  => $guestPhone !== '' ? $guestPhone : '-',
    ];
}

function load_busan_order() {
    $paths = [
        '/home/wehome/scripts/kpopstay_busan_order.json',
        dirname(__DIR__) . '/wehome/scripts/kpopstay_busan_order.json',
    ];
    foreach ($paths as $path) {
        if (!is_readable($path)) continue;
        $raw = file_get_contents($path);
        if ($raw === false) continue;
        $data = json_decode($raw, true);
        if (!is_array($data)) continue;
        $items = [];
        foreach (($data['items'] ?? []) as $k => $v) {
            $lid = (int)$k;
            if ($lid < 1 || !is_array($v)) continue;
            $items[$lid] = $v;
        }
        return ['updatedAt' => $data['updatedAt'] ?? '', 'items' => $items];
    }
    return ['updatedAt' => '', 'items' => []];
}

function resolve_region_code($list_id, $host_id, $host_app_ids, array $order_items = []) {
    if (isset($order_items[$list_id])) {
        $code = trim((string)($order_items[$list_id]['regionCode'] ?? ''));
        if ($code !== '') return normalize_region_code($code);
    }
    $kh_id = $host_app_ids[$host_id] ?? 0;
    if ($kh_id > 0) {
        return '신청' . $kh_id;
    }
    return '';
}

function busan_sort_tuple($list_id, $host_id, $region_code, array $order_items) {
    if (isset($order_items[$list_id])) {
        return [(int)($order_items[$list_id]['sort'] ?? 9999), $host_id > 0 ? $host_id : 999999999, $list_id];
    }
    if (preg_match('/^부산(\d+)/', $region_code, $m)) {
        return [(int)$m[1], $host_id > 0 ? $host_id : 999999999, $list_id];
    }
    if (preg_match('/^신청(\d+)/', $region_code, $m)) {
        return [10000 + (int)$m[1], $host_id > 0 ? $host_id : 999999999, $list_id];
    }
    return [20000, $host_id > 0 ? $host_id : 999999999, $list_id];
}

function mask_phone_value($raw) {
    $digits = np($raw);
    if ($digits === '') return '-';
    if (strlen($digits) >= 7) {
        return substr($digits, 0, 3) . '-****-' . substr($digits, -4);
    }
    return '****';
}

function mask_email_value($raw) {
    $email = trim((string)$raw);
    if ($email === '' || $email === '-') return '-';
    $parts = explode('@', $email, 2);
    if (count($parts) !== 2) return '***';
    $local = $parts[0];
    $masked = (strlen($local) > 1) ? substr($local, 0, 1) . '***' : '***';
    return $masked . '@' . $parts[1];
}

function mask_guest_id_value($guest_id) {
    $gid = (int)$guest_id;
    if ($gid < 1) return '';
    return '***' . substr((string)$gid, -2);
}

function apply_privacy_mode(array &$row, $mode) {
    if ($mode === 'busan') {
        return;
    }
    if ($mode === 'host') {
        if (($row['status'] ?? '') !== '결제완료') {
            $row['guestPhone'] = '-';
            $row['guestEmail'] = '-';
        }
        return;
    }
    if ($mode === 'ops') {
        return;
    }
    $row['guestPhone'] = mask_phone_value($row['guestPhone'] ?? '');
    $row['guestEmail'] = mask_email_value($row['guestEmail'] ?? '');
    if (!empty($row['guestId'])) {
        $row['guestId'] = mask_guest_id_value($row['guestId']);
    }
}

function resolve_guest_count($guest_count, $status, $guest_name, $guest_id) {
    $n = (int)$guest_count;
    if ($n > 0) return $n;
    if (in_array($status, ['결제완료', '안내중 (미결제)'], true)) {
        if ($guest_name !== '' || (int)$guest_id > 0) return 1;
    }
    return 0;
}

function is_busan_city_title($title_kr, $title) {
    $kr = (string)$title_kr;
    $en = (string)$title;
    return (mb_strpos($kr, '부산시민', 0, 'UTF-8') !== false)
        || (mb_strpos($en, '부산시민', 0, 'UTF-8') !== false);
}

function extract_busan_applicant_name($title_kr, $title) {
    foreach ([(string)$title_kr, (string)$title] as $raw) {
        if ($raw === '') continue;
        if (preg_match('/부산시민\s*홈스테이\s*[\(（]([^()（）]+)[\)）]/u', $raw, $m)) {
            $name = trim((string)$m[1]);
            $name = preg_replace('/\s*-\s*룸.*$/u', '', $name);
            $name = preg_replace('/\s*Room\d+.*$/iu', '', $name);
            $name = trim($name);
            if ($name !== '') return $name;
        }
    }
    return '';
}

function load_busan_city_identifiers(PDO $pdo) {
    $names = [];
    $phones = [];
    $rows = $pdo->query("
        SELECT title_kr, title
        FROM list
        WHERE is_deleted != '1'
          AND (title_kr LIKE '%부산시민%' OR title LIKE '%부산시민%')
    ")->fetchAll();
    foreach ($rows as $row) {
        $name = extract_busan_applicant_name($row['title_kr'] ?? '', $row['title'] ?? '');
        if ($name !== '') {
            $names[mb_strtolower($name, 'UTF-8')] = $name;
        }
    }

    if ($names) {
        $name_list = array_values($names);
        $ph = implode(',', array_fill(0, count($name_list), '?'));
        $stmt = $pdo->prepare("SELECT name, phone FROM kpopstay_hosts WHERE name IN ($ph)");
        $stmt->execute($name_list);
        foreach ($stmt->fetchAll() as $kh) {
            $digits = np($kh['phone'] ?? '');
            if ($digits !== '') {
                $phones[$digits] = true;
            }
            $n = trim((string)($kh['name'] ?? ''));
            if ($n !== '') {
                $names[mb_strtolower($n, 'UTF-8')] = $n;
            }
        }
    }

    return ['names' => $names, 'phones' => $phones];
}

function is_busan_city_listing($title_kr, $title, $host_name, $host_phone, $busan_ids) {
    if (is_busan_city_title($title_kr, $title)) return true;
    $hn = mb_strtolower(trim((string)$host_name), 'UTF-8');
    if ($hn !== '' && isset($busan_ids['names'][$hn])) return true;
    $digits = np($host_phone);
    if ($digits !== '' && isset($busan_ids['phones'][$digits])) return true;
    return false;
}

function resolve_host_category($busan_room_count, $general_room_count) {
    if ($busan_room_count > 0 && $general_room_count > 0) return 'mixed';
    if ($busan_room_count > 0) return 'busan_city';
    return 'general';
}

function host_category_label($category) {
    if ($category === 'busan_city') return '부산시 선정';
    if ($category === 'mixed') return '부산시 선정+일반';
    return '일반';
}

try {
    $mode = $_GET['view'] ?? $_GET['mode'] ?? 'ops';
    if (!in_array($mode, ['ops', 'host', 'busan'], true)) {
        $mode = 'ops';
    }
    if ($mode === 'ops') {
        http_response_code(403);
        echo json_encode([
            'ok' => false,
            'blocked' => true,
            'msg' => '개인정보 보호를 위해 운영 전체 현황 페이지는 일시 중단되었습니다. 호스트 개별 링크(?view=host&host_id=) 또는 부산시 현황(?view=busan)을 이용해 주세요.',
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
    $filter_host_id = (int)($_GET['host_id'] ?? 0);
    if ($mode === 'host' && $filter_host_id < 1) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'msg' => 'host_id가 필요합니다.'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $pdo = get_pdo();
    $busan_order = load_busan_order();
    $order_items = $busan_order['items'] ?? [];
    $listings = load_listings($pdo);
    $reservations = load_reservations($pdo);
    $assignments = load_assignments($pdo, $reservations);
    $host_app_ids = load_host_app_ids($pdo);
    $busan_ids = load_busan_city_identifiers($pdo);

    $guest_ids = [];
    foreach ($assignments as $a) {
        $gid = (int)($a['guest_user_id'] ?? 0);
        if ($gid > 0) $guest_ids[] = $gid;
    }
    $enrich = load_guest_enrichment($pdo, $guest_ids);

    $flat_rows = [];
    $stats = ['결제완료' => 0, '안내중 (미결제)' => 0, '배정취소' => 0, '미배정' => 0];
    $guest_stats = ['결제완료' => 0, '안내중' => 0];

    foreach ($listings as $listing) {
        $list_id = (int)$listing['list_id'];
        $host_id = (int)($listing['host_id'] ?? 0);
        if ($mode === 'host' && $host_id !== $filter_host_id) {
            continue;
        }
        $host_name = trim((string)($listing['host_name'] ?? ''));
        $phone = format_phone($listing['phone'] ?? '');
        $host_email = trim((string)($listing['host_email'] ?? ''));
        $checkin_time = fmt_list_time($listing['list_checkin'] ?? '', '15:00');
        $checkout_time = fmt_list_time($listing['list_checkout'] ?? '', '11:00');
        $address = resolve_full_address($listing);
        $region_code = resolve_region_code($list_id, $host_id, $host_app_ids, $order_items);
        $title_kr = trim((string)($listing['title_kr'] ?? ''));
        $title_en = trim((string)($listing['title'] ?? ''));
        $title = $title_en !== '' ? $title_en : $title_kr;
        $capacity = (string)($listing['max_guests'] ?? '');
        $is_busan_city = is_busan_city_listing($title_kr, $title_en, $host_name, $phone, $busan_ids);

        $assign = $assignments[$list_id] ?? null;
        $guest_id = $assign ? (int)($assign['guest_user_id'] ?? 0) : 0;
        $res_key = $list_id . ':' . $guest_id;
        $reservation = ($assign && $guest_id > 0 && isset($reservations[$res_key])) ? $reservations[$res_key] : null;
        $status = resolve_status($assign, $reservation);

        $room_label = '';
        $guest_name = '';
        $guest_count = '';
        $checkin = '';
        $checkout = '';
        $booking_no = '';
        $confirm_code = '';
        $sheet_row = '';
        if ($assign) {
            $room_label = trim((string)($assign['room_label'] ?? ''));
            $guest_name = trim((string)($assign['guest_name'] ?? ''));
            $guest_count = (string)($assign['guest_count'] ?? '');
            $checkin = fmt_date($assign['checkin'] ?? '');
            $checkout = fmt_date($assign['checkout'] ?? '');
            $sheet_row = trim((string)($assign['sheet_row'] ?? ''));
            if ($reservation) {
                $confirm_code = trim((string)($reservation['confirm_code'] ?? ''));
                $booking_no = $confirm_code !== '' ? $confirm_code : (string)$reservation['res_id'];
                $checkin = fmt_date($reservation['checkin']) ?: $checkin;
                $checkout = fmt_date($reservation['checkout']) ?: $checkout;
            }
        }
        if ($room_label === '' && !empty($listing['beds'])) {
            $room_label = '침대 ' . $listing['beds'];
        }

        $guest_extra = enrich_guest($guest_id, $guest_name, $enrich);
        $stats[$status] = ($stats[$status] ?? 0) + 1;
        $guest_headcount = resolve_guest_count($guest_count, $status, $guest_name, $guest_id);
        if ($status === '결제완료') {
            $guest_stats['결제완료'] += $guest_headcount;
        } elseif ($status === '안내중 (미결제)') {
            $guest_stats['안내중'] += $guest_headcount;
        }

        $flat_rows[] = [
            'hostId'      => $host_id,
            'hostName'    => $host_name,
            'hostLabel'   => $host_name !== '' ? $host_name . ' (' . $host_id . ')' : (string)$host_id,
            'phone'       => $phone,
            'hostPhone'   => $phone,
            'hostEmail'   => $host_email,
            'regionCode'  => $region_code,
            'listId'      => (string)$list_id,
            'title'       => $title,
            'isBusanCity' => $is_busan_city,
            'address'     => $address,
            'roomLabel'   => $room_label,
            'capacity'    => $capacity,
            'status'      => $status,
            'guestName'   => $guest_name,
            'guestId'     => $guest_id > 0 ? (string)$guest_id : '',
            'guestCount'  => $guest_count,
            'guestHeadcount' => $guest_headcount,
            'checkin'     => $checkin,
            'checkout'    => $checkout,
            'checkinTime' => $checkin_time,
            'checkoutTime'=> $checkout_time,
            'bookingNo'   => $booking_no,
            'confirmCode' => $confirm_code,
            'sheetRow'    => $sheet_row,
            'nationality' => $guest_extra['nationality'],
            'guestEmail'  => $guest_extra['guestEmail'],
            'guestPhone'  => $guest_extra['guestPhone'],
            '_sort'       => busan_sort_tuple($list_id, $host_id, $region_code, $order_items),
        ];
    }

    usort($flat_rows, function ($a, $b) {
        return $a['_sort'] <=> $b['_sort'];
    });

    $hosts_map = [];
    foreach ($flat_rows as $i => &$row) {
        $row['no'] = $i + 1;
        unset($row['_sort']);
        apply_privacy_mode($row, $mode);
        $hid = (int)$row['hostId'];
        if (!isset($hosts_map[$hid])) {
            $hosts_map[$hid] = [
                'hostId'     => $hid,
                'hostName'   => $row['hostName'],
                'hostLabel'  => $row['hostLabel'],
                'phone'      => $row['phone'],
                'regionCode' => $row['regionCode'],
                'roomCount'  => 0,
                'stats'      => ['결제완료' => 0, '안내중' => 0, '배정취소' => 0, '미배정' => 0],
                'guestStats' => ['결제완료' => 0, '안내중' => 0],
                'busanRoomCount' => 0,
                'generalRoomCount' => 0,
                'hostCategory' => 'general',
                'hostCategoryLabel' => '일반',
                'rooms'      => [],
            ];
        }
        $hosts_map[$hid]['roomCount']++;
        if (!empty($row['isBusanCity'])) {
            $hosts_map[$hid]['busanRoomCount']++;
        } else {
            $hosts_map[$hid]['generalRoomCount']++;
        }
        $st = $row['status'];
        if ($st === '안내중 (미결제)') {
            $hosts_map[$hid]['stats']['안내중']++;
        } elseif (isset($hosts_map[$hid]['stats'][$st])) {
            $hosts_map[$hid]['stats'][$st]++;
        }
        $gh = (int)($row['guestHeadcount'] ?? 0);
        if ($st === '결제완료') {
            $hosts_map[$hid]['guestStats']['결제완료'] += $gh;
        } elseif ($st === '안내중 (미결제)') {
            $hosts_map[$hid]['guestStats']['안내중'] += $gh;
        }
        $room = $row;
        unset($room['hostId'], $room['hostName'], $room['hostLabel'], $room['phone']);
        $hosts_map[$hid]['rooms'][] = $room;
    }
    unset($row);

    $summary_hosts = ['busan_city' => 0, 'general' => 0, 'mixed' => 0];
    foreach ($hosts_map as &$host) {
        $cat = resolve_host_category((int)$host['busanRoomCount'], (int)$host['generalRoomCount']);
        $host['hostCategory'] = $cat;
        $host['hostCategoryLabel'] = host_category_label($cat);
        $summary_hosts[$cat] = ($summary_hosts[$cat] ?? 0) + 1;
    }
    unset($host);

    $hosts = array_values($hosts_map);

    $total = count($flat_rows);
    $busan_room_total = 0;
    foreach ($flat_rows as $fr) {
        if (!empty($fr['isBusanCity'])) $busan_room_total++;
    }
    $view_titles = [
        'ops' => '운영 전체',
        'host' => '호스트 마이뷰',
        'busan' => '부산시 현황',
    ];
    echo json_encode([
        'ok'        => true,
        'view'      => $mode,
        'viewTitle' => $view_titles[$mode] ?? '운영 전체',
        'hostId'    => $mode === 'host' ? $filter_host_id : 0,
        'orderUpdatedAt' => $busan_order['updatedAt'] ?? '',
        'updatedAt' => date('Y-m-d H:i') . ' KST',
        'summary'   => [
            'total'      => $total,
            'booked'     => $stats['결제완료'] ?? 0,
            'pending'    => $stats['안내중 (미결제)'] ?? 0,
            'cancelled'  => $stats['배정취소'] ?? 0,
            'unassigned' => $stats['미배정'] ?? 0,
            'guestsBooked'  => $guest_stats['결제완료'] ?? 0,
            'guestsPending' => $guest_stats['안내중'] ?? 0,
            'busanCityRooms' => $busan_room_total,
            'generalRooms'   => $total - $busan_room_total,
            'busanCityHosts' => $summary_hosts['busan_city'] ?? 0,
            'mixedHosts'     => $summary_hosts['mixed'] ?? 0,
            'generalHosts'   => $summary_hosts['general'] ?? 0,
        ],
        'hosts'     => $hosts,
    ], JSON_UNESCAPED_UNICODE);
} catch (Exception $e) {
    error_log('[kpopstay host-report-data] ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['ok' => false, 'msg' => '데이터 조회 중 오류가 발생했습니다.'], JSON_UNESCAPED_UNICODE);
}
