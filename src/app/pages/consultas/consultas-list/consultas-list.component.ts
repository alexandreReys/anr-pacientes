import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { LoginService } from 'src/app/security/login/login.service';

import { Consulta } from 'src/app/models/consulta.model';
import { ConsultaService } from 'src/app/services/consulta.service';

import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/medico.service';

// import { debounceTime } from 'rxjs/internal/operators';
// import { trigger, state, style, transition, animate } from '@angular/animations';
// import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from 'constants';   supostamente importado por acidente

@Component({
    selector: 'app-consultas-list',
    templateUrl: './consultas-list.component.html',
    styleUrls: ['./consultas-list.component.css']
})
export class ConsultasListComponent implements OnInit {

    searchBarState = 'hidden';
    searchForm: FormGroup;
    searchDate: FormControl;

    consulta: Consulta;
    consultas: Consulta[]=[];

    medico: Medico;
    idMedico: string = '';
    nomeMedico: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private consultaService: ConsultaService,
        private medicoService: MedicoService,
        private loginService: LoginService
    ) {}

    ngOnInit() {
        this.searchDate = this.formBuilder.control('');
        this.searchForm = this.formBuilder.group({ searchDate: this.searchDate });
        
        this.setDateToday();

        this.idMedico = `${this.loginService.user.idFuncionarioUsuario}`;
        if(this.idMedico === '0') { this.idMedico = null }
        this.medicoService.getMedicoById(this.idMedico)
            .subscribe( medicos => { 
                this.medico = medicos[0]; 
                if(this.medico)
                    this.nomeMedico = this.medico.nomeMedico
                else
                    this.nomeMedico = 'Todos';
            }
        );

    };  // fim ngOnInit() 
        
    edit(consulta: Consulta) {
        if(consulta.nome) {
            this.consultaService.setDados(consulta);
            this.router.navigate(['/consulta/' + consulta.idConsulta + '/edit']);
        }
    }; // fim edit

    delete(consulta: Consulta) {
        const resp: any = this.consultaService.deleteConsulta(consulta);
        
        let index = this.consultas.map( (item) => item.idConsulta).indexOf(consulta.idConsulta);
        this.consultas.splice(index,1);
    }; // fim delete

    receita(consulta: Consulta) {
        this.consultaService.setDados(consulta);
        this.router.navigate(['/consulta/receita']);
    }; // fim receita

    atestado(consulta: Consulta) {
        this.consultaService.setDados(consulta);
        this.router.navigate(['/consulta/atestado']);
    }; // fim atestado

    procuraData(todos?: boolean) {
        this.consulta = new Consulta();
        this.consulta.dataConsulta = 'Processando ...';
        if(todos) {
            this.consultaService.getConsultas(null, this.idMedico)
                .subscribe( consultas => this.consultas = consultas );
        } else {
            let selectedDate = this.searchDate.value;
            if(selectedDate)
                this.consultaService.getConsultasData(selectedDate, this.idMedico)
                    .subscribe( consultas => this.consultas = this.preparaListaConsultas(selectedDate, consultas) );
            else
                this.consultaService.getConsultas(null, this.idMedico)
                    .subscribe( consultas => this.consultas = consultas );
        }

    }; // fim procuraData()
    
    
    // [ngClass]="(consulta.nome=='')?'horarioLivre':'horarioMarcado'" 

    formatDate(pDate: Date) {
        let year = pDate.getFullYear();
      
        let month = (1 + pDate.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
      
        let day = pDate.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        
        return year + '-' + month + '-' + day; 
    }

    getConsultasData(pDate: string) {
        this.searchDate.setValue( pDate );
        this.consultaService.getConsultasData( pDate, this.idMedico )
            .subscribe( 
                consultas => { 
                    this.consultas = this.preparaListaConsultas(pDate, consultas)
                }
            );
    }

    setDateToday() {
        let sDate: string = this.formatDate(new Date);
        this.getConsultasData(sDate);
    }; // fim setDateHoje()

    setDateNext() {
        let sDate: string = this.searchDate.value.replace(/-/g, "/"); // replace - to /
        let date = new Date(sDate);
        date.setDate( date.getDate() + 1);
        sDate = this.formatDate(date);
        this.getConsultasData(sDate);
    }; // fim setDateNext()

    setDatePrior() {
        let sDate: string = this.searchDate.value.replace(/-/g, "/"); // replace - to /
        let date = new Date(sDate);
        date.setDate( date.getDate() - 1);
        sDate = this.formatDate(date);
        this.getConsultasData(sDate);
    }; // fim setDatePrior()

    // preparaListaConsultas(consultas: Consulta[]) {
    //     var horasDiarias = [
    //         '08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30',
    //         '12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30',
    //         '16:00','16:30','17:00','17:30','18:00'
    //     ];
    //     var i = 0;
    //     var consultasLength = consultas.length-1;
        
    //     var resp: Consulta[] = horasDiarias.map( el => {

    //         var auxHoraConsulta = '';
    //         if( i > consultasLength )      // acabaram as consultas
    //             auxHoraConsulta = '00:00'  // acabaram as consultas - Hora 0 marca horario sem consulta
    //         else
    //             auxHoraConsulta = consultas[i].horaConsulta;
            
    //         if(consultas[i] && !this.dataReferencia) {
    //             this.dataReferencia = consultas[i].dataConsultaFrm.substr(0,5);  // Pega data de referencia. para usar nos horarios livres
    //         }

    //         if( i > consultasLength || el != auxHoraConsulta) {     // Horario sem consulta
    //             let consulta = new Consulta;                        // Retorna Data, Hora, sem demais dados
    //             consulta.dataConsultaFrm = this.dataReferencia;     
    //             consulta.horaConsulta = el;
    //             consulta.nome = '';
    //             return consulta;
    //         } else {                                                // Horario com consulta
    //             var result = consultas[i];                          // Retorna dados da consulta com data abreviada
    //             result.dataConsultaFrm = result.dataConsultaFrm.substr(0,5);
    //             i++;
    //             return result;
    //         }
    //         // return resp;

    //     }); //  horasDiarias.map(

    //     return resp;
    // }; // preparaListaConsultas(

    preparaListaConsultas(pData: string, consultas: Consulta[]) {
        const horasDiarias = [
            '08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00',
            '13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00' 
        ];
        var i = 0;
        var resp: Consulta[]=[];
        
        horasDiarias.forEach( element => {
            if( !consultas || i > consultas.length-1 || element != consultas[i].horaConsulta) { // Horario sem consulta
                let consulta = new Consulta;                                       // Retorna Data, Hora, sem demais dados
                consulta.dataConsultaFrm = pData.substr(8,2)+'-'+pData.substr(5,2);     
                consulta.horaConsulta = element;
                consulta.nome = '';
                resp.push(consulta);
            } else {                        // Horario com consulta
                while (element == consultas[i].horaConsulta) {
                    var result = consultas[i];  
                    result.dataConsultaFrm = result.dataConsultaFrm.substr(0,5);
                    resp.push(result);
                    i++;
                    if ( i > consultas.length-1) { break }
                }
            }
        });
        
        return resp;
    }; // preparaListaConsultas(

}
