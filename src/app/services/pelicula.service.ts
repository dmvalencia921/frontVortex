import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { IPelicula } from '../model/pelicula';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  urlServicio = environment.urlbackend+ '/api/pelicula'
  constructor(
    private http : HttpClient
  ) { }

  public crearPelicula(Ipelicula : IPelicula): Observable<IPelicula>{
    return this.http.post(this.urlServicio+'/crearPelicula',Ipelicula)
  }
  public actualizarPelicula(Ipelicula : IPelicula): Observable<IPelicula>{
    return this.http.put(this.urlServicio+'/actualizarPelicula',Ipelicula)
  }
  public listarPelicula(): Observable<IPelicula[]>{
    return this.http.get<IPelicula[]>(this.urlServicio+'/listarPeliculas')
  }
  public eliminarPelicula(Ipelicula : number): Observable<IPelicula>{
    return this.http.delete(this.urlServicio+'/eliminarPelicual/'+Ipelicula)
  }
}
