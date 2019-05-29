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
import { Contato } from 'src/app/models/contato.model';
import { ContatoService } from '../../../services/contato.service';
import { Consulta } from 'src/app/models/consulta.model';
import { ConsultaService } from '../../../services/consulta.service';
// import {CalendarModule} from 'primeng/calendar';
// import toaster from "toastr";
// import { ConsultasModule } from '../consultas.module';
var ConsultasPacienteFormComponent = /** @class */ (function () {
    function ConsultasPacienteFormComponent(contatoService, consultaService, route, router, formBuilder) {
        this.contatoService = contatoService;
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
    ConsultasPacienteFormComponent.prototype.ngOnInit = function () {
        this.buildConsultaForm();
        this.loadContatos();
    };
    ConsultasPacienteFormComponent.prototype.buildConsultaForm = function () {
        this.form = this.formBuilder.group({
            idPaciente: [null, [Validators.required]],
            dataConsulta: [null, [Validators.required]],
            horaConsulta: [null, [Validators.required]],
            motivoConsulta: [null, [Validators.required]],
            pesoConsulta: [null, [Validators.required]],
            alturaConsulta: [null, [Validators.required]],
            cabecaConsulta: [null, [Validators.required]],
            infoConsulta: [null, [Validators.required]],
            prescricaoConsulta: [null, [Validators.required]],
            prescricao2Consulta: [null, [Validators.required]],
            prescricao3Consulta: [null, [Validators.required]]
        });
    };
    ;
    ConsultasPacienteFormComponent.prototype.loadContatos = function () {
        var _this = this;
        this.codigoPaciente = this.route.snapshot.url[0].toString();
        this.contato = new Contato();
        this.contatoService.getContatosCodigo(this.codigoPaciente)
            .subscribe(function (contatos) {
            _this.contatos = contatos;
            _this.contato = contatos[0];
            _this.form.controls['idPaciente'].setValue(_this.contato.id);
            _this.form.controls['dataConsulta'].setValue('10/05/2019');
            _this.form.controls['horaConsulta'].setValue('10:00');
            _this.form.controls['motivoConsulta'].setValue('Tosse e Febre alta');
            _this.form.controls['pesoConsulta'].setValue('20');
            _this.form.controls['alturaConsulta'].setValue('70');
            _this.form.controls['cabecaConsulta'].setValue('34');
            _this.form.controls['infoConsulta'].setValue('Gripe forte e garganta inflamada');
            _this.form.controls['prescricaoConsulta'].setValue('Amoxilina 12/12 hrs durante 10 dias');
            _this.form.controls['prescricao2Consulta'].setValue('Dipirona 40 gotas 8/8 hrs durante 10 dias');
            _this.form.controls['prescricao3Consulta'].setValue('Leucogem 8/8 hrs durante 10 dias');
        });
    };
    ;
    // ////////////////////////////////////////////////////////////////// //
    ConsultasPacienteFormComponent.prototype.submitForm = function () {
        this.submittingForm = true;
        this.createConsulta();
        this.router.navigate(['/consulta/receita']);
    };
    ;
    ConsultasPacienteFormComponent.prototype.createConsulta = function () {
        // const consulta: Consulta = Object.assign(new Consulta(), this.form.value);
        this.consulta = Object.assign(new Consulta(), this.form.value);
        var data = this.consulta.dataConsulta;
        this.consulta.dataConsulta = data.substr(6, 4) + '/' + data.substr(3, 2) + '/' + data.substr(0, 2);
        this.consultaService.setDados(this.consulta);
        // this.consultaService.addConsulta(consulta);
    };
    ConsultasPacienteFormComponent = __decorate([
        Component({
            selector: 'app-consultas-paciente-form',
            templateUrl: './consulta-form.component.html',
            styleUrls: ['./consulta-form.component.css']
        }),
        __metadata("design:paramtypes", [ContatoService,
            ConsultaService,
            ActivatedRoute,
            Router,
            FormBuilder])
    ], ConsultasPacienteFormComponent);
    return ConsultasPacienteFormComponent;
}());
export { ConsultasPacienteFormComponent };
//# sourceMappingURL=consulta-form.component.js.map