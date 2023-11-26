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
                container.append(`<div class="border p-3 mb-3">
                                    <h5 class="font-weight-bold">Question ${i}</h5>
                                    <!-- Question input -->
                                    <div class="form-group">
                                        <label class="font-weight-bold">Question:</label>
                                        <input type="text" class="form-control" name="question${i}" required>
                                    </div>
                                    <!-- Options input -->
                                    <div class="form-group">
                                        <label>Options:</label>
                                        <input type="text" class="form-control" name="q${i}option1" required>
                                        <input type="text" class="form-control" name="q${i}option2" required>
                                        <input type="text" class="form-control" name="q${i}option3" required>
                                        <input type="text" class="form-control" name="q${i}option4" required>
                                    </div>
                                    <!-- Correct answer input -->
                                    <div class="form-group">
                                        <label class="font-weight-bold">Correct Answer:</label>
                                        <input type="text" class="form-control" name="q${i}correct" required>
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

})