import { collectAndValidateQuizData, collectAndValidateProjectData, collectAndValidateRequirementsData, collectAndValidateAuthorization, validateCourseDuration } from './InstructorQuizzToggles.js'

$(document).ready(function () {
    $('#SubmitButton').on('click', function () {
        // Validate authorization
        const isAuthorizationValid = collectAndValidateAuthorization();

        if (isAuthorizationValid !== true) {
            // Stop form submission due to validation failure
            return;
        }

        // Validate course duration
        const validatedCourseDuration = validateCourseDuration();

        // If validation failed, do not proceed with the AJAX request
        if (!validatedCourseDuration) {
            return;
        }

        // Collect and validate data for quiz, requirements, and project
        const quizData = collectAndValidateQuizData();
        const requirementsData = collectAndValidateRequirementsData();
        const projectData = collectAndValidateProjectData();

        // Check if validation passed for all data
        if (quizData || requirementsData || projectData) {
            // Merge the validated course duration with other data
            const requestData = {
                ...validatedCourseDuration,
                quizData: quizData ? JSON.stringify(quizData) : undefined,
                requirementsData: requirementsData ? JSON.stringify(requirementsData) : undefined,
                projectData: projectData ? JSON.stringify(projectData) : undefined,
            };

            // Show spinner
            $('#SubmitButton .spinner-border').show();

            // AJAX request
            $.ajax({
                url: '/api/v1/create_course/final/',
                type: 'POST',
                contentType: 'application/json',  // Set the Content-Type header
                data: JSON.stringify(requestData),  // Convert data to JSON
                success: function (response) {
                    // Hide spinner
                    $('#SubmitButton .spinner-border').hide();

                    // Show success icon and text
                    $('#SubmitButton').html('<i class="bi bi-check"></i> Sent');

                    // Display SweetAlert success message
                    Swal.fire({
                        icon: 'success',
                        title: 'Course Sent!',
                        text: 'Your course has been submitted successfully.',
                    }).then((result) => {
                        // Redirect to a page after clicking "OK"
                        if (result.isConfirmed) {
                            window.location.href = 'http://127.0.0.1:5000';
                        }
                    });
                },
                error: function (error) {
                    // Hide spinner in case of an error
                    $('#SubmitButton .spinner-border').hide();

                    // Display SweetAlert error message
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong! Please try again.',
                    });
                    console.log(error);
                }
            });
        }
    });

    $("#SaveToCloud2").click(function () {
        // Show spinner
        $("#cloud2").hide();
        $('#SaveToCloud2 .spinner-border').show();

        // Collect and validate data
        const quizData = collectAndValidateQuizData();
        const requirementsData = collectAndValidateRequirementsData();
        const courseDuration = $('#courseDurationInput').val();

        // Check if at least one validation passed
        if (quizData || requirementsData) {
            // Prepare data for AJAX request
            const requestData = {
                quizData: quizData ? JSON.stringify(quizData) : undefined,
                requirementsData: requirementsData ? JSON.stringify(requirementsData) : undefined,
                courseDuration: courseDuration
            };

            // AJAX request
            $.ajax({
                url: '/api/v1/save_quizz_requirements_duration_data/',
                type: 'POST',
                contentType: 'application/json',  // Set the Content-Type header
                data: JSON.stringify(requestData),  // Convert data to JSON
                success: function (response) {
                    // Hide spinner
                    $('#SaveToCloud2 .spinner-border').hide();
                    $("#cloud2").show();

                    // Show success message using SweetAlert
                    Swal.fire({
                        icon: 'success',
                        title: 'Saved!',
                        text: response.message,
                    });
                },
                error: function (error) {
                    // Hide spinner in case of an error
                    $('#SaveToCloud2 .spinner-border').hide();
                    $("#cloud2").show();

                    // Display SweetAlert error message
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong! Please try again.',
                    });
                    console.log(error);
                }
            });
        } else {
            // Hide spinner if validation fails
            $('#SaveToCloud2 .spinner-border').hide();
        }
    });

});