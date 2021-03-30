import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../models/usuario';
import firebase from 'firebase';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireList } from '@angular/fire/database';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference
} from '@angular/fire/firestore';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  //Variables para abrir las listas de usuarios
  isOpenMecanicos: boolean = false;
  isOpenGerentes: boolean = false;
  isOpenClientes: boolean = false;

  //Declarar usuario y variables para traer datos de firebase
  clientes: Usuario[] = [];
  mecanicos: Usuario[] = [];
  gerentes: Usuario[] = [];
  usuario: Usuario = {
    nombre: 'nombre',
    cedula: 1,
    tipoID: 'tipoID',
    id: 'id',
    email: 'ejemplo@gmial.com',
    telefono: 'telefono',
    clave: 'clave',
    confirmacion: 'confirmacion'
  };

  //Booleano para el popup de editar
  status: boolean = false;

  //Si esta abierto el cambio de rol
  cambio: boolean = false;


  constructor(private auth: AuthService, private userService: UsuarioService) { }

  ngOnInit(): void {
    // this.clientes.length = 0;
    // this.mecanicos.length = 0;
    // this.gerentes.length = 0;
    this.mostrarUsuarios();
  }

  openMecanicos(): boolean {
    this.isOpenMecanicos = !this.isOpenMecanicos
    return this.isOpenMecanicos
  }

  openGerentes(): boolean {
    this.isOpenGerentes = !this.isOpenGerentes
    return this.isOpenGerentes
  }

  openClientes(): boolean {
    this.isOpenClientes = !this.isOpenClientes
    return this.isOpenClientes
  }

  mostrarUsuarios(): void {
    this.userService.getAllUsers().subscribe(users => {
      users.forEach(user => {
        if(user.rol === 'Cliente') {
          this.clientes.push(user);
        } else if(user.rol === 'Mecanico') {
          this.mecanicos.push(user);
        } else if(user.rol === 'Gerente') {
          this.gerentes.push(user);
        }
      });
    });
  }

  cambiarRoles(): void {
    this.cambio = !this.cambio;
  }

  getUser(persona: Usuario): Usuario {
    this.usuario = persona;
    return this.usuario
  }

  cambiarStatus(persona: Usuario): void {
    this.getUser(persona);
    this.cambio = false;
    this.status = !this.status;
  }

}
