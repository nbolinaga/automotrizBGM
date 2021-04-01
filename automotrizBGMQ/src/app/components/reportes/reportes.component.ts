import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

  vehiculos: boolean = false;
  clientes: boolean = false;
  mecanicos: boolean = false;
  general: boolean= false;
  texto: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  cambio(event: any): void {
    this.texto = event.target.value;

    this.vehiculos = false;
    this.clientes = false;
    this.mecanicos = false;
    this.general = false;

    if(this.texto === 'vehiculos') {
      this.vehiculos = true;
    } else if(this.texto === 'clientes') {
      this.clientes = true;
    } else if(this.texto === 'mecanicos') {
      this.mecanicos = true;
    } else if(this.texto === 'general'){
      this.general = true;
    }
  }
}
