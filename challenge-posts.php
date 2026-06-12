<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

define('DB_HOST', 'wehome-aurora-cluster.cluster-cmdvw4tlnzma.ap-northeast-2.rds.amazonaws.com');
define('DB_USER', 'kozaza');
define('DB_PASS', 'P*uj&6uDofO*l&T5w_as');
define('DB_NAME', 'kozaza');

$pdo = new PDO(
    'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
    DB_USER, DB_PASS,
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
);

$rows = $pdo->query("
    SELECT id, post_type, shortcode, photo_path, photos, caption,
           submitter_name, submitter_note, display_order, approved_at
    FROM kpopstay_challenge_posts
    WHERE status = 'approved'
    ORDER BY display_order DESC, approved_at DESC
    LIMIT 200
")->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['ok' => true, 'posts' => $rows], JSON_UNESCAPED_UNICODE);
