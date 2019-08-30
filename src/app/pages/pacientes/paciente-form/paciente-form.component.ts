import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LoginService } from 'src/app/security/login/login.service';
import { Contato } from '../../../models/contato.model';
import { ContatoService } from '../../../services/contato.service';
import { Estado, Sexo } from 'src/app/models/estado.model';

@Component({
  selector: 'app-paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrls: ['./paciente-form.component.css']
})
export class PacienteFormComponent implements OnInit {

  pageTitle: string = 'Pacientes';
  formTitle: string = 'Novo Cadastro !!';
  breadcrumb1_item_link: string = '/paciente';
  breadcrumb1_item_title: string = 'Seleção de Pacientes';

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  navigateTo: string;
  currentAction: string;

  form: FormGroup;
  //submittingForm: boolean = false;

  contato: Contato = new Contato();
  contatos: Contato[]=[];
  
  estados: Estado[]=[];
  sexos: Sexo[]=[];

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
    this.sexos = [ 
      {"descricao":"Masculino"},
      {"descricao":"Feminino"}
    ];
    this.setCurrentAction();
    this.buildContatoForm();
    this.loadContatos();
  };

  ngAfterContentChecked() {
    this.setPageTitle();
  };

  setPageTitle() {
    if (this.currentAction == 'new')
      this.formTitle = 'Novo Cadastro !!'
    else {
      const contatoName = this.contato.nome || '';
      this.formTitle = 'Editando : ' + contatoName;
    }
  };

  setCurrentAction() {
    if(this.route.snapshot.url[0].path == 'new') 
      this.currentAction = 'new'
    else
      this.currentAction = 'edit';
  };

  buildContatoForm() {
    this.form = this.formBuilder.group({
      id:             [''],
      idEmpresa:      [''],
      codigo:         [''],
      nome:           ['', [ Validators.required ]],
      telefone:       ['', [ Validators.required ]],

      endereco:       [''],
      numero:         [''],
      complemento:    [''],
      bairro:         [''],
      cidade:         [''],
      estado:         [''],
      cep:            ['', [ Validators.pattern('^[0-9]{5}-[0-9]{3}') ]],
      
      paiNome:        [''],
      paiTelefone:    [''],
      paiProfissao:   [''],
      
      maeNome:        [''],
      maeTelefone:    [''],
      maeProfissao:   [''],

      dataNasc:       [''],
      sexo:           [''],
      email:          ['', [ Validators.pattern(this.emailPattern) ]],
      certidaoNasc:   ['']
      
    })
  };
  
  loadContatos() {
    if (this.currentAction == 'edit') {
      this.contatoService.subject.subscribe( 
        respService => { 
          this.contato = respService;

          let dataNasc = this.contato.dataNasc;
          dataNasc = dataNasc.substr(6,4)+'-'+dataNasc.substr(3,2)+'-'+dataNasc.substr(0,2);

          this.form.patchValue(this.contato);  // binds loaded contato data to form
          this.form.controls['idEmpresa'].setValue(this.loginService.user.idEmpresaUsuario);
          this.form.controls['estado'].setValue(this.contato.estado);
          this.form.controls['dataNasc'].setValue(dataNasc);
        }
      )
    } else {
      this.form.controls['id'].setValue(1);
      this.form.controls['idEmpresa'].setValue(this.loginService.user.idEmpresaUsuario);
      this.form.controls['estado'].setValue('SP');
      this.form.controls['sexo'].setValue('Masculino');
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

  changeSexo(e) {
    let sexo = e.target.value;
    if(sexo.length > 9) { sexo = sexo.substr(sexo.length-9) };
    sexo = sexo.trim();
    this.form.controls['sexo'].setValue( sexo, {onlySelf: true} );
  };

  // ////////////////////////////////////////////////////////////////// //
  submitForm() {
    //this.submittingForm = true;
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