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
        
        // Add image input
        '<label class="form-label mt-2" for="image' + i + '">Image ' + (i + 1) + '</label>' +
        '<input class="form-control" type="file" name="image' + i + '" id="image' + i + '">' +
        
        '<label class="form-label mt-2" for="paragraph' + i + '">Paragraph ' + (i + 1) + '</label>' +
        '<textarea class="form-control" name="paragraph' + i + '" id="paragraph' + i + '"></textarea>' +
        '</div>'
      );
    }
  }
});
