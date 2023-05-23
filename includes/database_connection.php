<?php

require_once('database_auth.php');


class database_connection_handler{
  private static $address = "localhost";
  private mysqli $_db;

  function __construct(){
    global $db_user, $db_password, $db_name;

    $this->_db = new mysqli(database_connection_handler::$address, $db_user, $db_password, $db_name);

    if($this->_db->connect_error)
      throw new Exception("Cannot connect to database.");
  }

  function __destruct(){
    $this->_db->close();
  }

  public function GetDatabase(): mysqli{
    return $this->_db;
  }
}


$db_handler = new database_connection_handler();
$db_conn = $db_handler->GetDatabase();