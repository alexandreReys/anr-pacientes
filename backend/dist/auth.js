"use strict";
exports.__esModule = true;
var users_1 = require("./users");
// import * as jwt from 'jsonwebtoken';
// import { apiConfig } from './api-config';
exports.handleAuthentication = function (req, resp) {
    var user = req.body;
    console.log("handleAuthentication com " + users_1.User.name);
    if (isValid(user)) {
        var dbUser = users_1.users[user.email];
        // const token = jwt.sign({sub: dbUser.email, iss: 'anr-pacientes'}, apiConfig.secret);
        // resp.json({name: dbUser.name, email: dbUser.email, accessToken: token});
        console.log("isValid para " + dbUser.name);
        resp.json({ name: dbUser.name, email: dbUser.email });
    }
    else {
        resp.status(403).json({ message: 'Dados invalidos !!' });
    }
};
function isValid(user) {
    if (!user) {
        console.log("return false para " + users_1.User.name);
        return false;
    }
    var dbUser = users_1.users[user.email];
    console.log({ name: dbUser.name, email: dbUser.email });
    return dbUser !== undefined && dbUser.matches(user);
}
