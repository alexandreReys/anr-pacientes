import { Component, OnInit } from '@angular/core';
var _ = require('lodash');

import { Consulta } from 'src/app/models/consulta.model';
import { ConsultaService } from 'src/app/services/consulta.service';

@Component({
  selector: 'app-consultas-listagem',
  templateUrl: './consultas-listagem.component.html',
  styleUrls: ['./consultas-listagem.component.css']
})
export class ConsultasListagemComponent implements OnInit {
 
  consultas: Consulta[]=[];

  constructor(
      private consultaService: ConsultaService
  ) { }

    ngOnInit() {
        this.consultaService.getConsultas().subscribe( 
            consultas => { 
                // this.consultas = consultas;
                
                // this.consultas = Array.of( _.groupBy(consultas, 'nomeMedico') );
                
                var result = _(consultas)
                    .groupBy(x => x.nomeMedico)
                    .map((value, key) => ({nomeMedico: key, consultas: value}))
                    .value();
                this.consultas = Array.of(result);
            }
        );  
    }
}
