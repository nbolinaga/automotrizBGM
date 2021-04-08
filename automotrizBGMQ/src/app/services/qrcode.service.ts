import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QRcodeService {

  GET = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data='

  constructor(private http: HttpClient) { }

  crearCodigo(idCita):Observable<any>{
    return this.http.get<any>(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${idCita}`).pipe(map((data:any)=>data.results))
  }
}
