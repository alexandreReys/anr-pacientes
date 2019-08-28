import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendaListComponent } from './agenda-list/agenda-list.component';
import { AgendaFormComponent } from './agenda-form/agenda-form.component';

const routes: Routes = [
  {path: '', component: AgendaListComponent},
  {path: ':id/new', component: AgendaFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaRoutingModule { }
