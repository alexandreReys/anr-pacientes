import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {IMaskModule} from 'angular-imask';

import { AgendaRoutingModule } from './agenda-routing.module';

import { AgendaListaPacientesComponent } from './agenda-lista-pacientes/agenda-lista-pacientes.component';
import { AgendaListaConsultasComponent } from './agenda-lista-consultas/agenda-lista-consultas.component';
import { AgendaFormComponent } from './agenda-form/agenda-form.component';

@NgModule({
  imports: [
    CommonModule, AgendaRoutingModule, ReactiveFormsModule, FormsModule, IMaskModule
  ],
  declarations: [AgendaListaPacientesComponent, AgendaListaConsultasComponent, AgendaFormComponent]
})
export class AgendaModule { }
