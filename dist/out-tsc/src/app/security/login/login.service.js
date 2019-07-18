var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, NavigationEnd } from "@angular/router";
import { tap } from 'rxjs/internal/operators';
import { filter } from 'rxjs/internal/operators';
import { APP_API } from "../../app.api";
import { NotificationService } from "src/app/shared/messages/notification.service";
var LoginService = /** @class */ (function () {
    function LoginService(http, router, notificationService) {
        var _this = this;
        this.http = http;
        this.router = router;
        this.notificationService = notificationService;
        this.router.events.pipe(filter(function (e) { return e instanceof NavigationEnd; }))
            .subscribe(function (e) { return _this.lastUrl = e.url; });
    }
    ;
    LoginService.prototype.isLoggedIn = function () {
        return this.user != undefined;
    };
    ;
    LoginService.prototype.login = function (emailUsuario, password) {
        var _this = this;
        return this.http
            .post(APP_API + "/login", { emailUsuario: emailUsuario, passwordUsuario: password })
            .pipe(tap(function (user) { return _this.user = user; }));
    };
    ;
    LoginService.prototype.logout = function () {
        this.notificationService.notify(this.user.name + " logout !!");
        this.user = undefined;
        this.router.navigate(['/']);
    };
    ;
    LoginService.prototype.handleLogin = function (path) {
        if (path === void 0) { path = this.lastUrl; }
        this.router.navigate(['/login', btoa(path)]);
    };
    ;
    LoginService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient,
            Router,
            NotificationService])
    ], LoginService);
    return LoginService;
}());
export { LoginService };
//# sourceMappingURL=login.service.js.map