import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  activar: boolean = false;

  activacion(): void {
    this.activar = !this.activar
  }

  constructor() { }

  ngOnInit(): void {
  }

}
