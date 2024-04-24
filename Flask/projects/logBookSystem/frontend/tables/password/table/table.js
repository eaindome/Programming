$(document).ready(function() {
    // Fetch the FortiClient data and populate the table
    $.ajax({
        url: 'http://127.0.0.1:5000/password-reset/get-all-password-reset-data',
        method: 'GET',
        xhrFields: {
            withCredentials: true
        }
    }).done(function(data) {
        var password_data = data[0].data;
        password_data.sort(function(firstData, secondData) {
            return new Date(secondData.timestamp) - new Date(firstData.timestamp)
        });
        password_data.forEach(function(passwordReset) {
            $('#password-reset-table tbody').append(`
                <tr>
                    <td>${passwordReset.reset_id}</td>
                    <td>${passwordReset.staff_name}</td>
                    <td>${passwordReset.staff_username}</td>
                    <td>${passwordReset.district}</td>
                    <td>${passwordReset.date_reset}</td>
                    <td>${passwordReset.remarks}</td>
                    <td>${passwordReset.reset_by}</td>
                    <td>${passwordReset.timestamp}</td>
                </tr>
            `);
        });
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error(`Request failed: ${textStatus}, ${errorThrown}`);
    });

    $('#add-btn').click(function() {
        window.location.href = '../addForm/form.html';  
    });

    $('#update-btn').click(function() {
        var reset_id = prompt("Enter the ID of the row to be updated");
        console.log('reset id', reset_id)
        if (reset_id) {
            $.ajax({
                url: 'http://127.0.0.1:5000/password-reset/get-password-reset-data/' + reset_id,
                type: 'GET',
                xhrFields: {
                    withCredentials: true
                }
            }).done(function(data) {
                if (data[0].status) {
                    console.log('working')
                    console.log(data[0].data);

                    // Redirect to form.html and pass the data as a query parameter
                    window.location.href = '../updateForm/form.html?data=' + encodeURIComponent(JSON.stringify(data[0].data));
                } else {
                    console.log('Problem')
                    alert(data.message);
                }
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.error(`Request failed: ${textStatus}, ${errorThrown}`);
            });
        }
    });

    $('#delete-btn').click(function() {
        var resetId = prompt('Enter the Password Reset ID of the row to be deleted');
        if (resetId) {
            $.ajax({
                url: 'http://127.0.1:5000/password-reset/delete-forticlient-data/' + resetId,
                type: 'DELETE',
                xhrFields: {
                    withCredentials: true
                }
            }).done(function(response) {
                alert(response.message);
                // Reload the table data
                window.location.href = './table.html';
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.error('Request failed: ' + textStatus + ', ' + errorThrown);
            });
        }
    });

    $('#search-btn').click(function() {
        var searchQuery = $('#search-input').val();
        $.ajax({
            url: 'http://127.0.1:5000/password-reset/search-password-reset-data',
            type: 'GET',
            data: {
                search: searchQuery
            },
            xhrFields: {
                withCredentials: true
            }
        }).done(function(response) {
            if (response[0].status) {
                console.log('working');
                // Display the search results
                displaySearchResults(response[0].data);
            } else {
                console.log('not working');
                alert(response[0].message);
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.error('Request failed: ' + textStatus + ', ' + errorThrown);
        });
    });

    $('#back-btn').hide();

    $('.bx-log-out').parent().click(function(e) {
        e.preventDefault(); // Prevent the default action
        var logoutConfirmed = confirm("Are you sure you want to log out?");
        if (logoutConfirmed) {
            $.ajax({
                url: 'http://127.0.1:5000/auth/logout',
                method: 'POST',
                xhrFields: {
                    withCredentials: true
                }
            })
            .done(function(response) {
                alert(response[0].message);
                window.location.href = '../auth/signIn.html';
            })
            .fail(function(jqXHR) {
                console.log(jqXHR.responseJSON);
            });
        }
    });
});

function displaySearchResults(results) {
    // Get the table body
    var tableBody = $('#results-table tbody');

    // Clear the existing table data
    tableBody.empty();

    // If no results, hide the results table and show an alert
    if (results.length === 0) {
        $('#results-table').hide();
        alert('No results found');
        return;
    }

    // hide the main table and other buttons
    $('#password-reset-table').hide()
    $('#update-btn').hide()
    $('#delete-btn').hide()
    $('#add-btn').hide()

    // Show the results table
    $('#results-table').show();

    // show back button
    $('#back-btn').show();
    $('#back-btn').click(function() {
        window.location.href = '../table/table.html';  
    });

    // Iterate over the results and add each one to the table
    results.forEach(function(result) {
        var row = $('<tr>');

        // Add each property of the result as a cell
        for (var property in result) {
            var cell = $('<td>').text(result[property]);
            row.append(cell);
        }

        tableBody.append(row);
    });
}