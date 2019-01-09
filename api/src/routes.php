<?php

if (!isset($_SESSION)) {
    session_start();
}

require_once 'configuration.php';
// require_once 'middleware.php';

//use Psr\Http\Message\ServerRequestInterface;
//use Psr\Http\Message\ResponseInterface;
//use Slim\Container;
use Slim\Http\Request;
use Slim\Http\Response;
use \Firebase\JWT\JWT;

use Respect\Validation\Validator as v;
// Routes
// $app->get('/', function (Request $request, Response $response, array $args) {
//     $response = "It works!";
//     return $response;
// });

$app->get('/hello/{name}', function (Request $request, Response $response, array $args) {
    global $pdo;

    $name = $args['name'];
    $nameValidator = v::alnum()->noWhitespace()->length(1, 15);
    if ($nameValidator->validate($name)){
    $response->getBody()->write("Hello, $name");

    return $response;
    } else {
        $response->getBody()->write("error");

    }
});

$app->post('/api/login', function (Request $request, Response $response, array $args) {
    global $pdo;

    $userData = json_decode(file_get_contents('php://input'));
    $username = $userData->{'username'};
    $password = $userData->{'password'};
    // $status = 0;

    $query = "SELECT * FROM ekab WHERE username=:username";
    $result = $pdo->prepare($query);
    $result->execute(array(':username' => $username));
    $count = $result->rowCount();
    $user = $result->fetch(PDO::FETCH_BOTH);

    if ($count == 1 && !empty($user)) {

        if ($password == $user[password]) {
            $_SESSION['username'] = $username;
                $_SESSION['success'] = "You are now logged in";
                $message = "successfully logged in";
            if (isset($_SESSION['username'])) {
                        $settings = $this->get('settings');
                        $token = JWT::encode(['id' => $user->id, 'username' => $user->username], $settings['jwt']['secret'], "HS256");
                        $data = array("username" => $username, 'status' => 'success', 'message' => $message, 'token' => $token);
    
                        $response = json_encode($data);
                    }
                    return $response;

           
        } else {
            $message = "Kάτι πήγε στραβα. Προσπαθήστε ξανά!";
            $data = array('status' => 'error', 'data' => null, 'message' => $message, 401);
            $response = json_encode($data);
            return $response;
        }
    } else {

        $message = "Kάτι πήγε στραβα. Προσπαθήστε ξανά!";
        $data = array('status' => 'error', 'data' => null, 'message' => $message, 401);
        $response = json_encode($data);
        return $response;

    }

    $result->closeCursor();
    $pdo = null;
});

// $app->post('/api/login', function (Request $request, Response $response, array $args) {

//     $input = $request->getParsedBody();
//     $sql = "SELECT * FROM volunteer WHERE username= :username";
//     $sth = $this->db->prepare($sql);
//     $sth->bindParam("username", $input['username']);
//     $sth->execute();
//     $user = $sth->fetchObject();

//     // verify username
//     if(!$volunteer) {
//         return $this->response->withJson(['error' => true, 'message' => 'These credentials do not match our records.']);
//     }

//     // verify password.
//     if (!password_verify($input['password'],$volunteer->password)) {
//         return $this->response->withJson(['error' => true, 'message' => 'These credentials do not match our records.']);
//     }

//     $settings = $this->get('settings'); // get settings array.

//     $token = JWT::encode(['id' => $volunteer->id, 'username' => $volunteer->username], $settings['jwt']['secret'], "HS256");

//     return $this->response->withJson(['token' => $token]);

// });

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

    $query = "SELECT * FROM peristatiko";
    $result = $pdo->query($query);
    $data = array();
    while ($r = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $r;
    }
    //  print json_encode($data);
    $response = new stdClass();
    $response->data = $data;
    return json_encode($response, JSON_NUMERIC_CHECK);

});

$app->get('/api/defibrillators', function (Request $request, Response $response, array $args) {
    global $pdo;

    //require_once ('configuration.php');

    $query = "SELECT * FROM apinidotis";
    $result = $pdo->query($query);
    $data = array();
    while ($r = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $r;
    }

    $response = new stdClass();
    $response->data = $data;
    return json_encode($response, JSON_NUMERIC_CHECK);
});

$app->get('/api/patients', function (Request $request, Response $response, array $args) {
    global $pdo;

    //require_once ('configuration.php');

    $query = "SELECT * FROM asthenis";
    $result = $pdo->query($query);
    $data = array();
    while ($r = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $r;
    }
    $response = new stdClass();
    $response->data = $data;
    return json_encode($response, JSON_NUMERIC_CHECK);

});

$app->get('/api/admin', function (Request $request, Response $response, array $args) {
    global $pdo;

    //require_once ('configuration.php');

    $query = "SELECT * FROM ekab";
    $result = $pdo->query($query);
    $data = array();
    while ($r = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $r;
    }
    $response = new stdClass();
    $response->data = $data;
    return json_encode($response, JSON_NUMERIC_CHECK);
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
    $response = json_encode($data, JSON_NUMERIC_CHECK);
    return $response;

    $result->closeCursor();
    $pdo = null;
});

$app->post('/api/editvolunteer/{id}', function (Request $request, Response $response, array $args) {
    global $pdo;
    $userData = json_decode(file_get_contents('php://input'));
    $volunteers_id = $args['id'];
    $username = $userData->{'username'};
    $name = $userData->{'name'};
    $surname = $userData->{'surname'};
    $password = $userData->{'password'};
    
    $tel1 = $userData->{'tel1'};
    $tel2 = $userData->{'tel2'};
    $email = $userData->{'email'};
    $dateofbirth = $userData->{'dateofbirth'};
    $latesttraining = $userData->{'latesttraining'};
    $address = $userData->{'address'};

    $query = "UPDATE volunteer SET username=:username, name=:name,  surname=:surname, password=:password, tel1=:tel1, tel2=:tel2, email=:email, dateofbirth=:dateofbirth, latesttraining=:latesttraining, address=:address  WHERE id=:id";
    $result = $pdo->prepare($query);
    $result->execute(array(':username' => $username, ':name'=>$name, ':surname'=>$surname, ':password'=>$password, ':tel1' => $tel1, ':tel2' => $tel, ':email' => $email, ':dateofbirth' => $dateofbirth, ':latesttraining' => $latesttraining, ':address' => $address, ':id' => $volunteers_id));

    $myObj = new stdClass();
    $myObj->id = $volunteers_id;
    $myObj->username = $username;
    $myObj->name = $name;
    $myObj->surname = $surname;
    $myObj->password = $password;
    $myObj->email = $email;
    $myObj->tel1 = $tel1;
    $myObj->tel2 = $tel2;
    $myObj->dateofbirth = $dateofbirth;
    $myObj->latesttraining = $latesttraining;
    $myObj->address = $address;

    $response = json_encode($myObj, JSON_NUMERIC_CHECK);

    return $response;
});

$app->post('/api/deactivate/{id}', function (Request $request, Response $response, array $args) {
    global $pdo;
    $userData = json_decode(file_get_contents('php://input'));
    $volunteers_id = $args['id'];
    $status = $userData->{'status'};

    if ($status == 0) {
        $response_status = 1;

    } else {
        $response_status = 0;
    }

    $query = ("UPDATE volunteer SET status=:status WHERE id=:id");
    $result = $pdo->prepare($query);

    $result->execute(array(':status' => $response_status, ':id' => $volunteers_id));

    $myObj = new stdClass();
    $myObj->id = $volunteers_id;
    $myObj->status = $response_status;

    $response = json_encode($myObj, JSON_NUMERIC_CHECK);

    return $response;
});

$app->post('/api/insertvolunteer', function (Request $request, Response $response, array $args) {
    global $pdo;

    $userData = json_decode(file_get_contents('php://input'));

    $username = $userData->{'username'};
    $name = $userData->{'name'};
    $surname = $userData->{'surname'};
    $password = $userData->{'password'};
     $tel1 = $userData->{'tel1'};
    $tel2 = $userData->{'tel2'};
    $email = $userData->{'email'};
    $dateofbirth = $userData->{'dateofbirth'};
    $latesttraining = $userData->{'latesttraining'};
    $address = $userData->{'address'};

    $query = "SELECT * FROM volunteer WHERE username=:username";
    $result = $pdo->prepare($query);
    $result->execute(array(':username' => $username));
    $count = $result->rowCount();
    $user = $result->fetch(PDO::FETCH_BOTH);

    if ($count == 1 && !empty($user)) {
        $message = "Υπάρχει ήδη εθελοντής με αυτο το Όνομα Χρήστη";
        $data = array('status' => 'error', 'data' => null, 'message' => $message, 409);
        $response = json_encode($data)->withStatus(409);
        return $response;
    } else {
        $query = "SELECT * FROM volunteer WHERE email=:email";
        $result = $pdo->prepare($query);
        $result->execute(array(':email' => $email));
        $count = $result->rowCount();
        $user = $result->fetch(PDO::FETCH_BOTH);
        if ($count == 1 && !empty($user)) {
            $message = "Υπάρχει ήδη εθελοντής με αυτο το E-mail";
            $data = array('status' => 'error', 'data' => null, 'message' => $message, 409);
            $response = json_encode($data)->withStatus(409);;
            return $response;
        } else {
            $query = "INSERT INTO volunteer (username,name,surname,password,tel1,tel2,email,dateofbirth,latesttraining,address) VALUES (:username,:name,:surname,:password,:tel1,:tel2,:email,:dateofbirth,:latesttraining,:address)";
            $result = $pdo->prepare($query);
        
            $result->execute(array(':username' => $username, ':name'=>$name, ':surname'=>$surname, ':password'=>$password, ':tel1' => $tel1, ':tel2' => $tel, ':email' => $email, ':dateofbirth' => $dateofbirth, ':latesttraining' => $latesttraining, ':address' => $address));
            $lastId = $pdo->lastInsertId();
            //  $response=json_encode($lastId);
            $myObj = new stdClass();
            $myObj->id = $lastId;
            $myObj->username = $username;
            $myObj->name = $name;
            $myObj->surname = $surname;
            $myObj->password = $password;
            $myObj->email = $email;
            $myObj->tel1 = $tel1;
            $myObj->tel2 = $tel2;
            $myObj->dateofbirth = $dateofbirth;
            $myObj->latesttraining = $latesttraining;
            $myObj->address = $address;
        
            $response = json_encode($myObj, JSON_NUMERIC_CHECK);
        
            return $response;
    
        }
    } 

   
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
    $myObj->id = $lastId;
    $myObj->longitude = $longitude;
    $myObj->latitude = $latitude;
    $myObj->address = $address;

    $response = json_encode($myObj, JSON_NUMERIC_CHECK);

    return $response;
});

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
        ->withHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

// $app->get('/auth', function ($request, $response, $args) {

//     $response->getBody()->write(getenv("SECRET_KEY"));

//     return $response;
// })->add($Test);
