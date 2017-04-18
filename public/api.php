<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);

class Api
{
    const HASH = [
        "1d6d8e73586dd01799515673e1c0ff0f",
        "5b27a498ffbed9a31dff1dc1701e3eff",
        "399bf504c45049550b551d903487abe6",
    ];

    public function __construct()
    {
        if ($_SERVER["REQUEST_METHOD"] != "POST") {
            $this->response("HTTP/1.0 401 Unauthorized");
        }

        $request = file_get_contents("php://input");
        if ($json = json_decode($request, true)) {
            if (!isset($json["hash"]) || !in_array($json["hash"], self::HASH)) {
                $this->response("HTTP/1.0 401 Unauthorized");
            }

            if (method_exists("Api", $json["action"])) {
                $this->$json["action"]($json["data"]);
            } else {
                $this->response("HTTP/1.0 400 Bad Request");
            }
        }

        $this->response("HTTP/1.0 401 Unauthorized");
    }

    private function login()
    {
        $this->response("HTTP/1.0 200 Ok");
    }

    private function images()
    {
        echo $this->scanImage("data/");

        $this->response("HTTP/1.0 200 Ok");
    }

    private function file($data)
    {
        $imgPath = "data/" . time() . ".jpg";
        $imgData = str_replace(" ", "+", $data);
        $imgData = substr($imgData, strpos($imgData, ",") + 1);
        $imgData = base64_decode($imgData);

        if (!file_put_contents($imgPath, $imgData)) {
            $this->response("HTTP/1.0 500 Internal Server Error");
        }

        if (exif_imagetype($imgPath) != IMAGETYPE_JPEG) {
            $this->response("HTTP/1.0 400 Invalid image type");
        }

        $this->resizeImage($imgPath, 400, 400);

        $this->images();
    }

    private function remove($data)
    {
        if (!unlink($data)) {
            $this->response("HTTP/1.0 500 Internal Server Error");
        }

        $this->images();
    }

    private function schedule($data)
    {
        if (!file_put_contents("data/schedule.json", json_encode($data))) {
            $this->response("HTTP/1.0 500 Internal Server Error");
        }

        $this->response("HTTP/1.0 204 No Content");
    }

    private function gamer($data)
    {
        if (!file_put_contents("data/gamer.json", json_encode($data))) {
            $this->response("HTTP/1.0 500 Internal Server Error");
        }

        $this->response("HTTP/1.0 204 No Content");
    }


    private function response($header)
    {
        header($header);
        exit;
    }

    private function resizeImage($source_file, $max_width, $max_height)
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

    private function scanImage($dir)
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
}


$request = file_get_contents("php://input");
if ($data = json_decode($request, true)) {


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