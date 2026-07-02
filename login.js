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


/* ==========================================================
                SHOW / HIDE PASSWORD
========================================================== */

if (togglePassword && passwordInput) {

    togglePassword.addEventListener("click", () => {

        const isHidden = passwordInput.type === "password";

        passwordInput.type = isHidden ? "text" : "password";

        const icon = togglePassword.querySelector("i");

        if (icon) {

            icon.classList.toggle("fa-eye");

            icon.classList.toggle("fa-eye-slash");

        }

    });

} 
/* ==========================================================
                LOGIN FORM VALIDATION
========================================================== */

if (loginForm) {

    loginForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const email = emailInput.value.trim();

        const password = passwordInput.value.trim();

        // Reset Previous Styles

        emailInput.parentElement.style.borderColor = "";
        passwordInput.parentElement.style.borderColor = "";

        // Empty Email

        if (email === "") {

            emailInput.parentElement.style.borderColor = "#ef4444";

            emailInput.focus();

            alert("Please enter your email address.");

            return;

        }

        // Email Format

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            emailInput.parentElement.style.borderColor = "#ef4444";

            emailInput.focus();

            alert("Please enter a valid email address.");

            return;

        }

        // Empty Password

        if (password === "") {

            passwordInput.parentElement.style.borderColor = "#ef4444";

            passwordInput.focus();

            alert("Please enter your password.");

            return;

        }

        // Success

        alert("Validation Successful!");

    });

}