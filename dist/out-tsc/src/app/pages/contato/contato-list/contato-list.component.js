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
import { trigger, state, style, transition, animate } from "@angular/animations";
import { FormBuilder } from '@angular/forms';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/internal/operators';
import { from } from 'rxjs';
import { ContatoService } from 'src/app/services/contato.service';
var ContatoListComponent = /** @class */ (function () {
    function ContatoListComponent(formBuilder, contatoService) {
        this.formBuilder = formBuilder;
        this.contatoService = contatoService;
        this.searchBarState = 'hidden';
        this.editContato = new EventEmitter();
        this.deleteContato = new EventEmitter();
    }
    ContatoListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.searchControl = this.formBuilder.control('');
        this.searchForm = this.formBuilder.group({
            searchControl: this.searchControl
        });
        this.searchControl.valueChanges
            .pipe(debounceTime(500))
            .pipe(distinctUntilChanged())
            .pipe(switchMap(function (searchTerm) { return _this.contatoService
            .getContatos(searchTerm)
            .pipe(catchError(function (error) { return from(['']); })); }))
            .subscribe(function (contatos) { return _this.contatos = contatos; });
    };
    ;
    ContatoListComponent.prototype.toggleSearch = function () {
        this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
    };
    ContatoListComponent.prototype.edit = function (contato) {
        if (this.searchBarState !== 'hidden') {
            this.searchBarState = 'hidden';
            this.searchControl.setValue('');
        }
        this.editContato.emit(contato); // => contato.component.edit
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
            styleUrls: ['./contato-list.component.css'],
            animations: [
                trigger('toggleSearch', [
                    state('hidden', style({
                        opacity: 0,
                        'max-height': '0px'
                    })),
                    state('visible', style({
                        opacity: 1,
                        'max-height': '70px',
                        'margin-top': '20px'
                    })),
                    transition('* => *', animate('250ms 0s ease-in-out'))
                ])
            ]
        }),
        __metadata("design:paramtypes", [FormBuilder,
            ContatoService])
    ], ContatoListComponent);
    return ContatoListComponent;
}());
export { ContatoListComponent };
//# sourceMappingURL=contato-list.component.js.map