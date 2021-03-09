import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent implements OnInit {

  activar: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  activacion(): void {
    this.activar = !this.activar
  }
}
