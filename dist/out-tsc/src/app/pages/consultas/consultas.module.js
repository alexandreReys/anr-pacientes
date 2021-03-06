var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IMaskModule } from 'angular-imask';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConsultasRoutingModule } from './consultas-routing.module';
import { ConsultasListComponent } from './consultas-list/consultas-list.component';
import { ConsultaFormComponent } from './consulta-form/consulta-form.component';
import { ConsultasListagemComponent } from './consultas-listagem/consultas-listagem.component';
import { ConsultasListagemDetComponent } from './consultas-listagem/consultas-listagem-det/consultas-listagem-det.component';
import { ConsultasHistoricoComponent } from './consultas-historico/consultas-historico.component';
var ConsultasModule = /** @class */ (function () {
    function ConsultasModule() {
    }
    ConsultasModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                ConsultasRoutingModule,
                SharedModule,
                IMaskModule
            ],
            declarations: [
                ConsultasListComponent,
                ConsultaFormComponent,
                ConsultasListagemComponent,
                ConsultasListagemDetComponent,
                ConsultasHistoricoComponent
            ]
        })
    ], ConsultasModule);
    return ConsultasModule;
}());
export { ConsultasModule };
//# sourceMappingURL=consultas.module.js.map