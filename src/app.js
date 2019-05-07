var express = require("express");
var path = require('path');
var proxy = require("express-http-proxy");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var routes = require('./routes')(app)


const config = require('config-lite')(__dirname)
// start
app.listen(config.port, config.ip, function () {
    console.log('# server starting.....http://' + config.ip + ":" + config.port);
});