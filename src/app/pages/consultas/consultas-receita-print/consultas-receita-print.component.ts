import { Component, OnInit } from '@angular/core';

import { ConsultaService } from 'src/app/services/consulta.service';

import { Contato } from './../../../models/contato.model';
import { Consulta } from './../../../models/consulta.model';

@Component({
  selector: 'app-consultas-receita-print',
  templateUrl: './consultas-receita-print.component.html',
  styleUrls: ['./consultas-receita-print.component.css']
})
export class ConsultasReceitaPrintComponent implements OnInit {

  contato: Contato;
  contatos: Contato[];

  consulta: Consulta;

  constructor(private consultaService: ConsultaService) { }

  ngOnInit() {
    this.consultaService.subject.subscribe( resp => { this.consulta = resp} );
  }

}
