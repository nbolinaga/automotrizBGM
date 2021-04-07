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
      if (this.Auth.isAuthenticated()) {
        alert('Aún no ha iniciado sesión.');
        this.router.navigate(['/']);
        return true;
      }
      else { return false; }
  }
}
