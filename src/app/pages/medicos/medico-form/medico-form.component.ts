import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Medico } from '../../../models/medico.model';
import { MedicoService } from '../../../services/medico.service';
import { Estado } from 'src/app/models/estado.model';

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

  estados: Estado[];

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
    
    this.estados = [ 
      {"id":12,"sigla":"AC","nome":"Acre"},
      {"id":27,"sigla":"AL","nome":"Alagoas"},
      {"id":13,"sigla":"AM","nome":"Amazonas"},
      {"id":16,"sigla":"AP","nome":"Amapá"},
      {"id":29,"sigla":"BA","nome":"Bahia"},
      {"id":23,"sigla":"CE","nome":"Ceará"},
      {"id":53,"sigla":"DF","nome":"Distrito Federal"},
      {"id":32,"sigla":"ES","nome":"Espírito Santo"},
      {"id":52,"sigla":"GO","nome":"Goiás"},
      {"id":21,"sigla":"MA","nome":"Maranhão"},
      {"id":50,"sigla":"MS","nome":"Mato Grosso do Sul"},
      {"id":51,"sigla":"MT","nome":"Mato Grosso"},
      {"id":31,"sigla":"MG","nome":"Minas Gerais"},
      {"id":22,"sigla":"PI","nome":"Piauí"},
      {"id":15,"sigla":"PA","nome":"Pará"},
      {"id":41,"sigla":"PR","nome":"Paraná"},
      {"id":25,"sigla":"PB","nome":"Paraíba"},
      {"id":26,"sigla":"PE","nome":"Pernambuco"},
      {"id":24,"sigla":"RN","nome":"Rio Grande do Norte"},
      {"id":33,"sigla":"RJ","nome":"Rio de Janeiro"},
      {"id":43,"sigla":"RS","nome":"Rio Grande do Sul"},
      {"id":11,"sigla":"RO","nome":"Rondônia"},
      {"id":14,"sigla":"RR","nome":"Roraima"},
      {"id":42,"sigla":"SC","nome":"Santa Catarina"},
      {"id":35,"sigla":"SP","nome":"São Paulo"},
      {"id":28,"sigla":"SE","nome":"Sergipe"},
      {"id":17,"sigla":"TO","nome":"Tocantins"}
    ];
    
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
      cepMedico:           [null, [ Validators.pattern('^[0-9]{5}-[0-9]{3}') ]],
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

  changeEstado(e) {
    this.form.controls['estadoMedico'].setValue( e.target.value, {onlySelf: true} );
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