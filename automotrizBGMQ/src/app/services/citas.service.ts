import { Injectable } from '@angular/core';
import { AngularFireList } from '@angular/fire/database';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cita } from '../models/cita';

@Injectable({
  providedIn: 'root',
})
export class CitasService {
  private CitaCollection: AngularFirestoreCollection<Cita>;
  private citaDoc: AngularFirestoreDocument<Cita>;
  private citas: Observable<Cita[]>;


  constructor(private firestore: AngularFirestore) {
    this.CitaCollection = this.firestore.collection<Cita>('citas');
  }

  getAllCitas(): Observable<Cita[]> {
    this.CitaCollection = this.firestore.collection<Cita>('citas');
    return (this.citas = this.CitaCollection.snapshotChanges().pipe(
      map((cambios) => {
        return cambios.map((action) => {
          const datos = action.payload.doc.data() as Cita;
          datos.id = action.payload.doc.id;
          return datos;
        });
      })
    ));
  }

  getCitasByFecha(fecha: string): Observable<Cita[]> {
    return this.firestore
      .collection<Cita>('citas', (ref) => ref.where('fecha', '==', fecha))
      .valueChanges();
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
    return this.CitaCollection.doc<Cita>(userId)
      .snapshotChanges()
      .pipe(
        map((user) => {
          return {
            id: user.payload.id,
            ...user.payload.data(),
          };
        })
      );
  }

  createNewCita(newCita: Cita): Promise<void> {
    return this.CitaCollection.doc<Cita>().set(newCita);
  }

  updateFechaCita(citaID: Cita, newFecha: string): Promise<void> {
    const citaRef = this.firestore.collection('citas').doc(citaID.id);
    return citaRef.update({fecha: newFecha, estado: 'Esperando confirmación'});
  }

  deleteCita(userId: string): Promise<void> {
    return this.CitaCollection.doc<Cita>(userId).delete();
  }
}
