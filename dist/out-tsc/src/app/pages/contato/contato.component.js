var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Contato } from '../../models/contato.model';
import { ContatoService } from '../../services/contato.service';
var ContatoComponent = /** @class */ (function () {
    function ContatoComponent(contatoService) {
        this.contatoService = contatoService;
    }
    ContatoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.contato = new Contato();
        this.contatoService.getContatos()
            .subscribe(function (contatos) { _this.contatos = contatos; });
    };
    ;
    ContatoComponent.prototype.edit = function (contato) {
        this.contato = contato;
    };
    ;
    ContatoComponent.prototype.delete = function (contato) {
        var index = this.contatos.map(function (item) { return item.id; }).indexOf(contato.id);
        this.contatoService.deleteContato(contato);
        this.contatos.splice(index, 1);
    };
    ;
    ContatoComponent.prototype.cancelContato = function (form) {
        var _this = this;
        // Chamado por contato-form
        this.contato = new Contato;
        form.reset();
        this.contatoService.getContatos()
            .subscribe(function (contatos) { return _this.contatos = contatos; });
    };
    ;
    ContatoComponent.prototype.saveContato = function (form) {
        // Chamado por contato-form
        var _this = this;
        var inclusao = false;
        this.contato = form.value; // Pega os dados do form
        if (!this.contato.codigo) {
            inclusao = true;
            this.contato.codigo = new Date().getTime().toString();
        }
        ;
        if (inclusao) {
            this.contatoService.addContato(this.contato);
        }
        else {
            this.contatoService.updateContato(this.contato);
        }
        ;
        this.contato = new Contato;
        form.reset();
        this.contatoService.getContatos()
            .subscribe(function (contatos) { return _this.contatos = contatos; });
    };
    ;
    ContatoComponent = __decorate([
        Component({
            selector: 'app-contato',
            templateUrl: './contato.component.html',
            styleUrls: ['./contato.component.css']
        }),
        __metadata("design:paramtypes", [ContatoService])
    ], ContatoComponent);
    return ContatoComponent;
}());
export { ContatoComponent };
//# sourceMappingURL=contato.component.js.map