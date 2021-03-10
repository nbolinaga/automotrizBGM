import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import firebase from 'firebase';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private Auth: AngularFireAuth) { }

  async login(): Promise<firebase.User|null>{
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
      catch(err){
        console.log(err);
      }
  }
}
