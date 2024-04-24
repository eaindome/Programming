$(document).ready(function() {
    // Fetch and display logs based on the current page
    var currentPage = window.location.pathname.split('/').pop();

    console.log('working')
    switch (currentPage) {
        case 'recentLogs.html':
            fetchAndDisplayLogs('http://127.0.1:5000/log/get-recent-logs', '#logs-table');
            break;
        case 'currentYearLogs.html':
            fetchAndDisplayLogs('http://127.0.1:5000/log/get-logs-current-year', '#logs-table');
            break;
        case 'totalLogs.html':
            fetchAndDisplayLogs('http://127.0.1:5000/log/get-total-logs', '#logs-table');
            break;
        default:
            console.error('Unknown page: ' + currentPage);
    }

    // Fetch and display log statistics
    $.ajax({
        url: 'http://127.0.1:5000/log/statistics',
        type: 'GET',
        xhrFields: {
            withCredentials: true
        },
        success: function(response) {
            $('#total-logs-count').text('Total logs count: ' + response.total_logs_count);
            $('#last-week-logs-count').text('Last week logs count: ' + response.last_week_logs_count);
        }
    });

    // Handle the back button click event
    $('#back-button').click(function() {
        console.log('working');
        window.location.href = '../home.html';
    });
});

// Function to fetch and display logs
function fetchAndDisplayLogs(url, tableId) {
    $.ajax({
        url: url,
        type: 'GET',
        xhrFields: {
            withCredentials: true
        }
    })
    .done(function(data) {
        // Loop through the logs and append them to the table
        data.forEach(function(log) {
            $(tableId).append('<tr><td>' + log.username + '</td><td>' + log.action + '</td><td>' + log.table_name + '</td><td>' + new Date(log.timestamp).toLocaleString() + '</td></tr>');
        });
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.error('Error fetching logs: ', textStatus, ', Details: ', errorThrown);
        console.error('Response: ', jqXHR.responseText);
    });
}

// Handle the back button click event
$('#back-button').click(function() {
    console.log('working');
    window.location.href = '../home.html';
});





/**
 * // Function to fetch and display logs
function fetchAndDisplayLogs(url, tableId) {
    $.ajax({
        url: url,
        type: 'GET',
        xhrFields: {
            withCredentials: true
        }
    })
    .done(function(data) {
        // Loop through the logs and append them to the table
        data.forEach(function(log) {
            $(tableId).append('<tr><td>' + log.username + '</td><td>' + log.action + '</td><td>' + log.table_name + '</td><td>' + new Date(log.timestamp).toLocaleString() + '</td></tr>');
        });
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.error('Error fetching logs: ', textStatus, ', Details: ', errorThrown);
        console.error('Response: ', jqXHR.responseText);
    });

    // Handle the back button click event
    $('#back-button').click(function() {
        console.log('working');
        window.location.href = '../home.html';  
    });
}

// Determine the current page and fetch the corresponding logs
var currentPage = window.location.pathname.split('/').pop();

switch (currentPage) {
    case 'recentLogs.html':
        fetchAndDisplayLogs('http://127.0.1:5000/log/get-recent-logs', '#logs-table');
        break;
    case 'currentYearLogs.html':
        fetchAndDisplayLogs('http://127.0.1:5000/log/get-logs-current-year', '#logs-table');
        break;
    case 'totalLogs.html':
        fetchAndDisplayLogs('http://127.0.1:5000/log/get-total-logs', '#logs-table');
        break;
    default:
        console.error('Unknown page: ' + currentPage);
}

// Handle the back button click event
$('#back-button').click(function() {
    console.log('working');
    window.location.href = '../home.html';  
});
 * 
 */