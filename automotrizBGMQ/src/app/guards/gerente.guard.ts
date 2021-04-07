import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {Usuario} from 'src/app/models/usuario'
import { AuthService } from 'src/app/services/auth.service'
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class GerenteGuard implements CanActivate {

  usuario: Usuario;

  constructor(private Router:Router, private auth: AuthService, private usuarioService: UsuarioService){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.auth.getCurrentUser().subscribe(user => {
        this.usuarioService.getUserById(user.uid).subscribe(data => {
          this.usuario=data;
        });
      });
      if(this.usuario.rol==='Gerente'){
        return true;
      }
      return this.Router.parseUrl('/perfil');
  }
}
