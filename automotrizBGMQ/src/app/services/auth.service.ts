import { ValidarRol } from './validarRol';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})

export class AuthService extends ValidarRol{
  public user$: Observable<Usuario>;

  constructor(
    private Auth: AngularFireAuth,
    private firestore: AngularFirestore) {
    super();
    this.user$ = this.Auth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.doc<Usuario>(`usuarios/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  // Registrarse con correo y contraseña
  async signUpWithEmail(
    displayName: string,
    email: string,
    password: string,
  ): Promise<firebase.User|null>{
    try{
      const res = await this.Auth.createUserWithEmailAndPassword(email, password);
      const {user} = res;
      localStorage.setItem('user', user.uid);
      await user.updateProfile({
        displayName,
        photoURL: '../../assets/user.png',
      });
      location.href = '/perfil';
      return user;
    }
    catch (err){
      console.log(err);
      if (err.code === 'auth/email-already-exists' || err.code === 'auth/email-already-in-use'){
        alert('El email ingresado pertenece a un usuario registrado.');
      }
      else if (err.code === 'auth/network-request-failed'){
        alert('verifique si posee conexión a internet e intente nuevamente.');
      }
      else{
        alert('Ha ocurrido un error, intente nuevamente.');
      }
      localStorage.removeItem('user');
      return null;
    }
  }

  // Ingresar con correo y contraseña
  async loginWithEmail(
    email: string,
    password: string
  ): Promise<firebase.User|null>{
    try{
      const res = await this.Auth.signInWithEmailAndPassword(email, password);
      const {user} = res;
      localStorage.setItem('user', user.uid);
      console.log(user);
      location.href = '/perfil';
      return user;
    }
    catch (err){
      console.log(err);
      if (err.code === 'auth/user-not-found'){
        alert('El usuario no existe.');
      }
      else if (err.code === 'auth/wrong-password'){
        alert('Contraseña incorrecta.');
      }
      else if (err.code === 'auth/network-request-failed'){
        alert('verifique si posee conexión a internet e intente nuevamente.');
      }
      else{
        alert('Ha ocurrido un error, intente nuevamente.');
      }
      localStorage.removeItem('user');
      return null;
    }
  }

  // Ingresar con Google
  async loginWithGoogle(): Promise<firebase.User|null>{
    try{
      const provider = new firebase.auth.GoogleAuthProvider();
      const response = await this.Auth.signInWithPopup(provider);
      console.log(JSON.stringify(response));
      if (response.user){
        localStorage.setItem('user', response.user.uid);
        location.href = '/perfil';
        return response.user;
      }
    }
    catch (err){
      console.log(err);
      localStorage.removeItem('user');
    }
    return null;
  }

  // Obtener usuario
  getCurrentUser(): Observable<firebase.User>{
    return this.Auth.user;
  }

  // Cerrar sesión
  async logout(): Promise<void>{
      try{
        await this.Auth.signOut();
        localStorage.removeItem('user');
      }
      catch (e){
        console.log(e);
        localStorage.removeItem('user');
      }
  }

  // Usuario autenticado
  isAuthenticated(): boolean{
    return localStorage.getItem('user') ? true : false;
  }
}
