import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import {CalendarModule} from 'primeng/calendar';
import {IMaskModule} from 'angular-imask';

import { ConsultasRoutingModule } from './consultas-routing.module';

import { ConsultaPacienteListComponent } from './consulta-paciente-list/consulta-paciente-list.component';
import { ConsultasPacienteFormComponent } from './consulta-form/consulta-form.component';
import { ConsultasReceitaPrintComponent } from './consultas-receita-print/consultas-receita-print.component';

import { ContatoService } from 'src/app/services/contato.service';

@NgModule({
  imports: [
    CommonModule,
    ConsultasRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    // CalendarModule,
    IMaskModule
  ],
  declarations: [ConsultaPacienteListComponent, ConsultasPacienteFormComponent, ConsultasReceitaPrintComponent],
  providers: [ContatoService]
})
export class ConsultasModule { }
