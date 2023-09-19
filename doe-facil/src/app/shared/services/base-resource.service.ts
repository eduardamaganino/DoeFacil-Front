import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { BaseResourceModel } from '../models/base-resource.model';
import { Injector } from "@angular/core";


export abstract class BaseResourceService<T extends BaseResourceModel> {

  protected http: HttpClient;

  constructor(
    protected apiPath: string, 
    protected injector: Injector,  
    protected jsonDataToResourceFn: (jsonData: any) => T) {
      this.http = injector.get(HttpClient);
  }

  getAll(): Observable<T[]> {
    return this.http.get(this.apiPath).pipe(
      map(this.jsonDataToResources.bind(this)),
      catchError(this.handleError)
    )
  }

  get(id: any): Observable<T> {
    const url = `${this.apiPath}/${id}`;

    return this.http.get(url).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)      
    )
  }

  create(resource: T): Observable<T> {
    return this.http.post(this.apiPath, resource).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)
    )
  }

  update(id: any , resource: T): Observable<T> {
    const url = `${this.apiPath}/${id}`;
    
    return this.http.put(url, resource).pipe(
      catchError(this.handleError),
      map(() => resource)
    )  
  }

  delete(id: any): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    )  
  }


  deleteAll(): Observable<any> {
    return this.http.delete(this.apiPath).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }

  findByNome(nome: any): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiPath}?nome=${nome}`);
  }

  upload(data:any, id: any): Observable<any> {
    return this.http.post(`${this.apiPath}/upload/${id}`, data);
  }

  //PROTECTED METHODS

  protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];
    jsonData.forEach(
      element => resources.push( this.jsonDataToResourceFn(element) )
    );
    return resources;
  }

  protected jsonDataToResource(jsonData: any): T {
    return this.jsonDataToResourceFn(jsonData);
  }

  protected handleError(error: any): Observable<any>{
    console.log("ERRO NA REQUISIÇÃO => ", error);
    return throwError(error);
  } 
  
}
