<?php

$_success = 0;
$_page_number = 0;
$_arrdata = array();
$_errcode = 0;
$_is_last_page = 0;


try{
  require_once($_SERVER['DOCUMENT_ROOT'] . '/includes/__autoload.php');

  $_max = intval($_POST['max_data']);
  $_date = DateTime::createFromFormat("m-d-Y H:i:s", $_POST['date_before']);
  $_offset = intval($_POST['offset']);
  
  $_result;
  if($_POST['date_before'] != "" && $_date != false)
    $_result = post_handler::GetPostsTime($_max, $_offset, $_date);
  else
    $_result = post_handler::GetPosts($_max, $_offset);
  
  $_success = 1;
  $_arrdata = $_result;
  
  if(($_offset + sizeof($_arrdata)) >= post_handler::GetPostsCount())
    $_is_last_page = 1;

  $_page_number = floor(floatval($_offset) / floatval($_max));
}
catch(Exception $e){
  $_success = 0;
  $_errcode = 0;
}

if($_success == 1)
  echo json_encode(array("success" => $_success, "result" => array("is_last_page" => $_is_last_page, "page_number" => $_page_number, "data" => $_arrdata)));
else
  echo json_encode(array("success" => $_success, "errcode" => $_errcode));