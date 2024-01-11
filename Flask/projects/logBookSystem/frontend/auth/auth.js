$(document).ready(function() {
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: 'http://127.0.0.1:5000/auth/login',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                username: $('#username').val(),
                password: $('#password').val()
            }),
            xhrFields: {
                withCredentials: true
            }
        })
        .done(function(response) {
            console.log(response);
            if (Array.isArray(response) && response[0].message) {
                $('#message').text(response[0].message);
            }
            // Store the username in the session storage
            sessionStorage.setItem('username', $('#username').val());
            console.log(sessionStorage.getItem('username'));

            // Redirect to the home page after successful login
            window.location.href = '../home/home.html';
        })
        .fail(function(jqXHR) {
            console.log(jqXHR.responseJSON);
            if (Array.isArray(jqXHR.responseJSON) && jqXHR.responseJSON[0].message) {
                $('#message').text(jqXHR.responseJSON[0].message);
            }
        });
    });

    $('#signUpForm').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: 'http://127.0.0.1:5000/auth/register',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                username: $('#username').val(),
                password: $('#password').val(),
                role: $('#role').val()
            })
        })
        .done(function(response) {
            console.log('working');
            console.log(response)
            if (response[0].message) {
                $('#message').text(response[0].message);
                // Redirect to the sign in page after successful registration
                window.location.href = './signIn.html';
            }
        })
        .fail(function(jqXHR) {
            if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
                $('#message').text(jqXHR.responseJSON.message);
            }
        });
    });
});