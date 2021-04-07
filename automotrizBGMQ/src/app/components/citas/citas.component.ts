import { FormGroup, FormControl } from '@angular/forms';
import { Cita } from './../../models/cita';
import { CitasService } from './../../services/citas.service';
import { UsuarioService } from '../../services/usuario.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})


export class CitasComponent implements OnInit {


  constructor( private citasService: CitasService, private usuarioService: UsuarioService) {
    this.buildFormFecha();
  }

  fechaCalendario: string;
  public citas = [];
  public citasEntrantes = [];
  public citasCambiar = [];
  public citasByFecha = [];
  formFecha: FormGroup;

  ngOnInit(): void {
    this.citasService.getAllCitas().subscribe(citas => {
      this.citasEntrantes = citas.filter(cita => cita.estado === 'Esperando fecha');
      this.citasCambiar = citas.filter(cita => cita.estado === 'Esperando cambio de fecha');
      this.citas = citas;
    });
  }

  buildFormFecha(): void {
    this.formFecha = new FormGroup({
      fecha: new FormControl(''),
      hora: new FormControl(''),
    });
  }

  getCitasEstado(): void {
    this.citasService.getCitasByFecha(this.fechaCalendario)
    .subscribe(citas => {
      this.citasByFecha = citas.filter(cita => cita.confirmada === true);
    });
  }

  asignarFecha(cita: Cita): void {
    const fecha = this.formFecha.get('fecha').value;
    const hora = this.formFecha.get('hora').value;
    const verificarDisponibilidad = this.citas.filter(citaF => citaF.fecha === fecha && citaF.hora === hora);

    if (this.formFecha.get('fecha').value === '' || this.formFecha.get('hora').value === '') {
      alert('Primero debe elegir la fecha y la hora.');
    } else if (verificarDisponibilidad.length > 0) {
      alert('La fecha indicada ya fue asignada a otra cita.');
      this.formFecha.reset();
    }
    else {

      this.citasService.updateFechaCita(cita, fecha, hora);
      alert('Fecha asignada con éxito!');
      this.formFecha.reset();
    }
  }
}
