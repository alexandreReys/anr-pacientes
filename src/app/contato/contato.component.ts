import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Contato } from './../models/contato.model';
import { ContatoService } from './../services/contato.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  id: number;
  nome: string;
  contato: Contato;
  contatos: Contato[];

  constructor(private contatoService: ContatoService) { }

  ngOnInit() {
    this.contato = new Contato();
    this.contatoService.getContatos()
      .subscribe( contatos => { 
        this.contatos = contatos;
      });
  };

  edit(contato: Contato) {
    this.contato = contato;
  };
  
  delete(contato: Contato) {
    let index = this.contatos.map( (item) => item.id).indexOf(contato.id);
    this.contatoService.deleteContato(contato);
    this.contatos.splice(index,1);
  };

  saveContato(form: NgForm) {
    let inclusao: boolean = false;
    
    this.contato = form.value;  // Pega os dados do form

    if (!this.contato.codigo){ 
      inclusao = true;
      this.contato.codigo = new Date().getTime().toString();
    };

    if (inclusao) {
      this.contatoService.addContato(this.contato);
      this.contatoService.getContatos()
        .subscribe(contatos => this.contatos = contatos);
    } else {
      this.contatoService.updateContato(this.contato);
    };
    
    this.contato = new Contato;
    form.reset();

    this.contatoService.getContatos()
    .subscribe(contatos => this.contatos = contatos);
  };
}