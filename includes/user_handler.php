<?php

require_once('database_connection.php');
require_once('password.php');


enum LoginStatus{
  case wrong_password;
  case success;
  case username_notfound;
  case username_already_exist;
}


class user_handler{
  public static $db_table_name = "pengguna";
  public static $cookie_id_name = "cookieID";


  public static function GetCurrentUser(): User{
    if(isset($_COOKIE[user_handler::$cookie_id_name]))
      return cookie_handler::GetUser($_COOKIE[user_handler::$cookie_id_name]);
    else
      throw new Exception("Not logged in.");
  }

  
  public static function Login($username, $password): LoginStatus{
    global $stringHasher;
    global $db_conn;

    $sql_query = "SELECT username, password FROM `" . user_handler::$db_table_name . "` WHERE username='" . $username ."';";

    $result = $db_conn->query($sql_query);
    if($result->num_rows > 0){
      $row = $result->fetch_assoc();

      $hashedpassword = $row["password"];
      if($stringHasher->verify($hashedpassword, $password)){
        $cookie_id = $stringHasher->hash(date("Y-m-d H:i:s") . $username);

        if(!cookie_handler::AddCookieUser($cookie_id, $username, new DateTime()))
          throw new Exception("Cannot add cookie");

        return LoginStatus::success;
      }
      else{
        return LoginStatus::wrong_password;
      }
    }
    else{
      return LoginStatus::username_notfound;
    }
  }

  public static function Logout(): bool{
    return cookie_handler::RemoveCurrentUser();
  }

  public static function Signup($username, $password): LoginStatus{
    global $stringHasher;
    global $db_conn;

    $sql_query = "SELECT username FROM " . user_handler::$db_table_name . " WHERE username='" . $username . "';";

    $result = $db_conn->query($sql_query);
    if($result->num_rows > 0)
      return LoginStatus::username_already_exist;

    $sql_query = "INSERT INTO " . user_handler::$db_table_name . " (username, password, date_created) VALUES (\"" . $username . "\", \"" . $stringHasher->hash($password) . "\", '" . date("Y-m-d") . "')";

    $db_conn->query($sql_query);

    return LoginStatus::success;
  }
}