var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from 'src/app/security/login/login.service';
import { APP_API } from './../app.api';
var ContatoService = /** @class */ (function () {
    function ContatoService(httpClient, loginService, localStorage) {
        this.httpClient = httpClient;
        this.loginService = loginService;
        this.localStorage = localStorage;
    }
    ContatoService.prototype.save = function (contato) {
        this.localStorage.set(contato.id, contato);
    };
    ContatoService.prototype.getContato = function (id) {
        return this.localStorage.get(id);
    };
    // getAll(): Contato[]{ return this.localStorage.keys().map(id => this.getContato(id)); }
    ContatoService.prototype.contatos = function () {
        var headers = new HttpHeaders();
        if (this.loginService.isLoggedIn()) {
            headers = headers.set('Authorization', "Bearer " + this.loginService.user.accessToken);
        }
        ;
        return this.httpClient
            .get(APP_API + "/contatos", { headers: headers });
    };
    ;
    ContatoService.prototype.delete = function (contato) {
        // this.localStorage.remove(contato.id);
        var headers = new HttpHeaders();
        if (this.loginService.isLoggedIn()) {
            headers = headers.set('Authorization', "Bearer " + this.loginService.user.accessToken);
        }
        ;
        var url = APP_API + "/contatos/" + contato.id;
        console.log("URL = " + url);
        // return this.httpClient.delete(url, {headers: headers});
    };
    ContatoService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient,
            LoginService,
            LocalStorageService])
    ], ContatoService);
    return ContatoService;
}());
export { ContatoService };
//# sourceMappingURL=contato.service.js.map