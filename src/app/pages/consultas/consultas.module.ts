import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {CalendarModule} from 'primeng/calendar';

import { ConsultasRoutingModule } from './consultas-routing.module';
import { ConsultaPacienteListComponent } from './consulta-paciente-list/consulta-paciente-list.component';
import { ConsultasPacienteFormComponent } from './consultas-paciente-form/consultas-paciente-form.component';

@NgModule({
  imports: [
    CommonModule,
    ConsultasRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule
  ],
  declarations: [ConsultaPacienteListComponent, ConsultasPacienteFormComponent]
})
export class ConsultasModule { }
