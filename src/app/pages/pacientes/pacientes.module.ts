import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { PacientesRoutingModule } from './pacientes-routing.module';
import { PacientesListComponent } from './pacientes-list/pacientes-list.component';
import { PacienteFormComponent } from './paciente-form/paciente-form.component';
import { PacientesListagemComponent } from './pacientes-listagem/pacientes-listagem.component';
import { PacientesListagemDetComponent } from './pacientes-listagem/pacientes-listagem-det/pacientes-listagem-det.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PacientesRoutingModule
  ],
  declarations: [
    PacientesListComponent, 
    PacienteFormComponent, 
    PacientesListagemComponent, 
    PacientesListagemDetComponent
  ]
})
export class PacientesModule { }
