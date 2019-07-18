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
import { Medico } from '../../../models/medico.model';
import { MedicoService } from '../../../services/medico.service';
var MedicoFormComponent = /** @class */ (function () {
    function MedicoFormComponent(medicoService, loginService, route, router, formBuilder) {
        this.medicoService = medicoService;
        this.loginService = loginService;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
        this.submittingForm = false;
        this.medico = new Medico();
        this.imaskConfig = {
            mask: Number,
            scale: 2,
            thousandsSeparator: '',
            padFractionalZeros: true,
            normalizeZeros: true,
            radix: ','
        };
    }
    MedicoFormComponent.prototype.ngOnInit = function () {
        this.estados = [
            { "id": 12, "sigla": "AC", "nome": "Acre" },
            { "id": 27, "sigla": "AL", "nome": "Alagoas" },
            { "id": 13, "sigla": "AM", "nome": "Amazonas" },
            { "id": 16, "sigla": "AP", "nome": "Amapá" },
            { "id": 29, "sigla": "BA", "nome": "Bahia" },
            { "id": 23, "sigla": "CE", "nome": "Ceará" },
            { "id": 53, "sigla": "DF", "nome": "Distrito Federal" },
            { "id": 32, "sigla": "ES", "nome": "Espírito Santo" },
            { "id": 52, "sigla": "GO", "nome": "Goiás" },
            { "id": 21, "sigla": "MA", "nome": "Maranhão" },
            { "id": 50, "sigla": "MS", "nome": "Mato Grosso do Sul" },
            { "id": 51, "sigla": "MT", "nome": "Mato Grosso" },
            { "id": 31, "sigla": "MG", "nome": "Minas Gerais" },
            { "id": 22, "sigla": "PI", "nome": "Piauí" },
            { "id": 15, "sigla": "PA", "nome": "Pará" },
            { "id": 41, "sigla": "PR", "nome": "Paraná" },
            { "id": 25, "sigla": "PB", "nome": "Paraíba" },
            { "id": 26, "sigla": "PE", "nome": "Pernambuco" },
            { "id": 24, "sigla": "RN", "nome": "Rio Grande do Norte" },
            { "id": 33, "sigla": "RJ", "nome": "Rio de Janeiro" },
            { "id": 43, "sigla": "RS", "nome": "Rio Grande do Sul" },
            { "id": 11, "sigla": "RO", "nome": "Rondônia" },
            { "id": 14, "sigla": "RR", "nome": "Roraima" },
            { "id": 42, "sigla": "SC", "nome": "Santa Catarina" },
            { "id": 35, "sigla": "SP", "nome": "São Paulo" },
            { "id": 28, "sigla": "SE", "nome": "Sergipe" },
            { "id": 17, "sigla": "TO", "nome": "Tocantins" }
        ];
        this.setCurrentAction();
        this.buildMedicoForm();
        this.loadMedicos();
    };
    MedicoFormComponent.prototype.ngAfterContentChecked = function () {
        this.setPageTitle();
    };
    MedicoFormComponent.prototype.setPageTitle = function () {
        if (this.currentAction == 'new')
            this.pageTitle = 'Cadastro de Novo Médico';
        else {
            var medicoName = this.medico.nomeMedico || '';
            this.pageTitle = 'Editando Médico: ' + medicoName;
        }
    };
    ;
    MedicoFormComponent.prototype.setCurrentAction = function () {
        if (this.route.snapshot.url[0].path == 'new')
            this.currentAction = 'new';
        else
            this.currentAction = 'edit';
    };
    MedicoFormComponent.prototype.buildMedicoForm = function () {
        this.form = this.formBuilder.group({
            idMedico: [null, [Validators.required]],
            idEmpresa: [null, [Validators.required]],
            nomeMedico: [null, [Validators.required, Validators.minLength(3)]],
            telefoneMedico: [null, [Validators.required, Validators.minLength(8)]],
            enderecoMedico: [null],
            numeroMedico: [null],
            complementoMedico: [null],
            bairroMedico: [null],
            cidadeMedico: [null],
            estadoMedico: [null],
            cepMedico: [null, [Validators.pattern('^[0-9]{5}-[0-9]{3}')]],
            crmMedico: [null, [Validators.required, Validators.minLength(5)]],
            especialidadeMedico: [null, [Validators.required, Validators.minLength(5)]]
        });
    };
    ;
    MedicoFormComponent.prototype.loadMedicos = function () {
        var _this = this;
        if (this.currentAction == 'edit') {
            this.medicoService.subject.subscribe(function (resp) {
                _this.medico = resp;
                _this.form.patchValue(_this.medico); // binds loaded medico data to form
                _this.form.controls['idEmpresa'].setValue(_this.loginService.user.idEmpresaUsuario);
                _this.form.controls['estadoMedico'].setValue(_this.medico.estadoMedico);
            });
        }
        else {
            this.form.controls['idMedico'].setValue(1);
            this.form.controls['idEmpresa'].setValue(this.loginService.user.idEmpresaUsuario);
            this.form.controls['estadoMedico'].setValue('SP');
        }
        ;
    };
    ;
    MedicoFormComponent.prototype.changeEstado = function (e) {
        var estado = e.target.value;
        if (estado.length > 2) {
            estado = estado.substr(estado.length - 2);
        }
        ;
        this.form.controls['estadoMedico'].setValue(estado, { onlySelf: true });
    };
    ;
    // ////////////////////////////////////////////////////////////////// //
    MedicoFormComponent.prototype.submitForm = function () {
        this.submittingForm = true;
        this.createMedico();
        this.medico = new Medico;
        this.form.reset();
        this.router.navigate(['/medico']);
    };
    ;
    MedicoFormComponent.prototype.createMedico = function () {
        this.medico = Object.assign(new Medico(), this.form.value);
        //this.medicoService.setDados(this.medico);  // Dados para receita
        if (this.route.snapshot.url[0].path == 'new')
            this.medicoService.addMedico(this.medico);
        else
            this.medicoService.updateMedico(this.medico);
    };
    MedicoFormComponent = __decorate([
        Component({
            selector: 'app-medico-form',
            templateUrl: './medico-form.component.html',
            styleUrls: ['./medico-form.component.css']
        }),
        __metadata("design:paramtypes", [MedicoService,
            LoginService,
            ActivatedRoute,
            Router,
            FormBuilder])
    ], MedicoFormComponent);
    return MedicoFormComponent;
}());
export { MedicoFormComponent };
//# sourceMappingURL=medico-form.component.js.map