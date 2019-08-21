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
import { ErrorHandler } from 'src/app/app.error-handler';
var ConsultaService = /** @class */ (function () {
    function ConsultaService(httpClient, loginService) {
        this.httpClient = httpClient;
        this.loginService = loginService;
        this.url = APP_API + "/consultas";
        this.subject = new BehaviorSubject(this.consulta);
    }
    ConsultaService.prototype.setDados = function (consulta) {
        this.subject.next(consulta);
    };
    ConsultaService.prototype.getConsultas = function (search, idMedico) {
        var idEmpresa = this.loginService.user.idEmpresaUsuario;
        var urlGet;
        if (search) {
            if (!idMedico)
                urlGet = APP_API + "/consultas/" + search + "?idEmpresa=" + idEmpresa;
            else
                urlGet = APP_API + "/consultas/" + search + "?idEmpresa=" + idEmpresa + "&idMedico=" + idMedico;
            return this.httpClient
                .get(urlGet, { headers: this.getHeaders() })
                .pipe(catchError(function (error) { return ErrorHandler.handleError(error); }));
        }
        else {
            if (!idMedico) {
                urlGet = APP_API + "/consultas?idEmpresa=" + idEmpresa;
            }
            else {
                urlGet = APP_API + "/consultas?idEmpresa=" + idEmpresa + "&idMedico=" + idMedico;
            }
            ;
            return this.httpClient
                .get(urlGet, { headers: this.getHeaders() })
                .pipe(catchError(function (error) { return ErrorHandler.handleError(error); }));
        }
    };
    ;
    ConsultaService.prototype.getConsultaId = function (idConsulta) {
        var urlGet = APP_API + "/consultas/id/" + idConsulta + "?idEmpresa=" + this.loginService.user.idEmpresaUsuario;
        return this.httpClient
            .get(urlGet, { headers: this.getHeaders() })
            .pipe(catchError(function (error) { return ErrorHandler.handleError(error); }));
    };
    ;
    ConsultaService.prototype.getConsultasData = function (dataConsulta, idMedico) {
        var idEmpresa = this.loginService.user.idEmpresaUsuario;
        var urlGet;
        if (!idMedico)
            urlGet = APP_API + "/consultas/data/" + dataConsulta + "?idEmpresa=" + idEmpresa;
        else
            urlGet = APP_API + "/consultas/data/" + dataConsulta + "?idEmpresa=" + idEmpresa + "&idMedico=" + idMedico;
        return this.httpClient
            .get(urlGet, { headers: this.getHeaders() })
            .pipe(catchError(function (error) { return ErrorHandler.handleError(error); }));
    };
    ;
    ConsultaService.prototype.getConsultasPaciente = function (idPaciente) {
        var urlGet = APP_API + "/consultas/paciente/" + idPaciente + "?idEmpresa=" + this.loginService.user.idEmpresaUsuario;
        return this.httpClient
            .get(urlGet, { headers: this.getHeaders() })
            .pipe(catchError(function (error) { return ErrorHandler.handleError(error); }));
    };
    ;
    ConsultaService.prototype.addConsulta = function (consulta) {
        return this.httpClient
            .post(this.url, consulta, this.getHttpOptions())
            .pipe(catchError(function (error) { return ErrorHandler.handleError(error); }))
            .subscribe();
    };
    ;
    ConsultaService.prototype.updateConsulta = function (consulta) {
        return this.httpClient
            .put(this.url, consulta, this.getHttpOptions())
            .pipe(catchError(function (error) { return ErrorHandler.handleError(error); }))
            .subscribe();
    };
    ConsultaService.prototype.deleteConsulta = function (consulta) {
        var url = APP_API + "/consultas/" + consulta.idConsulta;
        return this.httpClient
            .delete(url, this.getHttpOptions())
            .pipe(catchError(function (error) { return ErrorHandler.handleError(error); }))
            .subscribe();
    };
    // FUNÇOES AUXILIARES - FUNÇOES AUXILIARES - FUNÇOES AUXILIARES - FUNÇOES AUXILIARES      
    ConsultaService.prototype.getHttpOptions = function () {
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
    ConsultaService.prototype.getHeaders = function () {
        var headers = new HttpHeaders();
        if (this.loginService.isLoggedIn()) {
            headers = headers.set('Authorization', "Bearer " + this.loginService.user.accessToken);
            return headers;
        }
        ;
    };
    ConsultaService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        Injectable(),
        __metadata("design:paramtypes", [HttpClient,
            LoginService])
    ], ConsultaService);
    return ConsultaService;
}());
export { ConsultaService };
//# sourceMappingURL=consulta.service.js.map