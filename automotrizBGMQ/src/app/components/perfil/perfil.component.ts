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
  disabled: boolean =  true;
  activar = false;
  activarAgregar = false;

  vehiculosId =  new Array<string>();
  citasId = new Array<string>();

  vehiculos =  new Array<Vehiculo>();
  citas = new Array<Cita>();
  currentVehiculo: Vehiculo;
  currentCita: Cita;

  constructor(private auth: AuthService, private UsuarioService: UsuarioService, private VehiculosService: VehiculosService, private CitasService: CitasService) {
    this.auth.getCurrentUser().subscribe((user) => {
      this.user = user;
      this.getUserData();
    });
  }

   async ngOnInit(){
  }

  getUserData(): void {
    console.log(this.user.uid)
    this.UsuarioService.getUserById(this.user.uid).subscribe((response) => {
      if(response.nombre == undefined){
        this.usuario = {
          nombre: this.user.displayName,
          tipoID: null,
          cedula: 0,
          telefono: "edite sus datos de perfil",
          email: this.user.email,
          clave: null,
          confirmacion: null,
          rol: "Cliente",
          vehiculos: [],
          citas: []
        };
        this.UsuarioService.createNewUser(this.user.uid, this.usuario);
      } else {
        this.usuario = response;
        this.getVehiculos();
      }
    })
  }

  activacion(numero): void {
    if(numero == 1)
    {
      this.activar = !this.activar;
      this.buildFormCita();
    } else {
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

  editar(){
    this.disabled = !this.disabled;
    this.UsuarioService.updateUser(this.usuario.id, this.usuario);
  }
  cancel(){
    location.reload();
  }

  agregarVehiculo(){
    const newVehiculo: Vehiculo = {
      marca: this.formVehiculo.get('marca').value,
      modelo: this.formVehiculo.get('modelo').value,
      ano: this.formVehiculo.get('año').value,
      placa: this.formVehiculo.get('placa').value,
      serial: this.formVehiculo.get('serial').value,
      fechaIngreso: new Date(),
    };
    this.VehiculosService.createNewVehiculo(newVehiculo.serial, newVehiculo);
    this.vehiculos.push(newVehiculo);
    this.vehiculosId.push(newVehiculo.serial);
    this.usuario.vehiculos = this.vehiculosId;
    this.activacion(2);
    alert('vehiculo agregado');
  }

  eliminarVehiculo(serial){
    this.VehiculosService.deleteVehiculo(serial);

    var index = this.vehiculosId.indexOf(serial);
    this.vehiculosId.splice(index, 1);

    this.usuario.vehiculos = this.vehiculosId;
  }

  guardarCambios(){
    this.UsuarioService.updateUser(this.usuario.id, this.usuario);
    location.reload();
  }
  pedirCita(){
    const newCita: Cita = {
      serialVehiculo: this.formVehiculo.get('vehiculo').value,
      motivo: this.formVehiculo.get('motivo').value,
      descripcion: this.formVehiculo.get('descripcion').value,
      cliente: this.usuario,
      confirmada: false
    };

    this.CitasService.createNewCita(newCita.serialVehiculo, newCita);
    this.citas.push(newCita);
    this.citasId.push(newCita.serialVehiculo);
    this.usuario.citas = this.citasId;
    this.activacion(1);
    alert('cita pedida')
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
