import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PacientesListComponent } from './pacientes-list/pacientes-list.component';
import { PacienteFormComponent } from './paciente-form/paciente-form.component';
import { PacientesListagemComponent } from './pacientes-listagem/pacientes-listagem.component';

const routes: Routes = [
  { path: '', component: PacientesListComponent },
  { path: 'new/:to', component: PacienteFormComponent },
  { path: 'new', component: PacienteFormComponent },
  { path: ':id/edit/:to', component: PacienteFormComponent },
  { path: ':id/edit', component: PacienteFormComponent },
  { path: 'listagem', component: PacientesListagemComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule { }
