"use strict";
exports.__esModule = true;
var jwt = require("jsonwebtoken");
var api_config_1 = require("./api-config");
var connection = require('./mysql-connection');
exports.handleAuthentication = function (req, resp) {
    var reqUser = req.body;
    if (reqUser) {
        getEmailLogin(reqUser, function (err, rows) {
            if (err)
                throw err;
            if (rows[0]) {
                var dbUser = rows[0];
                var token = jwt.sign({ sub: dbUser.emailUsuario, iss: 'anr-pacientes' }, api_config_1.apiConfig.secret);
                resp.json({ name: dbUser.nomeUsuario, email: dbUser.emailUsuario, accessToken: token });
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
