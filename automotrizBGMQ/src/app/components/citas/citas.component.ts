import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  public citasCambio=[];
  public citasEntrantes = [];
  public citasCambiar = [];
  public citasByFecha = [];
  formFecha: FormGroup;
  newFecha: string;
  newHora: string;

  ngOnInit(): void {
    this.citasService.getAllCitas().subscribe(citas => {
      this.citasEntrantes = citas.filter(cita => cita.estado === 'Esperando fecha');
      this.citasCambiar = citas.filter(cita => cita.confirmada === true);
      this.citas = citas;
    });
  }

  buildFormFecha(): void {
    this.formFecha = new FormGroup({
      fecha: new FormControl('', [Validators.nullValidator]),
      hora: new FormControl('', [Validators.nullValidator]),
    });
  }

  getCitasEstado(): void {
    this.citasService.getCitasByFecha(this.fechaCalendario)
    .subscribe(citas => {
      this.citasByFecha = citas.filter(cita => cita.confirmada === true);
    });
  }

  asignarFecha(cita: Cita): void {
    if (this.formFecha.get('fecha').value === '' || this.formFecha.get('hora').value === '') {
      alert('Primero debe elegir la fecha y la hora.');
    }
    else {
      console.log('FECHA ASIGNADA CON EXITO');
      // this.citasService.updateFechaCita(cita, this.newFecha, this.newHora);
    }
  }
}
