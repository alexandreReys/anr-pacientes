import * as jsonServer from 'json-server';
import * as fs from 'fs';
import * as https from 'https';
import { handleAuthentication } from './auth';
import { handleAuthorization } from './authz';
var server = jsonServer.create();
var router = jsonServer.router('db.json');
var middlewares = jsonServer.defaults();
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
// middleware para Login
server.post('/login', handleAuthentication);
server.use('/contatos', handleAuthorization);
// Use default router
server.use(router);
var options = {
    cert: fs.readFileSync('./backend/keys/cert.pem'),
    key: fs.readFileSync('./backend/keys/key.pem')
};
https.createServer(options, server).listen(3001, function () {
    console.log('JSON Server is running on https://localhost:3001');
});
//# sourceMappingURL=server.js.map