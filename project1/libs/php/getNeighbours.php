<?php
    // Lookup nearest address data:

    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $executionStartTime = microtime(true);

    $url = "http://api.geonames.org/addressJSON?lat=".$_REQUEST['lat']."&lng=".$_REQUEST['lng']."&username=fatimahs";

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
    
    $infoarr = json_decode($result, true);

    $output = array();

    
    if ($err) {
        echo $err, $errname, $errmsg;
    } else {

        $output['status']['code'] = "200";
        $output['status']['name'] = "ok";
        $output['status']['description'] = "success";
        $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000)." ms";
        $output['data'] = $infoarr['address'];
        
        header('Content-Type: application/json; charset=UTF-8');

        echo json_encode($output);    

    }

?>