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
    selector: 'app-agenda-lista-consultas',
    templateUrl: './agenda-lista-consultas.component.html',
    styleUrls: ['./agenda-lista-consultas.component.css']
})
export class AgendaListaConsultasComponent implements OnInit {

    dataReferencia: string = '';

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
        
        this.setSearchDate();

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
                    .subscribe( consultas => this.consultas = this.preparaListaConsultas(consultas) );
            else
                this.consultaService.getConsultas(null, this.idMedico)
                    .subscribe( consultas => this.consultas = consultas );
        }

    }; // fim procuraData()
    
    
    // [ngClass]="(consulta.nome=='')?'horarioLivre':'horarioMarcado'" 


    setSearchDate() {
        let now = new Date;
        let year = now.getFullYear();
      
        let month = (1 + now.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
      
        let day = now.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        
        let date = year + '-' + month + '-' + day; 
        this.searchDate.setValue( date );
        this.consultaService.getConsultasData( date, this.idMedico )
            .subscribe( 
                consultas => { 
                    this.consultas = this.preparaListaConsultas(consultas)
                }
            );

    }; // fim setSearchDate()

    preparaListaConsultas(consultas: Consulta[]) {
        var horasDiarias = [
            '08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30',
            '12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30',
            '16:00','16:30','17:00','17:30','18:00'
        ];
        var i = 0;
        var l = consultas.length-1;
        
        var resp = horasDiarias.map( el => {
            var auxHoraConsulta = '';
            if( i > l )
                auxHoraConsulta = '00:00'
            else
                auxHoraConsulta = consultas[i].horaConsulta;
            
            if(consultas[i] && !this.dataReferencia) {
                this.dataReferencia = consultas[i].dataConsultaFrm.substr(0,5);
            }

            if( i > l || el != auxHoraConsulta) {
                let consulta = new Consulta;
                consulta.dataConsultaFrm = this.dataReferencia;
                consulta.horaConsulta = el;
                consulta.nome = '';
                return consulta;
            } else {
                var result = consultas[i];
                result.dataConsultaFrm = result.dataConsultaFrm.substr(0,5);
                i++;
                return result;
            }
            return resp;
        })

        return resp;
    }
}
