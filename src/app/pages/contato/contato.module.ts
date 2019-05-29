import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { ContatoComponent } from './contato.component';
import { ContatoFormComponent } from './contato-form/contato-form.component';
import { ContatoListComponent } from './contato-list/contato-list.component';
import { SharedModule } from '../../shared/shared.module';

export const ROUTES: Routes = [
  {path: '', component: ContatoComponent},
  {path: ':id', component: ContatoComponent}
];

@NgModule({
  declarations: [
    ContatoComponent, 
    ContatoFormComponent,
    ContatoListComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class ContatoModule {};
