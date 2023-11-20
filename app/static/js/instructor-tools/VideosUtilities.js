$(document).ready(function() {
    // Function to handle file removal
    $('#inputGroupFileAddon04').on('click', function() {
        // Clear the file input and hide the videosField
        $('#videosField').find('input[type=file]').val('');
        $('#videoError').text('');
    });
});
