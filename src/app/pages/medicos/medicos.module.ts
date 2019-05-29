import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MedicosRoutingModule } from './medicos-routing.module';
import { MedicoListComponent } from './medico-list/medico-list.component';
import { MedicoFormComponent } from './medico-form/medico-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MedicosRoutingModule
  ],
  declarations: [MedicoListComponent, MedicoFormComponent]
})
export class MedicosModule { }
