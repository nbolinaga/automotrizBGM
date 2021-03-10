import { Component, HostListener, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { AuthService } from 'src/app/services/auth.service';
import firebase from 'firebase';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ "height": "0", "opacity": "0" }),
        animate('.5s ease-out', style({ "height": "*", "opacity": "1" }))
      ]),
      transition(':leave', [
        style({ "height": "*", "opacity": "1" }),
        animate('.5s ease-in', style({ "height": "0", "opacity": "0" }))
      ])
    ])
  ]
})
export class NavbarComponent implements OnInit {
  user: firebase.User = null;
  Logeado: Boolean = false;
  navOpen: Boolean = true;

  constructor(private Auth: AuthService) {}
  
  ngOnInit(): void {

    this.Auth.getCurrentUser().subscribe((user) => {
      this.user = user;
    })

    if (
      window.matchMedia(
        'screen and (max-width: 1025px) and (orientation: portrait)'
      ).matches
    ) {
      this.navOpen = false;
    } else {
      this.navOpen = true;
    }
  }
    
  toggleNav() {
    this.navOpen = !this.navOpen;
  }
  logged() {
    this.Logeado = !this.Logeado;
  }
  Salir(){
    this.Auth.logout()
  }

}
