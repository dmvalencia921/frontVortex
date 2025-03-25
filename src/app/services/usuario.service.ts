import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUsuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  urlServicio = environment.urlbackend + '/api/usuario';
  constructor(private http: HttpClient) { }


  public listarUsuarios() :Observable<IUsuario[]>{
    return this.http.get<IUsuario[]>(this.urlServicio+'/listarUsuarios');
  }

  public crearUsuario(Iusuario :IUsuario): Observable<IUsuario>{
    return this.http.post(this.urlServicio+'/crearUsuario', Iusuario);
  }

  public actualizarUsuario(Iusuario :IUsuario): Observable<IUsuario>{
    return this.http.put(this.urlServicio+'/actualizarUsuario', Iusuario);
  }

  public eliminarUsuario(Iusuario :number): Observable<IUsuario>{
    return this.http.delete(this.urlServicio+'/eliminarUsuario/'+Iusuario);
  }

  public buscarUsuarioPorUserName(username : string): Observable<IUsuario>{
    return this.http.get(this.urlServicio + '/buscarPorUsuario/'+username);
  }
}
