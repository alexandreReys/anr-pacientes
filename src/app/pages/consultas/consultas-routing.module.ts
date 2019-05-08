import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultaPacienteListComponent } from './consulta-paciente-list/consulta-paciente-list.component';
import { ConsultasPacienteFormComponent } from './consultas-paciente-form/consultas-paciente-form.component';

const routes: Routes = [
  {path: '', component: ConsultaPacienteListComponent},
  {path: ':codigo/new', component: ConsultasPacienteFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultasRoutingModule { }
