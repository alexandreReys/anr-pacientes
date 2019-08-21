import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';

import { MedicosRoutingModule } from './medicos-routing.module';
import { MedicoListComponent } from './medico-list/medico-list.component';
import { MedicoFormComponent } from './medico-form/medico-form.component';
import { MedicosListagemComponent } from './medicos-listagem/medicos-listagem.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MedicosRoutingModule
  ],
  declarations: [MedicoListComponent, MedicoFormComponent, MedicosListagemComponent]
})
export class MedicosModule { }
