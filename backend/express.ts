import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';
import * as https from 'https';
import * as normalizePort from 'normalize-port';

import { handleAuthentication } from './auth';
import { handleAuthorization } from './authz';

const routesContatos = require('./routes-contatos');

const server = express();
server.use(bodyParser.json());
server.use(cors());

server.post('/login', handleAuthentication);
server.use('/contatos', handleAuthorization);
server.use('/contatos', routesContatos);

const options = {
  cert: fs.readFileSync('./backend/keys/cert.pem'),
  key: fs.readFileSync('./backend/keys/key.pem')
};
const port = normalizePort(process.env.server_port || '3000');  // Variavel Ambiental
server.set('port', port);

https.createServer(options, server).listen(port, () => {
  console.log(`Server is running on port ${port}`);
});