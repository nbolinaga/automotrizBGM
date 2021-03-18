import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import firebase from 'firebase';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private Auth: AngularFireAuth) { }

  async signUpWithEmail(
    displayName: string,
    email: string,
    password: string
  ):  Promise<firebase.User|null>{
    try{
      const res = await this.Auth.createUserWithEmailAndPassword(email,password);
      const {user}=res;
      localStorage.setItem('user', user.uid);
      await user.updateProfile({
        displayName,
        photoURL: '../../assets/user.png',
      });
      return user
    }
    catch(err){
      console.log(err);
      localStorage.removeItem('user');
      return null
    }
  }

  async loginWithEmail(
    email: string,
    password: string
  ): Promise<firebase.User|null>{
    try{
      const res = await this.Auth.signInWithEmailAndPassword(email,password);
      const {user}=res;
      localStorage.setItem('user', user.uid);
      return user
    }
    catch(err){
      console.log(err);
      localStorage.removeItem('user');
      return null
    }
  }

  async loginWithGoogle(): Promise<firebase.User|null>{
    try{
      const provider = new firebase.auth.GoogleAuthProvider();
      const response = await this.Auth.signInWithPopup(provider);
      console.log(JSON.stringify(response));
      if(response.user){
        localStorage.setItem('user', response.user.uid);
        return response.user
      }
    }
    catch(err){
      console.log(err);
      localStorage.removeItem('user');
    }
    return null
  }

  getCurrentUser(): Observable<firebase.User|null>{
    return this.Auth.user;
  }

  async logout(): Promise<void>{
      try{
        await this.Auth.signOut();
        localStorage.removeItem('user');
      }
      catch(e){
        console.log(e);
        localStorage.removeItem('user');
      }
  }

  isAuthenticated(): boolean{
    return localStorage.getItem('user') ? true : false;
  }
}
