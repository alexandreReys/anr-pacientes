var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConsultaPacienteListComponent } from './consulta-paciente-list/consulta-paciente-list.component';
import { ConsultasPacienteFormComponent } from './consulta-form/consulta-form.component';
import { ConsultasReceitaPrintComponent } from './consultas-receita-print/consultas-receita-print.component';
var routes = [
    { path: '', component: ConsultaPacienteListComponent },
    { path: ':codigo/new', component: ConsultasPacienteFormComponent },
    { path: 'receita', component: ConsultasReceitaPrintComponent }
];
var ConsultasRoutingModule = /** @class */ (function () {
    function ConsultasRoutingModule() {
    }
    ConsultasRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], ConsultasRoutingModule);
    return ConsultasRoutingModule;
}());
export { ConsultasRoutingModule };
//# sourceMappingURL=consultas-routing.module.js.map