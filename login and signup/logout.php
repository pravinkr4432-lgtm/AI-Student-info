<?php

session_start();

include "db.php";


// database se remember token remove

if(isset($_SESSION["user_id"])){

    $userId = $_SESSION["user_id"];


    mysqli_query(
        $conn,
        "UPDATE users 
         SET remember_token=NULL
         WHERE id='$userId'"
    );

}


// session remove

session_unset();

session_destroy();


// cookie remove

setcookie(
    "remember_token",
    "",
    time() - 3600,
    "/"
);


header("Location: login.html");

exit();


?>