var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PacientesRoutingModule } from './pacientes-routing.module';
import { PacientesListComponent } from './pacientes-list/pacientes-list.component';
import { PacienteFormComponent } from './paciente-form/paciente-form.component';
import { PacientesListagemComponent } from './pacientes-listagem/pacientes-listagem.component';
import { PacientesListagemDetComponent } from './pacientes-listagem/pacientes-listagem-det/pacientes-listagem-det.component';
var PacientesModule = /** @class */ (function () {
    function PacientesModule() {
    }
    PacientesModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                SharedModule,
                PacientesRoutingModule
            ],
            declarations: [
                PacientesListComponent,
                PacienteFormComponent,
                PacientesListagemComponent,
                PacientesListagemDetComponent
            ]
        })
    ], PacientesModule);
    return PacientesModule;
}());
export { PacientesModule };
//# sourceMappingURL=pacientes.module.js.map