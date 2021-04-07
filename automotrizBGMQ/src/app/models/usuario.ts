import { Cita } from './cita';
import { Vehiculo } from './vehiculo';

type Rol = 'Cliente' | 'Mecanico' | 'Gerente' | 'Admin';

export interface Usuario{
  id?: string;
  cedula: number;
  tipoID: string;
  nombre: string;
  email: string;
  telefono: string;
  clave: string;
  confirmacion: string;
  rol?: Rol;
  photoURL?: string;
}
