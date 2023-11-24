$(document).ready(function () {
    $('#NumberOfHeadings').change(function () {
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
            var isCodeSnippetsChecked = $('#codeSnippets').is(':checked');
            var isImageChecked = $('#Image').is(':checked');
            var isFileArchitectureChecked = $('#fileArchitecture').is(':checked');
            var isElectronicCircuitChecked = $('#electronicCircuit').is(':checked');
            var isComplex3DChecked = $('#complex3D').is(':checked');

            dynamicFieldsContainer.append(
                '<div class="form-group mb-4">' +
                '<label class="form-label" for="heading' + i + '">Heading ' + (i + 1) + '</label>' +
                '<input class="form-control" type="text" name="heading' + i + '" id="heading' + i + '">' +

                (isCodeSnippetsChecked ?
                    '<label class="form-label mt-2" for="codeEditor' + i + '">Code Editor ' + (i + 1) + '</label>' +
                    '<textarea class="form-control code-editor" name="codeEditor' + i + '" id="codeEditor' + i + '"></textarea>' :
                    '') +

                (isImageChecked ?
                    '<label class="form-label mt-2" for="Image' + i + '">Image ' + (i + 1) + '</label>' +
                    '<input class="form-control" type="file" name="Image' + i + '" id="Image' + i + '">' :
                    '') +

                (isFileArchitectureChecked ?
                    '<label class="form-label mt-2" for="fileArchitecture' + i + '">File Architecture ' + (i + 1) + '</label>' +
                    '<input class="form-control" type="file" name="fileArchitecture' + i + '" id="fileArchitecture' + i + '">' :
                    '') +

                (isElectronicCircuitChecked ?
                    '<label class="form-label mt-2" for="electronicCircuit' + i + '">Electronic Circuit ' + (i + 1) + '</label>' +
                    '<input class="form-control" type="file" name="electronicCircuit' + i + '" id="electronicCircuit' + i + '">' :
                    '') +

                (isComplex3DChecked ?
                    '<label class="form-label mt-2" for="complex3D' + i + '">Complex 3D ' + (i + 1) + '</label>' +
                    '<input class="form-control" type="file" name="complex3D' + i + '" id="complex3D' + i + '">' :
                    '') +

                '<label class="form-label mt-2" for="paragraph' + i + '">Paragraph ' + (i + 1) + '</label>' +
                '<div id="quillEditor' + i + '"></div>' + // Quill container
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

            var codeMirrorEditor = null;

            if ($('#codeSnippets').is(':checked')) {
                codeMirrorEditor = CodeMirror.fromTextArea(document.getElementById('codeEditor' + i), {
                    lineNumbers: true,
                    mode: 'javascript',
                    theme: 'cobalt',
                    matchBrackets: true,
                    styleActiveLine: true,
                    placeholder: 'Type your code here...',
                    fontFamily: 'Source Code Pro'
                });

                // Add word count and file size counters
                var wordCount = $('<div class="word-count" id="wordCount' + i + '">Word count: 0</div>').insertAfter(codeMirrorEditor.getWrapperElement());
                var fileSize = $('<div class="file-size" id="fileSize' + i + '">File size: 0 B</div>').insertAfter(wordCount);

                codeMirrorEditor.on('change', function (instance) {
                    updateWordCount(instance, wordCount);
                    updateFileSize(instance, fileSize);
                });

                function updateWordCount(editor, wordCountElement) {
                    var text = editor.getValue();
                    var words = text.split(/\s+/).filter(function (word) {
                        return word !== '';
                    });
                    wordCountElement.text('Word count: ' + words.length);
                }

                function updateFileSize(editor, fileSizeElement) {
                    var text = editor.getValue();
                    var fileSizeBytes = text.length * 2; // Assuming 1 character = 2 bytes
                    fileSizeElement.text('File size: ' + fileSizeBytes + ' B');
                }
            }
        }
    }

    $('#NumberOfKeyAspects').change(function () {
      var numberOfKeyAspects = $(this).val();
      createKeyAspectsFields(numberOfKeyAspects);
    });

    function createKeyAspectsFields(numberOfKeyAspects) {
      var keyAspectsContainer = $('#keyAspectsContainer');
      keyAspectsContainer.empty();

      for (var i = 0; i < numberOfKeyAspects; i++) {
        keyAspectsContainer.append(
          '<div class="form-group mb-4">' +
          '<label class="form-label" for="keyAspect' + i + '">Key Aspect ' + (i + 1) + '</label>' +
          '<input class="form-control" type="text" name="keyAspect' + i + '" id="keyAspect' + i + '">' +
          '</div>'
        );
      }
    }

    // Toggle based on the initial value of NumberOfKeyAspects
    createKeyAspectsFields($('#NumberOfKeyAspects').val());

    $('#NumberOfSteps').change(function () {
      var numberOfSteps = $(this).val();
      createStepsFields(numberOfSteps);
    });

    function createStepsFields(numberOfSteps) {
      var stepsContainer = $('#stepsContainer');
      stepsContainer.empty();

      for (var i = 0; i < numberOfSteps; i++) {
        stepsContainer.append(
          '<div class="form-group mb-4">' +
          '<label class="form-label" for="step' + i + '">Step ' + (i + 1) + '</label>' +
          '<input type="text" class="form-control" name="step' + i + '" id="step' + i + '"></input>' +
          '</div>'
        );
      }
    }

    // Toggle based on the initial value of NumberOfSteps
    createStepsFields($('#NumberOfSteps').val());

    $('#NumberOfPapers').change(function () {
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

    $('#NumberOfVideos').change(function () {
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
