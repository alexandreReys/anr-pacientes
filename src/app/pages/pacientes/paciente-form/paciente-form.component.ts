import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Contato } from '../../../models/contato.model';
import { ContatoService } from '../../../services/contato.service';

@Component({
  selector: 'app-paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrls: ['./paciente-form.component.css']
})
export class PacienteFormComponent implements OnInit {

  form: FormGroup;
  currentAction: string;
  navigateTo: string;
  submittingForm: boolean = false;
  pageTitle: string;

  contato: Contato = new Contato();
  contatos: Contato[];

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  };

  constructor( private contatoService: ContatoService,
                private route: ActivatedRoute,
                private router: Router,
                private formBuilder: FormBuilder ) {}

  ngOnInit() {
    this.navigateTo = this.route.snapshot.params['to'] || 'paciente';

    this.setCurrentAction();
    this.buildContatoForm();
    this.loadContatos();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  setPageTitle() {
    if (this.currentAction == 'new')
      this.pageTitle = 'Novo Cadastro !!'
    else {
      const contatoName = this.contato.nome || '';
      this.pageTitle = 'Editando : ' + contatoName;
    }

  };

  setCurrentAction() {
    if(this.route.snapshot.url[0].path == 'new') 
      this.currentAction = 'new'
    else
      this.currentAction = 'edit';
  }

  buildContatoForm() {
    this.form = this.formBuilder.group({
      id:             [null],
      codigo:         [null],
      nome:           [null, [ Validators.required ]],
      telefone:       [null, [ Validators.required ]],
      endereco:       [null, [ Validators.required ]],
      numero:         [null, [ Validators.required ]],
      complemento:    [null],
      bairro:         [null],
      cidade:         [null, [ Validators.required ]],
      estado:         [null, [ Validators.required ]],
      cep:            [null, [ Validators.required ]],
      paiNome:        [null, [ Validators.required ]],
      paiTelefone:    [null, [ Validators.required ]],
      paiProfissao:   [null],
      maeNome:        [null, [ Validators.required ]],
      maeTelefone:    [null, [ Validators.required ]],
      maeProfissao:   [null]
    })
  };
  
  loadContatos() {
    if (this.currentAction == 'edit') {
      this.contatoService.subject.subscribe( 
        resp => { 
          this.contato = resp;
          this.form.patchValue(this.contato);  // binds loaded contato data to form
        }
      )
    } else {
      this.form.controls['id'].setValue(1);
      let codigoPaciente = new Date().getTime().toString();
      this.form.controls['codigo'].setValue(codigoPaciente);
    };
  };

  voltar() {
    this.router.navigate(['/'+this.navigateTo]);  // this.router.navigate(['/paciente']);
  };

  // ////////////////////////////////////////////////////////////////// //
  submitForm() {
    this.submittingForm = true;
    this.createContato();
    this.contato = new Contato;
    this.form.reset();
    this.router.navigate(['/'+this.navigateTo]);  // this.router.navigate(['/paciente']);
  };
  createContato() {
    this.contato = Object.assign(new Contato(), this.form.value);
    //this.contatoService.setDados(this.contato);  // Dados para receita
    if(this.route.snapshot.url[0].path == 'new') 
      this.contatoService.addContato(this.contato)
    else
      this.contatoService.updateContato(this.contato);
  };
  // ////////////////////////////////////////////////////////////////// //
}