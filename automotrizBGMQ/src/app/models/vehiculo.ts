import { DocumentReference } from '@angular/fire/firestore';
import { Usuario } from './usuario';

export interface Vehiculo{
  cliente: string;
  id?: string;
  idUser?: string;
  fechaIngreso: Date;
  marca: string;
  modelo: string;
  ano: number;
  serial: string;
  placa: string;
  color?: string;
  km?: number;
  gasolina?: number;
  extras?: string;
  accesorios?: [
    caucho: boolean,
    llaves: boolean,
    gato: boolean,
    herramientas: boolean,
    reproductor: boolean,
    otros: string,
  ];
  foto?: string;
}
