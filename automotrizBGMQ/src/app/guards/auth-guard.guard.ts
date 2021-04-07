import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor( private Auth: AuthService, private router: Router ){}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
      return this.Auth.user$.pipe(
        take(1),
        map( user => user && this.Auth.isUsuario(user)),
        tap( isUsuario => {
          if (!isUsuario) {
            alert('Debe iniciar sesión para poder acceder a esta página.');
            this.router.navigate(['/']);
          }
        })
      );
  }
}
