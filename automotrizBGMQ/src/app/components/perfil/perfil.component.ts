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
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';

formatDate(new Date(), 'dd/MM/yyyy', 'en');

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  user: firebase.User = null;
  usuario: Usuario;
  formVehiculo: FormGroup;
  formCita: FormGroup;
  disabled: boolean =  true;
  activar = false;
  activarAgregar = false;
  vehiculos: Vehiculo[];
  citas: Cita[];
  currentVehiculo: Vehiculo;
  currentCita: Cita;

  constructor(private db: AngularFirestore, private Auth: AuthService, private UsuarioService: UsuarioService, private VehiculosService: VehiculosService, private CitasService: CitasService) {

  }

  ngOnInit(): void {
    this.getUser();
    this.citas = this.usuario.citas;
  }

  getUser(): void {
    this.Auth.getCurrentUser().subscribe((user) => {
      this.user = user;
      this.UsuarioService.getUserById(user.uid).subscribe((response) => {
        if(response.nombre == undefined){
          const newUser: Usuario = {
            nombre: user.displayName,
            tipoID: null,
            cedula: 0,
            telefono: "edite sus datos de perfil",
            email: user.email,
            clave: null,
            confirmacion: null,
            rol: "Cliente",
            vehiculos: [],
            citas: []
          };
          this.UsuarioService.createNewUser(user.uid, newUser);
        } else {
          this.usuario = response;
        }
      });
    })
    this.UsuarioService.updateUser(this.user.uid, this.usuario);
  }
  activacion(numero): void {
    if(numero == 1){
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

  editar(){
    this.disabled = !this.disabled;
    this.UsuarioService.updateUser(this.user.uid, this.usuario);
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

    this.VehiculosService.createNewVehiculo(newVehiculo);
    const arrayVehiculos: Vehiculo[] = this.usuario.vehiculos;
    if(arrayVehiculos.length<3){
      arrayVehiculos.push(newVehiculo);
      this.UsuarioService.updateUser(this.user.uid, this.usuario = {
        ... this.usuario = this.usuario,
        vehiculos: arrayVehiculos,
      });
      alert('Vehiculo agregado.')
    }
    else{
      alert('No puede añadir más de 3 vehiculos.')
    }
  }

  pedirCita(){
    const newCita: Cita = {
      cliente: this.usuario.nombre,
      estado: "Esperando fecha",
      confirmada: false,
      vehiculo: this.formCita.get('vehiculo').value,
      motivo: this.formCita.get('motivo').value,
      descripcion: this.formCita.get('descripcion').value,
    };
    this.CitasService.createNewCita(this.user.uid,newCita);
    const arrayCitas: Cita[] = this.usuario.citas;
    if(arrayCitas.length<3){
      arrayCitas.push(newCita);
      this.UsuarioService.updateUser(this.user.uid, this.usuario = {
        ... this.usuario = this.usuario,
        citas: arrayCitas,
      });
      alert('La cita se ha solicitado exitosamente.')
    }
    else{
      alert('Posee todos sus vehiculos en reparación, espere a su entrega para solicitar una nueva cita.')
    }
  }

  // getVehiculos(){
  //   for (let index = 0; index < this.usuario.vehiculos.length; index++) {
  //     this.VehiculosService.getVehiculoById(this.usuario.vehiculos[index]).subscribe((response) => {
  //       this.currentVehiculo = response;
  //     });
  //     this.vehiculos.push(this.currentVehiculo);
  //   }
  // }
}
