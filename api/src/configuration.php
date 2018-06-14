<?php
/*********DB Settings**************/

$user = 'root';
$password = 'root';
$db = 'DiplomaThesis';
$host = '127.0.0.1';
$port = 3306;

$mysqli = new mysqli($host,  $user, $password, $db, $port);
$mysqli->set_charset("utf8");
if (!$mysqli) {
    echo "Error: Unable to connect to MySQL." . PHP_EOL;
    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}


/*********DB Settings**************/