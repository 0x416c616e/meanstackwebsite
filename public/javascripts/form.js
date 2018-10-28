// File: /public/javascripts/form.js

$( function() {
    var $usrInput = $('#usr');
    var $pwdInput = $('#pwd');
    var $quoteButton = $('#quote');
    var $errorSpan = $('#error-span');
    var $quoteHeading = $('#quoteHeading');

    function validateUsr() {
        if ($usrInput.val() === '') {
            $errorSpan.attr('class', 'error');
            $errorSpan.html('* invalid user');
            $usrInput.focus();

        } else {
            $errorSpan.attr('class', 'no-error');
            $errorSpan.html('*');
        }
    }

    function validatePwd() {
        if ($pwdInput.val() === '') {
            $errorSpan.attr('class', 'error');
            $errorSpan.html('* invalid password');
            $pwdInput.focus();

        } else {
            $errorSpan.attr('class', 'no-error');
            $errorSpan.html('*');
        }
    }

    function getQuote(e) {
        e.preventDefault();

        var qs = { usr: $usrInput.val(), pwd: $pwdInput.val() };
   
        $.get('/quote', qs, function(response, status) {
            if (response.error) { $quoteHeading.html(response.error); }
            else                { $quoteHeading.html(response.quote); }
        }, 'json');
    }

    // Register the events.
    $usrInput.on('blur', validateUsr);
    $pwdInput.on('blur', validatePwd);
    $quoteButton.on('click', getQuote);

    $usrInput.focus();
});