import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../models/usuario';
import firebase from 'firebase';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
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
  isOpenAdmins: boolean = false;

  //Declarar usuario y variables para traer datos de firebase
  clientes: Usuario[] = [];
  mecanicos: Usuario[] = [];
  gerentes: Usuario[] = [];
  admins: Usuario[] = [];

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
  subsciption: Subscription;

  //Booleano para el popup de editar
  status: boolean = false;

  texto: string;


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

  openAdmins(): boolean {
    this.isOpenAdmins = !this.isOpenAdmins
    return this.isOpenAdmins
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
        } else if(user.rol === 'Admin'){
          this.admins.push(user);
          console.log(user.nombre);
        }
      });
    });
  }

  getUser(persona: Usuario): Usuario {
    this.usuario = persona;
    return this.usuario
  }

  cambiarStatus(userId: string): void {
    this.subsciption = this.userService.getUserById(userId).subscribe(user => {
      return this.usuario = user;
    })
    this.status = !this.status;
  }

  cerrarPopUp(): void {
    this.subsciption.unsubscribe();
    this.status = !this.status;
    location.reload();
  }

  eliminarUser(user: Usuario): void {
    this.userService.deleteUser(user.id);
  }

  cambiarRol(user: Usuario): void {

    if(this.texto === 'Cliente') {
      user.rol = this.texto;
    } else if(this.texto === 'Gerente') {
      user.rol = this.texto;
    } else if(this.texto === 'Mecanico') {
      user.rol = this.texto;
    } else if(this.texto === 'Admin') {
      user.rol = this.texto;
    }

    console.log(this.texto);

    this.userService.updateUser(user.id, user);
  }

  cambioRol(event: any): void {
    this.texto = event.target.value
  }

}
