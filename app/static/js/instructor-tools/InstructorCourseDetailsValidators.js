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
        var isQuestionsAnswered = areQuestionsAnswered();
        $('#continueButton').prop('disabled', !isValid || !isQuestionsAnswered);
    }

    // Function to check if all questions are answered
    function areQuestionsAnswered() {
        var haveVideos = $('input[name="have_videos"]:checked').val();
        var workingForCompany = $('input[name="working_for_company"]:checked').val();
        var studentOrProfessor = $('input[name="student_or_professor"]:checked').val();
        var scientificPaper = $('input[name="scientific_paper"]:checked').val();

        return haveVideos !== undefined && workingForCompany !== undefined &&
            studentOrProfessor !== undefined && scientificPaper !== undefined;
    }


    // Function to display a SweetAlert confirmation dialog
    function showIncompleteFormAlert() {
        Swal.fire({
            title: 'Incomplete Form',
            text: 'Please fill in all required fields before continuing.',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
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

    // Validate video requirements
    $('#video').on('change', function () {
        var videoField = $(this);
        var fileName = videoField.val();
        var allowedFormats = ['avi', 'mp4'];
        var maxSizeInBytes = 500 * 1024 * 1024; // 500 MB
        var errorElement = $('#videoError');

        // Check video size and format
        if ((this.files.length === 0 || this.files[0].size <= maxSizeInBytes) &&
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

    // Validate thumbnail requirements
    $('#thumbnail').on('change', function () {
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

    // Handle radio button changes for questions
    $('input[name="have_videos"], input[name="working_for_company"], input[name="student_or_professor"], input[name="scientific_paper"]').on('change', function () {
        updateContinueButton();
    });

    // AJAX 
    $('#continueButton').click(function() {
        var isValid = $('.form-control.is-invalid').length === 0;
        var isQuestionsAnswered = areQuestionsAnswered();
        var isRequiredSectionsComplete =
            $('#author_name').val().trim() !== '' &&
            $('#course_title').val().trim() !== '' &&
            $('#short_description').val().trim() !== '' &&
            $('#core_specialization').val().trim() !== '';

         if (!isValid || !isQuestionsAnswered) {
            showIncompleteFormAlert();
        } 
        else{
            var CourseBasicData = new FormData();
            // Function to check if a file is selected
            function isFileSelected(fileInput) {
                return fileInput[0].files.length > 0;
            }

            // Append form data
            CourseBasicData.append('author_name', $("#author_name").val());
            CourseBasicData.append('email', $("#email").val());
            CourseBasicData.append('company_name', $("#company_name").val());
            CourseBasicData.append('university_name', $("#university_name").val());
            CourseBasicData.append('core_specialization', $("#core_specialization").val());
            CourseBasicData.append('course_title', $("#course_title").val());
            CourseBasicData.append('short_description', $("#short_description").val());

            // Check if thumbnail is selected
            if (isFileSelected($("#thumbnail"))) {
                CourseBasicData.append('thumbnail', $("#thumbnail")[0].files[0]);
            } else {
                // Display an error message or handle the case where thumbnail is not selected
                alert("Thumbnail is required!");
                return; // Stop further processing
            }

            // Check if video is selected
            if (isFileSelected($("#video"))) {
                CourseBasicData.append('video', $("#video")[0].files[0]);
            }

            // Append paper data
            var numberOfPapers = $('#NumberOfPapers').val();
            for (var i = 0; i < numberOfPapers; i++) {
                var paperTitleValue = $('input[name="paperTitle' + i + '"]').val();
                var paperLinkValue = $('input[name="paperLink' + i + '"]').val();

                // Check if values are not empty before appending
                if (paperTitleValue !== "") {
                    CourseBasicData.append('paperTitle' + i, paperTitleValue);
                }

                if (paperLinkValue !== "") {
                    CourseBasicData.append('paperLink' + i, paperLinkValue);
                }
            }

            // Append video data
            var numberOfVideos = $('#NumberOfVideos').val();
            for (var i = 0; i < numberOfVideos; i++) {
                var videoTitleValue = $('input[name="videoTitle' + i + '"]').val();
                var videoLinkValue = $('input[name="videoLink' + i + '"]').val();

                // Check if values are not empty before appending
                if (videoTitleValue !== "") {
                    CourseBasicData.append('videoTitle' + i, videoTitleValue);
                }

                if (videoLinkValue !== "") {
                    CourseBasicData.append('videoLink' + i, videoLinkValue);
                }
            }

            // Make the AJAX request only if required files are selected
           $.ajax({
                url: '/api/v1/course/add/create_new/step1/',
                type: 'POST',
                processData: false,
                contentType: false,
                data: CourseBasicData,
                success: function (response) {
                    window.location.href = '/api/v1/create_course/step2/';
                },
                error: function (error) {
                    console.log(error);
                }
            });            
        }
    });
});
