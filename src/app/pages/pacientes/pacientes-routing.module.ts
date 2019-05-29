import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PacientesListComponent } from './pacientes-list/pacientes-list.component';
import { PacienteFormComponent } from './paciente-form/paciente-form.component';

const routes: Routes = [
  { path: '', component: PacientesListComponent },
  { path: 'new/:to', component: PacienteFormComponent },
  { path: 'new', component: PacienteFormComponent },
  { path: ':id/edit/:to', component: PacienteFormComponent },
  { path: ':id/edit', component: PacienteFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule { }
