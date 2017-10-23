<?php
/*
# MarketJS Obfuscator Client
# -----------------------------------------------------------------------
# Copyright (c) 2012 MarketJS Limited. Certain portions may come from 3rd parties and
# carry their own licensing terms and are referenced where applicable. 
# -----------------------------------------------------------------------
*/

require_once 'jscrambler.php';

$access_key = 'DCDA18CFF2FA2233E4C067BF85DF62295083EA3E';
$secret_key = '2420B285A8DF46FA43B564286CB40A32D10D5010';
$file_name = $argv[1];

echo "\n";

if(!$file_name){
	echo 'No file supplied ...'."\n";
	echo "\n";
	return;
}else{
	echo 'File supplied: '.$file_name."\n";
}


$path_to_project = getcwd().'/'.$file_name;

$jscrambler = new Jscrambler($access_key, $secret_key, 'api.jscrambler.com', 80);

$params = array('files'    => $path_to_project,
				'domain_lock' => 'cdn-factory.marketjs.com',
				'mode' => 'mobile', 
				'domain_lock_warning_function' => 'window.dba.dlwf',
				'rename_local' => '%DEFAULT%',
                'function_outlining' => '%DEFAULT%',
                'function_reorder' => '%DEFAULT%',
                'member_enumeration' => '%DEFAULT%',
                'literal_hooking' => '%DEFAULT%',
                'duplicate_literals' => '%DEFAULT%',
                //'self_defending' => '%DEFAULT%',
				);

// POST
$result = $jscrambler->post('/code.json', $params);

// Decode
$result = json_decode($result);

print_r($result);

// Project and file details
$project_id = $result->{'id'};
$file_id = $result->{'sources'}[0]->{'id'};
$file_extension = $result->{'sources'}[0]->{'extension'};
//$file_name = $result->{'sources'}[0]->{'filename'};

// Check status (repetitive)
check_status:
	// Sleep, wait for server to finish processing
	echo 'Waiting 10 seconds for server processing ... '."\n";
	sleep(10);

	// GET
	$status = $jscrambler->get("/code/{$project_id}/{$file_id}.json");

	// Decode
	$status = json_decode($status);
    
    print_r($status);

	if($status->{'finished_at'}==null){
		echo 'Not ready ... '."\n";
		goto check_status;
	}else{
        if($status->{'error_id'}==0){
            echo 'Finished ... downloading file ...'."\n";
        }
		else {
		    echo 'Error ... aborting ...'."\n";
            echo 'Error ID: '.$status->{'error_id'}."\n";
            echo 'Error Message: '.$status->{'error_message'}."\n";
            exit();
		}
	}

// Get the js file, rename to game.min.js
$result = $jscrambler->get("/code/{$project_id}/{$file_id}.{$file_extension}");

// Write
file_put_contents($file_name,$result);

// TEST
//file_put_contents('test.js',$result);

echo "\n";

