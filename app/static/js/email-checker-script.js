$(document).ready(function() {
    const emailInput = $("#floatingInput");
    const passInput = $("#floatingPassword");
    const errorText = $(".email-serverless-raise-error");
    const submitButton = $(".submit-login");

    emailInput.on('input', validateFields);
    passInput.on('input', validateFields);

    function validateFields() {
        const email = emailInput.val().trim();
        const password = passInput.val().trim();
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (email && password && isValidEmail) {
            errorText.hide();
            submitButton.prop('disabled', false);
        } else if (email && !isValidEmail) {
            errorText.addClass("text-danger").show();
            submitButton.prop('disabled', true);
        } else {
            errorText.hide();
            submitButton.prop('disabled', true);
        }
    }
});
