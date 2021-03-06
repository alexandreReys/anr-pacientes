import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { LoginService } from 'src/app/security/login/login.service';

import { Consulta } from 'src/app/models/consulta.model';
import { ConsultaService } from 'src/app/services/consulta.service';

import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/medico.service';

@Component({
    selector: 'app-consultas-list-remarcacao',
    templateUrl: './consultas-list-remarcacao.component.html',
    styleUrls: ['./consultas-list-remarcacao.component.css']
})
export class ConsultasListRemarcacaoComponent implements OnInit {

    navigateTo: string = '';

    searchForm: FormGroup;
    searchIdMedico: FormControl;
    searchDate: FormControl;

    consulta: Consulta;
    consultas: Consulta[]=[];

    medicos: Medico[]=[];
    idMedicoSelecionado: string = '';
    nomeMedico: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private consultaService: ConsultaService,
        private medicoService: MedicoService,
        private loginService: LoginService
    ) {}

    ngOnInit() {
        // this.navigateTo = this.route.snapshot.params['to'] || '/';
        // console.log(this.route.snapshot.params['to']);    undefined ??

        this.idMedicoSelecionado = this.route.snapshot.url[0].toString();

        this.searchDate = this.formBuilder.control('');
        this.searchIdMedico = this.formBuilder.control('');
        
        this.searchForm = this.formBuilder.group({
            searchDate: this.searchDate,
            searchIdMedico: this.searchIdMedico
        });

        this.medicoService.getMedicos()
            .subscribe( medicos => {
                this.medicos = medicos;
                if(!this.idMedicoSelecionado) {
                    this.idMedicoSelecionado = medicos[0].idMedico.toString();
                };
                
                this.searchForm.controls['searchIdMedico'].setValue(this.idMedicoSelecionado);
                this.setDateToday();
            }
        );
    
    }; // ngOnInit() 

    setDateToday() {
        let sDate: string = this.formatDate(new Date);
        this.getConsultasData(sDate);
    }; // setDateHoje()

    getConsultasData(pDate: string) {
        this.searchDate.setValue( pDate );
        if(this.idMedicoSelecionado) {
            this.consultaService.getConsultasData( pDate, this.idMedicoSelecionado.toString() )
                .subscribe( 
                    consultas => { 
                        this.consultas = this.preparaListaConsultas(pDate, consultas)
                    }
                );
        }
    }; // getConsultasData

    preparaListaConsultas(pData: string, consultas: Consulta[]) {
        const horasDiarias = [
            '08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00',
            '13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00' 
        ];
        var i = 0;
        var resp: Consulta[]=[];
        
        horasDiarias.forEach( element => {
            if( !consultas || i > consultas.length-1 || element != consultas[i].horaConsultaFrm) { // Horario sem consulta
                let consulta = new Consulta;                                       // Retorna Data, Hora, sem demais dados
                consulta.dataConsulta = pData;
                consulta.dataConsultaFrm = pData.substr(8,2)+'-'+pData.substr(5,2);
                consulta.horaConsulta = element;
                consulta.nome = '';
                resp.push(consulta);
            } else {                        // Horario com consulta
                while (element == consultas[i].horaConsultaFrm) {
                    var result = consultas[i];  
                    //result.dataConsultaFrm = result.dataConsultaFrm.substr(0,5);
                    result.dataConsultaFrm = result.dataConsulta.substr(8,2)+'/'+result.dataConsulta.substr(5,2);
                    result.horaConsultaFrm = result.horaConsulta.substr(0,5);
                    result.horaConsulta = result.horaConsulta.substr(0,5);
                    resp.push(result);
                    i++;
                    if ( i > consultas.length-1) { break }
                }
            }
        });
        
        return resp;
    }; // preparaListaConsultas(


///////////////////////////////////////////////////////////////////////////////////////////////////

 
    btVoltar() {
        // this.router.navigate(['/consulta/'+ this.idMedicoSelecionado + '/lista']);
        history.back();
    } // btVoltar

    medicosChanged(ev: string) {
        this.idMedicoSelecionado = ev;
        this.setDateToday();
    } // medicosChanged

    procuraData(todos?: boolean) {
        this.consulta = new Consulta();
        this.consulta.dataConsulta = 'Processando ...';
        if(todos) {
            this.consultaService.getConsultas(null, this.idMedicoSelecionado.toString())
                .subscribe( consultas => this.consultas = consultas );
        } else {
            let selectedDate = this.searchDate.value;
            if(selectedDate)
                this.consultaService.getConsultasData(selectedDate, this.idMedicoSelecionado.toString())
                    .subscribe( consultas => this.consultas = this.preparaListaConsultas(selectedDate, consultas) );
            else
                this.consultaService.getConsultas(null, this.idMedicoSelecionado.toString())
                    .subscribe( consultas => this.consultas = consultas );
        }
    }; // procuraData()

    setDateNext() {
        let sDate: string = this.searchDate.value.replace(/-/g, "/"); // replace - to /
        let date = new Date(sDate);
        date.setDate( date.getDate() + 1);
        sDate = this.formatDate(date);
        this.getConsultasData(sDate);
    }; // setDateNext()

    setDatePrior() {
        let sDate: string = this.searchDate.value.replace(/-/g, "/"); // replace - to /
        let date = new Date(sDate);
        date.setDate( date.getDate() - 1);
        sDate = this.formatDate(date);
        this.getConsultasData(sDate);
    }; // setDatePrior()

    formatDate(pDate: Date) {
        let year = pDate.getFullYear();
        
        let month = (1 + pDate.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        
        let day = pDate.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        
        return year + '-' + month + '-' + day; 
    }; // formatDate


///////////////////////////////////////////////////////////////////////////////////////////////////


    marcarConsulta(consulta) {
        if(!consulta.nome) {
            this.router.navigate([
                '/agenda' + 
                '/' + consulta.idPaciente + 
                '/' + this.idMedicoSelecionado + 
                '/' + consulta.dataConsulta + 
                '/' + consulta.horaConsulta + 
                '/'+ 'new'
            ]);
        };
    };

    remarcarConsulta(consulta) {
        if(!consulta.nome) {
            // this.consultaService.subject.subscribe( r => { this.consulta = r); Alterado para setDados2 em 18-10-2019

            this.consulta = this.consultaService.consulta; // consulta/hora antes de remarcar

            this.consulta.idMedicoConsulta = Number(this.idMedicoSelecionado);
            this.consulta.dataConsulta = consulta.dataConsulta;
            this.consulta.horaConsulta = consulta.horaConsulta;
            this.consultaService.updateConsultaRemarcacao(this.consulta);

            history.back();

            // this.router.navigate(['/consulta/'+this.idMedicoSelecionado+'/lista']);
            // this.router.navigate([this.navigateTo]);
        };
    };
}
