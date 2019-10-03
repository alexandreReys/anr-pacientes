import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendaListaPacientesComponent } from './agenda-lista-pacientes/agenda-lista-pacientes.component';
import { AgendaListaConsultasComponent } from './agenda-lista-consultas/agenda-lista-consultas.component';
import { AgendaFormComponent } from './agenda-form/agenda-form.component';

const routes: Routes = [
  {path: '', component: AgendaListaPacientesComponent},
  {path: ':id/consulta', component: AgendaListaConsultasComponent},
  {path: ':id/new', component: AgendaFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaRoutingModule { }
