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
    super("http://127.0.0.1:8000/api/users", injector, Usuario.fromJson)  }

  authUser(email: string, password: string){
    const path = `http://127.0.0.1:8000/api/users/${email}/${password}`
    return this.http.get(path);
  }
}
