import * as jwt from 'jsonwebtoken';
import { apiConfig } from './api-config';
export var handleAuthorization = function (req, resp, next) {
    var token = extractToken(req);
    if (!token) {
        resp.setHeader('www-Authenticate', 'Bearer token_type="JWT"');
        resp.status(401).json({ message: 'Você precisa se autenticar' });
    }
    else {
        jwt.verify(token, apiConfig.secret, function (error, decoded) {
            if (decoded) {
                next();
            }
            else {
                resp.status(403).json({ message: 'Não autorizado' });
            }
        });
    }
};
function extractToken(req) {
    var token = undefined;
    if (req.headers && req.headers.authorization) {
        //Autorization: Bearer zzz.zzz.zzz
        var parts = req.headers.authorization.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {
            token = parts[1];
        }
    }
    return token;
}
//# sourceMappingURL=authz.js.map