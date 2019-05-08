"use strict";
exports.__esModule = true;
var users_1 = require("./users");
// import * as jwt from 'jsonwebtoken';
// import { apiConfig } from './api-config';
exports.handleAuthentication = function (req, resp) {
    var user = req.body;
    if (isValid(user)) {
        var dbUser = users_1.users[user.email];
        // const token = jwt.sign({sub: dbUser.email, iss: 'anr-pacientes'}, apiConfig.secret);
        // resp.json({name: dbUser.name, email: dbUser.email, accessToken: token});
        resp.json({ name: dbUser.name, email: dbUser.email });
    }
    else {
        resp.status(403).json({ message: 'Dados invalidos !!' });
    }
};
function isValid(user) {
    if (!user) {
        return false;
    }
    var dbUser = users_1.users[user.email];
    return dbUser !== undefined && dbUser.matches(user);
}
