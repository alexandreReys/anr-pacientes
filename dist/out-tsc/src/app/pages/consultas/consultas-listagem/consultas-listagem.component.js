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
var _ = require('lodash');
import { ConsultaService } from 'src/app/services/consulta.service';
var ConsultasListagemComponent = /** @class */ (function () {
    function ConsultasListagemComponent(consultaService) {
        this.consultaService = consultaService;
        this.pageTitle = 'Listagem das Consultas Agendadas';
        this.consultas = [];
    }
    ConsultasListagemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.consultaService.getConsultas().subscribe(function (consultas) {
            var result = _(consultas)
                .groupBy(function (x) { return x.nomeMedico; })
                .map(function (value, key) { return ({ nomeMedico: key, consultas: value }); })
                .value();
            _this.consultas = Array.of(result);
        });
    };
    ConsultasListagemComponent = __decorate([
        Component({
            selector: 'app-consultas-listagem',
            templateUrl: './consultas-listagem.component.html',
            styleUrls: ['./consultas-listagem.component.css']
        }),
        __metadata("design:paramtypes", [ConsultaService])
    ], ConsultasListagemComponent);
    return ConsultasListagemComponent;
}());
export { ConsultasListagemComponent };
//# sourceMappingURL=consultas-listagem.component.js.map