<?php

$hashs = [
    "1d6d8e73586dd01799515673e1c0ff0f",
    "5b27a498ffbed9a31dff1dc1701e3eff",
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
        if(!file_put_contents('data/schedule.json', json_encode($data['schedule']))) {
            header('HTTP/1.0 500 Internal Server Error');
            exit;
        }
    }

    exit;
}

header('HTTP/1.0 401 Unauthorized');
exit;