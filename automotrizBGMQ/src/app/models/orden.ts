import { Vehiculo } from "./vehiculo";

export interface Orden{
  id?: string;
  vehiculo: Vehiculo;
  codigoQR: string;
  repuestos: string;
  procedimiento: string;
  diagnostico: string;
  finalizado: boolean;
}
