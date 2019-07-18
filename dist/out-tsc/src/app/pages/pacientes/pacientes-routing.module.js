var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PacientesListComponent } from './pacientes-list/pacientes-list.component';
import { PacienteFormComponent } from './paciente-form/paciente-form.component';
import { PacientesListagemComponent } from './pacientes-listagem/pacientes-listagem.component';
var routes = [
    { path: '', component: PacientesListComponent },
    { path: 'new/:to', component: PacienteFormComponent },
    { path: 'new', component: PacienteFormComponent },
    { path: ':id/edit/:to', component: PacienteFormComponent },
    { path: ':id/edit', component: PacienteFormComponent },
    { path: 'listagem', component: PacientesListagemComponent }
];
var PacientesRoutingModule = /** @class */ (function () {
    function PacientesRoutingModule() {
    }
    PacientesRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], PacientesRoutingModule);
    return PacientesRoutingModule;
}());
export { PacientesRoutingModule };
//# sourceMappingURL=pacientes-routing.module.js.map