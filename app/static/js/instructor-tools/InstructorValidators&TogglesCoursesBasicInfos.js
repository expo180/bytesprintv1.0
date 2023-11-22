$(document).ready(function() {
    $('#NumberOfPapers').change(function() {
        var numberOfPapers = $(this).val();
        createPaperInputs(numberOfPapers);
    });

    function createPaperInputs(numPapers) {
        var paperInputsContainer = $('#paperInputsContainer');
        paperInputsContainer.empty();

        for (var i = 0; i < numPapers; i++) {
            paperInputsContainer.append(
                '<div class="form-group mt-3">' +
                '<label class="form-control-label">Paper/Invention ' + (i + 1) + '</label>' +
                '<div class="input-group">' +
                '<input class="form-control" type="text" name="paperTitle' + i + '" placeholder="Title">' +
                '<span class="input-group-text">Link</span>' +
                '<input class="form-control" type="url" name="paperLink' + i + '" placeholder="Reference">' +
                '</div>' +
                '</div>'
            );
        }
    }
    $('#NumberOfVideos').change(function() {
        var numberOfVideos = $(this).val();
        createVideoInputs(numberOfVideos);
    });
    function createVideoInputs(numVideos) {
        var videoInputsContainer = $('#videoInputsContainer');
        videoInputsContainer.empty();

        for (var i = 0; i < numVideos; i++) {
            videoInputsContainer.append(
                '<div class="form-group">' +
                '<label class="form-control-label">Video ' + (i + 1) + '</label>' +
                '<div class="input-group mb-3">' +
                '<span class="input-group-text">Title</span>' +
                '<input class="form-control" type="text" name="videoTitle' + i + '" placeholder="Title">' +
                '<span class="input-group-text">Link</span>' +
                '<input class="form-control" type="url" name="videoLink' + i + '" placeholder="Link">' +
                '</div>' +
                '</div>'
            );
        }
    }
});