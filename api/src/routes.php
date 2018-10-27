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
    global $pdo;

    $name = $args['name'];
    $response->getBody()->write("Hello, $name");
  
    return $response;
});

$app->get('/api/volunteers', function (Request $request, Response $response, array $args) {
    global $pdo;
    
    
    //require_once ('configuration.php');
    

    $arr = array();
             $response = array([]);
             $query = "SELECT * FROM volunteer";
             $result = $pdo->query($query);
             $data = array();
             while($r = $result->fetch(PDO::FETCH_ASSOC)) {
              $data[] = $r;
     }
   //  print json_encode($data);
     $response=json_encode($data);;
    return $response;

     $result->closeCursor();
     $pdo = null;
});


$app->get('/api/event', function (Request $request, Response $response, array $args) {
    global $pdo;
    
    
    //require_once ('configuration.php');
    

    $arr = array();
             $response = array([]);
             $query = "SELECT * FROM peristatiko";
             $result = $pdo->query($query);
             $data = array();
             while($r = $result->fetch(PDO::FETCH_ASSOC)) {
              $data[] = $r;
     }
   //  print json_encode($data);
     $response=json_encode($data);;
    return $response;

     $result->closeCursor();
     $pdo = null;
});

$app->get('/api/defibrillators', function (Request $request, Response $response, array $args) {
    global $pdo;
    
    
    //require_once ('configuration.php');
    

    $arr = array();
             $response = array([]);
             $query = "SELECT * FROM apinidotis";
             $result = $pdo->query($query);
             $data = array();
             while($r = $result->fetch(PDO::FETCH_ASSOC)) {
              $data[] = $r;
     }
   //  print json_encode($data);
     $response=json_encode($data);;
    return $response;

     $result->closeCursor();
     $pdo = null;
});

$app->get('/api/patients', function (Request $request, Response $response, array $args) {
    global $pdo;
    
    
    //require_once ('configuration.php');
    

    $arr = array();
             $response = array([]);
             $query = "SELECT * FROM asthenis";
             $result = $pdo->query($query);
             $data = array();
             while($r = $result->fetch(PDO::FETCH_ASSOC)) {
              $data[] = $r;
     }
   //  print json_encode($data);
     $response=json_encode($data);;
    return $response;

     $result->closeCursor();
     $pdo = null;
});

$app->get('/api/admin', function (Request $request, Response $response, array $args) {
    global $pdo;
    
    
    //require_once ('configuration.php');
    

    $arr = array();
             $response = array([]);
             $query = "SELECT * FROM ekab";
             $result = $pdo->query($query);
             $data = array();
             while($r = $result->fetch(PDO::FETCH_ASSOC)) {
              $data[] = $r;
     }
   //  print json_encode($data);
     $response=json_encode($data);;
    return $response;

     $result->closeCursor();
     $pdo = null;
});


$app->get('/api/volunteers/{id}', function (Request $request, Response $response, array $args) {
    global $pdo;

     //require_once ('configuration.php');
    
    $volunteers_id =(int)$args['id'];
    
       $arr = array();
		$response = array([]);
        $query = "SELECT * FROM volunteer WHERE id=$volunteers_id";
       // $result->bindParam(‘:id’,$volunteers_id, PDO::PARAM_INT);
		$result = $pdo->query($query);
		$data = array();
                while($r = $result->fetch(PDO::FETCH_ASSOC)) {
                 $data[] = $r;
        }
        $response=json_encode($data);
        return $response;

        $result->closeCursor();
        $pdo = null;
});

$app->post('/api/login', function (Request $request, Response $response, array $args) {
    global $pdo;

      
   
        
        $userData = json_decode(file_get_contents('php://input'));
         $username = $userData->{'username'};
         $password = $userData->{'password'};
       
                  $query = "SELECT * FROM volunteer WHERE username=:username AND password=:password";
                   $result = $pdo->prepare($query);
                          $result->execute(array(':username' => $username,':password' => $password));
                   $count = $result->rowCount();
                   $row = $result->fetch(PDO::FETCH_BOTH);
                   if($count == 1 && !empty($row)) {
                          

                        $_SESSION['username'] = $username;
                        $_SESSION['success'] = "You are now logged in";
                        $message="successfully logged in";
                        
                        if ( isset( $_SESSION['username'] ) ) {
                         $data = array("username" => $username,'status' => 'success', 'message' => $message);
                         
                         $response=json_encode($data);
                        }
                         return $response;
                     
                           }else{
                       
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
   $app->post('/api/insert', function (Request $request, Response $response, array $args) {
    global $pdo;

      
   
        
        $userData = json_decode(file_get_contents('php://input'));
        $username = $userData->{'username'};
        $tel1=$userData->{'tel1'};
        $tel2=$userData->{'tel2'};
         $email = $userData->{'email'};
         $dateofbirth=  $userData->{'dateofbirth'};
         $latesttraining=  $userData->{'latesttraining'};
        $query = "INSERT INTO volunteer (username,tel1,tel2,email,dateofbirth,latesttraining) VALUES (:username,:tel1,:tel2,:email,:dateofbirth,:latesttraining)";
        $result = $pdo->prepare($query);
       
        $result->execute(array(':username' => $username,':tel1' => $tel1,':tel2'=>$tel2,':email'=>$email,':dateofbirth'=>$dateofbirth,':latesttraining'=>$latesttraining));
        
       
       
        $response=json_encode($data);
        return $response;
        
                $result->closeCursor();
                $pdo = null;
   });


   $app->post('/api/delete', function (Request $request, Response $response, array $args) {
    global $pdo;
         
            $query=("DELETE FROM volunteer WHERE username = :username");
            $result = $pdo->prepare($query);
            $username = $_POST['username'];
            $result->execute(array(':username' => $username));
    
            echo "Deleted.";
         
 
        
                $result->closeCursor();
                $pdo = null;
   });


?>

