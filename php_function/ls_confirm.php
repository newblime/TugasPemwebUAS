<?php

$_success = 0;
$_status = 0;

try{
  require_once($_SERVER['DOCUMENT_ROOT'] . '/includes/__autoload.php');

  if($_POST["username"] == ""){
    $_success = 0;
    $_status = 0;
  }
  else if($_POST["password"] == ""){
    $_success = 0;
    $_status = 1;
  }
  else{
    $username = $_POST["username"];
    $password = $_POST["password"];
  
  
    $enum = user_handler::Login($username, $password);
    switch($enum){
      case LoginStatus::success:{
        $_success = 1;
        $_status = 0;

        break;
      }

      case LoginStatus::wrong_password:{
        $_success = 0;
        $_status = 2;
        
        break;
      }

      case LoginStatus::username_notfound:{
        user_handler::Signup($username, $password);
        user_handler::Login($username, $password);

        $_success = 1;
        $_status = 1;

        break;
      }

      case LoginStatus::username_has_special_characters:{
        $_success = 0;
        $_status = 3;

        break;
      }
    }
  }
}
catch(Exception $e){
  $_success = 0;
  $_status = 4;
}

echo json_encode(array('success' => $_success, 'status' => $_status));