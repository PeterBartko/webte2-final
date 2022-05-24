<?php
include "config.php";
require_once('libphp-phpmailer/autoload.php');
require_once('is_udaje.php');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

file_put_contents('logs.csv', '');

$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$stmt = $conn->prepare('select `log_date`, `input`, `log_success`, `log_info` from logs');
$stmt->execute();
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

$csv = fopen('logs.csv', 'w');
fputcsv($csv, ['Date', 'Input', 'isOK', 'Error Info']);
foreach ($data as $row)
    fputcsv($csv, $row);
fclose($csv);

$mail = new PHPMailer(true);        // Passing `true` enables exceptions

try {
    //Server settings
    // $mail->SMTPDebug = 2;         // Enable verbose debug output
    $mail->isSMTP();                // Set mailer to use SMTP
    $mail->Host = 'mail.stuba.sk';  // Specify SMTP servers
    $mail->SMTPAuth = true;         // Enable SMTP authentication
    $mail->Username = $usrnm;      // SMTP username
    $mail->Password = $pwd;    // SMTP password
    $mail->SMTPSecure = 'tls';      // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 25;               // TCP port to connect to

    //Recipients
    $mail->setFrom('xbartkop@stuba.sk', 'Peter Bartko');
    $mail->addAddress($email, $email);

    //Attachments
    $mail->addAttachment('logs.csv', 'logs.csv');    // Optional name

    //Content
    $mail->isHTML(true);                            // Set email format to HTML
    $mail->Subject = 'Webte-Final: CSV logs';
    $mail->Body = 'V prílohe nájdete logy z API <i>logy.csv<i>';
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    echo "OK";
    header('Location: index.php');
} catch (Exception $e) {
    echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
}