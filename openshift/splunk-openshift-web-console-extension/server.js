var express = require('express'),
    http = require('http'),
    path = require('path'),
    app = express();

app.use(express.static(path.join(__dirname, '/static')));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/static/index.html');
});

http.createServer(app).listen(8080, function () {
    console.log("Express server listening on port 8080");
});