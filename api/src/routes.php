<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json"); 
//header("Access-Control-Allow-Credentials");

require_once ('configuration.php');



//use Psr\Http\Message\ServerRequestInterface;
//use Psr\Http\Message\ResponseInterface;
//use Slim\Container;
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
    
    global $pdo;
    $arr = array();
             $response = array([]);
             $query = "SELECT * FROM volunteer";
             $result = $pdo->query($query);
             $rows = array();
             while($r = $result->fetch(PDO::FETCH_ASSOC)) {
              $rows[] = $r;
     }
     print json_encode($rows);

     $result->closeCursor();
     $pdo = null;
});

$app->get('/api/volunteers/{id}', function (Request $request, Response $response, array $args) {
     //require_once ('configuration.php');
     global $pdo;
    $volunteers_id =(int)$args['id'];
    
       $arr = array();
		$response = array([]);
        $query = "SELECT * FROM volunteer WHERE id=$volunteers_id";
       // $result->bindParam(‘:id’,$volunteers_id, PDO::PARAM_INT);
		$result = $pdo->query($query);
		$rows = array();
                while($r = $result->fetch(PDO::FETCH_ASSOC)) {
                 $rows[] = $r;
        }
        print json_encode($rows);

        $result->closeCursor();
        $pdo = null;
});

$app->post('/api/login', function (Request $request, Response $response, array $args) {
        global $pdo;
        
        
        $userData = json_decode(file_get_contents('php://input'));
        $username = $userData->{"username"};
        $password = $userData->{"password"};
        

        //require_once ('configuration.php');
       //$volunteers_id =(int)$args['id'];
        // $username = $request->getParsedBody()['username'];
         //$password = $request->getParsedBody()['password'];
        // $username = (isset($_POST['username']) ? $_POST['username'] :null);
       //  $password= (isset($_POST['password']) ? $_POST['password'] :null);
         //return json_encode($username);
         
        
        
      //$parsedBody = $request->getParsedBody();
       // return $username;
       
       
          //$arr = array();
                //    $response = array([]);
                // me bind oxi $ sto query !!!!
                  $query = "SELECT * FROM volunteer WHERE username=:username AND password=:password";
                   $result = $pdo->prepare($query);
                  // $result->bindParam(‘:username’,$username, PDO::PARAM_STR);
                   //$result->bindParam(‘:password’,$password, PDO::PARAM_STR);
                   $result->execute(array(':username' => $username,':password' => $password));
                   $count = $result->rowCount();
                   $row = $result->fetch(PDO::FETCH_BOTH);
                   if($count == 1 && !empty($row)) {
                          

                        $_SESSION['username'] = $username;
                        $_SESSION['success'] = "You are now logged in";
                        $message="successfully logged in";
                        //$response->withJSon($username);
                        if ( isset( $_SESSION['username'] ) ) {
                         $data = array("username" => $username,'status' => 'success', 'message' => $message);
                         
                         $response=json_encode($data);
                        }
                         return $response;
                         //print $response;
                        // $status=$response->getStatusCode();
                        // print $status;
                    
                        // echo $message;
                        // echo "ok";
                         
                         //echo $data;
               
                        
                         }else{
                            //sinepeia sto tropo grafis, me ton idio tropo
                                $message="Wrong username & password compination";
                                $data=array('status' => 'error', 'data' => null, 'message' => 'Incorrect username or password', 401);
                                $response=json_encode($data);
                                return $response;
                      
                }

                
                 
   
                $result->closeCursor();
                $pdo = null;
   });

   $app->post('/api/logout', function (Request $request, Response $response, array $args) {
        global $pdo;
       
        unset($SESSION['username']);
        session_destroy();
        $result->closeCursor();
        $pdo = null;
   });


?>

