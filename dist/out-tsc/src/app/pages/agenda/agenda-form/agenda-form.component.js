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
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/security/login/login.service';
import { Contato } from 'src/app/models/contato.model';
import { ContatoService } from 'src/app/services/contato.service';
import { Consulta } from 'src/app/models/consulta.model';
import { ConsultaService } from 'src/app/services/consulta.service';
import { MedicoService } from 'src/app/services/medico.service';
var AgendaFormComponent = /** @class */ (function () {
    function AgendaFormComponent(loginService, contatoService, medicoService, consultaService, route, router, formBuilder) {
        this.loginService = loginService;
        this.contatoService = contatoService;
        this.medicoService = medicoService;
        this.consultaService = consultaService;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
        this.submittingForm = false;
        this.imaskConfig = {
            mask: Number,
            scale: 2,
            thousandsSeparator: '',
            padFractionalZeros: true,
            normalizeZeros: true,
            radix: ','
        };
    }
    AgendaFormComponent.prototype.ngOnInit = function () {
        this.buildMedicosForm();
        this.buildAgendamentoForm();
        this.loadContatos();
        this.loadMedicos();
    };
    ;
    AgendaFormComponent.prototype.buildMedicosForm = function () {
        this.formMedico = this.formBuilder.group({
            idMedico: [null, [Validators.required]]
        });
    };
    ;
    AgendaFormComponent.prototype.buildAgendamentoForm = function () {
        this.form = this.formBuilder.group({
            idPacienteConsulta: [null, [Validators.required]],
            idEmpresaConsulta: [null, [Validators.required]],
            idMedicoConsulta: [null, [Validators.required]],
            dataConsulta: [null, [Validators.required]],
            horaConsulta: [null, [Validators.required]],
            queixaPrincipalConsulta: [null, [Validators.required]]
        });
        this.form.controls['idEmpresaConsulta'].setValue("" + this.loginService.user.idEmpresaUsuario);
    };
    ;
    AgendaFormComponent.prototype.loadContatos = function () {
        var _this = this;
        this.codigoPaciente = this.route.snapshot.url[0].toString();
        this.contato = new Contato();
        this.contatoService.getContatosCodigo(this.codigoPaciente)
            .subscribe(function (contatos) {
            _this.contatos = contatos;
            _this.contato = contatos[0];
            _this.form.controls['idPacienteConsulta'].setValue(_this.contato.id);
        });
    };
    ;
    AgendaFormComponent.prototype.loadMedicos = function () {
        var _this = this;
        this.medicoService.getMedicos().subscribe(function (medicos) { return _this.medicos = medicos; });
    };
    ;
    // ////////////////////////////////////////////////////////////////// //
    AgendaFormComponent.prototype.submitForm = function () {
        this.submittingForm = true;
        this.createConsulta();
        this.router.navigate(['/agenda']);
    };
    ;
    AgendaFormComponent.prototype.createConsulta = function () {
        this.consulta = Object.assign(new Consulta(), this.form.value);
        this.consultaService.setDados(this.consulta);
        this.consultaService.addConsulta(this.consulta);
    };
    ;
    AgendaFormComponent = __decorate([
        Component({
            selector: 'app-agenda-form',
            templateUrl: './agenda-form.component.html',
            styleUrls: ['./agenda-form.component.css']
        }),
        __metadata("design:paramtypes", [LoginService,
            ContatoService,
            MedicoService,
            ConsultaService,
            ActivatedRoute,
            Router,
            FormBuilder])
    ], AgendaFormComponent);
    return AgendaFormComponent;
}());
export { AgendaFormComponent };
//# sourceMappingURL=agenda-form.component.js.map