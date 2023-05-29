<?php

$_success = 0;
$_status = 0;

try{
  require_once($_SERVER['DOCUMENT_ROOT'] . '/includes/__autoload.php');

  $result = post_handler::AddPosts($_POST['location_name'], $_POST['post_msg'], 'post_img');

  switch($result){
    case PostStatus::success:
      $_success = 1;
      $_status = 0;
      break;

    case PostStatus::not_logged_in:
      $_success = 0;
      $_status = 1;
      break;

    case PostStatus::not_supported_type:
      $_success = 0;
      $_status = 2;
      break;

    case PostStatus::location_name_too_long:
      $_success = 0;
      $_status = 3;
      break;

    case PostStatus::no_location:
      $_success = 0;
      $_status = 4;
      break;

    case PostStatus::no_desc_or_image:
      $_success = 0;
      $_status = 5;
      break;

    case PostStatus::internal_error:
      throw new Exception();
  }
}
catch(Exception $e){
  echo $e;
  $_success = 0;
  $_status = 0;
}

echo json_encode(array("success" => $_success, "status" => $_status));