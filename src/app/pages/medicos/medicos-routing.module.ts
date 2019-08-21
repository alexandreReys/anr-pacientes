import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicoListComponent } from './medico-list/medico-list.component';
import { MedicoFormComponent } from './medico-form/medico-form.component';
import { MedicosListagemComponent } from './medicos-listagem/medicos-listagem.component';

const routes: Routes = [
  {path: '', component: MedicoListComponent},
  {path: 'new', component: MedicoFormComponent},
  {path: ':id/edit', component: MedicoFormComponent},
  { path: 'listagem', component: MedicosListagemComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicosRoutingModule { }
