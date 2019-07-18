var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MedicoListComponent } from './medico-list/medico-list.component';
import { MedicoFormComponent } from './medico-form/medico-form.component';
var routes = [
    { path: '', component: MedicoListComponent },
    { path: 'new', component: MedicoFormComponent },
    { path: ':id/edit', component: MedicoFormComponent }
];
var MedicosRoutingModule = /** @class */ (function () {
    function MedicosRoutingModule() {
    }
    MedicosRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], MedicosRoutingModule);
    return MedicosRoutingModule;
}());
export { MedicosRoutingModule };
//# sourceMappingURL=medicos-routing.module.js.map