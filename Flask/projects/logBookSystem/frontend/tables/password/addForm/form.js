$(document).ready(function() {
    // Save button click event
    $('#save-btn').click(function() {
        console.log(34);
        var data = {
            staff_name: $('#staff-name-input').val(),
            staff_username: $('#staff-username-input').val(),
            district: $('#district-input').val(),
            date_reset: $('#date-reset-input').val(),
            remarks: $('#remarks-input').val()
        };
        $.ajax({
            url: 'http://127.0.1:5000/password-reset/create-password-reset',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({...data, username: sessionStorage.getItem('username')}),
            xhrFields: {
                withCredentials: true
            }
        }).done(function() {
            alert('Password Reset data added successfully');
            window.location.href = '../table/table.html';
        }).fail(function(jqXHR, textStatus, errorThrown) {
            alert(`Request failed: ${textStatus}, ${errorThrown}`);
        });
    });

    // Cancel button click event
    $('#cancel-btn').click(function() {
        window.location.href = '../table/table.html';
    });

    /* Send link button click event
    $('#send-link-btn').click(function() {
        var email = prompt('Enter the email:');
        var table_name = prompt('Enter the table name:');
        if (email && table_name) {
            $.ajax({
                url: 'http://127.0.1:5000/authenticate/send_link',
                method: 'POST',
                data: {
                    email: email,
                    table_name: table_name
                }
            }).done(function() {
                alert('Email sent!');
            }).fail(function(jqXHR, textStatus, errorThrown) {
                alert(`Request failed: ${textStatus}, ${errorThrown}`);
            });
        } else {
            alert('Email and table name are required to send a link.');
        }
    });
    */
});