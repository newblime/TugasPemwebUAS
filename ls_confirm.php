<?php

require_once('includes/__autoload.php');

if(isset($_POST["username"]) && isset($_POST["password"])){
  $username = $_POST["username"];
  $password = $_POST["password"];

  user_handler::Login($username, $password);
  if($cookie == ""){
    user_handler::Signup($username, $password);
    user_handler::Login($username, $password);
  }

  redirectTo("main.php");
}