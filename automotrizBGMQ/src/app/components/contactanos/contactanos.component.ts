import { FormControl, FormGroup } from '@angular/forms';
import { ContactanosService } from './../../services/contactanos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.scss']
})
export class ContactanosComponent implements OnInit {

  formContactanos: FormGroup;

  constructor() {
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
    console.log('Prueba1');
    console.log(this.formContactanos.get('nombre').value());
    alert('Mensaje enviado con éxito!');
  }

}
