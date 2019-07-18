import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LoginService } from 'src/app/security/login/login.service';
import { Contato } from '../../../models/contato.model';
import { ContatoService } from '../../../services/contato.service';
import { Estado } from 'src/app/models/estado.model';

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
  
  estados: Estado[];

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  };

  constructor(  private contatoService: ContatoService,
                private loginService: LoginService,
                private route: ActivatedRoute,
                private router: Router,
                private formBuilder: FormBuilder ) {}

  ngOnInit() {
    this.navigateTo = this.route.snapshot.params['to'] || 'paciente';
    
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
      idEmpresa:      [null],
      codigo:         [null],
      nome:           [null, [ Validators.required ]],
      telefone:       [null, [ Validators.required ]],
      endereco:       [null, [ Validators.required ]],
      numero:         [null, [ Validators.required ]],
      complemento:    [null],
      bairro:         [null],
      cidade:         [null, [ Validators.required ]],
      estado:         [null, [ Validators.required ]],
      cep:            [null, [ Validators.required, Validators.pattern('^[0-9]{5}-[0-9]{3}') ]],
      
      paiNome:        [null, [ Validators.required ]],
      paiTelefone:    [null],
      paiProfissao:   [null],
      
      maeNome:        [null, [ Validators.required ]],
      maeTelefone:    [null],
      maeProfissao:   [null]
    })
  };
  
  loadContatos() {
    if (this.currentAction == 'edit') {
      this.contatoService.subject.subscribe( 
        resp => { 
          this.contato = resp;
          this.form.patchValue(this.contato);  // binds loaded contato data to form
          this.form.controls['idEmpresa'].setValue(this.loginService.user.idEmpresaUsuario);
          this.form.controls['estado'].setValue(this.contato.estado);
        }
      )
    } else {
      this.form.controls['id'].setValue(1);
      this.form.controls['idEmpresa'].setValue(this.loginService.user.idEmpresaUsuario);
      this.form.controls['estado'].setValue('SP');
    };
  };

  voltar() {
    this.router.navigate(['/'+this.navigateTo]);  // this.router.navigate(['/paciente']);
  };

  changeEstado(e) {
    let estado = e.target.value;
    if(estado.length > 2) { estado = estado.substr(estado.length-2) };
    this.form.controls['estado'].setValue( estado, {onlySelf: true} );
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

  verificaValidTouched(campo) {   //  Não funcionou no template  //
    const valid = this.form.get(campo).valid;
    const touched = this.form.get(campo).touched;
    return !valid && touched;
  }
  
  aplicaCssErro(campo) {          //  Não funcionou no template  //
    const estadoCampo = this.verificaValidTouched(campo);
    const classes = {
      'has-error': estadoCampo,
      'has-feedback': estadoCampo
    }
    return classes;
  }
}