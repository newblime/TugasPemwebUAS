<?php

require_once("includes/__autoload.php");

user_handler::Logout();
redirectTo("main.php");