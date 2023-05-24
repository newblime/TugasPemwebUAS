<?php

$array;

try{
  require_once('../includes/__autoload.php');
  
  $_user = user_handler::GetCurrentUser();
  $array = array(
    'login' => 1,
    'user' => array(
      'username' => $_user->GetUsername(),
      'date_created' => date("m-d-Y", $_user->GetDateCreated()->getTimestamp())
    )
  );
}
catch(Exception $e){
  $array = array(
    'login' => 0
  );
}

echo json_encode($array);