import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { OrdenesService } from '../../services/ordenes.service';
import { Orden } from '../../models/orden'
import { Vehiculo } from 'src/app/models/vehiculo';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import {formatDate} from '@angular/common';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';


formatDate(new Date(), 'dd/MM/yyyy', 'en');
@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.scss']
})
export class OrdenesComponent implements OnInit {
  formOrden: FormGroup;
  usuario: Usuario;
  activar = false;
  activarAgregar = false;
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = 'https://www.techiediaries.com/';
  constructor(
    private fb : FormBuilder,
    private OrdenesService: OrdenesService){
  }

  ngOnInit(): void {
    this.crearForm();
  }

  activacion(numero): void {
    if (numero === 1){
      this.activar = !this.activar;
      this.crearForm();
    }
    else{
      this.activarAgregar = !this.activarAgregar;
      this.crearForm();
    }
  }

  crearForm(): void {
    this.formOrden = this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      serial: ['',Validators.required],
      año:  ['', Validators.required],
      color:  ['', Validators.required],
      placa:  ['', Validators.required],
      kmIngreso:  ['', Validators.required],
      nivelGas: ['', Validators.required],
      extras:  ['', Validators.required],
      // cauchosRepuesto:  ['', Validators.required],
      // llaves:  ['', Validators.required],
      // gato:  ['', Validators.required],
      // herramientas:  ['', Validators.required],
      // reproductor:  ['', Validators.required],
      otros:  ['', Validators.required],
    })
  }
  agregarOrden(){
    const newVehiculo: Vehiculo ={
      marca: this.formOrden.get('marca').value,
      modelo: this.formOrden.get('modelo').value,
      ano: this.formOrden.get('año').value,
      placa: this.formOrden.get('placa').value,
      serial: this.formOrden.get('serial').value,
      color:this.formOrden.get('color').value,
      km: this.formOrden.get('kmIngreso').value,
      gasolina: this.formOrden.get('nivelGas').value,
      extras: this.formOrden.get('extras').value,
      fechaIngreso: new Date(),
      activo: true,
      cliente:this.usuario.id
    }
    const newOrden: Orden = {
      vehiculo: newVehiculo,
      codigoQR: 'codigoQR',
      repuestos: 'respuestos',
      procedimiento: 'procedimiento',
      diagnostico: 'diagnostico',
      finalizado: false
    };
    this.OrdenesService.createNewOrden(newOrden);
    alert("Llegue aqui")
  }
}