import { Component, OnInit } from '@angular/core';

import { ContatoService } from 'src/app/services/contato.service';
import { Contato } from 'src/app/models/contato.model';

import { ConsultaService } from 'src/app/services/consulta.service';
import { Consulta } from 'src/app/models/consulta.model';

@Component({
    selector: 'app-consultas-historico',
    templateUrl: './consultas-historico.component.html',
    styleUrls: ['./consultas-historico.component.css']
})
export class ConsultasHistoricoComponent implements OnInit {

    pageTitle: string = 'Histórico do Paciente';

    contato: Contato;

    consultas: Consulta[]=[];

    constructor(
        private contatoService: ContatoService,
        private consultaService: ConsultaService
    ) { }

    ngOnInit() {
        this.contatoService.subject.subscribe(resp => { this.contato = resp } );
        this.consultaService.getConsultasPaciente(this.contato.id.toString())
            .subscribe( consultas => this.consultas = consultas );
    }; //ngOnInit
};
