import * as jwt from 'jsonwebtoken';
import { apiConfig } from './api-config';
var connection = require('./mysql-connection');
export var handleAuthentication = function (req, resp) {
    var reqUser = req.body;
    if (reqUser) {
        getEmailLogin(reqUser, function (err, rows) {
            if (err)
                throw err;
            if (rows[0]) {
                var dbUser = rows[0];
                var emailUsuario = rows[0].emailUsuario;
                var token = jwt.sign({ sub: emailUsuario, iss: 'anr-pacientes' }, apiConfig.secret);
                resp.json({
                    name: dbUser.nomeUsuario,
                    email: dbUser.emailUsuario,
                    accessToken: token,
                    idEmpresaUsuario: dbUser.idEmpresaUsuario,
                    idFuncionarioUsuario: dbUser.idFuncionarioUsuario
                });
            }
            else {
                resp.status(403).json({ message: 'Dados invalidos !!' });
            }
        });
    }
    else {
        resp.status(403).json({ message: 'Dados invalidos !!' });
    }
};
function getEmailLogin(reqUser, callback) {
    var emailUsuario = reqUser.emailUsuario;
    var passwordUsuario = reqUser.passwordUsuario;
    var sql = "SELECT * FROM awUsuarios WHERE (emailUsuario = '" + emailUsuario + "') and (passwordUsuario = '" + passwordUsuario + "')";
    connection.query(sql, function (error, rows) {
        return callback(error, rows);
    });
}
;
//# sourceMappingURL=auth.js.map