import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

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

        this.searchForm = this.formBuilder.group({
            searchDate: this.searchDate 
        });
        
        this.idMedico = `${this.loginService.user.idFuncionarioUsuario}`;
        if(this.idMedico === '0') { this.idMedico = null }

        this.setSearchDate();

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
        this.consultaService.setDados(consulta);
        this.router.navigate(['/consulta/' + consulta.idConsulta + '/edit']);
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
                    .subscribe( consultas => this.consultas = consultas );
            else
                this.consultaService.getConsultas(null, this.idMedico)
                    .subscribe( consultas => this.consultas = consultas );
        }

    }; // fim procuraData()

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
            .subscribe( consultas => this.consultas = consultas );

      }; // fim setSearchDate()
}
