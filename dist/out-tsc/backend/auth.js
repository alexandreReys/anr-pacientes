import { users } from "./users";
import * as jwt from 'jsonwebtoken';
import { apiConfig } from './api-config';
export var handleAuthentication = function (req, resp) {
    var user = req.body;
    if (isValid(user)) {
        var dbUser = users[user.email];
        var token = jwt.sign({ sub: dbUser.email, iss: 'anr-pacientes' }, apiConfig.secret);
        resp.json({ name: dbUser.name, email: dbUser.email, accessToken: token });
    }
    else {
        resp.status(403).json({ message: 'Dados invalidos !!' });
    }
};
function isValid(user) {
    if (!user) {
        return false;
    }
    var dbUser = users[user.email];
    return dbUser !== undefined && dbUser.matches(user);
}
//# sourceMappingURL=auth.js.map