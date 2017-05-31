<?php

//error_reporting(E_ALL);
//ini_set("display_errors", 1);

/**
 * Class Api
 */
class Api
{
    /**
     * Data path.
     */
    const PATH = "data/";

    /**
     * Api constructor.
     */
    public function __construct()
    {
        if ($_SERVER["REQUEST_METHOD"] != "POST") {
            $this->response(401, "Unauthorized");
        }

        $hash = $this->hash();

        $request = file_get_contents("php://input");
        if ($json = json_decode($request, true)) {
            if (!isset($json["hash"]) || !in_array($json["hash"], $hash)) {
                $this->response(401, "Unauthorized");
            }

            $action = $json["action"];
            if (method_exists("Api", $action)) {
                if (isset($json["data"])) {
                    $this->$action($json["data"]);
                } else {
                    $this->$action();
                }
            } else {
                $this->response(400, "Bad Request");
            }
        }

        $this->response(401, "Unauthorized");
    }

    /**
     * Login confirmation.
     */
    private function login()
    {
        $this->response(200, "Ok");
    }

    /**
     * Get list of valid hash.
     */
    private function hash()
    {
        require "./hash.php";

        return $hash;
    }

    /**
     * List all data images.
     */
    private function images()
    {
        echo $this->scanImage(self::PATH);

        $this->response(200, "Ok");
    }

    /**
     * Upload an image.
     * @param string $data
     */
    private function file($data)
    {
        $imgPath = self::PATH . time() . ".jpg";

        $imgData = str_replace(" ", "+", $data);
        $imgData = substr($imgData, strpos($imgData, ",") + 1);
        $imgData = base64_decode($imgData);

        if (!file_put_contents($imgPath, $imgData)) {
            $this->response(500, "Internal Server Error");
        }

        if (exif_imagetype($imgPath) != IMAGETYPE_JPEG) {
            unlink($imgPath);

            $this->response(400, "Invalid image type");
        }

        if (!$this->resizeImage($imgPath, 400, 400)) {
            unlink($imgPath);

            $this->response(400, "Invalid image resize");
        }

        $this->images();
    }

    /**
     * Delete an image.
     * @param string $data
     */
    private function remove($data)
    {
        if (!unlink($data)) {
            $this->response(500, "Internal Server Error");
        }

        $this->images();
    }

    /**
     * Update the config json.
     * @param array $data
     */
    private function config($data)
    {
        if (!file_put_contents(self::PATH . "config.json", json_encode($data))) {
            $this->response(500, "Internal Server Error");
        }

        $this->response(204, "No Content");
    }

    /**
     * Update the schedule json.
     * @param array $data
     */
    private function schedule($data)
    {
        if (!file_put_contents(self::PATH . "schedule.json", json_encode($data))) {
            $this->response(500, "Internal Server Error");
        }

        $this->response(204, "No Content");
    }

    /**
     * Update the gamer json.
     * @param array $data
     */
    private function gamer($data)
    {
        if (!file_put_contents(self::PATH . "gamer.json", json_encode($data))) {
            $this->response(500, "Internal Server Error");
        }

        $this->response(204, "No Content");
    }

    /**
     * Send the response.
     * @param int $code
     * @param string $status
     */
    private function response($code, $status)
    {
        header("HTTP/1.0 $code $status");
        exit;
    }

    /**
     * Resize an image.
     * @param string $source_file
     * @param int $max_width
     * @param int $max_height
     * @return bool
     */
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

    /**
     * List all data images.
     * @param string $dir
     * @return string
     */
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

$api = new Api();