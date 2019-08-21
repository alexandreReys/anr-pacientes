import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Observable, from } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/internal/operators';

import { Contato } from 'src/app/models/contato.model';
import { ContatoService } from 'src/app/services/contato.service';

@Component({
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
})
export class PacientesListComponent implements OnInit {
  
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
            .subscribe( contatos => this.contatos = contatos );

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
  };  // fim ngOnInit()
  
  edit(contato: Contato) {
    //  [routerLink]="[contato.idContato,'edit']"

    this.contatoService.setDados(contato);
    this.router.navigate(['/paciente/' + contato.id + '/edit']);
  }

  delete(contato: Contato) {
    const resp: any = this.contatoService.deleteContato(contato);
      
    let index = this.contatos.map( (item) => item.id).indexOf(contato.id);
    this.contatos.splice(index,1);
  };

  toggleSearch() {
        this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
  } // fim toggleSearch()

}
