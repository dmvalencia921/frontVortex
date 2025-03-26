import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { IFuncion } from '../model/funcion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionService {

  urlServicio = environment.urlbackend+'/api/funcion'

  constructor( private http : HttpClient) { }


  public crearFuncion (Ifuncion : IFuncion): Observable<IFuncion>{
    return this.http.post(this.urlServicio +'/crearFuncion', Ifuncion);
  }

  public listarFuncion () :Observable<IFuncion[]>{
    return this.http.get<IFuncion[]>(this.urlServicio+'/listarFunciones');
  }

  public buscarPorIdPelicula(Ifuncion :number) :Observable<IFuncion>{
    return this.http.get(this.urlServicio+'/buscarPorpelicula/'+Ifuncion);
  }

  public actualizarFuncion (Ifuncion : IFuncion): Observable<IFuncion>{
    return this.http.put(this.urlServicio +'/actualizarFuncion', Ifuncion);
  }

  public eliminarFuncion (Ifuncion: number) : Observable<IFuncion>{
    return this.http.delete(this.urlServicio + '/eliminarFuncion/'+Ifuncion);
  }

}
