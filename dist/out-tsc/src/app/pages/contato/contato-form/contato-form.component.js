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
import { FormBuilder, Validators } from '@angular/forms';
import { Contato } from '../../../models/contato.model';
var ContatoFormComponent = /** @class */ (function () {
    function ContatoFormComponent(formBuilder) {
        this.formBuilder = formBuilder;
        this.saveContato = new EventEmitter(); //saveContato => contato.component.ts
        this.cancelContato = new EventEmitter(); //cancelContato => contato.component.ts
    }
    ContatoFormComponent.prototype.ngOnInit = function () {
        this.orderForm = this.formBuilder.group({
            id: this.formBuilder.control(''),
            codigo: this.formBuilder.control(''),
            nome: this.formBuilder.control('', Validators.required),
            telefone: this.formBuilder.control('', Validators.required),
            endereco: this.formBuilder.control('', Validators.required),
            numero: this.formBuilder.control('', Validators.required),
            complemento: this.formBuilder.control(''),
            bairro: this.formBuilder.control(''),
            cidade: this.formBuilder.control('', Validators.required),
            estado: this.formBuilder.control('', Validators.required),
            cep: this.formBuilder.control('', Validators.required),
            paiNome: this.formBuilder.control('', Validators.required),
            paiTelefone: this.formBuilder.control('', Validators.required),
            paiProfissao: this.formBuilder.control(''),
            maeNome: this.formBuilder.control('', Validators.required),
            maeTelefone: this.formBuilder.control('', Validators.required),
            maeProfissao: this.formBuilder.control('')
        });
    };
    ;
    ContatoFormComponent.prototype.onSubmit = function () { };
    ContatoFormComponent.prototype.save = function () {
        this.saveContato.emit(this.orderForm); //saveContato => contato.component.ts
    };
    ;
    ContatoFormComponent.prototype.cancel = function () {
        this.cancelContato.emit(this.orderForm); //cancelContato => contato.component.ts
    };
    ;
    __decorate([
        Input(),
        __metadata("design:type", Contato)
    ], ContatoFormComponent.prototype, "contato", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ContatoFormComponent.prototype, "saveContato", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ContatoFormComponent.prototype, "cancelContato", void 0);
    ContatoFormComponent = __decorate([
        Component({
            selector: 'app-contato-form',
            templateUrl: './contato-form.component.html',
            styleUrls: ['./contato-form.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder])
    ], ContatoFormComponent);
    return ContatoFormComponent;
}());
export { ContatoFormComponent };
//# sourceMappingURL=contato-form.component.js.map