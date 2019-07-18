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
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/security/login/login.service';
import { Consulta } from 'src/app/models/consulta.model';
import { ConsultaService } from 'src/app/services/consulta.service';
import { MedicoService } from 'src/app/services/medico.service';
var ConsultasListComponent = /** @class */ (function () {
    function ConsultasListComponent(formBuilder, router, consultaService, medicoService, loginService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.consultaService = consultaService;
        this.medicoService = medicoService;
        this.loginService = loginService;
        this.searchBarState = 'hidden';
    }
    ConsultasListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.searchDate = this.formBuilder.control('');
        this.searchForm = this.formBuilder.group({
            searchDate: this.searchDate
        });
        this.setSearchDate();
        this.idMedico = "" + this.loginService.user.idFuncionarioUsuario;
        this.medicoService.getMedicoById(this.idMedico)
            .subscribe(function (medicos) {
            _this.medico = medicos[0];
            if (_this.medico)
                _this.nomeMedico = _this.medico.nomeMedico;
            else
                _this.nomeMedico = 'Não cadastrado';
        });
    };
    ; // fim ngOnInit() 
    ConsultasListComponent.prototype.edit = function (consulta) {
        this.consultaService.setDados(consulta);
        this.router.navigate(['/consulta/' + consulta.idConsulta + '/edit']);
    };
    ; // fim edit
    ConsultasListComponent.prototype.delete = function (consulta) {
        var resp = this.consultaService.deleteConsulta(consulta);
        var index = this.consultas.map(function (item) { return item.idConsulta; }).indexOf(consulta.idConsulta);
        this.consultas.splice(index, 1);
    };
    ; // fim delete
    ConsultasListComponent.prototype.procuraData = function (todos) {
        var _this = this;
        this.consulta = new Consulta();
        this.consulta.dataConsulta = 'Processando ...';
        if (todos) {
            this.consultaService.getConsultas().subscribe(function (consultas) { return _this.consultas = consultas; });
        }
        else {
            var searchDate = this.searchDate.value;
            if (searchDate)
                this.consultaService.getConsultasData(searchDate).subscribe(function (consultas) { return _this.consultas = consultas; });
            else
                this.consultaService.getConsultas().subscribe(function (consultas) { return _this.consultas = consultas; });
        }
    };
    ; // fim procuraData()
    ConsultasListComponent.prototype.setSearchDate = function () {
        var _this = this;
        var now = new Date;
        var year = now.getFullYear();
        var month = (1 + now.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        var day = now.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        var searchDate = year + '-' + month + '-' + day;
        this.searchDate.setValue(searchDate);
        this.consultaService.getConsultasData(searchDate).subscribe(function (consultas) { return _this.consultas = consultas; });
    };
    ; // fim setSearchDate()
    ConsultasListComponent = __decorate([
        Component({
            selector: 'app-consultas-list',
            templateUrl: './consultas-list.component.html',
            styleUrls: ['./consultas-list.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder,
            Router,
            ConsultaService,
            MedicoService,
            LoginService])
    ], ConsultasListComponent);
    return ConsultasListComponent;
}());
export { ConsultasListComponent };
//# sourceMappingURL=consultas-list.component.js.map