<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Routes

$app->get('/hello/{name}', function (Request $request, Response $response, array $args) {
    $name = $args['name'];
    $response->getBody()->write("Hello, $name");
  
    return $response;
});

$app->get('/volunteers', function (Request $request, Response $response, array $args) {
    require_once ('configuration.php');
    
       $arr = array();
		$response = array([]);
		$query = "SELECT * FROM volunteer";
		$result = $mysqli->query($query);
		$rows = array();
         while($r = mysqli_fetch_assoc($result)) {
                 $rows[] = $r;
        }
        print json_encode($rows);

mysqli_close($mysqli);
});
?>

