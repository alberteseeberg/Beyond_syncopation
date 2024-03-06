<?php
// take in the uploaded data
$json = file_get_contents('php://input');
// treat it as json
$obj = json_decode($json, true);
// open "filename" in the data folder
$outfile = fopen('/var/www/server_data/'.date("d-m-y")."_".basename($obj["filename"]), 'a');
// write the "filedata" to that file
fwrite($outfile, $obj["filedata"]);
fclose($outfile);
?>
