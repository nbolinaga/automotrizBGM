import { Injectable } from '@angular/core';
import { AngularFireList } from '@angular/fire/database';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cita } from '../models/cita';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  private CitaCollection: AngularFirestoreCollection<Cita>;
  private citas: Observable<Cita[]>;

  constructor(private firestore: AngularFirestore) {
    this.CitaCollection = this.firestore.collection<Cita>('citas');
    this.citas = this.CitaCollection.valueChanges();
  }

  getAllCitas() {
    return this.citas;
  }

  getAllUserCitas(): Observable<Cita[]> {
    return this.CitaCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((usuario) => ({
          id: usuario.payload.doc.id,
          ...usuario.payload.doc.data(),
        }));
      })
    );
  }

  getCitaById(userId: string): Observable<Cita> {
    return this.CitaCollection
      .doc<Cita>(userId)
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

  createNewCita(newCita: Cita): Promise<void> {
    return this.CitaCollection.doc<Cita>().set(newCita);
  }

  updateCita(userId: string, CitaData: Cita): Promise<void> {
    return this.CitaCollection.doc<Cita>(userId).update(CitaData);
  }

  deleteCita(userId: string): Promise<void> {
    return this.CitaCollection.doc<Cita>(userId).delete();
  }
}
