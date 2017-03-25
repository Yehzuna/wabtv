<?php

$hash = md5(md5("test") . ':WabTvHash:' . md5("test"));
var_dump($hash);

$hashs = [
    "f08b3edec66d1683968b17e74f6c3224"
];

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    header('HTTP/1.0 401 Unauthorized');
    exit;
}

$request = file_get_contents('php://input');
if($data = json_decode($request, true)) {

    if(!isset($data['hash']) || !in_array($data['hash'], $hashs)) {
        header('HTTP/1.0 401 Unauthorized');
        exit;
    }

    if(isset($data['schedule'])) {
        file_put_contents('data/schedule.json', json_encode($data['schedule']));
    }

    exit;
}

header('HTTP/1.0 401 Unauthorized');
exit;