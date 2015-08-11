<?php
 
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$url = $request->image;

if(empty($url)){
	die();
}

$encoded = explode('base64,', $url);
$encoded_image = $encoded[1];
$decoded_image = base64_decode($encoded_image);
$dir = 'upload/'.date('m').'/';
 
 if($dir === false AND !is_dir($dir)){
	mkdir($dir,true);
 }

$rand = rand(0,10000);
$filename = strtotime('now').$rand.'_prosvjetitelj.JPG';
$result = file_put_contents($dir.$filename,$decoded_image);
echo $dir.$filename; 

 