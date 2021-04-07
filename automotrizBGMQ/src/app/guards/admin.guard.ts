import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor( private Auth: AuthService, private router: Router ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.Auth.user$.pipe(
      take(1),
      map( user => user && this.Auth.isAdmin(user)),
      tap( isAdmin => {
        if (!isAdmin) {
          alert('Debe tener permisos de Administrador para acceder a esta página');
          this.router.navigate(['/']);
        }
      })
    );
  }
}
