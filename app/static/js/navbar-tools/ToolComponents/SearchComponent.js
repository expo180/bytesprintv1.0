$(document).ready(function () {
  $('.bi-search').on('click', function () {
    // Create an input element for the search field
    var inputField = document.createElement('input');
    inputField.setAttribute('type', 'text');
    inputField.setAttribute('placeholder', 'Enter your search term');
    inputField.classList.add('form-control');

    // Display a SweetAlert with an input field when the search icon is clicked
    Swal.fire({
      title: '<span class="bi bi-search me-2 text-primary"></span> <span class="text-primary">Search</span>',
      html: inputField.outerHTML, // Add the symbol to indicate it's a search bar
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: '>_ Go', // Add a cross icon to the cancel button
      customClass: {
        popup: 'custom-alert', // Apply a custom class to the popup
      },
      preConfirm: () => {
        // You can access the value entered by the user using `Swal.getPopup().querySelector('input').value`
        var searchTerm = Swal.getPopup().querySelector('input').value;

        // Perform any actions with the entered search term here
        if (searchTerm) {
          Swal.fire({
            title: 'Search Term',
            text: 'You searched for: ' + searchTerm,
            icon: 'info',
            confirmButtonText: 'OK'
          });
        } else {
          Swal.showValidationMessage('Please enter a search term');
        }
      }
    });
  });
});
