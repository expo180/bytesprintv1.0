import { collectAndValidateQuizData, collectAndValidateProjectData, collectAndValidateRequirementsData } from './InstructorQuizzToggles.js'

$(document).ready(function () {
    $('#SubmitButton').on('click', function () {
       
        collectAndValidateQuizData();
        collectAndValidateRequirementsData();
        collectAndValidateProjectData();

    $.ajax({

    })

    });
})