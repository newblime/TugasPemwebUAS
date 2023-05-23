<?php

function status_login_print_form(bool $b){
  if($b)
    include "bagian/profile_logged_in.php";
  else
    include "bagian/profile_logged_out.php";
}

?>