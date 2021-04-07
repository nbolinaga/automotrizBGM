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
import { Vehiculo } from '../models/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {
  private vehiculoCollection: AngularFirestoreCollection<Vehiculo>;
  private userCollection: AngularFirestoreCollection<Usuario>;
  private vehiculos: Observable<Vehiculo[]>;

  constructor(private firestore: AngularFirestore) {
    this.userCollection = this.firestore.collection<Usuario>('usuarios');
    this.vehiculoCollection = this.firestore.collection<Vehiculo>('vehiculos');
  }

  getAllVehiculos(): Observable<Vehiculo[]> {
    this.vehiculoCollection = this.firestore.collection<Vehiculo>('vehiculos');
    return (this.vehiculos = this.vehiculoCollection.snapshotChanges().pipe(
      map((cambios) => {
        return cambios.map((action) => {
          const datos = action.payload.doc.data() as Vehiculo;
          datos.id = action.payload.doc.id;
          return datos;
        });
      })
    ));
  }

  getAllUserVehiculos(): Observable<Vehiculo[]> {
    return this.vehiculoCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((usuario) => ({
          id: usuario.payload.doc.id,
          ...usuario.payload.doc.data(),
        }));
      })
    );
  }

  getVehiculoById(userId: string): Observable<Vehiculo> {
    return this.vehiculoCollection
      .doc<Vehiculo>(userId)
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

  createNewVehiculo(newVehiculo: Vehiculo): Promise<void> {
    return this.vehiculoCollection.doc<Vehiculo>().set(newVehiculo);
  }
  updateVehiculo(userId: string, vehiculoData: Vehiculo): Promise<void> {
    return this.vehiculoCollection.doc<Vehiculo>(userId).update(vehiculoData);
  }

  deleteVehiculo(userId: string): Promise<void> {
    return this.vehiculoCollection.doc<Vehiculo>(userId).delete();
  }
}
