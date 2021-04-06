import { Injectable } from '@angular/core';
import { AngularFireList } from '@angular/fire/database';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarioCollection: AngularFirestoreCollection<Usuario>;

  constructor(private firestore: AngularFirestore) {
    this.usuarioCollection = this.firestore.collection<Usuario>('usuarios');
  }

  getAllUsers(): Observable<Usuario[]> {
    return this.usuarioCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((usuario) => ({
          id: usuario.payload.doc.id,
          ...usuario.payload.doc.data(),
        }));
      })
    );
  }

  getUserById(userId: string): Observable<Usuario> {
    return this.usuarioCollection
      .doc<Usuario>(userId)
      .snapshotChanges()
      .pipe(
        map(user => {
          return {
            id: user.payload.id,
            ...user.payload.data()
          };
        })
      );
  }

  createNewUser(userId: string, newUser: Usuario): Promise<void> {
    return this.usuarioCollection.doc<Usuario>(userId).set(newUser);
  }

  updateUser(userId: string, userData: Usuario): Promise<void> {
    return this.usuarioCollection.doc(userId).update(userData);
  }
  deleteUser(userId: string): Promise<void> {
    return this.usuarioCollection.doc<Usuario>(userId).delete();
  }
}
