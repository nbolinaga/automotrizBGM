import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { VehiculosService } from '../../services/vehiculos.service';
import { Vehiculo } from '../../models/vehiculo';
import { CitasService } from '../../services/citas.service';
import { Cita } from '../../models/cita';
import firebase from 'firebase/app';
import {formatDate} from '@angular/common';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';


formatDate(new Date(), 'dd/MM/yyyy', 'en');

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  user: firebase.User;
  usuario: Usuario;
  formVehiculo: FormGroup;
  formCita: FormGroup;
  disabled = true;
  activar = false;
  activarAgregar = false;

  vehiculosId =  new Array<string>();
  citasId = new Array<string>();

  vehiculos =  new Array<Vehiculo>();
  citas = new Array<Cita>();
  currentVehiculo: Vehiculo;
  currentCita: Cita;
  // Solución forzada para mostrar Vehiculos y Citas del Cliente por el ID
  citasPendientes: Cita[] = [];
  vehiculosregistrados: Vehiculo[] = [];
  // Solución forzada para mostrar Vehiculos y Citas del Cliente por el ID

  constructor(
    private db: AngularFirestore,
    private Auth: AuthService,
    private UsuarioService: UsuarioService,
    private VehiculosService: VehiculosService,
    private CitasService: CitasService) {}

   async ngOnInit(){
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
            rol: 'Cliente',
            vehiculos: [],
            citas: []
          };
          this.UsuarioService.createNewUser(user.uid, newUser);
        } else {
          this.usuario = response;
          // Solución forzada para mostrar Vehiculos y Citas del Cliente por el ID
          this.CitasService.getAllCitas().subscribe(citas => {
            this.citasPendientes = citas.filter(cita => cita.idUser === this.usuario.id);
          });

          this.VehiculosService.getAllVehiculos().subscribe(vehiculos => {
            this.vehiculosregistrados = vehiculos.filter(vehiculo => vehiculo.idUser === this.usuario.id);
          });
          // Solución forzada para mostrar Vehiculos y Citas del Cliente por el ID
        }
      });
    });
    this.UsuarioService.updateUser(this.user.uid, this.usuario);
  }

  activacion(numero): void {
    if (numero === 1){
      this.activar = !this.activar;
      this.buildFormCita();
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

  editar(): void {
    this.disabled = !this.disabled;
    this.UsuarioService.updateUser(this.usuario.id, this.usuario);
  }
  cancel(): void {
    location.reload();
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
    };

    this.VehiculosService.createNewVehiculo(newVehiculo);
    const arrayVehiculos: Vehiculo[] = this.usuario.vehiculos;
    arrayVehiculos.push(newVehiculo);
    this.UsuarioService.updateUser(this.user.uid, this.usuario = {
      ... this.usuario = this.usuario,
      vehiculos: arrayVehiculos,
    });
    alert('Vehiculo agregado.');
  }

  /* ACOMODAR SERVICIO

  eliminarVehiculo(){
    this.VehiculosService.deleteVehiculo(this.user.uid);
  }
  */

  pedirCita(): void {
    const newCita: Cita = {
      fecha: '',
      idUser: this.user.uid,
      cliente: this.usuario.nombre,
      estado: 'Esperando fecha',
      confirmada: false,
      vehiculo: this.formCita.get('vehiculo').value,
      motivo: this.formCita.get('motivo').value,
      descripcion: this.formCita.get('descripcion').value,
    };
    this.CitasService.createNewCita(newCita);
    const arrayCitas: Cita[] = this.usuario.citas;
    if (arrayCitas.length < 3) {
      arrayCitas.push(newCita);
      this.UsuarioService.updateUser(this.user.uid, this.usuario = {
        ... this.usuario = this.usuario,
        citas: arrayCitas,
      });
      alert('La cita se ha solicitado exitosamente.');
    }
    else{
      alert('Posee todos sus vehiculos en reparación, espere a su entrega para solicitar una nueva cita.');
    }
  }

  getVehiculos(){
    for (let index = 0; index < this.usuario.vehiculos.length; index++) {
      this.VehiculosService.getVehiculoById(this.usuario.vehiculos[index]).subscribe((response) => {
        this.vehiculos.push(response);
        this.vehiculosId.push(response.id);
        console.log('response')
      });
    }
  }
}
