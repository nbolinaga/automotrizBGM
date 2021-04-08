import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gerente',
  templateUrl: './gerente.component.html',
  styleUrls: ['./gerente.component.scss']
})
export class GerenteComponent implements OnInit {

  reportes: boolean = false;
  citas: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  openReportes(): void {
    this.reportes = !this.reportes;
  }

  openCitas(): void {
    this.citas = !this.citas;
  }

}
