import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as normalizePort from 'normalize-port';
import { handleAuthentication } from './auth';
import { handleAuthorization } from './authz';

const routesContatos = require('./routes-contatos');
const routesConsultas = require('./routes-consultas');
const routesMedicos = require('./routes-medicos');

//import * as fs from 'fs';
//import * as https from 'https';

const server = express();
server.use( bodyParser.json() );
server.use( cors() );

server.get('/', (req, res, next) => {
	try {
		res.status(200).send({
			status: "API OK",
			version: "1.0.3"
		})
	} catch(e) {
		res.status(400).send(e)
	};
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
const port = normalizePort(process.env.atendWeb_port || '3000');  // Variavel Ambiental
server.set('port', port);

http.createServer(server).listen(port, () => {
  console.log(`Server is running on port ${port}`);
});