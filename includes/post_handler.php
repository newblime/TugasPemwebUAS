<?php


enum PostStatus{
  case success;
  case not_logged_in;
  case not_supported_type;
  case location_name_too_long;
  case no_location;
  case no_desc_or_image;
  case internal_error;
}



class post_handler{
  private static $image_destination = '../uploads/image';
  private static $text_destination = '../uploads/text';

  private static $location_len = 64;
  private static $max_get = 25;
  private static $min_get = 10;


  public static $db_table_name = "posts";
  public static $db_table_name_info = "post_data";

  

  private static function _parseResult(mysqli_result | bool $result): array{
    if(gettype($result) == "boolean")
      return array();

    $arrres = array();
    for($i = 0; $i < $result->num_rows; $i++){
      $row = $result->fetch_assoc();

      if(gettype($row) == "array"){
        $date = new DateTime($row['date_posted']);
        $row['date_posted'] = $date->format("d F o H:i:s") . " UTC";

        $row['message_filename'] = post_handler::$text_destination . "/" . $row['message_filename'];

        if($row['image_filename'] != "")
          $row['image_filename'] = post_handler::$image_destination . "/" . $row['image_filename'];
        
        $_file = fopen($row['message_filename'], "r");
        $row["message"] = rawurlencode(fread($_file, 1024));
        fclose($_file);

        unset($row["message_filename"]);
        array_push($arrres, $row);
      }
    }

    return $arrres;
  }


  public static function AddPosts(string $location_name, string $post_msg, string $filedata_name): PostStatus{
    $_login = user_handler::GetCurrentUser();
    if(is_a($_login, "LoginStatus"))
      return PostStatus::not_logged_in;


    if($location_name == "")
      return PostStatus::no_location;
    else if(strlen($location_name) > post_handler::$location_len)
      return PostStatus::location_name_too_long;

    if(!isset($_FILES[$filedata_name]) && $post_msg == "")
      return PostStatus::no_desc_or_image;

    $filedata = array('error' => 4);
    if(isset($_FILES[$filedata_name]))
      $filedata = $_FILES[$filedata_name];


    global $stringHasher;
    global $db_conn;

    $location_name = rawurlencode($location_name);

    $username = $_login->GetUsername();
    
    $_filename = $username . date('Y-m-d_H-i-s');

    $_txt_filename = $_filename . ".txt";
    $_txt_dest = post_handler::$text_destination . "/" . $_txt_filename;

    $_img_filename = "";

    if($filedata['error'] == 0){
      if(is_uploaded_file($filedata['tmp_name'])){
        $mime_type = $filedata['type'];
        
        $allowed_type = array('image/png', 'image/jpeg', 'image/webp');
        if(in_array($mime_type, $allowed_type)){
          $_img_filename = $_filename . "." . substr($mime_type, strrpos($mime_type, "/")+1);
  
          $_img_dest = post_handler::$image_destination . "/" . $_img_filename;move_uploaded_file($filedata['tmp_name'], $_img_dest);
        }
        else
          return PostStatus::not_supported_type;
      }
      else
        return PostStatus::internal_error;
    }
    else{
      switch($filedata['error']){
        // nggak ada upload
        case 4:
          break;

        default:
          return PostStatus::internal_error;
      }
    }

    $_f = fopen($_txt_dest, "w");
    fwrite($_f, $post_msg);
    fclose($_f);

    $post_id = $stringHasher->hash($_filename);
    $sql_query = "INSERT INTO " . post_handler::$db_table_name . " (post_id, username, date_posted, message_filename, image_filename, location_name) VALUES ('" . $post_id . "', '" . $username . "', '" . date("Y-m-d H:i:s") . "', '" . $_txt_filename . "', '" . $_img_filename . "', '" . $location_name . "');";

    $db_conn->query($sql_query);

    return PostStatus::success;
  }


  public static function GetPosts(int $max_value, int $offset): array{
    global $db_conn;

    if($offset < 0)
      $offset = 0;

    if($max_value > post_handler::$max_get)
      $max_value = post_handler::$max_get;
    else if($max_value < post_handler::$min_get)
      $max_value = post_handler::$min_get;

    $sql_query = "SELECT post_id, username, date_posted, message_filename, image_filename, location_name FROM " . post_handler::$db_table_name . " ORDER BY date_posted DESC LIMIT " . $max_value . " OFFSET " . $offset . ";";

    return post_handler::_parseResult($db_conn->query($sql_query));
  }
  
  public static function GetPostsTime(int $max_value, int $offset, DateTime $before): array{
    global $db_conn;
    
    if($offset < 0)
      $offset = 0;

    if($max_value > post_handler::$max_get)
      $max_value = post_handler::$max_get;
    else if($max_value < post_handler::$min_get)
      $max_value = post_handler::$min_get;

    $sql_query = "SELECT post_id, username, date_posted, message_filename, image_filename, location_name FROM " . post_handler::$db_table_name . " WHERE date_posted <= '" . date("Y-m-d H:i:s", $before->getTimestamp()) . "' ORDER BY date_posted DESC LIMIT " . $max_value . " OFFSET " . $offset . ";";

    return post_handler::_parseResult($db_conn->query($sql_query));
  }

  public static function GetPostsCount(): int{
    global $db_conn;

    $sql_query = "SELECT post_count FROM " . post_handler::$db_table_name_info . ";";

    $result = $db_conn->query($sql_query);
    if($result->num_rows > 0)
      return intval($result->fetch_assoc()['post_count']);
    else
      return 0;
  }

  public static function GetPostsOldestDate(): DateTime{
    global $db_conn;

    $sql_query = "SELECT oldest_date FROM " . post_handler::$db_table_name_info . ";";

    $result = $db_conn->query($sql_query);
    if($result->num_rows > 0)
      return DateTime::createFromFormat("Y-m-d", $result->fetch_assoc()['oldest_date']);
    else
      return DateTime::createFromFormat("Y-m-d", "0000-00-00");
  }
}