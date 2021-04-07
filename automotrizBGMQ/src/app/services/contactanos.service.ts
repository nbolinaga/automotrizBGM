import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Contactanos } from './../models/contactanos';

@Injectable({
  providedIn: 'root'
})
export class ContactanosService {
  private contactanosCollection: AngularFirestoreCollection;

  constructor(private firestore: AngularFirestore) {
    this.contactanosCollection = firestore.collection<Contactanos>('contactanos');
  }

  guardarMensaje(newContactanos: Contactanos): void {
    this.contactanosCollection.add(newContactanos);
  }
}
