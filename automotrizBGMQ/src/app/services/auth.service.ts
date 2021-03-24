import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private Auth: AngularFireAuth) { }

  // Registrarse con correo y contraseña
  async signUpWithEmail(
    displayName: string,
    email: string,
<<<<<<< HEAD
    password: string
  ): Promise<firebase.User|null>{
=======
    password: string,
  ):  Promise<firebase.User|null>{
>>>>>>> main
    try{
      const res = await this.Auth.createUserWithEmailAndPassword(email, password);
      const {user} = res;
      localStorage.setItem('user', user.uid);
      await user.updateProfile({
        displayName,
        photoURL: '../../assets/user.png',
      });
<<<<<<< HEAD
      return user;
=======
      location.href = '/perfil'
      return user
>>>>>>> main
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
<<<<<<< HEAD
      return user;
=======
      console.log(user);
      location.href = '/perfil'
      return user
>>>>>>> main
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
<<<<<<< HEAD
        return response.user;
=======
        location.href = '/perfil'
        return response.user
>>>>>>> main
      }
    }
    catch (err){
      console.log(err);
      localStorage.removeItem('user');
    }
    return null;
  }

  // Obtener usuario
  getCurrentUser(): Observable<firebase.User|null>{
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
