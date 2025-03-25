import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { ICompra } from '../model/compra';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  
  urlservicio = environment.urlbackend+'/api/compra'

  constructor(private http: HttpClient) { }

  public crearCompra(Icompra:ICompra):Observable<ICompra>{
    return this.http.post(this.urlservicio+'/crearCompra', Icompra);
  }
}
