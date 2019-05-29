import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Observable, from } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/internal/operators';

import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/medico.service';

@Component({
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
})

export class MedicoListComponent implements OnInit {
  
  searchBarState = 'hidden';

  searchForm: FormGroup;
  searchControl: FormControl;

  medico: Medico;
  medicos: Medico[];
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private medicoService: MedicoService) {}

  ngOnInit() {
        this.medico = new Medico();

        this.medicoService.getMedicos()
          .subscribe( medicos => { this.medicos = medicos });

        this.searchControl = this.formBuilder.control('');
        this.searchForm = this.formBuilder.group({ searchControl: this.searchControl });
      
        this.searchControl.valueChanges
          .pipe( debounceTime( 500 ) )
          .pipe( distinctUntilChanged() )
          .pipe( 
            switchMap( searchTerm => this.medicoService
              .getMedicos(searchTerm)
              .pipe( catchError( function(error): Observable<any> { return from(['']) } ) )
            ) 
          )
          .subscribe( medicos => this.medicos = medicos );
  };  // fim ngOnInit()
  
  edit(medico: Medico) {
    //  [routerLink]="[medico.idMedico,'edit']"

    this.medicoService.setDados(medico);
    this.router.navigate(['/medico/' + medico.idMedico + '/edit']);
  }

  delete(medico: Medico) {
    const resp: any = this.medicoService.deleteMedico(medico);
      
    let index = this.medicos.map( (item) => item.idMedico).indexOf(medico.idMedico);
    this.medicos.splice(index,1);
  };

  toggleSearch() {
        this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
  } // fim toggleSearch()
}
