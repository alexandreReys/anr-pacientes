var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConsultasListComponent } from './consultas-list/consultas-list.component';
import { ConsultaFormComponent } from './consulta-form/consulta-form.component';
import { ConsultasListagemComponent } from './consultas-listagem/consultas-listagem.component';
var routes = [
    { path: '', component: ConsultasListComponent },
    { path: ':id/edit', component: ConsultaFormComponent },
    { path: 'listagem', component: ConsultasListagemComponent }
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