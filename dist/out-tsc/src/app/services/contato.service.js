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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators';
import { APP_API } from 'src/app/app.api';
import { LoginService } from 'src/app/security/login/login.service';
import { ErrorHandler } from '../app.error-handler';
var ContatoService = /** @class */ (function () {
    function ContatoService(httpClient, loginService) {
        this.httpClient = httpClient;
        this.loginService = loginService;
        this.url = APP_API + "/contatos";
    }
    ContatoService.prototype.getContatos = function (search) {
        if (search) {
            var urlGet = APP_API + "/contatos/" + search;
            return this.httpClient
                .get(urlGet, { headers: this.getHeaders() })
                .pipe(catchError(function (error) { return ErrorHandler.handleError(error); }));
        }
        else {
            return this.httpClient
                .get(this.url, { headers: this.getHeaders() })
                .pipe(catchError(function (error) { return ErrorHandler.handleError(error); }));
        }
    };
    ;
    ContatoService.prototype.getContatosCodigo = function (codigoPaciente) {
        var urlGet = APP_API + "/contatos/codigo/" + codigoPaciente;
        return this.httpClient
            .get(urlGet, { headers: this.getHeaders() })
            .pipe(catchError(function (error) { return ErrorHandler.handleError(error); }));
    };
    ;
    ContatoService.prototype.addContato = function (contato) {
        return this.httpClient
            .post(this.url, contato, this.getHttpOptions())
            .pipe(catchError(function (error) { return ErrorHandler.handleError(error); }))
            .subscribe();
    };
    ;
    ContatoService.prototype.updateContato = function (contato) {
        return this.httpClient
            .put(this.url, contato, this.getHttpOptions())
            .pipe(catchError(function (error) { return ErrorHandler.handleError(error); }))
            .subscribe();
    };
    ContatoService.prototype.deleteContato = function (contato) {
        var url = APP_API + "/contatos/" + contato.codigo;
        return this.httpClient
            .delete(url, this.getHttpOptions())
            .pipe(catchError(function (error) { return ErrorHandler.handleError(error); }))
            .subscribe();
    };
    // FUNÇOES AUXILIARES - FUNÇOES AUXILIARES - FUNÇOES AUXILIARES - FUNÇOES AUXILIARES      
    ContatoService.prototype.getHttpOptions = function () {
        var httpOptions;
        if (this.loginService.isLoggedIn()) {
            httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + this.loginService.user.accessToken
                })
            };
        }
        else {
            httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        }
        ;
        return httpOptions;
    };
    ContatoService.prototype.getHeaders = function () {
        var headers = new HttpHeaders();
        if (this.loginService.isLoggedIn()) {
            headers = headers.set('Authorization', "Bearer " + this.loginService.user.accessToken);
            return headers;
        }
        ;
    };
    ContatoService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient, LoginService])
    ], ContatoService);
    return ContatoService;
}());
export { ContatoService };
//# sourceMappingURL=contato.service.js.map