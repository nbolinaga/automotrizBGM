import { Usuario } from '../models/usuario';

export class ValidarRol {
  isUsuario(user: Usuario): boolean {
    return user.rol === 'Cliente';
  }

  isGerente(user: Usuario): boolean {
    return user.rol === 'Gerente';
  }

  isMecanico(user: Usuario): boolean {
    return user.rol === 'Mecanico';
  }

  isAdmin(user: Usuario): boolean {
    return user.rol === 'Admin';
  }
}
