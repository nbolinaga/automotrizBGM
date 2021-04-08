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
export class OrdenesService {
  private ordenCollection: AngularFirestoreCollection<Orden>;
  private userCollection: AngularFirestoreCollection<Usuario>;
  ordenes: Observable<Orden[]>;

  constructor(private firestore: AngularFirestore) {
    this.userCollection = this.firestore.collection<Usuario>('usuarios');
    this.ordenCollection = this.firestore.collection<Orden>('ordenes');
  }

  getAllOrdenes(): Observable<Orden[]> {
    this.ordenCollection = this.firestore.collection<Orden>('ordenes');
    return (this.ordenes = this.ordenCollection.snapshotChanges().pipe(
      map((cambios) => {
        return cambios.map((action) => {
          const datos = action.payload.doc.data() as Orden;
          datos.id = action.payload.doc.id;
          return datos;
        });
      })
    ));
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

  createNewOrden(id: string, newOrden: Orden): Promise<void> {
    return this.ordenCollection.doc<Orden>(id).set(newOrden);
  }

  updateOrden(userId: string, OrdenData: Orden): Promise<void> {
    return this.ordenCollection.doc<Orden>(userId).update(OrdenData);
  }

  deleteOrden(userId: string): Promise<void> {
    return this.ordenCollection.doc<Orden>(userId).delete();
  }
}
