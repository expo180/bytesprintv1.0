$(document).ready(function(){
	$("#course_title").on('input', function () {
        var title = $(this).val();
        $.ajax({
            url: '/api/v1/search/course/title',
            type: 'POST',
            data: { title: title },  // Send the title as data
            success: function (response) {
	            // Assuming the response is a JSON object with 'available' property
	            if (response.available) {
	            	// Course title is available
	            	$('#CourseTitleInUse').html('<i class="bi bi-check-circle-fill text-success"></i> <span class="text-success">' + title + 'is available!</span>');
	            	$('#courseTitleError').text('');
	            } else {
	                // Course title is not available
	                $('#CourseTitleInUse').html('<i class="bi bi-exclamation-circle-fill text-danger"></i> <span class="text-danger">' + title + ' already exists!</span>');
	                $('#courseTitleError').text('Course with this title already exists');
	            }
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
})