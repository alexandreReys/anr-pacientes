import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as normalizePort from 'normalize-port';
import { handleAuthentication } from './auth';
import { handleAuthorization } from './authz';
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
server.post('/login', handleAuthentication);
server.use('/contatos', handleAuthorization);
server.use('/contatos', routesContatos);
server.use('/consultas', handleAuthorization);
server.use('/consultas', routesConsultas);
server.use('/medicos', handleAuthorization);
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
//# sourceMappingURL=express.js.map