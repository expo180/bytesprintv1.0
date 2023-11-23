$(document).ready(function() {
    $('#NumberOfHeadings').change(function() {
        var numberOfHeadings = $(this).val();
        createDynamicFields(numberOfHeadings);
    });

    function createDynamicFields(numberOfHeadings) {
        var dynamicFieldsContainer = $('#dynamicFieldsContainer');
        dynamicFieldsContainer.empty();

        // Ensure a minimum of 3 headings
        numberOfHeadings = Math.max(numberOfHeadings, 3);

        // Limit to a maximum of 20 headings
        numberOfHeadings = Math.min(numberOfHeadings, 20);

        for (var i = 0; i < numberOfHeadings; i++) {
            dynamicFieldsContainer.append(
                '<div class="form-group mb-4">' +
                '<label class="form-label" for="heading' + i + '">Heading ' + (i + 1) + '</label>' +
                '<input class="form-control" type="text" name="heading' + i + '" id="heading' + i + '">' +

                // Check if Code Snippets checkbox is selected
                ($('#codeSnippets').is(':checked') ?
                    '<label class="form-label mt-2" for="codeEditor' + i + '">Code Editor ' + (i + 1) + '</label>' +
                    '<textarea class="form-control" name="codeEditor' + i + '" id="codeEditor' + i + '"></textarea>' :
                    '') +

                // Check if Image checkbox is selected
                ($('#Image').is(':checked') ?
                    '<label class="form-label mt-2" for="Image' + i + '">Image ' + (i + 1) + '</label>' +
                    '<input class="form-control" type="file" name="Image' + i + '" id="Image' + i + '">' :
                    '') +

                // Check if Image checkbox is selected
                ($('#fileArchitecture').is(':checked') ?
                    '<label class="form-label mt-2" for="fileArchitecture' + i + '">File Architecture ' + (i + 1) + '</label>' +
                    '<input class="form-control" type="file" name="fileArchitecture' + i + '" id="fileArchitecture' + i + '">' :
                    '') +

                // Check if Electronic Circuit checkbox is selected
                ($('#electronicCircuit').is(':checked') ?
                    '<label class="form-label mt-2" for="electronicCircuit' + i + '">Electronic Circuit ' + (i + 1) + '</label>' +
                    '<input class="form-control" type="file" name="electronicCircuit' + i + '" id="electronicCircuit' + i + '">' :
                    '') +

                // Check if Complex 3D checkbox is selected
                ($('#complex3D').is(':checked') ?
                    '<label class="form-label mt-2" for="complex3D' + i + '">Complex 3D ' + (i + 1) + '</label>' +
                    '<input class="form-control" type="file" name="complex3D' + i + '" id="complex3D' + i + '">' :
                    '') +
                
                '<label class="form-label mt-2" for="paragraph' + i + '">Paragraph ' + (i + 1) + '</label>' +
                '<div id="quillEditor' + i + '"></div>' + // Quill container

                '<button class="btn btn-outline-secondary mt-2" id="copyText' + i + '">' +
                '<i class="bi bi-clipboard"></i> Copy' +
                '</button>' +

                '</div>'
            );
            var quill = new Quill('#quillEditor' + i, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline'],
                        [{ 'list': 'bullet' }],
                        ['link'],
                        ['clean']
                    ]
                }
            });
            $('#copyText' + i).click(function() {
                var quillText = quill.getText();
            });
        }
    }

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