<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php');

require_once($_SERVER['DOCUMENT_ROOT'] . '/includes/password.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/includes/database_connection.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/includes/cookie_handler.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/includes/user_handler.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/includes/user.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/includes/redirect.php');


error_reporting(E_ALL ^ E_ERROR);