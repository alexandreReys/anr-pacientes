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
    consultas: Consulta[];

    medico: Medico;
    idMedico: string;
    nomeMedico: string;

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
        this.setSearchDate();
        this.idMedico = `${this.loginService.user.idFuncionarioUsuario}`;
        this.medicoService.getMedicoById(this.idMedico)
            .subscribe( medicos => { 
                this.medico = medicos[0]; 
                if(this.medico)
                    this.nomeMedico = this.medico.nomeMedico
                else
                    this.nomeMedico = 'Não cadastrado';
            });

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

    procuraData(todos?: boolean) {
        this.consulta = new Consulta();
        this.consulta.dataConsulta = 'Processando ...';
        if(todos) {
            this.consultaService.getConsultas().subscribe( consultas => this.consultas = consultas );
        } else {
            let searchDate = this.searchDate.value;
            if(searchDate)
                this.consultaService.getConsultasData(searchDate).subscribe( consultas => this.consultas = consultas );
            else
                this.consultaService.getConsultas().subscribe( consultas => this.consultas = consultas );
        }
    }; // fim procuraData()

    setSearchDate() {
        let now = new Date;
        let year = now.getFullYear();
      
        let month = (1 + now.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
      
        let day = now.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        
        let searchDate = year + '-' + month + '-' + day; 
        this.searchDate.setValue( searchDate );
        this.consultaService.getConsultasData(searchDate).subscribe( consultas => this.consultas = consultas );
      }; // fim setSearchDate()
}