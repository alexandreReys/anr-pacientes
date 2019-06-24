import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IMaskModule } from 'angular-imask';

import { ConsultasRoutingModule } from './consultas-routing.module';
import { ConsultasListComponent } from './consultas-list/consultas-list.component';
import { ConsultaFormComponent } from './consulta-form/consulta-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConsultasRoutingModule,
    IMaskModule
  ],
  declarations: [ConsultasListComponent, ConsultaFormComponent]
})
export class ConsultasModule { }
