import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cita } from './../../models/cita';
import { CitasService } from './../../services/citas.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})

export class CitasComponent implements OnInit {



  constructor( private citasService: CitasService ) {
    this.buildFormAsignarFecha();
  }
  fechaCalendario: string;
  public citas = [];
  public citasEntrantes = [];
  public citasConfirmar = [];
  public citasByFecha = [];
  formAsignarFecha: FormGroup;


  ngOnInit(): void {
    this.citasService.getAllCitas().subscribe(citas => {
      this.citasEntrantes = citas.filter(cita => cita.estado === 'Esperando fecha');
      this.citasConfirmar = citas.filter(cita => cita.confirmada === true);
      this.citas = citas;
    });
  }

  getCitasEstado(): void {
    this.citasService.getCitasByFecha(this.fechaCalendario)
    .subscribe(citas => {
      this.citasByFecha = citas;
    });
  }

  buildFormAsignarFecha(): void {
    this.formAsignarFecha = new FormGroup({
      fecha: new FormControl('', [Validators.required])
    });
  }

  asignarFecha(): void {
    console.log()
  }

}
