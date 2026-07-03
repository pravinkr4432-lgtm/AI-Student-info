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

        console.log("Validation Passed ✅");

    });

}
/* ==========================================================
                VALIDATION HELPERS
========================================================== */

function showError(input, message){

    const inputGroup = input.closest(".input-group");

    const inputField = inputGroup.querySelector(".input-field");

    const errorText = inputGroup.querySelector(".error-message");

    inputField.style.borderColor = "#ef4444";

    errorText.textContent = message;

}

function clearError(input){

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
/* ==========================================================
                PASSWORD LENGTH
========================================================== */

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

/*

    PHP Integration

    fetch("auth/login.php",{
        method:"POST",
        body:new FormData(loginForm)
    })

*/

console.log("Ready for PHP Integration");
