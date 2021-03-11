import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('leftAnimation', [
      transition(':enter', [
        style({ "left": "-100%", "opacity": "0" }, ),
        animate('.5s ease-out', style({ "left": "50%", "opacity": "1"}))
      ]),
      transition(':leave', [
        style({ "left": "50%", "opacity": "1" }),
        animate('.5s ease-in', style({ "left": "-100%", "opacity": "0"}))
      ])
    ]),
    trigger('rightAnimation', [
      transition(':enter', [
        style({ "right": "-100%", "opacity": "0" }, ),
        animate('.5s ease-out', style({ "right": "50%", "opacity": "1"}))
      ]),
      transition(':leave', [
        style({ "right": "50%", "opacity": "1" }),
        animate('.5s ease-in', style({ "right": "-100%", "opacity": "0"}))
      ])
    ]),
  ]
})
export class LoginComponent implements OnInit {

  registrar: Boolean = false;
  form: FormGroup;


  constructor(private authService: AuthService) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  ingresarScreen(){
    this.registrar = false;
  }
  registrarScreen(){
    this.registrar = true;
  }
  Acceder(){
    this.authService.login()
  }

  // Funciones para el formulario
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
    if(this.form.valid) {
      console.log(value);
    } else {
      console.log("Formulario invalido...");
    }
  }
}
