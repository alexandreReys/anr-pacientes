import { Component, OnInit } from '@angular/core';

import { ConsultaService } from 'src/app/services/consulta.service';
import { ContatoService } from 'src/app/services/contato.service';
import { MedicoService } from 'src/app/services/medico.service';
import { EmpresaService } from "src/app/services/empresa.service";

import { Contato } from 'src/app/models/contato.model';
import { Consulta } from 'src/app/models/consulta.model';
import { Medico } from 'src/app/models/medico.model';
import { Empresa } from 'src/app/models/empresa.model';

import * as utils from "src/app/shared/utils.js";

@Component({
    selector: 'app-consultas-print-receita',
    templateUrl: './consultas-print-receita.component.html',
    styleUrls: ['./consultas-print-receita.component.css']
})
export class ConsultasPrintReceitaComponent implements OnInit {

    contato: Contato;
    contatos: Contato[] = [];

    consulta: Consulta;

    medico: Medico;
    nomeMedico: string = "";
    especialidadeMedico: string = "";
    crmMedico: string = "";
    
    empresa: Empresa;
    razaoSocialEmpresa: string = "";
    endereco1Empresa: string = "";
    endereco2Empresa: string = "";

    idade: string = '';

    constructor(
        private consultaService: ConsultaService,
        private contatoService: ContatoService,
        private empresaService: EmpresaService,
        private medicoService: MedicoService
    ) { }

    ngOnInit() {
        this.consultaService.subject
        .subscribe( resp => { 
            this.consulta = resp;

            const idPaciente: string = this.consulta.idPacienteConsulta.toString();
            this.contatoService.getContatosId(idPaciente)
                .subscribe( contatos => {
                    this.contato = contatos[0]; 
                    this.idade = utils.calculaIdadeAMD(this.contato.dataNasc.toString());
                    
                });

            const idMedico: string = this.consulta.idMedicoConsulta.toString();
            this.medicoService.getMedicoById(idMedico)
                .subscribe( medicos => {
                    this.medico = medicos[0];
                    this.nomeMedico = this.medico.nomeMedico;
                    this.especialidadeMedico = this.medico.especialidadeMedico;
                    this.crmMedico = this.medico.crmMedico;
                });

            const idEmpresa: string = this.consulta.idEmpresaConsulta.toString();
            this.empresaService.getEmpresaById(idEmpresa)
                .subscribe( empresas => {
                    this.empresa = empresas[0];
                    this.razaoSocialEmpresa = 
                        this.empresa.razaoSocialEmpresa;
                    this.endereco1Empresa = 
                        this.empresa.enderecoEmpresa + ', ' + 
                        this.empresa.numeroEmpresa; 
                    this.endereco2Empresa = 
                        'Bairro: ' + this.empresa.bairroEmpresa + ', ' + 
                        this.empresa.cidadeEmpresa + ', ' + 
                        this.empresa.estadoEmpresa + ', ' + 
                        'Telefone: ' + this.empresa.telefoneEmpresa;
                });
        } );
    }

    imprime() {
        var prtContent = document.getElementById('content');
        var WinPrint = window.open(
            '','','left=150,top=100,width=750,height=400,location=no,menubar=yes,status=no,scrollbars=yes,resizable=yes,toolbar=yes'
        );
        WinPrint.document.write(prtContent.innerHTML);
        WinPrint.document.close();
        WinPrint.focus();
        WinPrint.print();
        WinPrint.close();
    }
}
