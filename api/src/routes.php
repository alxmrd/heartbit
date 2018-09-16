<?php
//include("configuration.php");


use Slim\Http\Request;
use Slim\Http\Response;

// Routes

$app->get('/hello/{name}', function (Request $request, Response $response, array $args) {
    $name = $args['name'];
    $response->getBody()->write("Hello, $name");
  
    return $response;
});

$app->get('/api/volunteers', function (Request $request, Response $response, array $args) {
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

$app->get('/api/volunteers/{id}', function (Request $request, Response $response, array $args) {
     require_once ('configuration.php');
    $volunteers_id =(int)$args['id'];
    
       $arr = array();
		$response = array([]);
		$query = "SELECT * FROM volunteer WHERE id=$volunteers_id";
		$result = $mysqli->query($query);
		$rows = array();
         while($r = mysqli_fetch_assoc($result)) {
                 $rows[] = $r;
        }
        print json_encode($rows);

mysqli_close($mysqli);
});

$app->post('/api/login', function (Request $request, Response $response, array $args) {
        require_once ('configuration.php');
        session_start();
       //$volunteers_id =(int)$args['id'];
       $username = mysqli_real_escape_string($mysqli,$_POST['username']);
       $password = mysqli_real_escape_string($mysqli,$_POST['password']);
       
          $arr = array();
                   $response = array([]);
                   $query = "SELECT id FROM volunteer WHERE username='$username' AND password='$password'";
                   $result = mysqli_query($mysqli,$query);
                   $row = mysqli_fetch_array($result,MYSQLI_ASSOC);
                   $active = $row['active'];

                   $count = mysqli_num_rows($result);
                   if (mysqli_num_rows($result) == 1) {

                        $_SESSION['username'] = $username;
                        $_SESSION['success'] = "You are now logged in";
                       
                }else{
                        echo "Wrong username & password compination";
                }
                   $rows = array();
            while($r = mysqli_fetch_assoc($result)) {
                    $rows[] = $r;
           }
           print json_encode($rows);
   
   mysqli_close($mysqli);
   });


?>

