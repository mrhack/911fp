<?php


require_once('class.phpmailer.php');

$mail             = new PHPMailer(); // defaults to using php "mail()"

// $body             = file_get_contents('contents.html');
// $body             = preg_replace('/[\]/','',$body);

$mail->SetFrom('test@test.com', 'First Last');

$mail->AddReplyTo("test@test.com","First Last");

// $address = "twong2@cmgrp.com";
// $mail->AddAddress($address, "Tony Wong");
$address = "tonybean@mac.com";
$mail->AddAddress($address, "Tony Wong");

// $mail->Subject    = "PHPMailer Test Subject via mail(), basic";

$mail->AltBody    = "To view the message, please use an HTML compatible email viewer!"; // optional, comment out and test


$body = "This is a test";

$mail->CharSet = "utf-8";

$mail->Subject    = "Fascination Porsche: Thank You for Registering";

	$body = "用速度点燃你的激情，用梦想点亮你的生活！<br/><br/>" .

		"保时捷极至体验，再次来到中国，带来全方位的保时捷品牌展示。在这里，你可以感受保时捷的历史与辉煌， 近距离品鉴包括保时捷 356 在内的经典车型，抢先领略全新一代 Panamera 与 911 GT3 的领世风采，感受保时捷对跑车未来的激情演绎；您更可参与多项互动游戏，赢取试乘诸多新款保时捷车型的机会，体验风驰电掣的纵横驰骋。<br/><br/>" .

		"精彩体验，应与好友共同分享。每位预约参与的来宾都将在现场收到一枚 RFID 腕带，让您在微博上轻松分享属于您的保时捷时刻。<br/><br/>" .

		"我们期待您的莅临！";

$mail->IsHTML(true);

$mail->MsgHTML($body);

if(!$mail->Send()) {
  echo "Mailer Error: " . $mail->ErrorInfo;
} else {
  echo "Message sent!";
}


?>