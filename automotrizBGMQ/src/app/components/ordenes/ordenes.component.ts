import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { OrdenesService } from '../../services/ordenes.service';
import { Orden } from '../../models/orden'
import { VehiculosService } from 'src/app/services/vehiculos.service';
import { Vehiculo } from 'src/app/models/vehiculo';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import {formatDate} from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import firebase from 'firebase';
import { CitasService } from 'src/app/services/citas.service';
import { Cita } from '../../models/cita';
import { Subscription } from 'rxjs';

formatDate(new Date(), 'dd/MM/yyyy', 'en');
@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.scss']
})
export class OrdenesComponent implements OnInit {
  formOrden: FormGroup;
  user: firebase.User = null;
  usuario: Usuario;
  activar = false;
  activarAgregar = false;
  citasByFecha: Cita[];
  currentCita: Cita;
  currentVehiculo: Vehiculo = {
    cliente: 'nombre',
    fechaIngreso: null,
    marca: 'marca',
    modelo: 'modelo',
    ano: 1,
    serial: 'serial',
    placa: 'placa',
    activo: true
  }
  subscription: Subscription;
  abierto = false;
  buscarCitaID: string;
  buscarOrdenID: string;
  ordenes: Orden[];
  abiertoActualizacion = false;
  currentOrden: Orden = {
    vehiculo: null,
    cita: null,
    finalizado: false,
    idUser: null
  }

  constructor(
    private fb : FormBuilder,
    private OrdenesService: OrdenesService,
    private Auth: AuthService,
    private UsuarioService: UsuarioService,
    private citasService: CitasService,
    private vehiculoService: VehiculosService,
    ){
      this.getUser();
  }

  ngOnInit(): void {
    this.getCitasEstado();
    this.getOrdenes();
  }

  getUser(): void {
    this.Auth.getCurrentUser().subscribe((user) => {
      this.user = user;
      this.UsuarioService.getUserById(user.uid).subscribe((response) => {
          this.usuario = response;
      });
    });
  }

  getCitasEstado(): void {
    this.citasService.getAllCitas().subscribe(citas => {
      this.citasByFecha = citas.filter(cita => cita.confirmada === true);
    });
  }
  getOrdenes(): void {
    this.OrdenesService.getAllOrdenes().subscribe(ordenes =>{
      this.ordenes = ordenes.filter(ordenes => ordenes.finalizado === false);
    })
  }

  async crearOrden(cita: Cita, placa: string) {
    this.currentCita = cita;
    this.subscription = this.vehiculoService.getAllVehiculos().subscribe(vehiculos => {
      vehiculos.forEach(vehiculo =>{
        if(vehiculo.placa === placa){
          this.currentVehiculo = vehiculo;
        }
      });
    });
    this.togglePop();
  }

  togglePop(){
    this.abierto = !this.abierto;
  }

  async crear(){
    await this.vehiculoService.updateVehiculo(this.currentVehiculo.id, this.currentVehiculo);

    const newOrden: Orden = {
      vehiculo: this.currentVehiculo,
      cita: this.currentCita,
      finalizado: false,
      idUser: this.usuario.id
    };

    await this.OrdenesService.createNewOrden(this.currentCita.id, newOrden);
    this.currentCita.orden = true;
    await this.citasService.updateCita(this.currentCita.id, this.currentCita);
    location.href = '/ordenes';
  }
  obtenerImagen(cita: string): string{
    return 'https://api.qrserver.com/v1/create-qr-code/?size=76x76&data=' + cita;
  }

  buscarCita(citaId: string): void{
    var encontrado = false;
    this.citasByFecha.forEach(cita => {
      if(cita.id === citaId){
        encontrado = true;
        return this.crearOrden(cita, cita.vehiculo);
      }
    });

    if(encontrado == false){
      alert("Cita no encontrada");
    }
  }

  buscarOrden(ordenId: string){
    var encontrado = false;
    this.ordenes.forEach(orden => {
      if(orden.id === ordenId){
        encontrado = true;
        return this.actualizarOrden(orden);
      }
    });

    if(encontrado == false){
      alert("Orden no encontrada");
    }
  }

  actualizarOrden(orden: Orden){
    this.togglePopOrden();
    this.currentOrden = orden;
    this.currentCita = orden.cita;
  }

  async cerrarOrden(){
    this.currentOrden.finalizado = true;
    await this.OrdenesService.updateOrden(this.currentOrden.id, this.currentOrden);
  }

  async togglePopOrden(){
    this.abiertoActualizacion = !this.abiertoActualizacion;
    await this.OrdenesService.updateOrden(this.currentOrden.id, this.currentOrden);
  }
  // activacion(numero): void {
  //   if (numero === 1){
  //     this.activar = !this.activar;
  //     this.crearForm();
  //   }
  //   else{
  //     this.activarAgregar = !this.activarAgregar;
  //     this.crearForm();
  //   }
  // }
  // crearForm(): void {
  //   this.formOrden = this.fb.group({
  //     marca: ['', Validators.required],
  //     modelo: ['', Validators.required],
  //     serial: ['',Validators.required],
  //     año:  ['', Validators.required],
  //     color:  ['', Validators.required],
  //     placa:  ['', Validators.required],
  //     kmIngreso:  ['', Validators.required],
  //     nivelGas: ['', Validators.required],
  //     extras:  ['', Validators.required],
  //     // cauchosRepuesto:  ['', Validators.required],
  //     // llaves:  ['', Validators.required],
  //     // gato:  ['', Validators.required],
  //     // herramientas:  ['', Validators.required],
  //     // reproductor:  ['', Validators.required],
  //     otros:  ['', Validators.required],
  //   })
  // }
  // agregarOrden(){
  //   this.Auth.getCurrentUser().subscribe((user) => {
  //     this.user = user;
  //     this.UsuarioService.getUserById(user.uid).subscribe((response) =>{
  //       this.usuario = response;
  //       console.log(this.usuario.nombre)
  //     })
  //   })
  //   const newVehiculo: Vehiculo ={
  //     marca: this.formOrden.get('marca').value,
  //     modelo: this.formOrden.get('modelo').value,
  //     ano: this.formOrden.get('año').value,
  //     placa: this.formOrden.get('placa').value,
  //     serial: this.formOrden.get('serial').value,
  //     color:this.formOrden.get('color').value,
  //     km: this.formOrden.get('kmIngreso').value,
  //     gasolina: this.formOrden.get('nivelGas').value,
  //     extras: this.formOrden.get('extras').value,
  //     fechaIngreso: new Date(),
  //     activo: true,
  //     cliente:this.usuario.id
  //   }
  //   const newOrden: Orden = {
  //     vehiculo: newVehiculo,
  //     codigoQR: 'codigoQR',
  //     repuestos: 'respuestos',
  //     procedimiento: 'procedimiento',
  //     diagnostico: 'diagnostico',
  //     finalizado: false
  //   };
  //   this.OrdenesService.createNewOrden(newOrden);
  //   alert("Llegue aqui")
  // }
}
