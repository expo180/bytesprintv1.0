$(document).ready(function() {
    $('.lang-select').select2({
        templateResult: formatLangOption
    });
});

function formatLangOption(option) {
    if (!option.id) {
        return option.text;
    }

    var $option = $(
        '<span><img src="' + $(option.element).data('thumbnail') + '" class="flag-icon" /> ' + option.text + '</span>'
    );

    return $option;
}