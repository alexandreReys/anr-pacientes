import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IMaskModule } from 'angular-imask';

import { ConsultasRoutingModule } from './consultas-routing.module';
import { ConsultasListComponent } from './consultas-list/consultas-list.component';
import { ConsultaFormComponent } from './consulta-form/consulta-form.component';
import { ConsultasListagemComponent } from './consultas-listagem/consultas-listagem.component';
import { ConsultasListagemDetComponent } from './consultas-listagem/consultas-listagem-det/consultas-listagem-det.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConsultasRoutingModule,
    IMaskModule
  ],
  declarations: [ConsultasListComponent, ConsultaFormComponent, ConsultasListagemComponent, ConsultasListagemDetComponent]
})
export class ConsultasModule { }
