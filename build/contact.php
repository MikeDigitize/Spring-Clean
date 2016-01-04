<?php

    $json = json_decode(file_get_contents("php://input"));

	$json->contactformname = strip_tags($json->contactformname);
	$json->contactformlocation = strip_tags($json->contactformlocation);
	$json->contactformemail = strip_tags($json->contactformemail);
	$json->contactformphone = strip_tags($json->contactformphone);
	$json->contactformmsg = strip_tags($json->contactformmsg);

	$to      = 'vicky@springcleanhomeservices.co.uk';
	$subject = 'Website Enquiry';
	$message = $json->contactformmsg . "\xA" .
	    'from : ' . $json->contactformname . "\xA" .
	    'location: ' . $json->contactformlocation . "\xA" .
	    'email: ' . $json->contactformemail . "\xA" .
	    'tel: ' . $json->contactformphone;
	$headers = "From: webmaster@springcleanhomeservices.co.uk";
	$reg = '/https?:\/\/|www./';

	if(!preg_match($reg, $to) && !preg_match($reg, $subject) && !preg_match($reg, $message)) {
		mail( $to, $subject, $message, $headers );
	}
	else {
	    echo "URL detected!";
	}

?>