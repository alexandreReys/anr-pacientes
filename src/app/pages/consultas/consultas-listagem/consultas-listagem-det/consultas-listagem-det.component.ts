import { Component, OnInit, Input } from '@angular/core';

import { Consulta } from 'src/app/models/consulta.model';

@Component({
    selector: 'app-consultas-listagem-det',
    templateUrl: './consultas-listagem-det.component.html',
    styleUrls: ['./consultas-listagem-det.component.css']
})
export class ConsultasListagemDetComponent implements OnInit {

    @Input() consultas: Consulta[];
    
    constructor() {}

    ngOnInit() {}
}
