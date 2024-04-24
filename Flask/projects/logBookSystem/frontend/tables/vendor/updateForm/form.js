function convertDate(inputFormat) {
    if (!inputFormat) {
        return null;
    }
    var parts = inputFormat.split('/');
    /*
    console.log('parts: ', parts)
    console.log('parts[2]: ', parts[2])
    console.log('parts[1]-1: ', parts[1])
    console.log('parts[0]: ', parts[0])
    console.log('new Date(parts[2], parts[1]-1, parts[0]): ', new Date(parts[2], parts[1]-1, parts[0]))
    console.log('new Date(parts[2], parts[1]-1, parts[0]).toISOString(): ', new Date(parts[2], parts[1]-1, parts[0]).toISOString())
    console.log('new Date(parts[2], parts[1]-1, parts[0]).toISOString().split(\'T\')[0]: ', new Date(parts[2], parts[1]-1, parts[0]).toISOString().split('T')[0])
    */
    console.log('working')
    return new Date(parts[2], parts[1]-1, parts[0]).toISOString().split('T')[0];
}

$(document).ready(function() {
    var data = JSON.parse(decodeURIComponent(new URLSearchParams(window.location.search).get('data')));
    // Populate the form fields with the retrieved data
    $('#company-name-input').val(data.company_name);
    $('#phone-number-input').val(data.phone_number),
    $('#email-input').val(data.email),
    $('#district-input').val(data.district),
    $('#pc-brand-input').val(data.pc_brand),
    $('#pc-serial-num-input').val(data.pc_serial_num),
    $('#complaint-input').val(data.complaint),
    $('#date-in-input').val(convertDate(data.date_in)),
    $('#date-out-input').val(convertDate(data.date_out))

    $('#save-btn').click(function() {
        console.log('working')
        var updatedData = {
            // Gather the data from the form fields
            'company_name': $('#company-name-input').val(),
            'phone_number': $('#phone-number-input').val(),
            'district': $('#district-input').val(),
            'pc_brand': $('#pc-brand-input').val(),
            'email': $('#email-input').val(),
            'pc_serial_num': $('pc-serial-num-input').val(),
            'date_requested': $('#complaint-input').val(),
            'date_in': $('#date-in-input').val(),
            'date_out': $('#date-out-input').val()
        };
        $.ajax({
            url: 'http://127.0.1:5000/vendor/update-vendor/' + data.vendor_book_id,
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