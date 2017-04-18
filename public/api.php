<?php

/*
class Api {
    const hashs = [
        "1d6d8e73586dd01799515673e1c0ff0f",
        "5b27a498ffbed9a31dff1dc1701e3eff",
    ];


}
*/


$hashs = [
    "1d6d8e73586dd01799515673e1c0ff0f",
    "5b27a498ffbed9a31dff1dc1701e3eff",
];

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    header("HTTP/1.0 401 Unauthorized");
    exit;
}

error_reporting(E_ALL);
ini_set("display_errors", 1);

function resize_image($source_file, $max_width, $max_height)
{
    list($width, $height) = getimagesize($source_file);
    if ($width == $max_width && $height == $max_height) {
        return true;
    }

    $dst_img = imagecreatetruecolor($max_width, $max_height);
    $src_img = imagecreatefromjpeg($source_file);

    $width_new = $height * $max_width / $max_height;
    $height_new = $width * $max_height / $max_width;
    if ($width_new > $width) {
        $h_point = (($height - $height_new) / 2);
        imagecopyresampled($dst_img, $src_img, 0, 0, 0, $h_point, $max_width, $max_height, $width, $height_new);
    } else {
        $w_point = (($width - $width_new) / 2);
        imagecopyresampled($dst_img, $src_img, 0, 0, $w_point, 0, $max_width, $max_height, $width_new, $height);
    }

    return imagejpeg($dst_img, $source_file, 100);
}

function scan_image($dir)
{
    $dh = opendir($dir);
    $files = [];
    while (false !== ($filename = readdir($dh))) {
        if (strpos($filename, ".jpg") !== false) {
            $files[] = $dir . $filename;
        }
    }

    return json_encode($files);
}

$request = file_get_contents("php://input");
if ($data = json_decode($request, true)) {

    if (!isset($data["hash"]) || !in_array($data["hash"], $hashs)) {
        header("HTTP/1.0 401 Unauthorized");
        exit;
    }

    if (isset($data["login"])) {
        header("HTTP/1.0 200 Ok");
        exit;
    }

    if (isset($data["images"])) {
        echo scan_image("data/");
        header("HTTP/1.0 200 Ok");
        exit;
    }

    if (isset($data["file"])) {
        $imgPath = "data/" . time() . ".jpg";
        $imgData = str_replace(" ", "+", $data["file"]);
        $imgData = substr($imgData, strpos($imgData, ",") + 1);
        $imgData = base64_decode($imgData);

        if (!file_put_contents($imgPath, $imgData)) {
            header("HTTP/1.0 500 Internal Server Error");
            exit;
        }

        if (exif_imagetype($imgPath) != IMAGETYPE_JPEG) {
            header("HTTP/1.0 400 Invalid image type");
            exit;
        }

        resize_image($imgPath, 400, 400);

        echo scan_image("data/");
        header("HTTP/1.0 200 Ok");
        exit;
    }

    if (isset($data["remove"])) {
        if (@unlink($data["remove"])) {
            echo scan_image("data/");
            header("HTTP/1.0 200 Ok");
            exit;
        }

        header("HTTP/1.0 500 Internal Server Error");
        exit;
    }

    if (isset($data["schedule"])) {
        if (!file_put_contents("data/schedule.json", json_encode($data["schedule"]))) {
            header("HTTP/1.0 500 Internal Server Error");
            exit;
        }

        header("HTTP/1.0 204 No Content");
        exit;
    }

    if (isset($data["gamer"])) {
        if (!file_put_contents("data/gamer.json", json_encode($data["gamer"]))) {
            header("HTTP/1.0 500 Internal Server Error");
            exit;
        }

        header("HTTP/1.0 204 No Content");
        exit;
    }

    header("HTTP/1.0 400 Bad Request");
    exit;
}

header("HTTP/1.0 401 Unauthorized");
exit;