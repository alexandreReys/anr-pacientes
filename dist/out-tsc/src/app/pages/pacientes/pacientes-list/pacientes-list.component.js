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
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { from } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/internal/operators';
import { Contato } from 'src/app/models/contato.model';
import { ContatoService } from 'src/app/services/contato.service';
var PacientesListComponent = /** @class */ (function () {
    function PacientesListComponent(formBuilder, router, contatoService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.contatoService = contatoService;
        this.searchBarState = 'hidden';
    }
    PacientesListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.contato = new Contato();
        this.contatoService.getContatos()
            .subscribe(function (contatos) { _this.contatos = contatos; });
        this.searchControl = this.formBuilder.control('');
        this.searchForm = this.formBuilder.group({ searchControl: this.searchControl });
        this.searchControl.valueChanges
            .pipe(debounceTime(500))
            .pipe(distinctUntilChanged())
            .pipe(switchMap(function (searchTerm) { return _this.contatoService
            .getContatos(searchTerm)
            .pipe(catchError(function (error) { return from(['']); })); }))
            .subscribe(function (contatos) { return _this.contatos = contatos; });
    };
    ; // fim ngOnInit()
    PacientesListComponent.prototype.edit = function (contato) {
        //  [routerLink]="[contato.idContato,'edit']"
        this.contatoService.setDados(contato);
        this.router.navigate(['/paciente/' + contato.id + '/edit']);
    };
    PacientesListComponent.prototype.delete = function (contato) {
        var resp = this.contatoService.deleteContato(contato);
        var index = this.contatos.map(function (item) { return item.id; }).indexOf(contato.id);
        this.contatos.splice(index, 1);
    };
    ;
    PacientesListComponent.prototype.toggleSearch = function () {
        this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
    }; // fim toggleSearch()
    PacientesListComponent = __decorate([
        Component({
            selector: 'app-pacientes-list',
            templateUrl: './pacientes-list.component.html',
            styleUrls: ['./pacientes-list.component.css'],
            animations: [
                trigger('toggleSearch', [
                    state('hidden', style({
                        opacity: 0,
                        'max-height': '0px'
                    })),
                    state('visible', style({
                        opacity: 1,
                        'max-height': '70px',
                        'margin-top': '1px'
                    })),
                    transition('* => *', animate('250ms 0s ease-in-out'))
                ])
            ]
        }),
        __metadata("design:paramtypes", [FormBuilder,
            Router,
            ContatoService])
    ], PacientesListComponent);
    return PacientesListComponent;
}());
export { PacientesListComponent };
//# sourceMappingURL=pacientes-list.component.js.map