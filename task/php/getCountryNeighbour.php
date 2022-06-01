<?php
    // retrieve country neighbour info

    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $url='http://api.geonames.org/neighboursJSON?formatted=true&cntry='.$_REQUEST['cntry'].'&username=fatimahS&style=full';

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL, $url);

    $result = curl_exec($ch);

    $infoArray = json_decode($result, true);

    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['data'] = $infoArray['geonames'];

    header('Content-Type: application/json; charset=UTF-8');

    echo json_encode($output);    

?>