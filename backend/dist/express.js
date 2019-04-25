"use strict";
exports.__esModule = true;
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var fs = require("fs");
var https = require("https");
var auth_1 = require("./auth");
var authz_1 = require("./authz");
var routesContatos = require('./routes-contatos');
var server = express();
server.use(bodyParser.json());
server.use(cors());
server.post('/login', auth_1.handleAuthentication);
server.use('/contatos', authz_1.handleAuthorization);
server.use('/contatos', routesContatos);
var options = {
    cert: fs.readFileSync('./backend/keys/cert.pem'),
    key: fs.readFileSync('./backend/keys/key.pem')
};
https.createServer(options, server).listen(3001, function () {
    console.log('Server is running on https://localhost:3001');
});
