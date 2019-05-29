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
import { FormBuilder } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { from } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/internal/operators';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/medico.service';
var MedicoListComponent = /** @class */ (function () {
    function MedicoListComponent(formBuilder, medicoService) {
        this.formBuilder = formBuilder;
        this.medicoService = medicoService;
        this.searchBarState = 'hidden';
    }
    MedicoListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.medico = new Medico();
        this.medicoService.getMedicos()
            .subscribe(function (medicos) { _this.medicos = medicos; });
        this.searchControl = this.formBuilder.control('');
        this.searchForm = this.formBuilder.group({ searchControl: this.searchControl });
        this.searchControl.valueChanges
            .pipe(debounceTime(500))
            .pipe(distinctUntilChanged())
            .pipe(switchMap(function (searchTerm) { return _this.medicoService
            .getMedicos(searchTerm)
            .pipe(catchError(function (error) { return from(['']); })); }))
            .subscribe(function (medicos) { return _this.medicos = medicos; });
    };
    ; // fim ngOnInit()
    MedicoListComponent.prototype.toggleSearch = function () {
        this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
    }; // fim toggleSearch()
    MedicoListComponent = __decorate([
        Component({
            selector: 'app-medico-list',
            templateUrl: './medico-list.component.html',
            styleUrls: ['./medico-list.component.css'],
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
            MedicoService])
    ], MedicoListComponent);
    return MedicoListComponent;
}());
export { MedicoListComponent };
//# sourceMappingURL=medico-list.component.js.map