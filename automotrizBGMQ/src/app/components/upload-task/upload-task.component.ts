import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Vehiculo } from 'src/app/models/vehiculo';
import { VehiculosService } from '../../services/vehiculos.service';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit {

  @Input() vehiculo: Vehiculo;
  @Input() usuario: Usuario;
  @Input() file: File;

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  path: string;
  constructor(private storage: AngularFireStorage, private db: AngularFirestore, private VehiculosService: VehiculosService, private UsuarioService: UsuarioService) { }

  ngOnInit() {
    this.startUpload();
  }

  startUpload() {

    if(this.usuario == null){
      this.path = `fotosVehiculos/${Date.now()}_${this.file.name}`;
    } else {
      this.path = `fotosPerfil/${Date.now()}_${this.file.name}`;
    }
    // The storage path


    // Reference to storage bucket
    const ref = this.storage.ref(this.path);

    // The main task
    this.task = this.storage.upload(this.path, this.file);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot   = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize( async() =>  {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        if(this.usuario == null){
          this.vehiculo.foto = this.downloadURL;
          this.VehiculosService.updateVehiculo(this.vehiculo.id, this.vehiculo);
        } else {
          this.usuario.photoURL = this.downloadURL;
          this.UsuarioService.updateUser(this.usuario.id, this.usuario);
        }

      }),
    );
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}
