import { Cita } from './../../models/cita';
import { CitasService } from './../../services/citas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})

export class CitasComponent implements OnInit {


  constructor( private citaService: CitasService ) { }

  public citasEntrantes = [];
  // public citasDia = [];
  public citasConfirmar = [];

  // Variables de Muestra:
  citasDia: Array<any> = [
    {
      nombre: 'Pedro Perez',
      motivo: 'Cambio de Aceite'
    },
    {
      nombre: 'Maria Parra',
      motivo: 'Servicio completo'
    },
    {
      nombre: 'Carlos Chavez',
      motivo: 'Cambio de Neumaticos'
    },
    {
      nombre: 'Mario Benitez',
      motivo: 'Revision'
    },
    {
      nombre: 'Luis Alcala',
      motivo: 'Cambio de pastillas de freno'
    },
    {
      nombre: 'Marcos Mora',
      motivo: 'Servicio completo'
    },
    {
      nombre: 'Miguel Perensejo',
      motivo: 'Reparación'
    },
    {
      nombre: 'Alonso Hernandez',
      motivo: 'Revision'
    },
    {
      nombre: 'Camilo Turizo',
      motivo: 'Cambio de aceite'
    },
    {
      nombre: 'Matilda Hilda',
      motivo: 'Servicio completo'
    }
  ];

  ngOnInit(): void {
    this.citaService.getAllCitas().subscribe(citas => {
      this.citasEntrantes = citas.filter(cita => cita.estado === 'Esperando fecha');
      this.citasConfirmar = citas.filter(cita => cita.confirmada === true);
    });
  }

  getCitasDia(fecha: string): void {

  }

}
