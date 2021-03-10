import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { AuthService } from 'src/app/services/auth.service';


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

  constructor(private authService: AuthService) { }

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
}
