const cluster = require('cluster');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

if(cluster.isMaster) {
    cluster.fork();
    cluster.on('exit', function (_worker, _code, _signal) {
        cluster.fork();
    });
}

if(cluster.isWorker) {
    var app = express();
    var server = http.createServer(app);
    const accountSid = 'ACa293c1c8bd4fa7f5c4c6cc2c70d571bd';
    const authToken = '6952539736744df67cd6e6e84c21d245';
    const client = require('twilio')(accountSid, authToken);

    app.set('port', process.env.PORT || 3000);
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.post('/events', function(req, res) {
        console.log("events");
        const bodyData = req.query;
        console.log(bodyData);
        res.status(200).end();
    });

    server.listen(app.get('port'), function () {
        console.log("Twilio API Server is running at Port " + app.get('port') + "\n");
    });

    setTimeout(function() {
        client.calls
        .create({
            method: 'GET',
            statusCallback: 'http://localhost:2700/events',
            statusCallbackMethod: 'POST',
            url: 'http://demo.twilio.com/docs/voice.xml',
            to: '+12099542606',
            from: '+40726088520'
        })
        .then(call => console.log(call.sid));
    }, 2000);
}