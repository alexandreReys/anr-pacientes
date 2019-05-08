import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/internal/operators';

import { Contato } from 'src/app/models/contato.model';
import { ContatoService } from './../../../services/contato.service';

import { Consulta } from 'src/app/models/consulta.model';
import { ConsultaService } from './../../../services/consulta.service';

import {CalendarModule} from 'primeng/calendar';

import toaster from "toastr";
import { ConsultasModule } from '../consultas.module';

@Component({
  selector: 'app-consultas-paciente-form',
  templateUrl: './consultas-paciente-form.component.html',
  styleUrls: ['./consultas-paciente-form.component.css']
})
export class ConsultasPacienteFormComponent implements OnInit {

  form: FormGroup;
  codigoPaciente: string;
  nomePaciente: string;
  contato: Contato;
  contatos: Contato[];
  submittingForm: boolean = false;

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
      idPaciente: [null, [ Validators.required ]],
      dataConsulta: [null, [ Validators.required ]],
      horaConsulta: [null, [ Validators.required ]],
      motivoConsulta: [null, [ Validators.required ]],
      pesoConsulta: [null, [ Validators.required ]],
      alturaConsulta: [null, [ Validators.required ]],
      cabecaConsulta: [null, [ Validators.required ]],
      infoConsulta: [null, [ Validators.required ]],
      prescricaoConsulta: [null, [ Validators.required ]]
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
      });
  };

  submitForm() {
    this.submittingForm = true;
    this.createConsulta();
    this.router.navigateByUrl('/consulta');
  };

  createConsulta() {
    const consulta: Consulta = Object.assign(new Consulta(), this.form.value);

    let data = consulta.dataConsulta;
    consulta.dataConsulta = data.substr(6,4)+'/'+data.substr(3,2)+'/'+data.substr(0,2);

    console.log(consulta);
    //this.consultaService.addConsulta(consulta);
  }
}
