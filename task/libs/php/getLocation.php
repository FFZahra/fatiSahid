<?php
    // Lookup latitude and longitude data:

    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $executionStartTime = microtime(true);

    $url = "http://api.geonames.org/geoCodeAddressJSON?q=".$_REQUEST['q']."&username=fatimahs"; 

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_RETURNTRANSFER => true,        
        CURLOPT_URL => $url
    ]);

    $result = curl_exec($ch);

    curl_close($ch);

    $infoArr = json_decode($result, true);

    $output = array();

    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "success";
    $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000)." ms";
    $output['data'] = $infoArr['address'];

    header('Content-Type: application/json; charset=UTF-8');

    echo json_encode($output);    

?>