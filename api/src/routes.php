<?php

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

$app->post('/login', function (Request $request, Response $response, array $args) {
        require_once ('configuration.php');
       $volunteers_id =(int)$args['id'];
       $username = mysql_real_escape_string($_POST['username']);
       $password = mysql_real_escape_string($_POST['password']);
       
          $arr = array();
                   $response = array([]);
                   $query = "SELECT * FROM volunteer WHERE username='$username' AND password='password' ";
                   $result = $mysqli->query($query);
                   if (mysqpli_num_rows($reslut) == 1) {

                        $_SESSION['username'] = $username;
                        $_SESSION['success'] = "You are now logged in";
                        header('logation: routes.php');
                }else{
                        array_push($errors, "wrong username/password combination  ");
                        header('location: login.php');
                }
                   $rows = array();
            while($r = mysqli_fetch_assoc($result)) {
                    $rows[] = $r;
           }
           print json_encode($rows);
   
   mysqli_close($mysqli);
   });


?>

