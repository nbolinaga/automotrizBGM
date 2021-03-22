import { Usuario } from "./usuario";

export interface Vehiculo{
  id?: string;
  marca: string;
  modelo: string;
  ano: number;
  color: string;
  placa: string;
  km: number;
  gasolina: number;
  extras: string;
  accesorios: [
    caucho: boolean,
    llaves: boolean,
    gato: boolean,
    herramientas: boolean,
    reproductor: boolean,
    otros: string,
  ];
  foto: string;
  cliente: Usuario;
}
