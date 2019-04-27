"use strict";
exports.__esModule = true;
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var http = require("http");
//import * as https from 'https';
var normalizePort = require("normalize-port");
var auth_1 = require("./auth");
var routesContatos = require('./routes-contatos');
var server = express();
server.use(bodyParser.json());
server.use(cors());
server.get('/', function (req, res, next) {
    try {
        res.status(200).send({
            status: "API OK",
            version: "1.0.1"
        });
    }
    catch (e) {
        res.status(400).send(e);
    }
    ;
});
server.post('/login', auth_1.handleAuthentication);
// server.use('/contatos', handleAuthorization);
server.use('/contatos', routesContatos);
//const options = {
//   cert: fs.readFileSync('./backend/keys/cert.pem'),
//   key: fs.readFileSync('./backend/keys/key.pem')
// };
var port = normalizePort(process.env.atendWeb_port || '3000'); // Variavel Ambiental
server.set('port', port);
http.createServer(server).listen(port, function () {
    console.log("Server is running on port " + port);
});
