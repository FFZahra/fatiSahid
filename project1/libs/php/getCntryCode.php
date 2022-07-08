<?php
    // Lookup country code for location:

    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $executionStartTime = microtime(true);

    $url = "https://api.opencagedata.com/geocode/v1/json?key=87d21371a2e74dffb29193dbbda7b9d2&q=".$_REQUEST['q']."&pretty=1";

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_RETURNTRANSFER => true,        
        CURLOPT_URL => $url
    ]);

    $response = curl_exec($ch);
    $err = curl_errno($ch);
    $errmsg = curl_error($ch);
    $errname = curl_strerror($err);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
       
    curl_close($ch);  
    
    $infoArr = json_decode($response, true);

    $output = array();

    if ($err) {
        echo $err, $errname, $errmsg;
    } else {
        $output['status']['code'] = $httpCode;
        $output['status']['name'] = "ok";
        $output['status']['description'] = "success";
        $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000)." ms";
        $output['data'] = $infoArr['results'];
        
        header('Content-Type: application/json; charset=UTF-8');

        echo json_encode($output);    

    };
?>