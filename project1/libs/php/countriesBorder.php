<?php

	// remove for production

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

    $result = file_get_contents("countryBorders.geo.json");

	$decode = json_decode($result,true);

	$countryBorder = [];


	foreach($decode['features'] as $country_data){

        if($country_data['properties']["iso_a2"] == $_REQUEST['country_code'] ){
            $countryBorder = $country_data;
            break;
        }
    }

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
	$output['data'] = $countryBorder;
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

?>