import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseResourceService } from 'app/shared/services/base-resource.service';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService extends BaseResourceService<Item>{

  protected http: HttpClient;

  constructor(protected injector: Injector) { 
    super("http://localhost:8080/api/itens", injector, Item.fromJson)
  }

  findByNome(nome: any): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiPath}?nome=${nome}`);
  }

  getAggregate(id: any): Observable<Item> {
    return this.http.get(`${this.apiPath}/aggregate${id}`);
  }

}
