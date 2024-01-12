$(document).ready(function() {
    var currentUsername = sessionStorage.getItem('username');

    $('#current-username').val(currentUsername);

    $('#update-form').submit(function(event) {
        event.preventDefault();  // prevent the form from being submitted normally

        var formData = {
            'username': $('#username').val(),
            'user_password': $('#user_password').val(),
            'user_role': $('#user_role').val(),
            'start_date': $('#start_date').val(),
            'end_date': $('#end_date').val()
        };

        $.ajax({
            type: 'PUT',
            url: 'http://127.0.1:5000/users/update_user/' + currentUsername,
            data: JSON.stringify(formData),
            contentType: 'application/json',
            xhrFields: {
                withCredentials: true
            }
        })
        .done(function(response) {
            if (response.message) {
                $('#message').text(response.message);
            } else {
                $('#message').text('User updated successfully');
            }

            // Redirect to the home page after  successful login
            window.location.href = '../home.html';
        })
        .fail(function(response) {
            if (response.message) {
                $('#message').text(response.message);
            } else {
                $('#message').text('Error updating user');
            }
        });
    });
});