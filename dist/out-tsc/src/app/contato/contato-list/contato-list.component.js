var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
var ContatoListComponent = /** @class */ (function () {
    function ContatoListComponent() {
        this.editContato = new EventEmitter();
        this.deleteContato = new EventEmitter();
    }
    ContatoListComponent.prototype.ngOnInit = function () { };
    ContatoListComponent.prototype.edit = function (contato) {
        this.editContato.emit(contato);
    };
    ContatoListComponent.prototype.delete = function (contato) {
        this.deleteContato.emit(contato);
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ContatoListComponent.prototype, "contatos", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ContatoListComponent.prototype, "editContato", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ContatoListComponent.prototype, "deleteContato", void 0);
    ContatoListComponent = __decorate([
        Component({
            selector: 'app-contato-list',
            templateUrl: './contato-list.component.html',
            styleUrls: ['./contato-list.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], ContatoListComponent);
    return ContatoListComponent;
}());
export { ContatoListComponent };
//# sourceMappingURL=contato-list.component.js.map