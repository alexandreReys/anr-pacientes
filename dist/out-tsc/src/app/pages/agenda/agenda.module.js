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
import { AgendaRoutingModule } from './agenda-routing.module';
import { AgendaListComponent } from './agenda-list/agenda-list.component';
import { AgendaFormComponent } from './agenda-form/agenda-form.component';
var AgendaModule = /** @class */ (function () {
    function AgendaModule() {
    }
    AgendaModule = __decorate([
        NgModule({
            imports: [
                CommonModule, AgendaRoutingModule, ReactiveFormsModule, FormsModule, IMaskModule
            ],
            declarations: [AgendaListComponent, AgendaFormComponent]
        })
    ], AgendaModule);
    return AgendaModule;
}());
export { AgendaModule };
//# sourceMappingURL=agenda.module.js.map