import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate} from "@angular/animations";
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { Observable, from } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/internal/operators';

import { Contato } from 'src/app/models/contato.model';
import { ContatoService } from 'src/app/services/contato.service';

@Component({
    selector: 'app-agenda-lista-pacientes',
    templateUrl: './agenda-lista-pacientes.component.html',
    styleUrls: ['./agenda-lista-pacientes.component.css'],
    animations: [
        trigger('toggleSearch', [
        state('hidden', style( {
            opacity: 0,
            'max-height': '0px'
        } )),
        state('visible', style({
            opacity: 1,
            'max-height': '70px',
            'margin-top': '1px'
        })),
        transition('* => *', animate('250ms 0s ease-in-out'))
        ])
    ]
})

export class AgendaListaPacientesComponent implements OnInit {
  
    searchBarState = 'hidden';
    searchForm: FormGroup;
    searchControl: FormControl;

    contato: Contato;
    contatos: Contato[];
    
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private contatoService: ContatoService) {}

    ngOnInit() {
        this.contato = new Contato();

        this.contatoService.getContatos()
        .subscribe( contatos => { this.contatos = contatos });

        this.searchControl = this.formBuilder.control('');
        this.searchForm = this.formBuilder.group({ searchControl: this.searchControl });
    
        this.searchControl.valueChanges
        .pipe( debounceTime( 500 ) )
        .pipe( distinctUntilChanged() )
        .pipe( 
            switchMap( searchTerm => this.contatoService
            .getContatos(searchTerm)
            .pipe( catchError( function(error): Observable<any> { return from(['']) } ) )
            ) 
        )
        .subscribe( contatos => this.contatos = contatos );
    };  //ngOnInit()
    
    editarPaciente(contato: Contato) {
        let navigateTo = '/paciente/'+contato.id+'/edit/agenda';
        this.contatoService.setDados(contato);
        this.router.navigate([navigateTo]);  // this.router.navigate(['/paciente']);
    }

    abrirHistorico(contato: Contato) {
        this.contatoService.setDados(contato);
        this.router.navigate(['/consulta/historico/'+contato.id]);
      };  //abrirHistorico
    
    toggleSearch() {
        this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
    } //toggleSearch()
}
