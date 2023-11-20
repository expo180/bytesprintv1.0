import { skillsDict } from './SkillsDictionary.js';
$(document).ready(function() {
    
      var selectedSkills = [];  // Array to store selected skills

    $('#techField').change(function() {
        var selectedTech = $(this).val();
        updateRelatedSkills(selectedTech);
    });

    $(document).on('click', '.related-skills', function() {
        var clickedSkill = $(this).text()
        // Toggle selection
        if (selectedSkills.includes(clickedSkill)) {
            // Skill is already selected, remove it
            selectedSkills = selectedSkills.filter(skill => skill !== clickedSkill);
        } else {
            // Skill is not selected, add it
            selectedSkills.push(clickedSkill);
        }

        // Update button style based on selection
        $(this).toggleClass('selected-skill');

        // You can display the selected skills in a separate container if needed
        displaySelectedSkills();
    });

    function updateRelatedSkills(techField) {
        var relatedSkillsList = $('#relatedSkillsList');
        relatedSkillsList.empty();

        var skills = skillsDict[techField] || [];

        if (skills.length > 0) {
            $.each(skills, function(index, skill) {
                relatedSkillsList.append('<li class="list-inline-item"><button type="button" class="badge related-skills text-primary-emphasis bg-primary-subtle rounded-pill">' + skill + '</button></li>');
            });
        } else {
            relatedSkillsList.append('<li class="list-inline-item text-danger">No related skills found.</li>');
        }
    }

    function displaySelectedSkills() {
        // Display the selected skills, you can customize this based on your needs
        console.log('Selected Skills:', selectedSkills);
    }

    // Add a button or event listener to save the selected skills to the database
    $('#saveSkillsButton').click(function() {
        // Assuming you have an endpoint to handle saving skills on the server
        $.ajax({
            url: '/save_skills',  // Update with your server endpoint
            type: 'POST',
            data: { skills: selectedSkills },
            success: function(response) {
                console.log('Skills saved successfully');
            },
            error: function(error) {
                console.log('Error saving skills:', error);
            }
        });
    });
});
