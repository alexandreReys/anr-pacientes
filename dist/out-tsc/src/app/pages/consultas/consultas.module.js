var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { IMaskModule } from 'angular-imask';
import { ConsultasRoutingModule } from './consultas-routing.module';
import { ConsultaPacienteListComponent } from './consulta-paciente-list/consulta-paciente-list.component';
import { ConsultasPacienteFormComponent } from './consulta-form/consulta-form.component';
import { ConsultasReceitaPrintComponent } from './consultas-receita-print/consultas-receita-print.component';
var ConsultasModule = /** @class */ (function () {
    function ConsultasModule() {
    }
    ConsultasModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                ConsultasRoutingModule,
                ReactiveFormsModule,
                FormsModule,
                CalendarModule,
                IMaskModule
            ],
            declarations: [ConsultaPacienteListComponent, ConsultasPacienteFormComponent, ConsultasReceitaPrintComponent]
        })
    ], ConsultasModule);
    return ConsultasModule;
}());
export { ConsultasModule };
//# sourceMappingURL=consultas.module.js.map