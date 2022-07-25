<?php
    // Retrieve weather data:

    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $executionStartTime = microtime(true);

    $url = "https://api.openweathermap.org/data/2.5/weather?lat=".$_REQUEST['lat']."&lon=".$_REQUEST['lon']."&appid=2601917b1aa7d4a9e2ae40d111cde173&units=metric";

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_RETURNTRANSFER => true,        
        CURLOPT_URL => $url
    ]);

    $result = curl_exec($ch);
    $err = curl_errno($ch);
    $errmsg = curl_error($ch);
    $errname = curl_strerror($err);
       
    curl_close($ch);  
    
    $infoArr = json_decode($result, true);

    $output = array();

    
    if ($err) {
        echo $err, $errname, $errmsg;
    } else {

        $output['status']['code'] = "200";
        $output['status']['name'] = "ok";
        $output['status']['description'] = "success";
        $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000)." ms";
        $output['data'] = $infoArr;
        
        header('Content-Type: application/json; charset=UTF-8');

        echo json_encode($output);    

    }

?>