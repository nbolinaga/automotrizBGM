import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import firebase from 'firebase';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  user: firebase.User = null;

  form: FormGroup;

  activar = false;

  activacion(): void {
    this.activar = !this.activar;
  }

  constructor(private Auth: AuthService) {
    this.buildForm();

    this.Auth.getCurrentUser().subscribe((user) => {
      this.user = user;
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

}
