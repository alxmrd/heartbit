<?php

use Respect\Validation\Validator as v;

$usernameValidator = v::alnum()->noWhitespace()->length(1, 32)->notBlank();//Validates alphanumeric characters from a-Z and 0-9 and without whitespace ,required
$nameValidator = v::stringType()->alnum()->noWhitespace()->length(1, 32)->notBlank();//Validates string characters from a-Z and 0-9 and without whitespace ,required
$surnameValidator = v::stringType()->alnum()->noWhitespace()->length(1, 32)->notBlank(); //Validates string characters from a-Z and 0-9 and without whitespace, required
$dateValidator = v::date('Y-m-d')->between('1950-01-01', '2000-01-01')->notBlank(); //Date bust be between 1/1/1950 to 1/1/2000,required
$trainingDateValidator = v::date('Y-m-d')->between('2010-01-01', 'now'); //Training Date bust be between 1/1/2010 to now
$emailValidator = v::email()->notBlank(); //Validates email format,required
$mobileNumberValidator = v::intType()->positive()->notBlank()->length(10,10);//Validates mobile number format ,required
$mobile2NumberValidator = v::intType()->positive()->length(10,10);//Validates mobile number format
$addressValidator=v::alnum();//Validates alphanumeric characters from a-Z and 0-9
$locationValidator = v::stringType()->alnum()->notBlank();// validates location to be string and not blank,required
$passwordValidator = v::stringType()->alnum()->notBlank()->length(10,10); 

