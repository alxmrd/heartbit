<?php
session_start();

require_once 'configuration.php';

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
  
  
    $query = "SELECT * FROM volunteer";
    $result = $pdo->query($query);
    $data = array();
    while ($r = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $r;
    }
    // $object = (object) $data;
    //  print json_encode($data);

    $response = new stdClass();
    $response->data = $data;
    return json_encode($response, JSON_NUMERIC_CHECK);
});

$app->get('/api/event', function (Request $request, Response $response, array $args) {
    global $pdo;

    //require_once ('configuration.php');

    $arr = array();
    $response = array([]);
    $query = "SELECT * FROM peristatiko";
    $result = $pdo->query($query);
    $data = array();
    while ($r = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $r;
    }
    //  print json_encode($data);
    $response = json_encode($data);;
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
    while ($r = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $r;
    }
    //  print json_encode($data);
    $response = json_encode($data);;
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
    while ($r = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $r;
    }
    //  print json_encode($data);
    $response = json_encode($data);;
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
    while ($r = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $r;
    }
    //  print json_encode($data);
    $response = json_encode($data);;
    return $response;

    $result->closeCursor();
    $pdo = null;
});

$app->post('/api/login', function (Request $request, Response $response, array $args) {
    global $pdo;

    $userData = json_decode(file_get_contents('php://input'));
    $username = $userData->{'username'};
    $password = $userData->{'password'};
    $status=0;

    $query = "SELECT * FROM volunteer WHERE username=:username AND password=:password AND status=:status";
    $result = $pdo->prepare($query);
    $result->execute(array(':username' => $username, ':password' => $password, ':status' => $status));
    $count = $result->rowCount();
    $row = $result->fetch(PDO::FETCH_BOTH);

    if ($count == 1 && !empty($row)) {

        $_SESSION['username'] = $username;
        $_SESSION['success'] = "You are now logged in";
        $message = "successfully logged in";

        if (isset($_SESSION['username'])) {
            $data = array("username" => $username, 'status' => 'success', 'message' => $message);

            $response = json_encode($data);
        }
        return $response;

    } else {

        $message = "Wrong username & password compination or user deactivated";
        $data = array('status' => 'error', 'data' => null, 'message' => $message, 401);
        $response = json_encode($data);
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



$app->get('/api/volunteers/{id}', function (Request $request, Response $response, array $args) {
    global $pdo;

    $volunteers_id = (int) $args['id'];
    $query = "SELECT * FROM volunteer WHERE id=:id";
    $result = $pdo->prepare($query);
    $result->execute(array("id" => $volunteers_id));
    while ($r = $result->fetch(PDO::FETCH_ASSOC)) {
        $data = $r;

    }
    $response = json_encode($data,JSON_NUMERIC_CHECK);
    return $response;

    $result->closeCursor();
    $pdo = null;
});

$app->post('/api/editvolunteer/{id}', function (Request $request, Response $response, array $args) {
    global $pdo;
    $userData = json_decode(file_get_contents('php://input'));
    $volunteers_id =  $args['id'];
    $username = $userData->{'username'};
    $tel1 = $userData->{'tel1'};
    $tel2 = $userData->{'tel2'};
    $email = $userData->{'email'};
    $dateofbirth = $userData->{'dateofbirth'};
    $latesttraining = $userData->{'latesttraining'};

    $query = "UPDATE volunteer SET username=:username, tel1=:tel1, tel2=:tel2, email=:email, dateofbirth=:dateofbirth, latesttraining=:latesttraining  WHERE id=:id";
    $result = $pdo->prepare($query);
    $result->execute(array(':username' => $username, ':tel1'=>$tel1, ':tel2'=>$tel, ':email' => $email, ':dateofbirth'=>$dateofbirth, ':latesttraining'=>$latesttraining, ':id' => $volunteers_id));


    $myObj = new stdClass();
    $myObj->id=$volunteers_id;
    $myObj->username = $username;
    $myObj->email = $email;
    $myObj->tel1 = $tel1;
    $myObj->tel2 = $tel2;
    $myObj->dateofbirth = $dateofbirth;
    $myObj->latesttraining = $latesttraining;


    $response = json_encode($myObj,JSON_NUMERIC_CHECK);

    return $response;
});

  

$app->post('/api/deactivate/{id}', function (Request $request, Response $response, array $args) {
    global $pdo;
    $userData = json_decode(file_get_contents('php://input'));
    $volunteers_id =  $args['id'];
    $status = $userData->{'status'};
 
  if ($status == 0) {
      $response_status = 1;
    
  } else {
      $response_status = 0 ;
  }


 
    $query = ("UPDATE volunteer SET status=:status WHERE id=:id");
    $result = $pdo->prepare($query);

    $result->execute(array(':status' => $response_status, ':id' => $volunteers_id));

    

    $myObj = new stdClass();
    $myObj->id=$volunteers_id;
    $myObj->status = $response_status;

   
    $response = json_encode($myObj,JSON_NUMERIC_CHECK);

    return $response;
});

$app->post('/api/insertvolunteer', function (Request $request, Response $response, array $args) {
    global $pdo;

    $userData = json_decode(file_get_contents('php://input'));

    $username = $userData->{'username'};
    $tel1 = $userData->{'tel1'};
    $tel2 = $userData->{'tel2'};
    $email = $userData->{'email'};
    $dateofbirth = $userData->{'dateofbirth'};
    $latesttraining = $userData->{'latesttraining'};

    $query = "INSERT INTO volunteer (username,tel1,tel2,email,dateofbirth,latesttraining) VALUES (:username,:tel1,:tel2,:email,:dateofbirth,:latesttraining)";
    $result = $pdo->prepare($query);

    $result->execute(array(':username' => $username, ':tel1' => $tel1, ':tel2' => $tel2, ':email' => $email, ':dateofbirth' => $dateofbirth, ':latesttraining' => $latesttraining));
    $lastId = $pdo->lastInsertId();
    //  $response=json_encode($lastId);
    $myObj = new stdClass();
    $myObj->id = $lastId;
    $myObj->username = $username;
    $myObj->email = $email;
    $myObj->tel1 = $tel1;
    $myObj->tel2 = $tel2;
    $myObj->dateofbirth = $dateofbirth;
    $myObj->latesttraining = $latesttraining;

    $response = json_encode($myObj,JSON_NUMERIC_CHECK);

    return $response;
});
$app->post('/api/insertevent', function (Request $request, Response $response, array $args) {
    global $pdo;
    $userData = json_decode(file_get_contents('php://input'));
   
    $longitude = $userData->{'longitude'};
    $latitude = $userData->{'latitude'};
    $address = $userData->{'address'};
 



 
    $query = "INSERT INTO peristatiko (longitude, latitude, address ) VALUES (:longitude,:latitude,:address)";
    $result = $pdo->prepare($query);

    $result->execute(array(':longitude' => $longitude, ':latitude' => $latitude, ':address' => $address));
    $lastId = $pdo->lastInsertId();

    

    $myObj = new stdClass();
    $myObj->id=$lastId;
    $myObj->longitude = $longitude;
    $myObj->latitude = $latitude;
    $myObj->address = $address;

   
    $response = json_encode($myObj,JSON_NUMERIC_CHECK);

    return $response;
});

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});