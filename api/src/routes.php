<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json"); 
//header("Access-Control-Allow-Credentials");

require_once ('configuration.php');

session_start();


use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;
use Slim\Http\Request;
use Slim\Http\Response;

// Routes

$app->get('/hello/{name}', function (Request $request, Response $response, array $args) {
    $name = $args['name'];
    $response->getBody()->write("Hello, $name");
  
    return $response;
});

$app->get('/api/volunteers', function (Request $request, Response $response, array $args) {
    //require_once ('configuration.php');
       global $mysqli;
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
     //require_once ('configuration.php');
     global $mysqli;
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

$app->post('/api/login', function (Request $request, Response $response) {
        global $mysqli;
        //require_once ('configuration.php');
       //$volunteers_id =(int)$args['id'];
         $username = $request->getParsedBody()['username'];
         $password = $request->getParsedBody()['password'];
        
       $parsedBody = $request->getParsedBody();
        return $parsedBody;
       
       
          //$arr = array();
                //    $response = array([]);
                
                   $query = "SELECT * FROM volunteer WHERE username='$username' AND password='$password'";
                   $result = mysqli_query($mysqli,$query);
                   $row = mysqli_fetch_array($result,MYSQLI_ASSOC);
                   $active = $row['active'];
                   //echo $result;
                   

                   $count = mysqli_num_rows($result);
                   if (mysqli_num_rows($result) == 1) {
                          

                        $_SESSION['username'] = $username;
                        $_SESSION['success'] = "You are now logged in";
                        $message="successfully logged in";
                        //$response->withJSon($username);
                         
                         $data = array("username" => $username,'status' => 'success', 'message' => $message);
                         
                         $response=json_encode($data);
                         
                         return $response;
                         //print $response;
                        // $status=$response->getStatusCode();
                        // print $status;
                    
                        // echo $message;
                        // echo "ok";
                         
                         //echo $data;
               
                        
                         }else{
                               // $message="Wrong username & password compination";
                                $data=array('status' => 'error', 'data' => null, 'message' => 'Incorrect username or password', 401);
                                $response=json_encode($data);
                                return $response;
                      
                }

                
                 
   
   mysqli_close($mysqli);
   });

   $app->post('/api/logout', function (Request $request, Response $response, array $args) {
        require_once ('configuration.php');
       
        unset($SESSION['username']);
        session_destroy;
        mysqli_close($mysqli);
   });


?>

