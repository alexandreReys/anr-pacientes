import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Contato } from '../../models/contato.model';

@Component({
  selector: 'app-contato-form',
  templateUrl: './contato-form.component.html',
  styleUrls: ['./contato-form.component.css']
})
export class ContatoFormComponent implements OnInit {

  orderForm: FormGroup;

  @Input() contato: Contato;
  @Output() saveContato = new EventEmitter();   //saveContato => contato.component.ts

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      id: this.formBuilder.control(''),
      codigo: this.formBuilder.control(''),
      nome: this.formBuilder.control('', Validators.required),
      telefone: this.formBuilder.control('', Validators.required),
      endereco: this.formBuilder.control('', Validators.required),
      numero: this.formBuilder.control('', Validators.required),
      complemento: this.formBuilder.control(''),
      bairro: this.formBuilder.control(''),
      cidade: this.formBuilder.control('', Validators.required),
      estado: this.formBuilder.control('', Validators.required),
      cep: this.formBuilder.control('', Validators.required),
      paiNome: this.formBuilder.control('', Validators.required),
      paiTelefone: this.formBuilder.control('', Validators.required),
      paiProfissao: this.formBuilder.control(''),
      maeNome: this.formBuilder.control('', Validators.required),
      maeTelefone: this.formBuilder.control('', Validators.required),
      maeProfissao: this.formBuilder.control('')
    })
   }

  onSubmit() {}

  save() {
      this.saveContato.emit(this.orderForm);   //saveContato => contato.component.ts
  }

  cancel() {
    this.contato = new Contato;
    this.orderForm.reset;
  }
   
}
