$(document).ready(function() {
    $.ajax({
        url: 'http://127.0.1:5000/users/get-logged-in-user',
        method: 'GET',
        contentType: 'application/json',
        xhrFields: {
            withCredentials: true
        }
    })
    .done(function(response) {
        // Update the user info on the page
        $('#welcome-username').text(response.username);
        $('#profile-username').text(response.username);
        $('#role').text(response.user_role);
        $('#start-date').text(response.start_date);
        $('#end-date').text(response.end_date);
    })
    .fail(function(jqXHR) {
        console.log(jqXHR.responseJSON);
    });

    // Fetch the logs when the page loads
    $.ajax({
        url: 'http://127.0.1:5000/log/get-recent-logs',
        type: 'GET',
        xhrFields: {
            withCredentials: true
        }
    })
    .done(function(data) {
        // Loop through the logs and append them to the table
        data.forEach(function(log) {
            $('#logs-table tbody').append('<tr><td>' + log.username + '</td><td>' + log.action + '</td><td>' + log.table_name + '</td><td>' + new Date(log.timestamp).toLocaleString() + '</td></tr>');
        });
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.error('Error fetching logs: ', textStatus, ', Details: ', errorThrown);
        console.error('Response: ', jqXHR.responseText);
    });

    $('#update-info-button').click(function() {
        window.location.href = './update/updateInfo.html';  
    });

    $('#recent-logs-button').click(function() {
        window.location.href = './logs/recentLogs.html';  
    });
    
    $('#current-year-logs-button').click(function() {
        window.location.href = './logs/currentYearLogs.html'; 
    });
    
    $('#total-logs-button').click(function() {
        window.location.href = './logs/totalLogs.html';  
    });

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