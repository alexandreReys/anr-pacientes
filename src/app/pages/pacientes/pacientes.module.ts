import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PacientesRoutingModule } from './pacientes-routing.module';
import { PacientesListComponent } from './pacientes-list/pacientes-list.component';
import { PacienteFormComponent } from './paciente-form/paciente-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PacientesRoutingModule
  ],
  declarations: [PacientesListComponent, PacienteFormComponent]
})
export class PacientesModule { }
