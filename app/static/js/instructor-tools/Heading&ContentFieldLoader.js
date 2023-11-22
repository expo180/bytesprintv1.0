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

                // Check if File Architecture checkbox is selected
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
                '<textarea class="form-control" name="paragraph' + i + '" id="paragraph' + i + '"></textarea>' +
                '</div>'
            );
        }
    }
});
