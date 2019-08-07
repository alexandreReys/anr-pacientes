import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-listagem-header',
  templateUrl: './listagem-header.component.html',
  styleUrls: ['./listagem-header.component.css']
})
export class ListagemHeaderComponent implements OnInit {

  @Input() pageTitle: string;

  constructor() { }

  ngOnInit() {
  }

}
