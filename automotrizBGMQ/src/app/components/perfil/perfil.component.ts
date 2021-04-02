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
  disabled = true;
  activar = false;
  activarAgregar = false;
  vehiculos: Vehiculo[];
  citas: Cita[];
  currentVehiculo: Vehiculo;
  currentCita: Cita;

  constructor(
    private db: AngularFirestore,
    private Auth: AuthService,
    private usuarioService: UsuarioService,
    private vehiculosService: VehiculosService) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.Auth.getCurrentUser().subscribe((user) => {
      this.user = user;
      this.usuarioService.getUserById(user.uid).subscribe((response) => {
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
          this.usuarioService.createNewUser(user.uid, newUser);
        } else {
          this.usuario = response;
        }
      });
    });
    this.usuarioService.updateUser(this.user.uid, this.usuario);
  }
  activacion(numero: number): void {
    if (numero === 1)
    {
      this.activar = !this.activar;
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

  editar(): void {
    this.disabled = !this.disabled;
    this.usuarioService.updateUser(this.user.uid, this.usuario);
  }
  cancel(): void {
    location.reload();
  }

  agregarVehiculo(): void {
    const newVehiculo: Vehiculo = {
      marca: this.formVehiculo.get('marca').value,
      modelo: this.formVehiculo.get('modelo').value,
      ano: this.formVehiculo.get('año').value,
      placa: this.formVehiculo.get('placa').value,
      serial: this.formVehiculo.get('serial').value,
      fechaIngreso: new Date(),
      cliente: this.usuario,
    };
    this.vehiculosService.createNewVehiculo(newVehiculo);
    const arrayVehiculos: Vehiculo[] = this.usuario.vehiculos;

    arrayVehiculos.push(newVehiculo);
    this.usuario = {
      ... this.usuario = this.usuario,
      vehiculos: arrayVehiculos
    };

    this.usuarioService.updateUser(this.user.uid, this.usuario);
    this.activacion(2);
    alert('vehiculo agregado');
  }

  pedirCita(): void {
    this.buildFormCita();
    alert('cita pedida');
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
