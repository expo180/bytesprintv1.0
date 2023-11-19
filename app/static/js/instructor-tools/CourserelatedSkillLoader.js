$(document).ready(function() {
    var skillsDict = {
    'AI': [
        'Machine Learning', 
        'Deep Learning', 
        'Natural Language Processing',
        'Neural Network',
        'Tensorflow',
        'Python'
    ],
    'Robotics': ['Robot Programming', 'Computer Vision', 'Kinematics'],
    'Web_Dev': ['HTML', 'CSS', 'JavaScript', 'Backend Frameworks'],
    'DevOps': ['Continuous Integration', 'Containerization', 'Orchestration'],
    'Crypto': ['Blockchain', 'Smart Contracts', 'Cryptography'],
    'Data_Science': ['Data Analysis', 'Statistical Modeling', 'Data Visualization'],
    'Game_Dev': ['Game Design', 'Unity3D', 'Game Programming'],
    'App_Dev': ['Mobile App Development', 'iOS', 'Android'],
    'Cybersecurity': ['Network Security', 'Penetration Testing', 'Security Protocols']
    };
    $('#techField').change(function() {
        var selectedTech = $(this).val();
        updateRelatedSkills(selectedTech);
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
});
