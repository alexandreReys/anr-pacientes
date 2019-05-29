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
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';
import { APP_API } from 'src/app/app.api';
import { LoginService } from 'src/app/security/login/login.service';
import { ErrorHandler } from '../app.error-handler';
var MedicoService = /** @class */ (function () {
    function MedicoService(httpClient, loginService) {
        this.httpClient = httpClient;
        this.loginService = loginService;
        this.url = APP_API + "/medicos";
        this.subject = new BehaviorSubject(this.medico);
    }
    MedicoService.prototype.setDados = function (medico) {
        this.subject.next(medico);
    };
    MedicoService.prototype.getMedicos = function (search) {
        if (search) {
            var urlGet = APP_API + "/medicos/" + search;
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
    MedicoService.prototype.getMedicoByCodigo = function (idMedico) {
        var urlGet = APP_API + "/medicos/codigo/" + idMedico;
        return this.httpClient
            .get(urlGet, { headers: this.getHeaders() })
            .pipe(catchError(function (error) { return ErrorHandler.handleError(error); }));
    };
    ;
    MedicoService.prototype.addMedico = function (medico) {
        return this.httpClient
            .post(this.url, medico, this.getHttpOptions())
            .pipe(catchError(function (error) { return ErrorHandler.handleError(error); }))
            .subscribe();
    };
    ;
    MedicoService.prototype.updateMedico = function (medico) {
        return this.httpClient
            .put(this.url, medico, this.getHttpOptions())
            .pipe(catchError(function (error) { return ErrorHandler.handleError(error); }))
            .subscribe();
    };
    MedicoService.prototype.deleteMedico = function (medico) {
        var url = APP_API + "/medicos/" + medico.idMedico;
        return this.httpClient
            .delete(url, this.getHttpOptions())
            .pipe(catchError(function (error) { return ErrorHandler.handleError(error); }))
            .subscribe();
    };
    // FUNÇOES AUXILIARES - FUNÇOES AUXILIARES - FUNÇOES AUXILIARES - FUNÇOES AUXILIARES      
    MedicoService.prototype.getHttpOptions = function () {
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
    MedicoService.prototype.getHeaders = function () {
        var headers = new HttpHeaders();
        if (this.loginService.isLoggedIn()) {
            headers = headers.set('Authorization', "Bearer " + this.loginService.user.accessToken);
            return headers;
        }
        ;
    };
    MedicoService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient, LoginService])
    ], MedicoService);
    return MedicoService;
}());
export { MedicoService };
//# sourceMappingURL=medico.service.js.map