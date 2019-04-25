var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Contato } from '../../models/contato.model';
var ContatoFormComponent = /** @class */ (function () {
    function ContatoFormComponent() {
        this.saveContato = new EventEmitter();
    }
    ContatoFormComponent.prototype.ngOnInit = function () { };
    ContatoFormComponent.prototype.onSubmit = function (form) {
        this.saveContato.emit(form);
    };
    __decorate([
        Input(),
        __metadata("design:type", Contato)
    ], ContatoFormComponent.prototype, "contato", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ContatoFormComponent.prototype, "saveContato", void 0);
    ContatoFormComponent = __decorate([
        Component({
            selector: 'app-contato-form',
            templateUrl: './contato-form.component.html',
            styleUrls: ['./contato-form.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], ContatoFormComponent);
    return ContatoFormComponent;
}());
export { ContatoFormComponent };
//# sourceMappingURL=contato-form.component.js.map