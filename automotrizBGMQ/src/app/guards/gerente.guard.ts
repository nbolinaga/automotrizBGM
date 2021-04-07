import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GerenteGuard implements CanActivate {

  constructor( private Auth: AuthService, private router: Router ){}


  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.Auth.user$.pipe(
      take(1),
      map( user => user && this.Auth.isGerente(user)),
      tap( isGerente => {
        if (!isGerente) {
          alert('Debe tener permisos de Gerente para acceder a esta página.');
          this.router.navigate(['/perfil']);
        }
      })
    );
  }
}
