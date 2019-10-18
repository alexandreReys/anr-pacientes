import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { LoginService } from 'src/app/security/login/login.service';

import { Consulta } from 'src/app/models/consulta.model';
import { ConsultaService } from 'src/app/services/consulta.service';

import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/medico.service';

@Component({
    selector: 'app-consultas-list',
    templateUrl: './consultas-list.component.html',
    styleUrls: ['./consultas-list.component.css']
})
export class ConsultasListComponent implements OnInit {

    // searchBarState = 'hidden';
    searchForm: FormGroup;
    searchIdMedico: FormControl;
    searchDate: FormControl;

    consulta: Consulta;
    consultas: Consulta[]=[];

    medico: Medico;
    medicos: Medico[]=[];
    idMedicoSelecionado: number = 0;
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
        this.idMedicoSelecionado = Number( this.route.snapshot.url[0] );
        if(!this.idMedicoSelecionado) {
            this.idMedicoSelecionado = Number( this.loginService.user.idFuncionarioUsuario );
        }

        this.searchDate = this.formBuilder.control('');
        this.searchIdMedico = this.formBuilder.control('');

        this.searchForm = this.formBuilder.group({ 
            searchDate: this.searchDate,
            searchIdMedico: this.searchIdMedico

        });
        
        // this.idMedicoSelecionado = `${this.loginService.user.idFuncionarioUsuario}`;
        // if(this.idMedicoSelecionado === '0') { this.idMedicoSelecionado = null }
        // this.medicoService.getMedicoById(this.idMedicoSelecionado)
        //     .subscribe( medicos => { 
        //         this.medico = medicos[0]; 
        //         if(this.medico)
        //             this.nomeMedico = this.medico.nomeMedico
        //         else
        //             this.nomeMedico = 'Todos';
        //         this.setDateToday();
        //     }
        // );

        this.medicoService.getMedicos()
            .subscribe( medicos => {
                this.medicos = medicos;
                if(!this.idMedicoSelecionado) {
                    this.idMedicoSelecionado = Number( medicos[0].idMedico );
                };
                
                this.searchForm.controls['searchIdMedico'].setValue(this.idMedicoSelecionado);
                this.setDateToday();
            }
        );        

    };  // fim ngOnInit()

    medicosChanged(ev: number) {
        this.idMedicoSelecionado = ev;
        this.setDateToday();
    }

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
    }; // fim procuraData()
    
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
                consulta.dataConsulta = pData;
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

    formatDate(pDate: Date) {
        let year = pDate.getFullYear();
        
        let month = (1 + pDate.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        
        let day = pDate.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        
        return year + '-' + month + '-' + day; 
    }; // formatDate

    getConsultasData(pDate: string) {
        this.searchDate.setValue( pDate );
        if(this.idMedicoSelecionado) {
            this.consultaService.getConsultasData( pDate, this.idMedicoSelecionado.toString() )
                .subscribe( 
                    consultas => { 
                        this.consultas = this.preparaListaConsultas(pDate, consultas)
                    }
                );
        };
    }; // getConsultasData



///////////////////////////////////////////////////////////////////////////////////////////////////




    edit(consulta: Consulta) {
        if(consulta.nome) {
            this.consultaService.setDados(consulta);
            this.router.navigate(['/consulta/' + consulta.idConsulta + '/edit']);
        }
    }; // fim edit

    remarcacao(consulta: Consulta) {
        if(consulta.nome) {
            console.log('consultas list', consulta);
            
            this.consultaService.setDados(consulta);
            this.router.navigate(['/consulta/' + consulta.idMedicoConsulta + '/remarcacao']);
        }
    }; // fim remarcacao    

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

    // [ngClass]="(consulta.nome=='')?'horarioLivre':'horarioMarcado'" 

}
