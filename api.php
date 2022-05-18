<?php
session_start();
header('Content-Type: application/json; charset=utf-8');
require_once 'octave.php';
include 'config.php';

if (isset($_GET['apikey']) && $_GET['apikey'] == $api_key) {

        function parse($data): array {
            $parsed = [];
            foreach ($data as $num)
                if ($num != "")
                    $parsed[] = $num;
            return $parsed;
        }


        $json = [];
        foreach ($output as $key => $value) {
            if ($key >= 2 && $key <= 502) {
                $parsed = parse(explode(" ", $value));
                $json[] = ["t" => $parsed[0], "y" => $parsed[1], "x1" => $parsed[2]];
            }
        }

    echo json_encode($json);
}

