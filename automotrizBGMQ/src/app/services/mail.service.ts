import { Injectable } from '@angular/core';
import { Cita } from '../models/cita';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class MailService {


  constructor() { }

  enviarEmail(cita: Cita, usuario: Usuario){

    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'automotrizbgmq@gmail.com',
      pass: 'bgmq1234567'
    }
    });
  
    const mailOptions = {
      from: 'automotrizbgmq@gmail.com',
      to: usuario.email,
      subject: 'Confirmación de cita',
      html: '<h1>Hola, {{usuario.nombre}}!</h1><p> Este {{cita.fecha}} a las {{cita.hora}} horas tienes una cita con nosotros para arreglar tu vehiculo, no lo olvides! ;) </p>'
    }

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }  

}
