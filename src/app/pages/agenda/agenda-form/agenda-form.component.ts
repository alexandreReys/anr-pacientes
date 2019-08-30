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
        this.buildMedicosForm();
        this.buildAgendamentoForm();
        this.loadContatos();
        this.loadMedicos();
    };

    buildMedicosForm() {
        this.formMedico = this.formBuilder.group({
            idMedico: [null, [ Validators.required ]]
        });
    };

    buildAgendamentoForm() {
        this.form = this.formBuilder.group({
            idPacienteConsulta:     [null, [ Validators.required ]],
            idEmpresaConsulta:      [null, [ Validators.required ]],
            idMedicoConsulta:       [null, [ Validators.required ]],
            dataConsulta:           [null, [ Validators.required ]],
            horaConsulta:           [null, [ Validators.required ]],
            queixaPrincipalConsulta:         [null, [ Validators.required ]]
        });
        this.form.controls['idEmpresaConsulta'].setValue(`${this.loginService.user.idEmpresaUsuario}`);
    };

    loadContatos() {
        this.idPaciente = this.route.snapshot.url[0].toString();
        this.contato = new Contato();
        this.contatoService.getContatosId(this.idPaciente)
            .subscribe( contatos => { 
                this.contatos = contatos;
                this.contato = contatos[0];
                this.form.controls['idPacienteConsulta'].setValue(this.contato.id);
            });
    };

    loadMedicos() {
        this.medicoService.getMedicos().subscribe(medicos => this.medicos = medicos);
    };

    // ////////////////////////////////////////////////////////////////// //
    submitForm() {
        this.submittingForm = true;
        this.createConsulta();
        this.router.navigate(['/agenda']);
    };

    createConsulta() {
        this.consulta = Object.assign( new Consulta(), this.form.value );
        this.consultaService.setDados(this.consulta);
        this.consultaService.addConsulta(this.consulta);
    };
    // ////////////////////////////////////////////////////////////////// //
}