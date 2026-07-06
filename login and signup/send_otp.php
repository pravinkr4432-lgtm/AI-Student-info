<?php

session_start();

include "db.php";

header("Content-Type: application/json");


// check email received

if(!isset($_POST["email"]) || empty($_POST["email"])){

    echo json_encode([

        "status"=>"error",

        "message"=>"Email missing"

    ]);

    exit();

}


$email = mysqli_real_escape_string(
    $conn,
    $_POST["email"]
);


// check user exists


$sql = "SELECT * FROM users WHERE email='$email'";


$result = mysqli_query($conn,$sql);


if(mysqli_num_rows($result) == 0){


    echo json_encode([

        "status"=>"error",

        "message"=>"Email not registered"

    ]);


    exit();

}



// generate OTP


$otp = rand(100000,999999);



$expire = date(

    "Y-m-d H:i:s",

    strtotime("+10 minutes")

);



// save OTP


$update = "

UPDATE users SET

reset_otp='$otp',

otp_expire='$expire'

WHERE email='$email'

";


if(mysqli_query($conn,$update)){


    $_SESSION["reset_email"] = $email;


    echo json_encode([

        "status"=>"success",

        "message"=>"OTP generated",

        "otp"=>$otp

    ]);


}
else{


    echo json_encode([

        "status"=>"error",

        "message"=>mysqli_error($conn)

    ]);


}



?>