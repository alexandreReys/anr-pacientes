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
import { Contato } from '../../../models/contato.model';
import { ContatoService } from '../../../services/contato.service';
var PacienteFormComponent = /** @class */ (function () {
    function PacienteFormComponent(contatoService, loginService, route, router, formBuilder) {
        this.contatoService = contatoService;
        this.loginService = loginService;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
        this.pageTitle = 'Pacientes';
        this.formTitle = 'Novo Cadastro !!';
        this.breadcrumb1_item_link = '/paciente';
        this.breadcrumb1_item_title = 'Seleção de Pacientes';
        this.emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        //submittingForm: boolean = false;
        this.contato = new Contato();
        this.contatos = [];
        this.estados = [];
        this.sexos = [];
        this.imaskConfig = {
            mask: Number,
            scale: 2,
            thousandsSeparator: '',
            padFractionalZeros: true,
            normalizeZeros: true,
            radix: ','
        };
    }
    PacienteFormComponent.prototype.ngOnInit = function () {
        this.navigateTo = this.route.snapshot.params['to'] || 'paciente';
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
        this.sexos = [
            { "descricao": "Masculino" },
            { "descricao": "Feminino" }
        ];
        this.setCurrentAction();
        this.buildContatoForm();
        this.loadContatos();
    };
    ;
    PacienteFormComponent.prototype.ngAfterContentChecked = function () {
        this.setPageTitle();
    };
    ;
    PacienteFormComponent.prototype.setPageTitle = function () {
        if (this.currentAction == 'new')
            this.formTitle = 'Novo Cadastro !!';
        else {
            var contatoName = this.contato.nome || '';
            this.formTitle = 'Editando : ' + contatoName;
        }
    };
    ;
    PacienteFormComponent.prototype.setCurrentAction = function () {
        if (this.route.snapshot.url[0].path == 'new')
            this.currentAction = 'new';
        else
            this.currentAction = 'edit';
    };
    ;
    PacienteFormComponent.prototype.buildContatoForm = function () {
        this.form = this.formBuilder.group({
            id: [''],
            idEmpresa: [''],
            codigo: [''],
            nome: ['', [Validators.required]],
            telefone: ['', [Validators.required]],
            endereco: [''],
            numero: [''],
            complemento: [''],
            bairro: [''],
            cidade: [''],
            estado: [''],
            cep: ['', [Validators.pattern('^[0-9]{5}-[0-9]{3}')]],
            paiNome: [''],
            paiTelefone: [''],
            paiProfissao: [''],
            maeNome: [''],
            maeTelefone: [''],
            maeProfissao: [''],
            dataNasc: [''],
            sexo: [''],
            email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
            certidaoNasc: ['']
        });
    };
    ;
    PacienteFormComponent.prototype.loadContatos = function () {
        var _this = this;
        if (this.currentAction == 'edit') {
            this.contatoService.subject.subscribe(function (respService) {
                _this.contato = respService;
                var dataNasc = _this.contato.dataNasc;
                dataNasc = dataNasc.substr(0, 10);
                _this.form.patchValue(_this.contato); // binds loaded contato data to form
                _this.form.controls['idEmpresa'].setValue(_this.loginService.user.idEmpresaUsuario);
                _this.form.controls['estado'].setValue(_this.contato.estado);
                _this.form.controls['dataNasc'].setValue(dataNasc);
            });
        }
        else {
            this.form.controls['id'].setValue(1);
            this.form.controls['idEmpresa'].setValue(this.loginService.user.idEmpresaUsuario);
            this.form.controls['estado'].setValue('SP');
            this.form.controls['sexo'].setValue('Masculino');
        }
        ;
    };
    ;
    PacienteFormComponent.prototype.voltar = function () {
        this.router.navigate(['/' + this.navigateTo]); // this.router.navigate(['/paciente']);
    };
    ;
    PacienteFormComponent.prototype.changeEstado = function (e) {
        var estado = e.target.value;
        if (estado.length > 2) {
            estado = estado.substr(estado.length - 2);
        }
        ;
        this.form.controls['estado'].setValue(estado, { onlySelf: true });
    };
    ;
    PacienteFormComponent.prototype.changeSexo = function (e) {
        var sexo = e.target.value;
        if (sexo.length > 9) {
            sexo = sexo.substr(sexo.length - 9);
        }
        ;
        sexo = sexo.trim();
        this.form.controls['sexo'].setValue(sexo, { onlySelf: true });
    };
    ;
    // ////////////////////////////////////////////////////////////////// //
    PacienteFormComponent.prototype.submitForm = function () {
        //this.submittingForm = true;
        this.createContato();
        this.contato = new Contato;
        this.form.reset();
        this.router.navigate(['/' + this.navigateTo]); // this.router.navigate(['/paciente']);
    };
    ;
    PacienteFormComponent.prototype.createContato = function () {
        this.contato = Object.assign(new Contato(), this.form.value);
        //this.contatoService.setDados(this.contato);  // Dados para receita
        if (this.route.snapshot.url[0].path == 'new')
            this.contatoService.addContato(this.contato);
        else
            this.contatoService.updateContato(this.contato);
    };
    ;
    // ////////////////////////////////////////////////////////////////// //
    PacienteFormComponent.prototype.verificaValidTouched = function (campo) {
        var valid = this.form.get(campo).valid;
        var touched = this.form.get(campo).touched;
        return !valid && touched;
    };
    PacienteFormComponent.prototype.aplicaCssErro = function (campo) {
        var estadoCampo = this.verificaValidTouched(campo);
        var classes = {
            'has-error': estadoCampo,
            'has-feedback': estadoCampo
        };
        return classes;
    };
    PacienteFormComponent = __decorate([
        Component({
            selector: 'app-paciente-form',
            templateUrl: './paciente-form.component.html',
            styleUrls: ['./paciente-form.component.css']
        }),
        __metadata("design:paramtypes", [ContatoService,
            LoginService,
            ActivatedRoute,
            Router,
            FormBuilder])
    ], PacienteFormComponent);
    return PacienteFormComponent;
}());
export { PacienteFormComponent };
//# sourceMappingURL=paciente-form.component.js.map