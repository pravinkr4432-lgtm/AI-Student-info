<?php

session_start();

include "db.php";

header("Content-Type: application/json");


if($_SERVER["REQUEST_METHOD"] == "POST"){


    $email = $_POST["email"];

    $password = $_POST["password"];


    $sql = "SELECT * FROM users WHERE email='$email'";


    $result = mysqli_query($conn,$sql);


    if(mysqli_num_rows($result) == 1){


        $user = mysqli_fetch_assoc($result);


        if(password_verify($password,$user["password"])){


            $_SESSION["user_id"] = $user["id"];

            $_SESSION["user_name"] = $user["fullname"];

            if(isset($_POST["remember"])){


                $token = bin2hex(random_bytes(32));


                $userId = $user["id"];


                mysqli_query(

                    $conn,

                    "UPDATE users 
                    SET remember_token='$token'
                    WHERE id='$userId'"

                );


                setcookie(

                    "remember_token",

                    $token,

                    time() + (86400 * 30),

                    "/",

                    "",

                    false,

                    true

                );


            }


            echo json_encode([

                "status" => "success",

                "message" => "Login Successful"

            ]);


            exit();


        }
        else{


            echo json_encode([

                "status" => "error",

                "message" => "Wrong Password"

            ]);


            exit();


        }


    }
    else{


        echo json_encode([

            "status" => "error",

            "message" => "User Not Found"

        ]);


        exit();


    }


}


?>