export interface Cita {
  id?: string;
  idUser?: string;
  cliente?: string;
  fecha?: string;
  hora?: string;
  estado: string;
  confirmada: boolean;
  motivo: string;
  descripcion: string;
  vehiculo: string;
  orden?: boolean;
}
