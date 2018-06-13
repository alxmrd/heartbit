<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Routes

$app->get('/hello/{name}', function (Request $request, Response $response, array $args) {
    $name = $args['name'];
    $response->getBody()->write("Hello, $name");
  
    return $response;
});

$app->get('/mysql', function (Request $request, Response $response, array $args) {
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

        $arr = array();
		$response = array([]);
		$query = "SELECT * FROM volunteer";
		$result = $mysqli->query($query);
		while($row = $result->fetch_assoc()) {
	        $arr = $row;
        }
        $response['data'] = $arr;
		return  json_encode($response);

mysqli_close($mysqli);
});
?>
