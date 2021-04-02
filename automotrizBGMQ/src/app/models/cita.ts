import { Usuario } from './usuario';
import { Vehiculo } from './vehiculo';

export interface Cita{
  cliente: string,
  fecha?: Date;
  estado: string;
  confirmada: boolean;
  motivo: string;
  descripcion: string;
  vehiculo: string; 
}
