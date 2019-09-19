import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IMaskModule } from 'angular-imask';

import { SharedModule } from 'src/app/shared/shared.module';
import { ConsultasRoutingModule } from './consultas-routing.module';

import { ConsultasListComponent } from './consultas-list/consultas-list.component';
import { ConsultaFormComponent } from './consulta-form/consulta-form.component';
import { ConsultasListagemComponent } from './consultas-listagem/consultas-listagem.component';
import { ConsultasListagemDetComponent } from './consultas-listagem/consultas-listagem-det/consultas-listagem-det.component';
import { ConsultasHistoricoComponent } from './consultas-historico/consultas-historico.component';
import { ConsultasHistoricoListComponent } from './consultas-historico/consultas-historico-list/consultas-historico-list.component';
import { ConsultasPrintReceitaComponent } from './consultas-print-receita/consultas-print-receita.component';
import { ConsultasPrintAtestadoComponent } from './consultas-print-atestado/consultas-print-atestado.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ConsultasRoutingModule,
        SharedModule,
        IMaskModule
    ],
    declarations: [
        ConsultasListComponent, 
        ConsultaFormComponent, 
        ConsultasListagemComponent, 
        ConsultasListagemDetComponent, 
        ConsultasHistoricoComponent,
        ConsultasHistoricoListComponent, 
        ConsultasPrintReceitaComponent,
        ConsultasPrintAtestadoComponent
    ]
})
export class ConsultasModule { }
