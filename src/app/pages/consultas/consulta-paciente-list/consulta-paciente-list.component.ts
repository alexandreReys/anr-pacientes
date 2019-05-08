import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate} from "@angular/animations";


import { Observable, from } from 'rxjs';

import { Contato } from '../../../models/contato.model';
import { ContatoService } from 'src/app/services/contato.service';

@Component({
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
        'margin-top': '20px'
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class ConsultaPacienteListComponent implements OnInit {
  
  contato: Contato;
  contatos: Contato[];
  
  constructor(private contatoService: ContatoService) {}

  ngOnInit() {
    this.contato = new Contato();
    this.contatoService.getContatos()
      .subscribe( contatos => { 
        this.contatos = contatos; 
      });
  };

}
