import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultaPacienteListComponent } from './consulta-paciente-list/consulta-paciente-list.component';
import { ConsultasPacienteFormComponent } from './consulta-form/consulta-form.component';
import { ConsultasReceitaPrintComponent } from './consultas-receita-print/consultas-receita-print.component';

const routes: Routes = [
  {path: '', component: ConsultaPacienteListComponent},
  {path: ':codigo/new', component: ConsultasPacienteFormComponent},
  {path: 'receita', component: ConsultasReceitaPrintComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultasRoutingModule { }
