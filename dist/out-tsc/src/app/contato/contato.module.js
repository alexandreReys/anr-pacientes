var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { ContatoComponent } from './contato.component';
import { ContatoFormComponent } from './contato-form/contato-form.component';
import { ContatoListComponent } from './contato-list/contato-list.component';
export var ROUTES = [
    { path: '', component: ContatoComponent }
];
var ContatoModule = /** @class */ (function () {
    function ContatoModule() {
    }
    ContatoModule = __decorate([
        NgModule({
            declarations: [ContatoComponent, ContatoFormComponent, ContatoListComponent],
            imports: [CommonModule, FormsModule, RouterModule.forChild(ROUTES)]
        })
    ], ContatoModule);
    return ContatoModule;
}());
export { ContatoModule };
;
//# sourceMappingURL=contato.module.js.map