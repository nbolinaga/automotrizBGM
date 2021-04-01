import { Cita } from "./cita";
import { Vehiculo } from './vehiculo'

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
  citas?: Cita[];
  vehiculos?: Vehiculo[];
  rol?: Rol;
  photoURL?: 'https://firebasestorage.googleapis.com/v0/b/automotrizbgmq.appspot.com/o/user.png?alt=media';
}
