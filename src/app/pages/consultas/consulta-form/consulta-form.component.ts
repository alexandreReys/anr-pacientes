import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Contato } from 'src/app/models/contato.model';
import { ContatoService } from '../../../services/contato.service';

import { Consulta } from 'src/app/models/consulta.model';
import { ConsultaService } from '../../../services/consulta.service';

// import {CalendarModule} from 'primeng/calendar';
// import toaster from "toastr";
// import { ConsultasModule } from '../consultas.module';

@Component({
  selector: 'app-consultas-paciente-form',
  templateUrl: './consulta-form.component.html',
  styleUrls: ['./consulta-form.component.css']
})

export class ConsultasPacienteFormComponent implements OnInit {

  form: FormGroup;
  codigoPaciente: string;
  nomePaciente: string;
  submittingForm: boolean = false;

  contato: Contato;
  contatos: Contato[];

  consulta: Consulta;

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  };

  constructor( private contatoService: ContatoService,
               private consultaService: ConsultaService,
               private route: ActivatedRoute,
               private router: Router,
               private formBuilder: FormBuilder ) {}

  ngOnInit() {
    this.buildConsultaForm();
    this.loadContatos();
  }

  buildConsultaForm() {
    this.form = this.formBuilder.group({
      idPaciente:          [null, [ Validators.required ]],
      dataConsulta:        [null, [ Validators.required ]],
      horaConsulta:        [null, [ Validators.required ]],
      motivoConsulta:      [null, [ Validators.required ]],
      pesoConsulta:        [null, [ Validators.required ]],
      alturaConsulta:      [null, [ Validators.required ]],
      cabecaConsulta:      [null, [ Validators.required ]],
      infoConsulta:        [null, [ Validators.required ]],
      prescricaoConsulta:  [null, [ Validators.required ]],
      prescricao2Consulta: [null, [ Validators.required ]],
      prescricao3Consulta: [null, [ Validators.required ]]
    });
  };
  
  loadContatos() {
    this.codigoPaciente = this.route.snapshot.url[0].toString();
    this.contato = new Contato();
    this.contatoService.getContatosCodigo(this.codigoPaciente)
      .subscribe( contatos => { 
        this.contatos = contatos;
        this.contato = contatos[0];
        this.form.controls['idPaciente'].setValue(this.contato.id);
        this.form.controls['dataConsulta'].setValue('10/05/2019');
        this.form.controls['horaConsulta'].setValue('10:00');
        this.form.controls['motivoConsulta'].setValue('Tosse e Febre alta');
        this.form.controls['pesoConsulta'].setValue('20');
        this.form.controls['alturaConsulta'].setValue('70');
        this.form.controls['cabecaConsulta'].setValue('34');
        this.form.controls['infoConsulta'].setValue('Gripe forte e garganta inflamada');
        this.form.controls['prescricaoConsulta'].setValue('Amoxilina 12/12 hrs durante 10 dias');
        this.form.controls['prescricao2Consulta'].setValue('Dipirona 40 gotas 8/8 hrs durante 10 dias');
        this.form.controls['prescricao3Consulta'].setValue('Leucogem 8/8 hrs durante 10 dias');
      });
  };

  // ////////////////////////////////////////////////////////////////// //
  submitForm() {
    this.submittingForm = true;
    this.createConsulta();
    this.router.navigate(['/consulta/receita']);
  };

  createConsulta() {
    // const consulta: Consulta = Object.assign(new Consulta(), this.form.value);
    this.consulta = Object.assign(new Consulta(), this.form.value);

    let data = this.consulta.dataConsulta;
    this.consulta.dataConsulta = data.substr(6,4)+'/'+data.substr(3,2)+'/'+data.substr(0,2);

    this.consultaService.setDados(this.consulta);

    // this.consultaService.addConsulta(consulta);
  }
  // ////////////////////////////////////////////////////////////////// //
}
