import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultasListComponent } from './consultas-list/consultas-list.component';
import { ConsultaFormComponent } from './consulta-form/consulta-form.component';

const routes: Routes = [
  {path: '', component: ConsultasListComponent},
  {path: ':id/edit', component: ConsultaFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultasRoutingModule { }
