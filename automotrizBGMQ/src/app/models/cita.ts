import { Usuario } from "./usuario";

export interface Cita{
  id: string;
  cliente: Usuario;
  fecha: Date;
  confirmada: boolean;
  descripcion: string;
}
