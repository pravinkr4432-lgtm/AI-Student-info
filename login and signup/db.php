<?php


$host = "localhost";

$user = "root";

$password = "";

$database = "learnflow_ai";


$conn = mysqli_connect(
    $host,
    $user,
    $password,
    $database
);


if(!$conn){


    die("Database Connection Failed");


}


?>