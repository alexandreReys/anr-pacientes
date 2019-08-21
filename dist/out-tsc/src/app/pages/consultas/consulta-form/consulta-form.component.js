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
import { Consulta } from "src/app/models/consulta.model";
import { ConsultaService } from 'src/app/services/consulta.service';
var ConsultaFormComponent = /** @class */ (function () {
    function ConsultaFormComponent(consultaService, fb, route, router) {
        this.consultaService = consultaService;
        this.fb = fb;
        this.route = route;
        this.router = router;
        this.imaskConfig = {
            mask: Number,
            scale: 2,
            thousandsSeparator: '',
            padFractionalZeros: true,
            normalizeZeros: true,
            radix: ','
        };
    }
    ConsultaFormComponent.prototype.ngOnInit = function () {
        this.buildForm();
        this.loadConsulta();
    };
    ConsultaFormComponent.prototype.buildForm = function () {
        this.form = this.fb.group({
            idConsulta: ['', Validators.required],
            idPacienteConsulta: ['', Validators.required],
            idEmpresaConsulta: ['', Validators.required],
            idMedicoConsulta: ['', Validators.required],
            dataConsulta: ['', Validators.required],
            horaConsulta: ['', Validators.required],
            motivoConsulta: ['', Validators.required],
            pesoConsulta: [''],
            alturaConsulta: [''],
            cabecaConsulta: [''],
            infoConsulta: ['', Validators.required],
            prescricaoConsulta: ['']
        });
    };
    ConsultaFormComponent.prototype.loadConsulta = function () {
        var _this = this;
        this.consultaService.subject.subscribe(function (resp) {
            _this.consulta = resp;
            if (_this.consulta.horaConsulta) {
                _this.consulta.horaConsulta = _this.consulta.horaConsulta.substr(0, 5);
            }
            ;
            _this.form.patchValue(_this.consulta);
            _this.dataConsult = _this.consulta.dataConsultaFrm;
            _this.horaConsult = _this.consulta.horaConsulta;
            _this.nomePacient = _this.consulta.nome;
        });
        // var id = this.route.snapshot.url[0].toString();
        // this.consultaService.getConsultaId(id).subscribe( resp => this.consulta = resp[0] ); //imask não funciona
    };
    ;
    // ////////////////////////////////////////////////////////////////// //
    ConsultaFormComponent.prototype.submitForm = function () {
        this.updateConsulta();
        this.router.navigate(['/consulta']);
    };
    ;
    ConsultaFormComponent.prototype.updateConsulta = function () {
        this.consulta = new Consulta();
        this.consulta = Object.assign(new Consulta(), this.form.value);
        this.consultaService.updateConsulta(this.consulta);
    };
    ConsultaFormComponent = __decorate([
        Component({
            selector: 'app-consulta-form',
            templateUrl: './consulta-form.component.html',
            styleUrls: ['./consulta-form.component.css']
        }),
        __metadata("design:paramtypes", [ConsultaService,
            FormBuilder,
            ActivatedRoute,
            Router])
    ], ConsultaFormComponent);
    return ConsultaFormComponent;
}());
export { ConsultaFormComponent };
//# sourceMappingURL=consulta-form.component.js.map