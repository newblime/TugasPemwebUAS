<br>
<?php
  require_once("includes/__autoload.php");
  require_once("includes/status_login.php");

  try{
    $_user = user_handler::GetCurrentUser();
    
    echo "Selamat datang " . $_user->GetUsername() . "!";
    include "bagian/profile_logged_in.php";
  }
  catch(Exception $e){
    echo "Anda belum login.<br>";
    include "bagian/profile_logged_out.php";
  }
?>
<br>