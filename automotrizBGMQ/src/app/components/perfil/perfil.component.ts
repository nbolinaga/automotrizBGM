import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import firebase from 'firebase';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  user: firebase.User = null;
  usuario: Usuario;
  form: FormGroup;
  disabled =  true;
  activar = false;

  activacion(): void {
    this.activar = !this.activar;
  }

  constructor(private Auth: AuthService, private UsuarioService: UsuarioService) {
    this.buildForm();
    this.Auth.getCurrentUser().subscribe((user) => {
      this.user = user;
      this.UsuarioService.getUserById(user.uid).subscribe((response) => {
        if (response.nombre == undefined){
          const newUser: Usuario = {
            nombre: user.displayName,
            tipoID: null,
            cedula: 0,
            telefono: 'edite sus datos de perfil',
            email: user.email,
            clave: null,
            confirmacion: null,
            rol: 'Cliente'
          };
          this.UsuarioService.createNewUser(user.uid, newUser);
        } else {
          this.usuario = response;
        }
      });
    });



  }

  ngOnInit(): void {

  }


  buildForm(): void {
    this.form = new FormGroup({
      vehiculo: new FormControl('', [Validators.required]),
      motivo: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required])
    });
  }

  enviar(event: Event): void {
    event.preventDefault();
    const value = this.form.value;
    if (this.form.valid) {
      console.log(value);
    } else {
      console.log('Formulario invalido...');
    }
  }

  editar(){
    this.disabled = !this.disabled;
    this.UsuarioService.updateUser(this.user.uid, this.usuario);
  }
}
