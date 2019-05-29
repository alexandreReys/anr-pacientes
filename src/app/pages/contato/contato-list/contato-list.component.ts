import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate} from "@angular/animations";
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/internal/operators';
import { Observable, from } from 'rxjs';

import { Contato } from '../../../models/contato.model';
import { ContatoService } from 'src/app/services/contato.service';


@Component({
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
})
export class ContatoListComponent implements OnInit {

  searchBarState = 'hidden';

  searchForm: FormGroup;
  searchControl: FormControl;

  @Input() contatos: Contato[];
  @Output() editContato = new EventEmitter();
  @Output() deleteContato = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
              private contatoService: ContatoService) { }

  ngOnInit() { 

    this.searchControl = this.formBuilder.control('');
    this.searchForm = this.formBuilder.group({
      searchControl: this.searchControl
    });

    this.searchControl.valueChanges
      .pipe( debounceTime( 500 ) )
      .pipe( distinctUntilChanged() )
      .pipe( switchMap( searchTerm => this.contatoService
          .getContatos(searchTerm)
          .pipe( catchError( function(error): Observable<any> { return from(['']) } ) )
       ) )
      .subscribe( contatos => this.contatos = contatos );
  };

  toggleSearch() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
  }

  edit(contato: Contato) {
    if (this.searchBarState !== 'hidden') {
      this.searchBarState = 'hidden';
      this.searchControl.setValue('');
    }
    this.editContato.emit(contato);   // => contato.component.edit
  }  

  delete(contato: Contato) {
    this.deleteContato.emit(contato);
  }  

}
