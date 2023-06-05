<?php

$array;

try{
  require_once($_SERVER['DOCUMENT_ROOT'] . "/includes/__autoload.php");
  
  if(user_handler::Logout())
    $array = array("success" => 1);
  else
    $array = array("success" => 0, "code" => 0);

  redirectTo("home.html");
}
catch(Exception $e){
  $array = array("success" => 0, "code" => 1);
}

echo json_encode($array);