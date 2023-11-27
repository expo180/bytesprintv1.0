$(document).ready(function(){
	// Function to generate dynamic input fields based on the number of questions
    function generateQuizFields() {
        let numQuestions = $('#NumberOfQuestions').val();
        // Validate the number of questions
        if (numQuestions >= 5 && numQuestions <= 10) {
            let container = $('#quizQuestionsContainer');
            container.empty(); // Clear previous fields

            for (let i = 1; i <= numQuestions; i++) {
                // Bootstrap styling for each question's container
                container.append(`<div class="border rounded-2 p-4 mb-3">
                                    <h5 class="display-5">Question ${i}</h5>
                                    <!-- Question input -->
                                    <div class="form-group mt-3">
                                        <label class="form-control-label">Question</label>
                                        <input type="text" placeholder="What is the correct way to declare a pointer in C++?" class="form-control" name="question${i}" required>
                                    </div>
                                    <!-- Options input -->
                                    <div class="form-group mt-3">
                                        <label class="form-control-label">Options:</label>
                                        <input type="text" placeholder='int *ptr;' class="form-control mb-2" name="q${i}option1" required>
                                        <input type="text" placeholder='pointer int ptr;' class="form-control mb-2" name="q${i}option2" required>
                                        <input type="text" placeholder='ptr int;' class="form-control mb-2" name="q${i}option3" required>
                                        <input type="text" placeholder='int ptr();' class="form-control mb-2" name="q${i}option4" required>
                                    </div>
                                    <!-- Correct answer input -->
                                    <div class="form-group mt-3">
                                        <label class="form-control-label">Correct Answer:</label>
                                        <input type="text" placeholder="int *ptr;" class="form-control" name="q${i}correct" required>
                                    </div>
                                </div>`);
            }

            // Clear warning text if it was displayed before
            $('#warningContainer').text('');
        } else {
            // Display warning text
            $('#warningContainer').text('Please enter a valid number of questions between 5 and 10.');
        }
    }
    // trigger the function
	$('#NumberOfQuestions').on('input', function() {
	    generateQuizFields();
	});

	// Function to generate dynamic input fields based on the number of projects
    function generateProjectFields() {
        let numProjects = $('#NumberOfProjects').val();
        // Validate the number of projects
        if (numProjects >= 1 && numProjects <= 3) {
            let container = $('#projectFieldsContainer');
            container.empty(); // Clear previous fields

            for (let i = 1; i <= numProjects; i++) {
                // Bootstrap styling for each project's container
                container.append(`<div class="border p-4 mb-3">
                                    <h5 class="display-5">Project ${i}</h5>
                                    <!-- Project name input -->
                                    <div class="form-group mt-3">
                                        <label class="form-control-label">Title:</label>
                                        <input type="text" placeholder="Autonomous Robot Navigation System" class="form-control" name="project${i}Name" required>
                                    </div>
                                    <!-- Project description input -->
                                    <div class="form-group mt-3">
                                        <label class="form-control-label">Description:</label>
                                        <textarea placeholder="Develop a C++ program that implements an autonomous navigation system for a robot. The goal is to enable the robot to navigate through a predefined environment while avoiding obstacles. The project should incorporate various robotics concepts, including sensor integration, path planning, and real-time control." class="form-control" name="project${i}Description" rows="3" required></textarea>
                                    </div>
                                    <!-- Project deadline input -->
                                    <div class="form-group mt-3">
                                        <label class="form-control-label">Deadline:</label>
                                        <input type="date" class="form-control" name="project${i}Deadline" required>
                                    </div>
                                </div>`);
            }

            // Clear warning text if it was displayed before
            $('#projectWarningContainer').text('');
        } else {
            // Display warning text
            $('#projectWarningContainer').text('Please enter a valid number of projects between 1 and 3.');
        }
    }
    // Event trigger when the input value changes
	$('#NumberOfProjects').on('input', function() {
	    generateProjectFields();
	});

	// Function to generate dynamic input fields based on the number of requirements
    function generateRequirementsFields() {
        let numRequirements = $('#NumberOfRequirements').val();
        // Validate the number of requirements
        if (numRequirements >= 1 && numRequirements <= 10) {
            let container = $('#requirementsFieldsContainer');
            container.empty(); // Clear previous fields

            for (let i = 1; i <= numRequirements; i++) {
                // Bootstrap styling for each requirement's container
                container.append(`<div class="border rounded-2 p-4 mb-3">
                                    <h5 class="display-5">Requirement ${i}</h5>
                                    <!-- Requirement description input -->
                                    <div class="form-group mt-3">
                                        <label class="form-control-label">Requirement Description:</label>
                                        <textarea placeholder="Modern web browser (Google Chrome, Mozilla Firefox, or Safari)" class="form-control" name="requirement${i}Description" rows="3" required></textarea>
                                    </div>
                                    <!-- Additional details input -->
                                    <div class="form-group mt-3">
                                        <label class="form-control-label">Additional Details:</label>
                                        <textarea placeholder="A basic understanding of programming concepts such as variables, loops, and functions is essential. The course assumes participants have prior exposure to these fundamental principles" class="form-control" name="requirement${i}Details" required></textarea>
                                    </div>
                                </div>`);
            }

            // Clear warning text if it was displayed before
            $('#requirementsWarningContainer').text('');
        } else {
            // Display warning text
            $('#requirementsWarningContainer').text('Please enter a valid number of requirements between 1 and 10.');
        }
    }

    // Event trigger when the input value changes
    $('#NumberOfRequirements').on('input', function() {
        generateRequirementsFields();
    });

    function validateCourseDuration() {
        const courseDurationInput = $('#courseDurationInput');
        const inputValue = courseDurationInput.val();

        // Perform validation
        if (inputValue.trim() === '') {
            $('#feedbackMessage').text('Please enter the course duration.');
            courseDurationInput[0].setCustomValidity('Please enter the course duration.');
        } else if (inputValue <= 0) {
            $('#feedbackMessage').text('Duration must be a positive number.');
            courseDurationInput[0].setCustomValidity('Duration must be a positive number.');
        } else {
            $('#feedbackMessage').text('');
            courseDurationInput[0].setCustomValidity('');

            // Store the validated data for later use
            const validatedData = {
                courseDuration: inputValue
            };
        }
    }

})

export function collectAndValidateQuizData() {
    let quizData = [];
    for (let i = 1; i <= $('#NumberOfQuestions').val(); i++) {
        let question = $('input[name="question' + i + '"]').val();
        let option1 = $('input[name="q' + i + 'option1"]').val();
        let option2 = $('input[name="q' + i + 'option2"]').val();
        let option3 = $('input[name="q' + i + 'option3"]').val();
        let option4 = $('input[name="q' + i + 'option4"]').val();
        let correctAnswer = $('input[name="q' + i + 'correct"]').val();

        if (!question || !option1 || !option2 || !option3 || !option4 || !correctAnswer) {
            $('#warningContainer').text('Please fill in all fields for Question ' + i);
            return null;
        }

        // Add the validated data to the array
        quizData.push({
            question: question,
            options: [option1, option2, option3, option4],
            correctAnswer: correctAnswer,
        });
    }
    $('#warningContainer').text('');
    return quizData;
}

// Function to collect and validate project data
export function collectAndValidateProjectData() {
    
    let projectData = [];

    // Loop through each project
    for (let i = 1; i <= $('#NumberOfProjects').val(); i++) {
        let projectName = $('input[name="project' + i + 'Name"]').val();
        let projectDescription = $('textarea[name="project' + i + 'Description"]').val();
        let projectDeadline = $('input[name="project' + i + 'Deadline"]').val();

        if (!projectName || !projectDescription || !projectDeadline) {
            // Display an error message or handle the validation failure
            $('#projectWarningContainer').text('Please fill in all fields for Project ' + i);
            return null; // Stop further processing
        }

        // Check if the deadline is a future date
        let today = new Date();
        let deadlineDate = new Date(projectDeadline);

        if (deadlineDate <= today) {
            $('#projectWarningContainer').text('Please enter a future date for the deadline of Project ' + i);
            return null; // Stop further processing
        }

        // Add the validated data to the array
        projectData.push({
            projectName: projectName,
            projectDescription: projectDescription,
            projectDeadline: projectDeadline,
        });
    }

    // Clear any previous warning messages
    $('#projectWarningContainer').text('');
    return projectData;
}

// Function to collect and validate requirements data
export function collectAndValidateRequirementsData() {
    let requirementsData = [];

    // Loop through each requirement
    for (let i = 1; i <= $('#NumberOfRequirements').val(); i++) {
        let requirementDescription = $('textarea[name="requirement' + i + 'Description"]').val();
        let requirementDetails = $('textarea[name="requirement' + i + 'Details"]').val();

        if (!requirementDescription || !requirementDetails) {
            // Display an error message or handle the validation failure
            $('#requirementsWarningContainer').text('Please fill in all fields for Requirement ' + i);
            return null; // Stop further processing
        }

        // Add the validated data to the array
        requirementsData.push({
            requirementDescription: requirementDescription,
            requirementDetails: requirementDetails,
        });
    }

    // Clear any previous warning messages
    $('#requirementsWarningContainer').text('');
    return requirementsData;
}
function validateCourseDuration() {
    const courseDurationInput = $('#courseDurationInput');
    const inputValue = courseDurationInput.val();

    // Perform validation
    if (inputValue.trim() === '') {
        $('#feedbackMessage').text('Please enter the course duration.');
        courseDurationInput[0].setCustomValidity('Please enter the course duration.');
    } else if (inputValue <= 0) {
        $('#feedbackMessage').text('Duration must be a positive number.');
        courseDurationInput[0].setCustomValidity('Duration must be a positive number.');
    } else {
        $('#feedbackMessage').text('');
        courseDurationInput[0].setCustomValidity('');

        // Store the validated data for later use
        const validatedData = {
            courseDuration: inputValue
        };
    }
}