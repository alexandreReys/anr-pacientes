import { Component, OnInit } from '@angular/core';
var _ = require('lodash');

import { Contato } from 'src/app/models/contato.model';
import { ContatoService } from 'src/app/services/contato.service';

@Component({
    selector: 'app-pacientes-listagem',
    templateUrl: './pacientes-listagem.component.html',
    styleUrls: ['./pacientes-listagem.component.css']
})
export class PacientesListagemComponent implements OnInit {

    contatos: Contato[];

    constructor(
        private contatoService: ContatoService
    ) { }

    ngOnInit() {
        this.contatoService.getContatos()
            .subscribe( contatos => { 
                // this.contatos = contatos;
                this.contatos = Array.of( _.groupBy(contatos, 'complemento') );
                console.log(this.contatos);
            });

    }
}