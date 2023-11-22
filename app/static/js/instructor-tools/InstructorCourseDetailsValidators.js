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
    // Validate core specialization length
    $('#core_specialization').on('input', function() {
        var jobTitleField = $(this);
        var jobTitle = jobTitleField.val();
        var errorElement = $('#CoreSpecializationError');
        if(jobTitle.length == 0){
            showError(jobTitleField, 'Core Specialization must not be empty', errorElement);
        }
        else if (jobTitle.length <= 100) {
            showSuccess(jobTitleField);
            errorElement.text('');
        }
        else {
            showError(jobTitleField, 'Core SpecializationError must not exceed 100 characters', errorElement);
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

    // Video requirements
     $('#video').on('change', function() {
        var videoField = $(this);
        var fileName = videoField.val();
        var allowedFormats = ['avi', 'mp4'];
        var maxSizeInBytes = 500 * 1024 * 1024; // 500 MB
        var errorElement = $('#videoError');

        // Check video size and format
        if ((this.files.length === 0 && this.files[0].size <= maxSizeInBytes) &&
            (!fileName || allowedFormats.indexOf(fileName.split('.').pop().toLowerCase()) !== -1)) {
            showSuccess(videoField);
            errorElement.text('');
        } else {
            // Check for size error
            if (this.files.length !== 0 && this.files[0].size > maxSizeInBytes) {
                showError(videoField, 'Video size must not exceed 500 MB', errorElement);
            }
            // Check for format error
            else if (fileName && allowedFormats.indexOf(fileName.split('.').pop().toLowerCase()) === -1) {
                showError(videoField, 'Invalid video format. Please upload an AVI or MP4 file.', errorElement);
            }
        }
        updateContinueButton();
    });

    // Thumbnail Requirements
    $('#thumbnail').on('change', function() {
        var thumbnailField = $(this);
        var fileName = thumbnailField.val();
        var allowedFormats = ['jpeg', 'png', 'jpg'];
        var maxSizeInBytes = 5 * 1024 * 1024; // 5 MB
        var errorElement = $('#thumbnailError');

        // Check thumbnail size and format
        if ((this.files.length === 0 || this.files[0].size <= maxSizeInBytes) &&
            (!fileName || allowedFormats.indexOf(fileName.split('.').pop().toLowerCase()) !== -1)) {
            showSuccess(thumbnailField);
            errorElement.text('');
        } else {
            // Check for size error
            if (this.files.length !== 0 && this.files[0].size > maxSizeInBytes) {
                showError(thumbnailField, 'Thumbnail size must not exceed 5 MB', errorElement);
            }
            // Check for format error
            else if (fileName && allowedFormats.indexOf(fileName.split('.').pop().toLowerCase()) === -1) {
                showError(thumbnailField, 'Invalid thumbnail format. Please upload a JPEG, PNG, or JPG file.', errorElement);
            }
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
    // AJAX 
    $('#continueButton').click(function() {
    var CourseBasicData = new FormData();
    console.log($("#author_name").val())
    console.log($("#email").val())
    console.log($("#company_name").val())
    console.log($("#university_name").val())
    console.log($("#core_specialization").val())
    console.log($("#course_title").val())
    console.log($("#video")[0].files[0])
    console.log($("#thumbnail")[0].files[0])


    // Append form data
    CourseBasicData.append('author_name', $("#author_name").val());
    CourseBasicData.append('email', $("#email").val());
    CourseBasicData.append('company_name', $("#company_name").val());
    CourseBasicData.append('university_name', $("#university_name").val());
    CourseBasicData.append('core_specialization', $("#core_specialization").val());
    CourseBasicData.append('course_title', $("#course_title").val());
    CourseBasicData.append('short_description', $("#short_description").val());

    // Append thumbnail and video files
    CourseBasicData.append('thumbnail', $("#thumbnail")[0].files[0]);
    CourseBasicData.append('video', $("#video")[0].files[0]);

    // Append paper data
    var numberOfPapers = $('#NumberOfPapers').val();
    for (var i = 0; i < numberOfPapers; i++) {
        CourseBasicData.append('paperTitle' + i, $('input[name="paperTitle' + i + '"]').val());
        CourseBasicData.append('paperLink' + i, $('input[name="paperLink' + i + '"]').val());
    }

    // Append video data
    var numberOfVideos = $('#NumberOfVideos').val();
    for (var i = 0; i < numberOfVideos; i++) {
        CourseBasicData.append('videoTitle' + i, $('input[name="videoTitle' + i + '"]').val());
        CourseBasicData.append('videoLink' + i, $('input[name="videoLink' + i + '"]').val());
    }


    $.ajax({
        url: '/course/add/create_new/step1/',
        type: 'POST',
        processData: false,
        contentType: false,
        data: CourseBasicData,
        success: function(response) {
            console.log(response);
            // Handle success (e.g., redirect to the next step)
        },
        error: function(error) {
            console.error(error);
            // Handle error
        }
    });
});

});
