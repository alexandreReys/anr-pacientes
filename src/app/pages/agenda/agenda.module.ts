import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {IMaskModule} from 'angular-imask';

import { AgendaRoutingModule } from './agenda-routing.module';

import { AgendaListComponent } from './agenda-list/agenda-list.component';
import { AgendaFormComponent } from './agenda-form/agenda-form.component';

@NgModule({
  imports: [
    CommonModule, AgendaRoutingModule, ReactiveFormsModule, FormsModule, IMaskModule
  ],
  declarations: [AgendaListComponent, AgendaFormComponent]
})
export class AgendaModule { }
