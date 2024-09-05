var express = require('express');
var app = express();

app.get('/api/:date?', (req, res) => {
    let dateParam = req.params.date;
    let date;

    if (!dateParam) {
        date = new Date();
    } else {
        if (/^\d+$/.test(dateParam)) {
            date = new Date(parseInt(dateParam));
        } else {
            date = new Date(dateParam);
        }
    }

    if (isNaN(date.getTime())) {
        res.json({
            error: "Invalid date"
        });
    } else {
        res.json({
            unix: date.getTime(),
            utc: date.toUTCString()
        });
    }
});


var listener = app.listen(process.env.PORT || 3000, () => {
    console.log(`Timestamp Microservice is listening on port ${listener.address().port}`)
});