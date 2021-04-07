import { Component, OnInit } from '@angular/core';
import { VehiculosService } from 'src/app/services/vehiculos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Vehiculo } from 'src/app/models/vehiculo';
import { Usuario } from 'src/app/models/usuario';
import { Subscription } from 'rxjs';
import { CitasService } from 'src/app/services/citas.service';
import { Cita } from 'src/app/models/cita';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

  //Variables para los ngIf
  vehiculos: boolean = false;
  clientes: boolean = false;
  mecanicos: boolean = false;
  general: boolean= false;
  texto: string = '';

  //Listas para las opciones de reportes
  listaVehiculos: Vehiculo[] = [];
  listaClientes: Usuario[] = [];
  listaMecanicos: Usuario[] = [];
  //lista con todas las citas
  listaCitas: Cita[] = [];
  listaCitasVehiculo: Cita[] = [];

  //Variables auxiliares
  subscription: Subscription;

  vehiculo: Vehiculo = {
    cliente: 'nombre',
    fechaIngreso: null,
    marca: 'marca',
    modelo: 'modelo',
    ano: 1,
    serial: 'serial',
    placa: 'placa',
    activo: true
  }
  usuario: Usuario = {
    nombre: '',
    cedula: -1,
    tipoID: '',
    id: '',
    email: '',
    telefono: '',
    clave: '',
    confirmacion: ''
  };

  subscrito = true;

  constructor(
      private userService: UsuarioService,
      private carService: VehiculosService,
      private citasService: CitasService) { }

  ngOnInit(): void {
    this.todosLosCarros();
    this.todosLosClientes();
    this.todasLasCitas();
  }

  cambio(event: any): void {
    this.texto = event.target.value;

    this.vehiculos = false;
    this.clientes = false;
    this.mecanicos = false;
    this.general = false;

    if(this.texto === 'vehiculos') {
      this.vehiculos = true;
    } else if(this.texto === 'clientes') {
      this.clientes = true;
    } else if(this.texto === 'mecanicos') {
      this.mecanicos = true;
    } else if(this.texto === 'general'){
      this.general = true;
    }
  }

  //Llena la lista de usuarios
  todosLosClientes(): void {
    this.userService.getAllUsers().subscribe(users => {
      users.forEach(user => {
        if(user.rol === 'Mecanico') { //Si el rol es mecanico lo mete en la lista de mecanicos
          this.listaMecanicos.push(user);
        } else if(user.rol === 'Cliente') { //Si el rol es cliente lo mete en la lista de clientes
          this.listaClientes.push(user);
        }
      });
    });
  }

  //Llena la lista de vehiculos con todos los que hay en el sistema
  todosLosCarros(): void {
    this.carService.getAllVehiculos().subscribe(carros => {
      carros.forEach(carro => {
        this.listaVehiculos.push(carro);
      });
    });
  }

  //Llena la lista de citas
  todasLasCitas(): void {
    this.citasService.getAllCitas().subscribe(citas => {
      citas.forEach(cita => {
        this.listaCitas.push(cita);
      });
    });
  }

  //Se subscribe al cliente que se esoge
  mostrarDatos(event: any): void {
    const id: string = event.target.value;

    if(id !== 'default') {
      this.subscription = this.userService.getUserById(id).subscribe(user => {
        return this.usuario = user;
      });
    }
  }

  //Se subscribe al vehiculo que se esoge
  mostrarVehiculo(event: any): void {
    this.listaCitasVehiculo.length = 0; //Vacia las citas cada vez que se visita un vehiculo

    const id: string = event.target.value;

    if(id !== 'default') {
      this.subscription = this.carService.getVehiculoById(id).subscribe(carro => {
        //Probar con citas service
        //Usar getAllCitas -> lista de citas -> filtrar citas.vehiculo === carro.placa
        //Sacar las citas del carro



        return this.vehiculo = carro;
      });
    }
  }

  //Se subscribe al mecanico que se esoge
  mostrarMecanico(event: any): void {
    const id: string = event.target.value;

    if(id !== 'default') {
      this.subscription = this.userService.getUserById(id).subscribe(user => {
        return this.usuario = user;
      });
    }
  }
}
