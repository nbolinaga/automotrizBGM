import { Cita } from "./cita";
import { Vehiculo } from "./vehiculo";

export interface Orden{
  id?: string;
  vehiculo: Vehiculo;
  cita: Cita;
  codigoQR?: string;
  repuestos?: string;
  procedimiento?: string;
  diagnostico?: string;
  finalizado: boolean;
  foto?: string;
  idUser: string;
}
