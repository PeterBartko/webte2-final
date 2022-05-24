<?php
include 'config.php';
header('Content-Type: application/json; charset=utf-8');

if (isset($_GET['ta'], $_GET['apikey']) && $_GET['apikey'] == $api_key) {
    $ta = $_GET['ta'];
    $ans = [];
    $err = 0;

    exec('2>&1 octave-cli --eval "pkg load control; '. $ta .' "', $ans, $err);

    function parseErr($str): string {
        $parsed = '';
        foreach ($str as $msg)
            if ($msg != "")
                $parsed .= ' ' . $msg;
        return $parsed;
    }

    $log_date = date("d.m.Y H:i");
    $log_value = $ta;
    $log_isOK = $err == 0 ? 'true' : 'false';
    $log_info = $err != 0 ? parseErr($ans) : 'success';
    $ans = $err != 0 ? '' : $ans;

    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $conn->prepare("insert into logs (`log_date`, `input`, `log_success`, `log_info`) values (?, ? ,? ,?)");
    $stmt->execute([$log_date, $log_value, $log_isOK, $log_info]);

    echo json_encode(['answer' => $ans, 'error' => ['isOK' => $log_isOK, 'error_msg' => $log_info]]);
}
