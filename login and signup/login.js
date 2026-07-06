document.addEventListener("DOMContentLoaded", () => {


    const emailError = document.querySelector("#emailError");
    const passwordError = document.querySelector("#passwordError");
    /* ==========================================================
                        DOM ELEMENTS
    ========================================================== */

    const loginForm = document.querySelector(".login-form");

    const emailInput = document.querySelector("#email");

    const passwordInput = document.querySelector("#password");

    const togglePassword = document.querySelector(".toggle-password");

    const loginButton = document.querySelector(".login-btn");

    const inputGroups = document.querySelectorAll(".input-group");

    /* ==========================================================
                    SHOW / HIDE PASSWORD
    ========================================================== */


    togglePassword.addEventListener("click", function () {


        passwordInput.type =
            passwordInput.type === "password"
                ? "text"
                : "password";


        const icon = this.querySelector("i");


        icon.classList.toggle("fa-eye");

        icon.classList.toggle("fa-eye-slash");


    });


    /* ==========================================================
                    LOGIN FORM VALIDATION
    ========================================================== */

    if (loginForm) {

        loginForm.addEventListener("submit", (e) => {

            e.preventDefault();

            clearError(emailInput);
            clearError(passwordInput);

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (email === "") {

                showError(emailInput, "Email is required.");

                emailInput.focus();

                return;

            }

            if (!emailPattern.test(email)) {

                showError(emailInput, "Enter a valid email address.");

                emailInput.focus();

                return;

            }

            if (password === "") {

                showError(passwordInput, "Password is required.");

                passwordInput.focus();

                return;

            }
            if (password.length < 8) {

                showError(
                    passwordInput,
                    "Password must be at least 8 characters."
                );

                passwordInput.focus();

                return;

            }

            /* ==========================================================
                         LOGIN REQUEST
             ========================================================== */


            loginButton.disabled = true;

            loginButton.textContent = "Logging in...";


            const formData = new FormData(loginForm);


            fetch("login.php", {


                method: "POST",

                body: formData


            })


                .then(response => response.json())


                .then(data => {


                    if (data.status === "success") {


                        window.location.href = "dashboard.php";


                    }
                    else {


                        showError(
                            passwordInput,
                            data.message
                        );


                        loginButton.disabled = false;

                        loginButton.textContent = "Login";


                    }


                })


                .catch(error => {


                    console.log(error);


                    loginButton.disabled = false;

                    loginButton.textContent = "Login";


                });

        });

    }
    /* ==========================================================
                    VALIDATION HELPERS
    ========================================================== */

    function showError(input, message) {

        const inputGroup = input.closest(".input-group");

        const inputField = inputGroup.querySelector(".input-field");

        const errorText = inputGroup.querySelector(".error-message");

        inputField.style.borderColor = "#ef4444";

        errorText.textContent = message;

    }

    function clearError(input) {

        const inputGroup = input.closest(".input-group");

        const inputField = inputGroup.querySelector(".input-field");

        const errorText = inputGroup.querySelector(".error-message");

        inputField.style.borderColor = "";

        errorText.textContent = "";

    }
    /* ==========================================================
                    LIVE INPUT VALIDATION
    ========================================================== */

    emailInput.addEventListener("input", () => {

        clearError(emailInput);

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailInput.value.trim() !== "" &&
            emailPattern.test(emailInput.value.trim())) {

            emailInput
                .closest(".input-group")
                .querySelector(".input-field")
                .style.borderColor = "#22c55e";

        }

    });

    passwordInput.addEventListener("input", () => {

        clearError(passwordInput);

        if (passwordInput.value.trim() !== "") {

            passwordInput
                .closest(".input-group")
                .querySelector(".input-field")
                .style.borderColor = "#22c55e";

        }

    });

    // ===============================
    // AUTH SECTION ANIMATION
    // ===============================


    const loginSection = document.getElementById("loginSection");

    const forgotSection = document.getElementById("forgotSection");

    const otpSection = document.getElementById("otpSection");

    const resetSection = document.getElementById("resetSection");


    const forgotLink = document.getElementById("forgotLink");

    const backLogin = document.querySelector(".backLogin");




    // Forgot click

    forgotLink.addEventListener("click", (e) => {


        e.preventDefault();


        loginSection.classList.add("slide-down");


        setTimeout(() => {


            loginSection.style.display = "none";


            loginSection.classList.remove("slide-down");


            forgotSection.style.display = "block";


            forgotSection.classList.add("slide-up");


        }, 500);


    });





    // Back Login

    backLogin.addEventListener("click", () => {


        forgotSection.classList.remove("slide-up");


        forgotSection.classList.add("slide-down");



        setTimeout(() => {


            forgotSection.style.display = "none";


            forgotSection.classList.remove("slide-down");


            loginSection.style.display = "block";


            loginSection.classList.add("slide-up");



            setTimeout(() => {


                loginSection.classList.remove("slide-up");


            }, 500);



        }, 500);


    });

    const sendOtpBtn = document.getElementById("sendOtpBtn");


    sendOtpBtn.addEventListener("click", () => {


        let email =
            document.getElementById("forgotEmail").value.trim();


        fetch("send_otp.php", {


            method: "POST",


            headers: {

                "Content-Type": "application/x-www-form-urlencoded"

            },


            body: "email=" + email


        })


            .then(response => response.text())


            .then(data => {


                console.log("PHP RESPONSE:", data);


                data = JSON.parse(data);


                if (data.status == "success") {


                    forgotSection.classList.add("slide-down");


                    setTimeout(() => {


                        forgotSection.style.display = "none";


                        otpSection.style.display = "block";


                        otpSection.classList.add("slide-up");


                    }, 500);


                }

                else {


                    alert(data.message || "Something went Wrong.");


                }


            });


    });

});
const verifyOtpBtn =
document.getElementById("verifyOtpBtn");


verifyOtpBtn.addEventListener("click",()=>{


    let otp =
    document.getElementById("otp").value.trim();



    fetch("verify_otp.php",{


        method:"POST",


        headers:{

            "Content-Type":"application/x-www-form-urlencoded"

        },


        body:"otp="+otp


    })


    .then(response=>response.json())


    .then(data=>{


        if(data.status=="success"){



            otpSection.classList.add("slide-down");



            setTimeout(()=>{


                otpSection.style.display="none";


                resetSection.style.display="block";


                resetSection.classList.add("slide-up");


            },500);



        }
        else{


            alert(data.message);


        }



    });


});