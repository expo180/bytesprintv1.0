$(document).ready(function() {


    // Function to check if a file is selected
    function isFileSelected(fileInput) {
        return fileInput[0].files.length > 0;
    }

    $('#main_problem').on('input', function() {
        var mainProblemField = $(this);
        var mainProblem = mainProblemField.val();
        var errorElement = $('#mainProblemError');

        // Set the character limit
        var minCharacters = 600;
        var maxCharacters = 1000;

        if (mainProblem.trim() === '') {
            showError(mainProblemField, 'This field cannot be empty', errorElement);
        } else if (mainProblem.length < minCharacters || mainProblem.length > maxCharacters) {
            showError(mainProblemField, 'Please enter between ' + minCharacters + ' and ' + maxCharacters + ' characters', errorElement);
        } else {
            showSuccess(mainProblemField);
            errorElement.text('');
        }

        updateContinueButton();
    });

    // Function to validate the "Key Aspects" input
    $('#NumberOfKeyAspects').on('input', function() {
        var numberOfKeyAspectsField = $(this);
        var numberOfKeyAspects = numberOfKeyAspectsField.val();
        var errorElement = $('#NumberOfKeyAspectsError');
        if (numberOfKeyAspects.trim() === '' || parseInt(numberOfKeyAspects) < 2 || parseInt(numberOfKeyAspects) > 20) {
            showError(numberOfKeyAspectsField, 'Please enter a valid number between 2 and 20', errorElement);
        } else {
            showSuccess(numberOfKeyAspectsField);
            errorElement.text('');
        }
        updateContinueButton();
    });

    $('#NumberOfSteps').on('input', function() {
        var numberOfStepsField = $(this);
        var numberOfSteps = numberOfStepsField.val();
        var errorElement = $('#NumberOfStepsError');

        if (numberOfSteps.trim() === '' || parseInt(numberOfSteps) < 2 || parseInt(numberOfSteps) > 20) {
            showError(numberOfStepsField, 'Please enter a valid number between 2 and 20', errorElement);
        } else {
            showSuccess(numberOfStepsField);
            errorElement.text('');
        }

        updateContinueButton();
    });

    $('#strategy').on('input', function() {
        var strategyField = $(this);
        var strategy = strategyField.val();
        var errorElement = $('#strategyError');

        // Set the character limit
        var minCharacters = 600;
        var maxCharacters = 1000;

        if (strategy.trim() === '') {
            showError(strategyField, 'This field cannot be empty', errorElement);
        } else if (strategy.length < minCharacters || strategy.length > maxCharacters) {
            showError(strategyField, 'Please enter between ' + minCharacters + ' and ' + maxCharacters + ' characters', errorElement);
        } else {
            showSuccess(strategyField);
            errorElement.text('');
        }

        updateContinueButton();
    });

    // Validate the number of videos when the user selects "No" to the question
    $('input[name="have_videos"]').on('change', function() {
        var haveVideosValue = $(this).val();
        var numberOfVideosField = $('#NumberOfVideos');
        var numberOfVideos = numberOfVideosField.val();
        var errorElement = $('#NumberOfVideosError');

        // If the user selects "No"
        if (haveVideosValue === '0') {
            if (numberOfVideos === '') {
                // Show an error message if the field is empty
                showError(numberOfVideosField, 'Please enter the number of videos you know', errorElement);
            } else if (parseInt(numberOfVideos) <= 0) {
                // Show an error message if the entered value is not valid (less than or equal to 0)
                showError(numberOfVideosField, 'Please enter a valid number', errorElement);
            } else {
                // Hide the error message if the input is valid
                showSuccess(numberOfVideosField);
                errorElement.text('');
            }
        } else {
            // If the user selects "Yes", clear any previous error message
            numberOfVideosField.removeClass('is-invalid').removeClass('is-valid');
            errorElement.text('');
        }

        updateContinueButton();
    });

    // Validate the number of videos input
    $('#NumberOfVideos').on('input', function() {
        var haveVideosValue = $('input[name="have_videos"]:checked').val();
        var numberOfVideosField = $(this);
        var numberOfVideos = numberOfVideosField.val();
        var errorElement = $('#NumberOfVideosError');

        // If the user selects "No"
        if (haveVideosValue === '0') {
            if (numberOfVideos === '') {
                // Show an error message if the field is empty
                showError(numberOfVideosField, 'Please enter the number of videos you know', errorElement);
            } else if (parseInt(numberOfVideos) <= 0) {
                // Show an error message if the entered value is not valid (less than or equal to 0)
                showError(numberOfVideosField, 'Please enter a valid number', errorElement);
            } else {
                // Hide the error message if the input is valid
                showSuccess(numberOfVideosField);
                errorElement.text('');
            }
        }

        updateContinueButton();
    });

    // Function to check if at least one video link and title are provided
    function validateVideoInputs() {
        var videoInputsContainer = $('#videoInputsContainer');
        var videoTitleInputs = videoInputsContainer.find('input[name^="videoTitle"]');
        var videoLinkInputs = videoInputsContainer.find('input[name^="videoLink"]');
        var errorElement = $('#videoInputsError');

        var atLeastOneValid = false;

        // Check if at least one video link and title are provided
        videoTitleInputs.each(function(index) {
            var titleInput = $(this);
            var linkInput = videoLinkInputs.eq(index);

            if (titleInput.val().trim() !== '' && linkInput.val().trim() !== '') {
                atLeastOneValid = true;
                return false; // Exit the loop early if at least one valid pair is found
            }
        });

        // Show error message if no valid pair is found
        if (!atLeastOneValid) {
            showError(videoInputsContainer, 'Please provide at least one video title and link', errorElement);
        } else {
            showSuccess(videoInputsContainer);
            errorElement.text('');
        }

        return atLeastOneValid;
    }

    // Event listener for video title and link inputs
    $('#videoInputsContainer').on('input', 'input[name^="videoTitle"], input[name^="videoLink"]', function() {
        validateVideoInputs();
        updateContinueButton();
    });

    // Function to check if the user has provided a video when selecting "Yes"
    function validateUserHasVideo() {
        var haveVideosValue = $('input[name="have_videos"]:checked').val();
        var videoInputField = $('#video');
        var errorElement = $('#videoError');

        // If the user selects "Yes"
        if (haveVideosValue === '1') {
            if (videoInputField.val().trim() === '') {
                // Show an error message if the video input is empty
                showError(videoInputField, 'Please provide a video for this course', errorElement);
            } else {
                // Hide the error message if the input is valid
                showSuccess(videoInputField);
                errorElement.text('');
            }
        } else {
            // If the user selects "No", clear any previous error message
            videoInputField.removeClass('is-invalid').removeClass('is-valid');
            errorElement.text('');
        }

        updateContinueButton();
    }

    // Event listener for the "have_videos" radio buttons
    $('input[name="have_videos"]').on('change', function() {
        validateUserHasVideo();
    });



    // Video && Thumbnail field clearer
    $('.remove-file').on('click', function () {
        console.log("hello world")
        var inputId = $(this).data('input-id');
        var inputFile = $('#' + inputId);
        var errorElement = $('#' + inputId + 'Error');
        // Clear the file input
        inputFile.val('');
        // Clear any previous error message
        errorElement.text('');
    });

    // Function to check if at least one video is provided
    function isAtLeastOneVideoProvided() {
        var numberOfVideos = $('#NumberOfVideos').val();
        for (var i = 0; i < numberOfVideos; i++) {
            var videoLinkValue = $('input[name="videoLink' + i + '"]').val();
            if (videoLinkValue.trim() !== "") {
                return true;
            }
        }
        return false;
    }

    // Function to validate video link fields
    function validateVideoLinks() {
        var haveVideos = $('input[name="have_videos"]:checked').val();
        if (haveVideos === '0' && !isAtLeastOneVideoProvided()) {
            // User answered "No" to having videos but did not provide any video links
            $(".spinner-border").hide();
            $("#arrow-next").show();
            Swal.fire({
                title: 'Incomplete Form',
                text: 'Please provide at least one video link.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return false;
        }

        return true;
    }
    
    // Function to show error message and update field styles
    function showError(field, message, errorElement) {
        field.removeClass('is-valid').addClass('is-invalid');
        errorElement.text(message);
    }

    // Function to show success message and update field styles
    function showSuccess(field) {
        field.removeClass('is-invalid').addClass('is-valid');
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

    // Function to enable/disable the Continue button based on validation
    function updateContinueButton() {
        var isValid = $('.form-control.is-invalid').length === 0;
        var isQuestionsAnswered = areQuestionsAnswered();
        $('#continueButtonStep1').prop('disabled', !isValid || !isQuestionsAnswered);
    }
    // Function to enable/disable the Continue button based on validation for Step 2
    function updateContinueButtonStep2() {
        var isValid = $('.form-control.is-invalid').length === 0;
        var isKeyAspectsValid = validateNumberOfKeyAspects();
        var isMainProblemValid = validateMainProblem();
        var isStrategyValid = validateStrategy();
        $('#continueButtonStep2').prop('disabled', !isValid || !isKeyAspectsValid || !isMainProblemValid || !isStrategyValid);
    }

    // Function to display a SweetAlert success dialog
    function showSuccessAlert() {
        Swal.fire({
            title: 'Good Job!',
            text: 'You have successfully completed the first step. Click OK to continue.',
            icon: 'success',
            confirmButtonText: 'OK'
        });
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

        var haveVideos = $('input[name="have_videos"]:checked').val();

        // Check video size and format only if the user has selected "Yes" to having their own video
        if (haveVideos === '1') {
            if (!isFileSelected(videoField)) {
                showError(videoField, 'Please select a video file', errorElement);
            } else if (isFileSelected(videoField) && this.files[0].size > maxSizeInBytes) {
                showError(videoField, 'Video size must not exceed 500 MB', errorElement);
            } else if (fileName && allowedFormats.indexOf(fileName.split('.').pop().toLowerCase()) === -1) {
                showError(videoField, 'Invalid video format. Please upload an AVI or MP4 file.', errorElement);
            } else {
                showSuccess(videoField);
                errorElement.text('');
            }
        } else {
            // If the user has videos, return true without further validation
            showSuccess(videoField);
            errorElement.text('');
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
        var isWorkingForCompany = $('input[name="working_for_company"]:checked').val() === '1';
        var companyName = $('#company_name').val().trim();

        if (isWorkingForCompany && companyName === '') {
           Swal.fire({
                title: 'Incomplete Form',
                text: 'Please provide the name of your company ',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return;
        }



        var isStudentOrProfessor = $('input[name="student_or_professor"]:checked').val() === '1';
        var universityName = $('#university_name').val().trim();

        if (isStudentOrProfessor && universityName === '') {
            Swal.fire({
                title: 'Incomplete Form',
                text: 'Please provide the name of your institution.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return;
        }


        $('#continueButton').prop('disabled', true);
        $('#continueButton .spinner-border').show();
        $('#arrow-next').hide();
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
                // Display an error message case where thumbnail is not selected
                $('#continueButton .spinner-border').hide();
                $('#arrow-next').show();
                Swal.fire({
                    title: 'Incomplete Form',
                    text: 'Please provide a thumbnail for your course.',
                    icon: 'warning',
                    confirmButtonText: 'OK'
                });
                return; // Stop further processing
            }

            if (!validateVideoLinks()) {
                return;
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
                    $('#continueButton').prop('disabled', false);
                    $('#continueButton .spinner-border').hide();
                    window.location.href = '/api/v1/create_course/step2/';

                },
                error: function (error) {
                    $('#continueButton').prop('disabled', false);
                    $('#continueButton .spinner-border').hide();
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "Something went wrong!",
                      footer: '<a href="#">Why do I have this issue?</a>'
                    });
                    console.log(error);
                }
            });            
        }
    });
});

