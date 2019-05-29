"use strict";
exports.__esModule = true;
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var http = require("http");
var normalizePort = require("normalize-port");
var auth_1 = require("./auth");
var authz_1 = require("./authz");
var routesContatos = require('./routes-contatos');
var routesConsultas = require('./routes-consultas');
var routesMedicos = require('./routes-medicos');
//import * as fs from 'fs';
//import * as https from 'https';
var server = express();
server.use(bodyParser.json());
server.use(cors());
server.get('/', function (req, res, next) {
    try {
        res.status(200).send({
            status: "API OK",
            version: "1.0.3"
        });
    }
    catch (e) {
        res.status(400).send(e);
    }
    ;
});
server.post('/login', auth_1.handleAuthentication);
server.use('/contatos', authz_1.handleAuthorization);
server.use('/contatos', routesContatos);
server.use('/consultas', authz_1.handleAuthorization);
server.use('/consultas', routesConsultas);
server.use('/medicos', authz_1.handleAuthorization);
server.use('/medicos', routesMedicos);
//
//const options = {
//   cert: fs.readFileSync('./backend/keys/cert.pem'),
//   key: fs.readFileSync('./backend/keys/key.pem')  };
//
var port = normalizePort(process.env.atendWeb_port || '3000'); // Variavel Ambiental
server.set('port', port);
http.createServer(server).listen(port, function () {
    console.log("Server is running on port " + port);
});
