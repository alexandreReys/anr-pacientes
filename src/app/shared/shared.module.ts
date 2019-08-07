import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputComponent} from './input/input.component';
import { ListagemHeaderComponent } from 'src/app/shared/listagem-header/listagem-header.component';

@NgModule({
  declarations: [InputComponent, ListagemHeaderComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [InputComponent, ListagemHeaderComponent, CommonModule, FormsModule, ReactiveFormsModule ]
})
export class SharedModule { }
