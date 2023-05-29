<?php

require_once('__autoload.php');

class cookie_handler{
  public static $db_table_name = "cookies";

  private static $c_expire_time = "+1 day";



  public static function AddCookieUser($cookie_id, $username, DateTime $current_time): bool{
    global $db_conn;

    $_expiredate = strtotime(cookie_handler::$c_expire_time, $current_time->getTimestamp());

    $sql_query = "INSERT INTO " . cookie_handler::$db_table_name . " (login_id, username, expire_date) VALUES ('" . $cookie_id . "', '" . $username . "', '" . date_format((new DateTime())->setTimestamp($_expiredate), "Y-m-d") . "');"; 

    try{
      $db_conn->query($sql_query);

      setcookie(user_handler::$cookie_id_name, $cookie_id, $_expiredate, "/");
      return true;
    }
    catch(Exception $e){
      echo $e;
      return false;
    }
  }

  public static function RemoveCurrentUser(): bool{
    global $db_conn;

    if(isset($_COOKIE[user_handler::$cookie_id_name])){
      $cookie = $_COOKIE[user_handler::$cookie_id_name];

      $sql_query = "SELECT count(username) FROM " . cookie_handler::$db_table_name . " WHERE login_id='" . $cookie . "';";

      $result = $db_conn->query($sql_query);
      if($result->num_rows <= 0)
        return false;

      $sql_query = "DELETE FROM " . cookie_handler::$db_table_name ." WHERE login_id='" . $cookie . "';";

      $db_conn->query($sql_query);
      setcookie(user_handler::$cookie_id_name, "", time()-1, "/");

      return true;
    }
    else
      return false;
  }

  public static function GetUser($cookie_id): User | null{
    global $db_conn;
    
    $sql_query = "SELECT username FROM " . cookie_handler::$db_table_name . " WHERE login_id='" . $cookie_id . "';";

    $result = $db_conn->query($sql_query);
    if($result->num_rows > 0){
      $row = $result->fetch_assoc();

      $username = $row["username"];
      return user_handler::GetUser($username);
    }
    else
      return null;
  }
}