$(document).ready(function() {
    var data = JSON.parse(decodeURIComponent(new URLSearchParams(window.location.search).get('data')));
    var date = new Date(data.date_reset);
    var formattedDate = date.toISOString().split('T')[0];
    // Populate the form fields with the retrieved data
    $('#staff-name-input').val(data.staff_name);
    $('#staff-username-input').val(data.staff_username),
    $('#district-input').val(data.district),
    $('#date-reset-input').val(formattedDate),
    $('#remarks-input').val(data.remarks)

    $('#save-btn').click(function() {
        var updatedData = {
            // Gather the data from the form fields
            'staff_name': $('#staff-name-input').val(),
            'staff_username': $('#staff-username-input').val(),
            'district': $('#district-input').val(),
            'date_reset': $('#date-reset-input').val(),
            'remarks': $('#remarks-input').val()
        };
        $.ajax({
            url: 'http://127.0.1:5000/password-reset/update-password-reset-data/' + data.reset_id,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({...updatedData, username: sessionStorage.getItem('username')}),
            xhrFields: {
                withCredentials: true
            }
        }).done(function(response) {
            console.log('response: ', response);
            if (response[0].status) {
                // Redirect back to table.html
                window.location.href = '../table/table.html';
                alert(response[0].message);
            } else {
                // Redirect back to table.html
                window.location.href = '../table/table.html';
                alert(response[0].message);
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            // Handle the error
            console.error('Request failed: ' + textStatus + ', ' + errorThrown);
        });
    });

    // Cancel button click event
    $('#cancel-btn').click(function() {
        window.location.href = '../table/table.html';
    });
});