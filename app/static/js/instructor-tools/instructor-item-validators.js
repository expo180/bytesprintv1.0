$(document).ready(function() {
    // Function to show error message and update field styles
    function showError(field, message, errorElement) {
        field.removeClass('is-valid').addClass('is-invalid');
        errorElement.text(message);
    }

    // Function to show success message and update field styles
    function showSuccess(field) {
        field.removeClass('is-invalid').addClass('is-valid');
    }

    // Function to enable/disable the Continue button based on validation
    function updateContinueButton() {
        var isValid = $('.form-control.is-invalid').length === 0;
        $('#continueButton').toggleClass('disabled', !isValid);
    }

    // Validate email format
    $('#email').on('input', function() {
        var emailField = $(this);
        var email = emailField.val();
        var errorElement = $('#emailError');
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email === '') {
            showSuccess(emailField);
            errorElement.text('');
        } else {
            showError(emailField, 'Invalid email format', errorElement);
        }
        updateContinueButton();
    });

    // Validate author name length
    $('#author_name').on('input', function() {
        var authorNameField = $(this);
        var authorName = authorNameField.val();
        var maxAuthorNameLength = 50;
        var errorElement = $('#authorNameError');
        if (authorName === '') {
            showError(authorNameField, 'Empty author name is not allowed', errorElement);
        } else if (authorName.length <= maxAuthorNameLength) {
            showSuccess(authorNameField);
            errorElement.text('');
        } else {
            showError(authorNameField, 'Author name must not exceed ' + maxAuthorNameLength + ' characters', errorElement);
        }
        updateContinueButton();
    });

    // Other validations for job title, course title, description, and video size...

    // Validate job title length
    $('#job_title').on('input', function() {
        var jobTitleField = $(this);
        var jobTitle = jobTitleField.val();
        var errorElement = $('#jobTitleError');
        if(jobTitle.length == 0){
            showError(jobTitleField, 'Job title must not be empty', errorElement);
        }
        else if (jobTitle.length <= 100) {
            showSuccess(jobTitleField);
            errorElement.text('');
        }
        else {
            showError(jobTitleField, 'Job title must not exceed 100 characters', errorElement);
        }
        updateContinueButton();
    });

    // Validate course title length
    $('#course_title').on('input', function() {
        var courseTitleField = $(this);
        var courseTitle = courseTitleField.val();
        var errorElement = $('#courseTitleError');
        if(courseTitle.length == 0){
            showError(courseTitleField, 'Course title must not be empty', errorElement)
        }
        else if (courseTitle.length <= 155) {
            showSuccess(courseTitleField);
            errorElement.text('');
        } 
        else {
            showError(courseTitleField, 'Course title must not exceed 155 characters', errorElement);
        }
        updateContinueButton();
    });

    // Validate course description length
    $('#short_description').on('input', function() {
        var descriptionField = $(this);
        var description = descriptionField.val();
        var errorElement = $('#descriptionError');        
        if(description.length == 0){
            showError(descriptionField, 'Description must not be empty', errorElement)
        }
        else if (description.length <= 265) {
            showSuccess(descriptionField);
            errorElement.text('');
        }
        else {
            showError(descriptionField, 'Description must not exceed 265 characters', errorElement);
        }
        updateContinueButton();
    });

    // Validate video size
    $('#video').on('change', function() {
        var videoField = $(this);
        var maxSizeInBytes = 500 * 1024 * 1024; // 500 MB
        var errorElement = $('#videoError');
        if (this.files.length === 0 || this.files[0].size <= maxSizeInBytes) {
            showSuccess(videoField);
            errorElement.text('');
        } else {
            showError(videoField, 'Video size must not exceed 500 MB', errorElement);
        }
        updateContinueButton();
    });

    // Validate company name
    $('#company_name').on('input', function() {
        var companyNameField = $(this);
        var companyName = companyNameField.val();
        var errorElement = $('#companyNameError');
        if (companyName === '') {
            showError(companyNameField, 'Empty company name is not allowed', errorElement);
        } else {
            showSuccess(companyNameField);
            errorElement.text('');
        }
        updateContinueButton();
    });

    // Validate video links
    $('#video_links').on('input', function() {
        var videoLinksField = $(this);
        var videoLinks = videoLinksField.val();
        var errorElement = $('#videoLinksError');
        if (videoLinks === '') {
            showError(videoLinksField, 'Empty video links are not allowed', errorElement);
        } else {
            showSuccess(videoLinksField);
            errorElement.text('');
        }
        updateContinueButton();
    });
});
