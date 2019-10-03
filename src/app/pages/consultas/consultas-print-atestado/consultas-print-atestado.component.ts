import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

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
    selector: 'app-consultas-print-atestado',
    templateUrl: './consultas-print-atestado.component.html',
    styleUrls: ['./consultas-print-atestado.component.css']
})
export class ConsultasPrintAtestadoComponent implements OnInit {

    atestadoForm: FormGroup;
    fDataConsulta: FormControl;
    fHoraIniConsulta: FormControl;
    fHoraFinConsulta: FormControl;

    dataConsulta: string = '';
    dataConsultaFrm: string = '';
    horaIniConsulta: string = '';
    horaFinConsulta: string = '';

    contato: Contato;
    consulta: Consulta;
    medico: Medico;
    empresa: Empresa;

    contatos: Contato[] = [];

    razaoSocialEmpresa: string = "";
    endereco1Empresa: string = "";
    endereco2Empresa: string = "";

    idade: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private consultaService: ConsultaService,
        private contatoService: ContatoService,
        private empresaService: EmpresaService,
        private medicoService: MedicoService
    ) { }

    ngOnInit() {
        this.consultaService.subject
            .subscribe( resp => { 
                this.consulta = resp;
                
                const data = this.consulta.dataConsulta;

                this.dataConsulta    = this.consulta.dataConsulta;
                this.dataConsultaFrm = data.substr(8,2)+'/'+data.substr(5,2)+'/'+data.substr(0,4);

                this.horaIniConsulta = this.consulta.horaConsulta.substr(0,5);
                this.horaFinConsulta = this.retornaHoraFinal(this.horaIniConsulta);
                
                const idPaciente: string = this.consulta.idPacienteConsulta.toString();
                this.contatoService.getContatosId(idPaciente)
                        .subscribe( contatos => {
                            this.contato = contatos[0]; 
                            this.idade = utils.calculaIdadeAMD(this.contato.dataNasc.toString());
                        });

                    const idMedico: string = this.consulta.idMedicoConsulta.toString();
                    this.medicoService.getMedicoById(idMedico)
                        .subscribe( medicos => this.medico = medicos[0] );

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

                this.buildForm();
            } 
        );
    }

    retornaHoraFinal(pHoraIni: string) {
        var sHora: string = pHoraIni.substr(0,2);
        var iHora: number = parseInt(sHora);

        iHora ++;

        sHora = iHora.toString()+':'+pHoraIni.substr(3,2);
        if(iHora < 10) {
            sHora = '0' + sHora;
        }
        return sHora;
    }

    buildForm() {
        const dataConsulta: string = this.dataConsulta.substr(0,10);
        this.fDataConsulta     = this.formBuilder.control(dataConsulta);
        this.fHoraIniConsulta  = this.formBuilder.control(this.horaIniConsulta);
        this.fHoraFinConsulta  = this.formBuilder.control(this.horaFinConsulta);

        this.atestadoForm = 
            this.formBuilder.group({
                fDataConsulta: this.fDataConsulta,
                fHoraIniConsulta: this.fHoraIniConsulta,
                fHoraFinConsulta: this.fHoraFinConsulta
            }
        );
      };

    confirma() {
        let dateAux: string = this.fDataConsulta.value.toString();
        this.dataConsultaFrm = dateAux.substr(8,2) + '/' + dateAux.substr(5,2) + '/' + dateAux.substr(0,4);
        this.horaIniConsulta = this.fHoraIniConsulta.value;
        this.horaFinConsulta = this.fHoraFinConsulta.value;

        // var prtContent = document.getElementById('content');
        // var WinPrint = window.open(
        //     '','','left=150,top=100,width=750,height=400,location=no,menubar=yes,
        //     status=no,scrollbars=yes,resizable=yes,toolbar=yes'
        // );
        // WinPrint.document.write(prtContent.innerHTML);
        // WinPrint.document.close();
        // WinPrint.focus();
        // WinPrint.print();
        // WinPrint.close();
    }
}
