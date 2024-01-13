$(document).ready(function() {
    var data = JSON.parse(decodeURIComponent(new URLSearchParams(window.location.search).get('data')));
    var date = new Date(data.date_requested);
    var formattedDate = date.toISOString().split('T')[0];
    // Populate the form fields with the retrieved data
    $('#company-name-input').val(data.company_name);
    $('#owners-name-input').val(data.owners_name),
    $('#initial-phone-input').val(data.initial_phone),
    $('#current-phone-input').val(data.current_phone),
    $('#email-input').val(data.email),
    $('#new-phone-input').val(data.new_phone),
    $('#date-requested-input').val(formattedDate)

    $('#save-btn').click(function() {
        var updatedData = {
            // Gather the data from the form fields
            'company_name': $('#company-name-input').val(),
            'owners_name': $('#owners-name-input').val(),
            'initial_phone': $('#initial-phone-input').val(),
            'current_phone': $('#current-phone-input').val(),
            'email': $('#email-input').val(),
            'new_phone': $('#new-phone-input').val(),
            'date_requested': $('#date-requested-input').val()
        };
        $.ajax({
            url: 'http://127.0.1:5000/forticlient-vpn/update-forticlient-data/' + data.vpn_id,
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

    // Send link button click event
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
                },
                xhrFields: {
                    withCredentials: true
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
});


/**    var date1 = new Date(data.date_in);
    var formattedDate1 = date1.toISOString().split('T')[0];
    var date2 = new Date(data.date_out);
    var formattedDate2 = date2.toISOString().split('T')[0]; */