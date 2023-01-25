<?php
use PHPMailer\PHPMailer\PHPMailer;

if(isset($_POST['name']) && isset($_POST['email'])){
    $sndname = $_POST['name'];
    $sndemail = $_POST['email'];
    $sndsubject = $_POST['subject'];
    $sndmessage = $_POST['message'];

    require_once "PHPMailer/PHPMailer.php";
    require_once "PHPMailer/SMTP.php";
    require_once "PHPMailer/Exception.php";

    $mail = new PHPMailer();

    //smtp setings:
    $mail->isSMTP();
    $mail->Host = "mail.fatisahid.site"; //"smtp.gmail.com";
    $mail->SMTPAuth = true;
    $mail->Username = "fatizfolio@fatisahid.site";  //"fatishid";   //fatisahid@gmail.com
    $mail->Password = "20fatiz1Folio23";
    $mail->Port = 465;
    $mail->SMTPSecure = "ssl";

    //email settings:
    $mail->isHTML(true);
    $mail->setFrom($sndemail, $sndname);
    $mail->addAddress("fatisahid@gmail.com");
    $mail->Subject = ("$sndemail ($sndsubject)");
    $mail->Body = $sndmessage;
    //$mail->addAttachment('attachment.txt');

    if($mail->send()){
        $status = "success";
        $response = "Email sent successfully!";
    }
    else{
        $status = "failed";
        $response = "Something is wrong.: <br>" . $mail->ErrorInfo;
    }

    // exit(json_encode(array("status" => $status, "response" => $response)));
    exit(json_encode($response));
}

?>