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
import { trigger, state, style, transition, animate } from "@angular/animations";
import { FormBuilder } from '@angular/forms';
import { from } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/internal/operators';
import { Contato } from '../../../models/contato.model';
import { ContatoService } from 'src/app/services/contato.service';
var ConsultaPacienteListComponent = /** @class */ (function () {
    function ConsultaPacienteListComponent(formBuilder, contatoService) {
        this.formBuilder = formBuilder;
        this.contatoService = contatoService;
        this.searchBarState = 'hidden';
    }
    ConsultaPacienteListComponent.prototype.ngOnInit = function () {
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
    ConsultaPacienteListComponent.prototype.toggleSearch = function () {
        this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
    }; // fim toggleSearch()
    ConsultaPacienteListComponent = __decorate([
        Component({
            selector: 'app-consulta-paciente-list',
            templateUrl: './consulta-paciente-list.component.html',
            styleUrls: ['./consulta-paciente-list.component.css'],
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
            ContatoService])
    ], ConsultaPacienteListComponent);
    return ConsultaPacienteListComponent;
}());
export { ConsultaPacienteListComponent };
//# sourceMappingURL=consulta-paciente-list.component.js.map