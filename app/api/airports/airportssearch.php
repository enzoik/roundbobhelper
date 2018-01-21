<?php
	$url = "https://dp.search.windows.net/indexes/airports/docs/suggest?suggesterName=airports&api-key=839974D9C1595B5AB28897F8176272D4&api-version=2016-09-01&search=ebb";
	//  Initiate curl
	$ch = curl_init();
	// Disable SSL verification
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	// Will return the response, if false it print the response
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	// Set the url
	curl_setopt($ch, CURLOPT_URL,$url);
	// Execute
	$result=curl_exec($ch);
	// Closing
	curl_close($ch);

	// Will dump a beauty json :3
	//var_dump(json_decode($result, true));
		$response_array=json_decode($result, true);
		//header("Content-Type: text/javascript");
			if (isset($_REQUEST["callback"])) {
				header("Content-Type: text/javascript");
				echo $_REQUEST["callback"]. "(" .json_encode($response_array). ");";
			}
			else {
				header("Content-Type: application/x-json");
				echo json_encode($response_array);
			}
			
?>