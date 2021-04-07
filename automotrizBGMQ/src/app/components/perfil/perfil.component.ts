import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { VehiculosService } from '../../services/vehiculos.service';
import { Vehiculo } from '../../models/vehiculo';
import { CitasService } from '../../services/citas.service';
import { Cita } from '../../models/cita';
import firebase from 'firebase';
import {formatDate} from '@angular/common';
import { Observable, Subscription } from 'rxjs';

formatDate(new Date(), 'dd/MM/yyyy', 'en');

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  user: firebase.User = null;
  usuario: Usuario;
  formConfirmacion: FormGroup;
  formVehiculo: FormGroup;
  formCita: FormGroup;
  disabled = true;
  activar = false;
  activarAgregar = false;
  currentVehiculo: Vehiculo;
  currentCita: Cita;
  citasConfirmar: Cita[] = [];
  citasPendientes: Cita[] = [];
  vehiculosRegistrados: Vehiculo[] = [];
  esperandoConfirmar: Boolean = false;
  subscription: Subscription;
  editarVehiculo = false;
  vehiculosActivos: Vehiculo[] = [];

  constructor(
    private Auth: AuthService,
    private UsuarioService: UsuarioService,
    private VehiculosService: VehiculosService,
    private CitasService: CitasService) {
      this.buildFormConfirmacion();
    }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.Auth.getCurrentUser().subscribe((user) => {
      this.user = user;
      this.UsuarioService.getUserById(user.uid).subscribe((response) => {
        if (response.nombre === undefined){
          const newUser: Usuario = {
            nombre: user.displayName,
            tipoID: null,
            cedula: 0,
            telefono: 'edite sus datos de perfil',
            email: user.email,
            clave: null,
            confirmacion: null,
            rol: 'Cliente'
          };
          this.UsuarioService.createNewUser(user.uid, newUser);
        } else {
          this.usuario = response;
          this.CitasService.getAllCitas().subscribe(citas => {
            this.citasPendientes = citas.filter(cita => cita.idUser === this.usuario.id);
            this.citasConfirmar = this.citasPendientes.filter(cita => cita.estado === 'Esperando confirmación');
          });

          this.VehiculosService.getAllVehiculos().subscribe(vehiculos => {
            this.vehiculosRegistrados = vehiculos.filter(vehiculo => vehiculo.idUser === this.usuario.id);
          });
        }
      });
    });
    this.UsuarioService.updateUser(this.user.uid, this.usuario);
  }

  activacion(numero): void {
    if (numero === 1){
      this.activar = !this.activar;
      this.buildFormCita();
    }else if (numero === 2){
      this.editarVehiculo = !this.editarVehiculo;
    }
    else{
      this.activarAgregar = !this.activarAgregar;
      this.buildFormVehiculo();
    }
  }

  buildFormCita(): void {
    this.formCita = new FormGroup({
      vehiculo: new FormControl('', [Validators.required]),
      motivo: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required])
    });
  }

  buildFormVehiculo(): void {
    this.formVehiculo = new FormGroup({
      marca: new FormControl('', [Validators.required]),
      modelo: new FormControl('', [Validators.required]),
      año: new FormControl('', [Validators.required]),
      placa: new FormControl('', [Validators.required]),
      serial: new FormControl('', [Validators.required]),
    });
  }
  buildFormConfirmacion(): void{
    this.formConfirmacion = new FormGroup({
      confirmacion: new FormControl('', [Validators.required])
    });
  }

  editar(): void {
    this.disabled = !this.disabled;
    this.UsuarioService.updateUser(this.user.uid, this.usuario);
  }

  cancel(): void {
    location.href = '/perfil';
  }

  agregarVehiculo(): void {
    const newVehiculo: Vehiculo = {
      idUser: this.user.uid,
      cliente: this.usuario.nombre,
      marca: this.formVehiculo.get('marca').value,
      modelo: this.formVehiculo.get('modelo').value,
      ano: this.formVehiculo.get('año').value,
      placa: this.formVehiculo.get('placa').value,
      serial: this.formVehiculo.get('serial').value,
      fechaIngreso: new Date(),
      foto: 'https://firebasestorage.googleapis.com/v0/b/automotrizbgmq.appspot.com/o/vehiculo1.png?alt=media',
      activo: true,
    };
    this.VehiculosService.getAllVehiculos().subscribe(vehiculos => {
      this.vehiculosActivos = vehiculos.filter(vehiculo => vehiculo.activo === true);
    });

    var check = this.chequearSerial(newVehiculo);

    if( check === true){
      alert('Vehiculo ya esta registrado en la base de datos.');
    } else {
      this.VehiculosService.createNewVehiculo(newVehiculo);
      alert('Vehiculo agregado.');
    }

    this.activacion(0);
  }

  pedirCita(): void {
    const newCita: Cita = {
      fecha: '',
      hora: '',
      idUser: this.user.uid,
      cliente: this.usuario.nombre,
      estado: 'Esperando fecha',
      confirmada: false,
      vehiculo: this.formCita.get('vehiculo').value,
      motivo: this.formCita.get('motivo').value,
      descripcion: this.formCita.get('descripcion').value,
    };
    const arrayCitas: Cita[] = this.citasPendientes;

    if ( arrayCitas.length < 3 ) {
      const verificarPlaca = arrayCitas.filter(ver => ver.vehiculo === newCita.vehiculo);
      if (verificarPlaca.length === 0) {
        this.CitasService.createNewCita(newCita);
        alert('La cita se ha solicitado exitosamente.');
      }
      else {
        alert('Ya se ha solicitado un cita para este vehículo.');
      }
    }
    else {
      alert('Posee todos sus vehiculos en reparación, espere a su entrega para solicitar una nueva cita.');
    }
  }

  confirmacion(cita: Cita): void {
    const confirmacion = this.formConfirmacion.get('confirmacion').value;
    if (confirmacion === 'Confirmar'){
      this.CitasService.updateConfirmada(cita);
    }
    else if ( confirmacion === 'Cambio'){
      this.CitasService.updateCambioFecha(cita);
    }
    else if (confirmacion === 'Cancelar'){
      this.CitasService.deleteCita(cita);
    }
  }

  porConfirmar(cita: Cita): Boolean{
    if(cita.estado==='Esperando confirmación'){
      return true;
    }
    return false;
  }

  toggle(vehiculo: Vehiculo): void {
      vehiculo.activo = !vehiculo.activo;
      this.VehiculosService.updateVehiculo(vehiculo.id, vehiculo);
  }
  pasarVehiculo(vehiculo: Vehiculo): void {
      this.editarVehiculo = !this.editarVehiculo;
      this.currentVehiculo = vehiculo;
  }
  guardarVehiculo(): void {
    this.VehiculosService.updateVehiculo(this.currentVehiculo.id, this.currentVehiculo);
    this.activacion(2);
  }

  chequearSerial(vehiculo: Vehiculo) {
    var i;
    for (i = 0; i < this.vehiculosActivos.length; i++) {
        if (this.vehiculosActivos[i].serial === vehiculo.serial) {
            console.log(this.vehiculosActivos[i].id)
            return true;
        }
    }
    return false;
  }
}
