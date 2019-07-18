var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { LoginService } from 'src/app/security/login/login.service';
var UserDatailsComponent = /** @class */ (function () {
    function UserDatailsComponent(loginService) {
        this.loginService = loginService;
    }
    UserDatailsComponent.prototype.ngOnInit = function () {
    };
    ;
    UserDatailsComponent.prototype.user = function () {
        return this.loginService.user;
    };
    ;
    UserDatailsComponent.prototype.isLoggedIn = function () {
        return this.loginService.isLoggedIn();
    };
    ;
    UserDatailsComponent.prototype.login = function () {
        this.loginService.handleLogin();
    };
    ;
    UserDatailsComponent.prototype.logout = function () {
        this.loginService.logout();
    };
    ;
    UserDatailsComponent = __decorate([
        Component({
            selector: 'app-user-datails',
            templateUrl: './user-datails.component.html',
            styleUrls: ['./user-datails.component.css']
        }),
        __metadata("design:paramtypes", [LoginService])
    ], UserDatailsComponent);
    return UserDatailsComponent;
}());
export { UserDatailsComponent };
;
//# sourceMappingURL=user-datails.component.js.map