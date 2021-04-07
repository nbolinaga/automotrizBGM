import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ContactanosService } from './../../services/contactanos.service';
import { Contactanos } from '../../models/contactanos';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  formContactanos: FormGroup;

  constructor(private contactanosService: ContactanosService) {
    this.buildFormContactanos();
  }

  ngOnInit(): void {
  }

  buildFormContactanos(): void {
    this.formContactanos = new FormGroup({
      nombre: new FormControl(''),
      correo: new FormControl(''),
      asunto: new FormControl(''),
      mensaje: new FormControl(''),
    });
  }

  enviar(): void {
    const contactanos: Contactanos = {
      nombre: this.formContactanos.get('nombre').value,
      correo: this.formContactanos.get('correo').value,
      asunto: this.formContactanos.get('asunto').value,
      mensaje: this.formContactanos.get('mensaje').value
    };

    this.contactanosService.guardarMensaje(contactanos);
    alert('Mensaje enviado con éxito!');
    this.formContactanos.reset();
  }

}
