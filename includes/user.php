<?php

require_once('__autoload.php');

class User{
  private string $_username;
  private DateTime $_datetime;

  function __construct(string $username, DateTime $datetime){
    $this->_username = $username;
    $this->_datetime = $datetime;
  }


  public function GetUsername(): string{
    return $this->_username;
  }

  public function GetDateCreated(): DateTime{
    return $this->_datetime;
  }
}