import { Component, OnInit } from '@angular/core';
import { VehiculosService } from 'src/app/services/vehiculos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Vehiculo } from 'src/app/models/vehiculo';
import { Usuario } from 'src/app/models/usuario';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

  vehiculos: boolean = false;
  clientes: boolean = false;
  mecanicos: boolean = false;
  general: boolean= false;
  texto: string = '';

  listaVehiculos: Vehiculo[] = [];
  listaClientes: Usuario[] = [];
  listaMecanicos: Usuario[] = [];

  subscription: Subscription;
  vehiculo: Vehiculo = {
    cliente: 'nombre',
    fechaIngreso: null,
    marca: 'marca',
    modelo: 'modelo',
    ano: 1,
    serial: 'serial',
    placa: 'placa'
  }
  usuario: Usuario = {
    nombre: '',
    cedula: 1,
    tipoID: '',
    id: '',
    email: '',
    telefono: '',
    clave: '',
    confirmacion: ''
  };

  subscrito = true;

  constructor(private userService: UsuarioService, private carService: VehiculosService) { }

  ngOnInit(): void {
    this.todosLosCarros();
    this.todosLosClientes();
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

  todosLosClientes(): void {
    this.userService.getAllUsers().subscribe(users => {
      users.forEach(user => {
        if(user.rol === 'Mecanico') {
          this.listaMecanicos.push(user);
        } else if(user.rol === 'Cliente') {
          this.listaClientes.push(user);
        }
      });
    });
  }

  todosLosCarros(): void {
    this.carService.getAllVehiculos().subscribe(carros => {
      carros.forEach(carro => {
        this.listaVehiculos.push(carro);
      });
    });
  }

  mostrarDatos(event: any): void {
    const id: string = event.target.value;

    if(id !== 'default') {
      this.subscription = this.userService.getUserById(id).subscribe(user => {
        return this.usuario = user;
      });
      console.log(this.usuario.nombre)
    }
  }

  mostrarVehiculo(event: any): void {
    const id: string = event.target.value;

    if(id !== 'default') {
      this.subscription = this.carService.getVehiculoById(id).subscribe(carro => {
        return this.vehiculo = carro;
      });
      console.log(this.vehiculo.marca)
    }
  }

  mostrarMecanico(event: any): void {
    const id: string = event.target.value;

    if(id !== 'default') {
      this.subscription = this.userService.getUserById(id).subscribe(user => {
        return this.usuario = user;
      });
      console.log(this.usuario.nombre)
    }
  }
}
