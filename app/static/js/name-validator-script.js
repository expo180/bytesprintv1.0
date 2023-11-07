document.addEventListener("DOMContentLoaded", function() {
    const lastNameField = document.querySelector("#last_name");
    const firstNameField = document.querySelector("#first_name");
    const emailField = document.querySelector("#email");
    const nextButton = document.querySelector(".nextBtn");
  
    function validateName(inputField, errorMsg) {
        inputField.addEventListener("input", function() {
            const nameRegex = /^[A-Za-z\s]+$/;
            if (nameRegex.test(inputField.value)) {
                errorMsg.style.display = "none";
                inputField.style.borderColor = "";
            } else {
                errorMsg.style.display = "block";
                inputField.style.borderColor = "red";
            }
            updateNextButtonStatus();
        });
    }

    function validateEmail(emailField, errorMsg) {
        emailField.addEventListener("input", function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(emailField.value)) {
                errorMsg.style.display = "none";
                emailField.style.borderColor = "";
            } else {
                errorMsg.style.display = "block";
                emailField.style.borderColor = "red";
            }
            updateNextButtonStatus();
        });
    }

    function updateNextButtonStatus() {
        const nameError = document.querySelector(".name-error-msg");
        const prenameError = document.querySelector(".prename-error-msg");
        const emailError = document.querySelector(".email-error-msg");
      
        if (nameError.style.display === "none" &&
            prenameError.style.display === "none" &&
            emailError.style.display === "none") {
            nextButton.disabled = false;
            nextButton.style.backgroundColor = "#007bff";
        } else {
            nextButton.disabled = true;
            nextButton.style.backgroundColor = "#e0e0e0";
        }
    }
  
    validateName(lastNameField, document.querySelector(".name-error-msg"));
    validateName(firstNameField, document.querySelector(".prename-error-msg"));
    validateEmail(emailField, document.querySelector(".email-error-msg"));
});
