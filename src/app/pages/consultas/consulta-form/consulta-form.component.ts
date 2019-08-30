import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Consulta } from "src/app/models/consulta.model";
import { ConsultaService } from 'src/app/services/consulta.service';

@Component({
  selector: 'app-consulta-form',
  templateUrl: './consulta-form.component.html',
  styleUrls: ['./consulta-form.component.css']
})
export class ConsultaFormComponent implements OnInit {

  form: FormGroup;

  consulta: Consulta;
  public dataConsult: string;
  public horaConsult: string;
  public nomePacient: string;

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  };

  constructor( 
    private consultaService: ConsultaService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
    this.loadConsulta();
  }

  buildForm() {
    this.form = this.fb.group({
      idConsulta:          ['', Validators.required ],
      idPacienteConsulta:  ['', Validators.required ],
      idEmpresaConsulta:   ['', Validators.required ],
      idMedicoConsulta:    ['', Validators.required ],
      dataConsulta:        ['', Validators.required ],
      horaConsulta:        ['', Validators.required ],
      queixaPrincipalConsulta:      ['', Validators.required ],
      pesoConsulta:        [''],
      alturaConsulta:      [''],
      cabecaConsulta:      [''],
      historiaDoencaAtualConsulta:        ['', Validators.required ],
      prescricaoConsulta:  ['']
    });
  }

  loadConsulta() {
    this.consultaService.subject.subscribe( 
      resp => { 
        this.consulta = resp; 
        if (this.consulta.horaConsulta) { this.consulta.horaConsulta = this.consulta.horaConsulta.substr(0,5); };
        this.form.patchValue(this.consulta);
        
        this.dataConsult = this.consulta.dataConsultaFrm;
        this.horaConsult = this.consulta.horaConsulta;
        this.nomePacient = this.consulta.nome;
      }
    );
    // var id = this.route.snapshot.url[0].toString();
    // this.consultaService.getConsultaId(id).subscribe( resp => this.consulta = resp[0] ); //imask não funciona
  };

    // ////////////////////////////////////////////////////////////////// //

    submitForm() {
      this.updateConsulta();
      this.router.navigate(['/consulta']);
    };
  
    updateConsulta() {
      this.consulta = new Consulta();
      this.consulta = Object.assign( new Consulta(), this.form.value );
      this.consultaService.updateConsulta(this.consulta);
    }
    // ////////////////////////////////////////////////////////////////// //
}
