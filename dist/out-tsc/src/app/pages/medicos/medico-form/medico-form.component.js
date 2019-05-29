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
import { Medico } from '../../../models/medico.model';
import { MedicoService } from '../../../services/medico.service';
var MedicoFormComponent = /** @class */ (function () {
    function MedicoFormComponent(medicoService, route, router, formBuilder) {
        this.medicoService = medicoService;
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
            nomeMedico: [null, [Validators.required, Validators.minLength(3)]],
            telefoneMedico: [null, [Validators.required, Validators.minLength(8)]],
            enderecoMedico: [null],
            numeroMedico: [null],
            complementoMedico: [null],
            bairroMedico: [null],
            cidadeMedico: [null],
            estadoMedico: [null],
            cepMedico: [null],
            crmMedico: [null, [Validators.required, Validators.minLength(5)]],
            especialidadeMedico: [null, [Validators.required, Validators.minLength(5)]]
        });
    };
    ;
    MedicoFormComponent.prototype.loadMedicos = function () {
        var _this = this;
        if (this.currentAction == 'edit') {
            var codigoMedico = this.route.snapshot.url[0].toString();
            this.medicoService.getMedicoByCodigo(codigoMedico)
                .subscribe(function (medicos) {
                _this.medicos = medicos;
                _this.medico = medicos[0];
                _this.form.patchValue(_this.medico); // binds loaded medico data to form
                //this.form.controls['motivoMedico'].setValue('Tosse e Febre alta');
            }, function (error) {
                alert('Ocorreu um erro, verifique sua conexão de internet ou tente + tarde.');
                console.error(error);
            });
        }
        ;
    };
    ;
    // ////////////////////////////////////////////////////////////////// //
    MedicoFormComponent.prototype.submitForm = function () {
        this.submittingForm = true;
        this.createMedico();
        //this.router.navigate(['/medico/receita']);
    };
    ;
    MedicoFormComponent.prototype.createMedico = function () {
        this.medico = Object.assign(new Medico(), this.form.value);
        //this.medicoService.setDados(this.medico);  // Dados para receita
        this.medicoService.addMedico(this.medico);
    };
    MedicoFormComponent = __decorate([
        Component({
            selector: 'app-medico-form',
            templateUrl: './medico-form.component.html',
            styleUrls: ['./medico-form.component.css']
        }),
        __metadata("design:paramtypes", [MedicoService,
            ActivatedRoute,
            Router,
            FormBuilder])
    ], MedicoFormComponent);
    return MedicoFormComponent;
}());
export { MedicoFormComponent };
//# sourceMappingURL=medico-form.component.js.map