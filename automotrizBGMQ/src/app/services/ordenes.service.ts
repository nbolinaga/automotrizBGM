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
import { Orden } from '../models/orden';

@Injectable({
  providedIn: 'root'
})
export class Service {
  private ordenCollection: AngularFirestoreCollection<Orden>;
  private userCollection: AngularFirestoreCollection<Usuario>;

  constructor(private firestore: AngularFirestore) {
    this.userCollection = this.firestore.collection<Usuario>('usuarios');
    this.ordenCollection = this.firestore.collection<Orden>('ordenes');
  }

  getAllUserOrdenes(): Observable<Orden[]> {
    return this.ordenCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((usuario) => ({
          id: usuario.payload.doc.id,
          ...usuario.payload.doc.data(),
        }));
      })
    );
  }

  getOrdenById(userId: string): Observable<Orden> {
    return this.ordenCollection
      .doc<Orden>(userId)
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

  createNewOrden(newOrden: Orden): Promise<void> {
    return this.ordenCollection.doc<Orden>().set(newOrden);
  }

  updateOrden(userId: string, OrdenData: Orden): Promise<void> {
    return this.ordenCollection.doc<Orden>(userId).update(OrdenData);
  }

  deleteOrden(userId: string): Promise<void> {
    return this.ordenCollection.doc<Orden>(userId).delete();
  }
}