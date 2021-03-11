import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  isOpenMecanicos: boolean = false;
  isOpenGerentes: boolean = false;
  isOpenClientes: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  openMecanicos(): boolean {
    this.isOpenMecanicos = !this.isOpenMecanicos
    return this.isOpenMecanicos
  }

  openGerentes(): boolean {
    this.isOpenGerentes = !this.isOpenGerentes
    return this.isOpenGerentes
  }

  openClientes(): boolean {
    this.isOpenClientes = !this.isOpenClientes
    return this.isOpenClientes
  }

}
