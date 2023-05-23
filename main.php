<!DOCTYPE html>
<html>
  <head>
    <?php include './header.php';?>
    <?php include './js_include.php';?>
  </head>
  <body>
    hello world!
    <ol>
      <li>test</li>
      <li>test</li>
      <li>test</li>
    </ol>

    <?php require_once('./includes/database_connection.php');?>

    <?php session_start(); $_SESSION["test"] = "hello world";?>

    <script src="test.js"></script>
  </body>
</html>