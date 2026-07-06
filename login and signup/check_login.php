<?php

session_start();

include "db.php";


// Session already available

if(isset($_SESSION["user_id"])){

    header("Location: dashboard.php");
    exit();

}


// Remember me cookie check

if(isset($_COOKIE["remember_token"])){


    $token = mysqli_real_escape_string(
        $conn,
        $_COOKIE["remember_token"]
    );


    $sql = "SELECT * FROM users 
            WHERE remember_token='$token'
            LIMIT 1";


    $result = mysqli_query(
        $conn,
        $sql
    );


    if($result && mysqli_num_rows($result) == 1){


        $user = mysqli_fetch_assoc($result);


        $_SESSION["user_id"] = $user["id"];

        $_SESSION["user_name"] = $user["fullname"];


        header("Location: dashboard.php");

        exit();


    }


}


// No login found

header("Location: login.html");

exit();


?>