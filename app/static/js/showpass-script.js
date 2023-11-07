$(document).ready(function(){
    var passInput = $("#floatingPassword");
    var eyeIcon = $("#showPass i.bi-eye");
    var eyeSlashIcon = $("#showPass i.bi-eye-slash");
    var barOverlay = $("#barOverlay");
    
    $("#showPass").on('click', function(){
        if (passInput.attr('type') === 'password') {
            passInput.attr('type', 'text');
            eyeIcon.hide();
            eyeSlashIcon.show();
            barOverlay.show();
        } else {
            passInput.attr('type', 'password');
            eyeIcon.show();
            eyeSlashIcon.hide();
            barOverlay.hide();
        }
    });
});
