import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultasListComponent } from './consultas-list/consultas-list.component';
import { ConsultaFormComponent } from './consulta-form/consulta-form.component';
import { ConsultasListagemComponent } from './consultas-listagem/consultas-listagem.component';
import { ConsultasHistoricoListComponent } from './consultas-historico/consultas-historico-list/consultas-historico-list.component';
import { ConsultasHistoricoComponent } from './consultas-historico/consultas-historico.component';
import { ConsultasPrintReceitaComponent } from './consultas-print-receita/consultas-print-receita.component';
import { ConsultasPrintAtestadoComponent } from './consultas-print-atestado/consultas-print-atestado.component';

const routes: Routes = [
    {path: '', component: ConsultasListComponent},
    {path: ':id/edit', component: ConsultaFormComponent},
    {path: 'listagem', component: ConsultasListagemComponent},
    {path: 'historico', component: ConsultasHistoricoListComponent},
    {path: 'historico/:id', component: ConsultasHistoricoComponent},
    {path: 'receita', component: ConsultasPrintReceitaComponent},
    {path: 'atestado', component: ConsultasPrintAtestadoComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConsultasRoutingModule { }
