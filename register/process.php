<?php
	require("inc/config.php");
	require("inc/Connection.php");
	require_once('class.phpmailer.php');
	
	error_reporting(E_ALL);
	
	$conn = new Connection();
	$conn->getHander();
	
	$firstname = $conn->escape(@$_REQUEST["f_firstname"]);
	$f_lastname = $conn->escape(@$_REQUEST["f_lastname"]);
	$sex = $conn->escape(@$_REQUEST["f_sex"]);
	$email = $conn->escape(@$_REQUEST["f_email"]);
	$mobile = $conn->escape(@$_REQUEST["f_mobile"]);
	$lang = $conn->escape(@$_REQUEST["f_lang"]);
	$location = $conn->escape(@$_REQUEST["f_location"]);
	
	if($location == "sh") {
		$locationStrEN = "Shanghai";
		$locationStr = "上海站";
	} else 	if($location == "bj") {
		$locationStrEN = "Beijing";
		$locationStr = "北京站";
	}
				
	if($firstname != "" && $email != "") {
				
		$query = "insert into regform (firstname, lastname, sex, email, mobile, lang, location, createDatetime) values ('$firstname', '$f_lastname', '$sex', '$email', '$mobile', '$lang', '$location', now())";	
		$result = $conn->master_query($query);
	}
	
	$mail             = new PHPMailer(); // defaults to using php "mail()"
		
	$mail->SetFrom('noreply@porsche.cn', '保时捷极至体验');
	
	$mail->AddReplyTo("noreply@porsche.cn","保时捷极至体验");
	
	// $address = "twong2@cmgrp.com";
	// $mail->AddAddress($address, "Tony Wong");
	$address = $email;
	$mail->AddAddress($address, $lastname . " " . $firstname);
	
	// $mail->Subject    = "PHPMailer Test Subject via mail(), basic";
	
	$mail->AltBody    = "To view the message, please use an HTML compatible email viewer!"; // optional, comment out and test
	
	$mail->CharSet = "utf-8";
	
	if($lang == "en") {
		$mail->SetFrom('noreply@porsche.cn', 'Fascination Porsche');
	
		$mail->AddReplyTo("noreply@porsche.cn","Fascination Porsche");
	
		$body = file_get_contents("edm/edm-en.html");
		$body = str_replace("%%NAME%%", $firstname . " " . $f_lastname, $body);
		$body = str_replace("%%LOCATION%%", $locationStrEN, $body);
		$mail->Subject   = "=?" . $mail->CharSet . "?B?" . base64_encode("Fascination Porsche: Thank you for your registration") . "?=";
	
	} else {
		$mail->SetFrom('noreply@porsche.cn', '保时捷极至体验');
	
		$mail->AddReplyTo("noreply@porsche.cn","保时捷极至体验");
	
		$body = file_get_contents("edm/edm.html");
		$body = str_replace("%%NAME%%", $firstname, $body);
		$body = str_replace("%%LOCATION%%", $locationStr, $body);
		$mail->Subject   = "=?" . $mail->CharSet . "?B?" . base64_encode("保时捷极至体验：感谢您的注册") . "?=";
	}
	
	$body = str_replace("%%DOMAIN%%", "http://182.255.24.198/porsche/edm/images/", $body);	
	
	$mail->IsHTML(true);
	
	$mail->MsgHTML($body);
	
	$mail->Send();

	if($lang == "en") {
		header("location:thankyou-en.php");
	} else {
		header("location:thankyou.php");
	}

?>