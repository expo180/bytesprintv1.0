$(document).ready(function() {
    const emailInput = $("#EmailInput");
    const nameInput = $("#NameInput");
    const errorText = $(".email-serverless-raise-error");
    const NameErrorText = $(".name-serverless-raise-error");
    const submitButton = $(".btn");

    function validateFields() {
        const email = emailInput.val().trim();
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (email && isValidEmail) {
            errorText.hide();
            submitButton.prop('disabled', false);
        }
        else {
            errorText.show();
            submitButton.prop('disabled', true);
        }
    }
    function validateName(){
        const name = nameInput.val().trim();
        if(name){
            NameErrorText.hide();
            submitButton.prop('disabled', false);
        }
        else{
            NameErrorText.show();
            submitButton.prop('disabled', true)
        }
    }

    // call the functions
    emailInput.on('input', validateFields);
    nameInput.on('input', validateName);
});
