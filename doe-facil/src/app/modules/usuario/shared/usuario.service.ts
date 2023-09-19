import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseResourceService } from 'app/shared/services/base-resource.service';
import { Usuario } from './usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseResourceService<Usuario>{

  protected http: HttpClient;

  constructor(protected injector: Injector) { 
    super("http://localhost:8080/api/usuarios", injector, Usuario.fromJson)
  }

  findByNome(nome: any): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiPath}?nome=${nome}`);
  }

  getAggregate(id: any): Observable<Usuario> {
    return this.http.get(`${this.apiPath}/aggregate${id}`);
  }

}
