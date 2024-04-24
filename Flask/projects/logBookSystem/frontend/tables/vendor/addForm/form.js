$(document).ready(function() {
    // Save button click event
    $('#save-btn').click(function() {
        console.log(34);
        var data = {
            company_name: $('#company-name-input').val(),
            phone_number: $('#phone-number-input').val(),
            email: $('#email-input').val(),
            district: $('#district-input').val(),
            pc_brand: $('#pc-brand-input').val(),
            pc_serial_num: $('#pc-serial-num-input').val(),
            complaint: $('#complaint-input').val(),
            date_in: $('#date-in-input').val(),
            date_out: $('#date-out-input').val()
        };
        $.ajax({
            url: 'http://127.0.1:5000/vendor/add-vendor',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({...data, username: sessionStorage.getItem('username')}),
            xhrFields: {
                withCredentials: true
            }
        }).done(function() {
            alert('Vendor PC data added successfully');
            window.location.href = '../table/table.html';
        }).fail(function(jqXHR, textStatus, errorThrown) {
            alert(`Request failed: ${textStatus}, ${errorThrown}`);
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