<?php
/*********DB Settings**************/

$user = 'root';
$password = 'root';
$db = 'DiplomaThesis';
$host = '127.0.0.1';
$port = 3306;
$options = array(PDO::MYSQL_ATTR_INIT_COMMAND=> 'SET NAMES utf8');

 

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $password);
   
    // set the PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully"; 
    }
catch(PDOException $e)
    {
    echo "Connection failed: " . $e->getMessage();
    }


// $mysqli = new mysqli($host,  $user, $password, $db, $port);
// $mysqli->set_charset("utf8");
// if (!$mysqli) {
//     echo "Error: Unable to connect to MySQL." . PHP_EOL;
//     echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
//     echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
//     exit;
// }


/*********DB Settings**************/

?>