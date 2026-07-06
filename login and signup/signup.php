<?php


include "db.php";


if($_SERVER["REQUEST_METHOD"] == "POST"){


    $fullname = $_POST["fullname"];

    $email = $_POST["email"];

    $password = $_POST["password"];


    $hashedPassword = password_hash(
        $password,
        PASSWORD_DEFAULT
    );


    $sql = "INSERT INTO users(
                fullname,
                email,
                password
            )
            VALUES(
                '$fullname',
                '$email',
                '$hashedPassword'
            )";


    if(mysqli_query($conn,$sql)){


        echo "Account Created";


    }
    else{


        if(mysqli_errno($conn) == 1062){


        echo "Email already registered";


        }
        else{


        echo "Signup Failed";


        }


    }   

}


?>