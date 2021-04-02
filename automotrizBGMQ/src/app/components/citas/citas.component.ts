import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { CitasService } from '../../services/citas.service';
import { Cita } from '../../models/cita';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent implements OnInit {

  constructor( public data: DataService,private citasService: CitasService) { }

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

  citasSolicitudes: Array<any> = [
    {
      nombre: 'Pedro Perez',
      motivo: 'Cambio de Aceite',
      fecha: 'DD/MM/AA'
    },
    {
      nombre: 'Maria Parra',
      motivo: 'Servicio completo',
      fecha: 'DD/MM/AA'
    },
    {
      nombre: 'Carlos Chavez',
      motivo: 'Cambio de Neumaticos',
      fecha: 'DD/MM/AA'
    },
    {
      nombre: 'Mario Benitez',
      motivo: 'Revision',
      fecha: 'DD/MM/AA'
    },
    {
      nombre: 'Luis Alcala',
      motivo: 'Cambio de pastillas de freno',
      fecha: 'DD/MM/AA'
    },
    {
      nombre: 'Marcos Mora',
      motivo: 'Servicio completo',
      fecha: 'DD/MM/AA'
    },
    {
      nombre: 'Miguel Perensejo',
      motivo: 'Reparación',
      fecha: 'DD/MM/AA'
    },
    {
      nombre: 'Alonso Hernandez',
      motivo: 'Revision',
      fecha: 'DD/MM/AA'
    },
    {
      nombre: 'Camilo Turizo',
      motivo: 'Cambio de aceite',
      fecha: 'DD/MM/AA'
    },
    {
      nombre: 'Matilda Hilda',
      motivo: 'Servicio completo',
      fecha: 'DD/MM/AA'
    }
  ];

  citasEstatus: Array<any> = [
    {
      nombre: 'Pedro Perez',
      motivo: 'Cambio de Aceite',
      estado: 'Esperando Confirmación'
    },
    {
      nombre: 'Maria Parra',
      motivo: 'Servicio completo',
      estado: 'Confirmada'
    },
    {
      nombre: 'Carlos Chavez',
      motivo: 'Cambio de Neumaticos',
      estado: 'Rechazada'
    },
    {
      nombre: 'Mario Benitez',
      motivo: 'Revision',
      estado: 'Esperando Confirmación'
    },
    {
      nombre: 'Luis Alcala',
      motivo: 'Cambio de pastillas de freno',
      estado: 'Esperando Confirmación'
    },
    {
      nombre: 'Marcos Mora',
      motivo: 'Servicio completo',
      estado: 'Rechazada'
    },
    {
      nombre: 'Miguel Perensejo',
      motivo: 'Reparación',
      estado: 'Rechazada'
    },
    {
      nombre: 'Alonso Hernandez',
      motivo: 'Revision',
      estado: 'Confirmada'
    },
    {
      nombre: 'Camilo Turizo',
      motivo: 'Cambio de aceite',
      estado: 'Confirmada'
    },
    {
      nombre: 'Matilda Hilda',
      motivo: 'Servicio completo',
      estado: 'Confirmada'
    }
  ];

  ngOnInit(): void {
  }

  
  citas= this.citasService.coleccion$('citas').subscribe(listDoc => console.log(listDoc))
}
