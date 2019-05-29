import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Medico } from '../../../models/medico.model';
import { MedicoService } from '../../../services/medico.service';

@Component({
  selector: 'app-medico-form',
  templateUrl: './medico-form.component.html',
  styleUrls: ['./medico-form.component.css']
})

export class MedicoFormComponent implements OnInit, AfterContentChecked {

  form: FormGroup;
  currentAction: string;
  submittingForm: boolean = false;
  pageTitle: string;

  medico: Medico = new Medico();
  medicos: Medico[];

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  };

  constructor( private medicoService: MedicoService,
                private route: ActivatedRoute,
                private router: Router,
                private formBuilder: FormBuilder ) {}

  ngOnInit() {
    this.setCurrentAction();
    this.buildMedicoForm();
    this.loadMedicos();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  setPageTitle() {
    if (this.currentAction == 'new')
      this.pageTitle = 'Cadastro de Novo Médico'
    else {
      const medicoName = this.medico.nomeMedico || '';
      this.pageTitle = 'Editando Médico: ' + medicoName;
    }

  };

  setCurrentAction() {
    if(this.route.snapshot.url[0].path == 'new') 
      this.currentAction = 'new'
    else
      this.currentAction = 'edit';
  }

  buildMedicoForm() {
      this.form = this.formBuilder.group({
      idMedico:            [null, [ Validators.required ]],
      nomeMedico:          [null, [ Validators.required, Validators.minLength(3) ]],
      telefoneMedico:      [null, [ Validators.required, Validators.minLength(8) ]],
      enderecoMedico:      [null],
      numeroMedico:        [null],
      complementoMedico:   [null],
      bairroMedico:        [null],
      cidadeMedico:        [null],
      estadoMedico:        [null],
      cepMedico:           [null],
      crmMedico:           [null, [ Validators.required, Validators.minLength(5) ]],
      especialidadeMedico: [null, [ Validators.required, Validators.minLength(5) ]]
    });
  };
  
  loadMedicos() {
    if (this.currentAction == 'edit') {
      this.medicoService.subject.subscribe( 
        resp => { 
          this.medico = resp;
          this.form.patchValue(this.medico);  // binds loaded medico data to form
        }
      );
    } else {
      this.form.controls['idMedico'].setValue(1);
    };
  };

  // ////////////////////////////////////////////////////////////////// //
  submitForm() {
    this.submittingForm = true;
    this.createMedico();
    this.medico = new Medico;
    this.form.reset();
    this.router.navigate(['/medico']);
  };

  createMedico() {
    this.medico = Object.assign(new Medico(), this.form.value);
    //this.medicoService.setDados(this.medico);  // Dados para receita
    if(this.route.snapshot.url[0].path == 'new') 
      this.medicoService.addMedico(this.medico)
    else
      this.medicoService.updateMedico(this.medico);
  }
  // ////////////////////////////////////////////////////////////////// //
}