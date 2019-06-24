"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(emailUsuario, nomeUsuario, passwordUsuario, idEmpresaUsuario, idFuncionarioUsuario) {
        this.emailUsuario = emailUsuario;
        this.nomeUsuario = nomeUsuario;
        this.passwordUsuario = passwordUsuario;
        this.idEmpresaUsuario = idEmpresaUsuario;
        this.idFuncionarioUsuario = idFuncionarioUsuario;
    }
    ;
    User.prototype.matches = function (another) {
        return another !== undefined &&
            another.emailUsuario === this.emailUsuario &&
            another.passwordUsuario === this.passwordUsuario;
    };
    return User;
}());
exports.User = User;
// export const users: {[key: string]: User} = {
//   "juliana@gmail.com": new User('juliana@gmail.com', 'Juliana', 'juliana23'),
//   "amanda@gmail.com": new User('amanda@gmail.com', 'Amanda', 'amanda21'),
//   "ale@gmail.com": new User('ale@gmail.com', 'Ale', 'ale10')
// };
