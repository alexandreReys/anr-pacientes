import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LoginService } from 'src/app/security/login/login.service';

import { Contato } from 'src/app/models/contato.model';
import { ContatoService } from 'src/app/services/contato.service';

import { Consulta } from 'src/app/models/consulta.model';
import { ConsultaService } from 'src/app/services/consulta.service';

import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/medico.service';

@Component({
    selector: 'app-agenda-form',
    templateUrl: './agenda-form.component.html',
    styleUrls: ['./agenda-form.component.css']
})
export class AgendaFormComponent implements OnInit {

    form: FormGroup;
    formMedico: FormGroup;

    idPaciente: string;
    nomePaciente: string;

    idMedico: string = '';
    nomeMedico: string = '';

    dataConsulta: string = '';
    horaConsulta: string = '';

    submittingForm: boolean = false;

    contato: Contato;
    contatos: Contato[];

    consulta: Consulta;

    medico: Medico;
    medicos: Medico[];

    imaskConfig = {
        mask: Number,
        scale: 2,
        thousandsSeparator: '',
        padFractionalZeros: true,
        normalizeZeros: true,
        radix: ','
    };

    constructor(
        private loginService: LoginService,
        private contatoService: ContatoService,
        private medicoService: MedicoService,
        private consultaService: ConsultaService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder 
    ) {}

    ngOnInit() {
        this.idPaciente   = this.route.snapshot.url[0].toString();
        this.idMedico     = this.route.snapshot.url[1].toString();
        this.dataConsulta = this.route.snapshot.url[2].toString();
        this.horaConsulta = this.route.snapshot.url[3].toString();

        this.buildAgendamentoForm();
        this.loadContatos();
        this.loadMedicos();
    };

    buildAgendamentoForm() {
        this.form = this.formBuilder.group({
            queixaPrincipalConsulta:         [null, [ Validators.required ]]
        });
        // this.form.controls['idEmpresaConsulta'].setValue(`${this.loginService.user.idEmpresaUsuario}`);
    };

    loadContatos() {
        this.contato = new Contato();
        this.contatoService.getContatosId(this.idPaciente)
            .subscribe( contatos => { 
                this.contatos = contatos;
                this.contato = contatos[0];
                // this.form.controls['idPacienteConsulta'].setValue(this.contato.id);
            });
    };

    loadMedicos() {
        this.medicoService.getMedicos().subscribe(medicos => this.medicos = medicos);

        this.medicoService.getMedicoById(this.idMedico)
            .subscribe( medicos => { 
                this.medico = medicos[0]; 
                if(this.medico)
                    this.nomeMedico = this.medico.nomeMedico
                else
                    this.nomeMedico = 'Erro #NomeMedico';
            }
        );
    };

    // ////////////////////////////////////////////////////////////////// //
    submitForm() {
        this.submittingForm = true;
        this.createConsulta();
        this.router.navigate(['/agenda']);
    };

    createConsulta() {
        this.consulta = Object.assign( new Consulta(), this.form.value );

        this.consulta.idEmpresaConsulta = Number(`${this.loginService.user.idEmpresaUsuario}`);
        this.consulta.idPacienteConsulta = Number(this.idPaciente);
        this.consulta.idMedicoConsulta = Number(this.idMedico);
        this.consulta.dataConsulta = this.dataConsulta;
        this.consulta.horaConsulta = this.horaConsulta;
        
        this.consultaService.setDados(this.consulta);
        this.consultaService.addConsulta(this.consulta);
    };
    // ////////////////////////////////////////////////////////////////// //
}