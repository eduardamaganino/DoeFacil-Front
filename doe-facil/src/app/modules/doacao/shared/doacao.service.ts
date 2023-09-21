import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseResourceService } from 'app/shared/services/base-resource.service';
import { Doacao } from './doacao.model';

@Injectable({
  providedIn: 'root'
})
export class DoacaoService extends BaseResourceService<Doacao>{

  protected http: HttpClient;

  constructor(protected injector: Injector) { 
    super("http://127.0.0.1:8000/api/doacoes", injector, Doacao.fromJson)
  }

}
