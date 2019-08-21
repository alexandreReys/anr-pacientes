import { Component, OnInit, Input } from '@angular/core';

import { Contato } from 'src/app/models/contato.model';
import { ContatoService } from 'src/app/services/contato.service';

@Component({
    selector: 'app-pacientes-listagem',
    templateUrl: './pacientes-listagem.component.html',
    styleUrls: ['./pacientes-listagem.component.css']
})
export class PacientesListagemComponent implements OnInit {

    pageTitle: string = 'Listagem de Pacientes';

    contatos: Contato[];

    constructor(
        private contatoService: ContatoService
    ) { }

    ngOnInit() {
        this.contatoService.getContatos()
            .subscribe( contatos => { 
                this.contatos = contatos;
            });
    }
}