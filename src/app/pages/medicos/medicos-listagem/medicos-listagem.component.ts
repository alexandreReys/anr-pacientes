import { Component, OnInit, Input } from '@angular/core';

import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/medico.service';

@Component({
  selector: 'app-medicos-listagem',
  templateUrl: './medicos-listagem.component.html',
  styleUrls: ['./medicos-listagem.component.css']
})
export class MedicosListagemComponent implements OnInit {

  pageTitle: string = 'Listagem de Médicos';

  medicos: Medico[];

  constructor(
      private medicoService: MedicoService
  ) { }

  ngOnInit() {
      this.medicoService.getMedicos()
          .subscribe( medicos => { 
              this.medicos = medicos;
          });
  }
}