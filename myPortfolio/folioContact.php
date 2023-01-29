<?php 

$sndName = $_POST['name'];
$sndEmail = $_POST['email'];
$sndSubject = $_POST['subject'];
$sndMessage = $_POST['message'];

//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require "PHPMailer/PHPMailer/PHPMailer.php";
require "PHPMailer/PHPMailer/SMTP.php";
require "PHPMailer/PHPMailer/Exception.php";

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
   
    $mail->isSMTP();                                         //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'fatisahid@gmail.com';                     //SMTP username
    $mail->Password   = 'sxwkfyxybaatkzsq';                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom($sndEmail, $sndName);
    $mail->addAddress('fatisahid@gmail.com');     //Add a recipient

      
    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    // $sndSmmry = "Received From:" . "<br>" . "Name: " . $sndName . "<br>" . "Email: " . $sndEmail . "<br>". "Date: " . date('d F, Y');
    $mail->Subject = ("$sndSubject ($sndEmail)");
    $mail->Body    = "<br><br>" . $sndMessage;
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

?>