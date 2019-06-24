import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Contato } from 'src/app/models/contato.model';
import { ContatoService } from 'src/app/services/contato.service';

import { Consulta } from 'src/app/models/consulta.model';
import { ConsultaService } from 'src/app/services/consulta.service';

@Component({
  selector: 'app-agenda-form',
  templateUrl: './agenda-form.component.html',
  styleUrls: ['./agenda-form.component.css']
})
export class AgendaFormComponent implements OnInit {

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
        motivoConsulta:      [null, [ Validators.required ]]
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
          // this.form.controls['dataConsulta'].setValue('2019-05-17');
          // this.form.controls['horaConsulta'].setValue('10:00');
          // this.form.controls['motivoConsulta'].setValue('Tosse e Febre alta');
        });
    };
  
    // ////////////////////////////////////////////////////////////////// //
    submitForm() {
      this.submittingForm = true;
      this.createConsulta();
      this.router.navigate(['/agenda']);
    };
  
    createConsulta() {
      // const consulta: Consulta = Object.assign(new Consulta(), this.form.value);
      this.consulta = Object.assign( new Consulta(), this.form.value );
  
      // let data = this.consulta.dataConsulta;
      // this.consulta.dataConsulta = data.substr(6,4)+'/'+data.substr(3,2)+'/'+data.substr(0,2);
  
      this.consultaService.setDados(this.consulta);
  
      this.consultaService.addConsulta(this.consulta);
    }
    // ////////////////////////////////////////////////////////////////// //
  }
  