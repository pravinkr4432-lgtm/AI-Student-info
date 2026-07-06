<?php

session_start();

include "db.php";

header("Content-Type: application/json");


if(!isset($_SESSION["reset_email"])){


    echo json_encode([

        "status"=>"error",

        "message"=>"Session expired"

    ]);

    exit();

}



$email = $_SESSION["reset_email"];


$otp = $_POST["otp"];



$sql = "SELECT * FROM users

WHERE email='$email'

AND reset_otp='$otp'

AND otp_expire > NOW()";



$result = mysqli_query($conn,$sql);



if(mysqli_num_rows($result)==1){


    echo json_encode([

        "status"=>"success",

        "message"=>"OTP verified"

    ]);


}
else{


    echo json_encode([

        "status"=>"error",

        "message"=>"Wrong or expired OTP"

    ]);

}



?>