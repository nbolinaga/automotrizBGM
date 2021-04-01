import { Usuario } from "./usuario";
import { Vehiculo } from "./vehiculo";

export interface Cita{
  id: string;
  cliente: Usuario;
  fecha: Date;
  confirmada: boolean;
  descripcion: string;
  vehiculo: Vehiculo;
}
