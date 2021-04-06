import { Component, OnInit } from '@angular/core';
import { VehiculosService } from 'src/app/services/vehiculos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Vehiculo } from 'src/app/models/vehiculo';
import { Usuario } from 'src/app/models/usuario';

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

  listaVehiculos: Vehiculo[];
  listaClientes: Usuario[];
  listaMecanicos: Usuario[];

  constructor(private userService: UsuarioService, private carService: VehiculosService) { }

  ngOnInit(): void {
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
        this.listaClientes.push(user);
        if(user.rol === 'Mecanico') {
          this.listaMecanicos.push(user)
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
}
