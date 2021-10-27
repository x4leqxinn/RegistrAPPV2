import { Injectable } from '@angular/core';

/// Librerías
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

// Observable 
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Cabecera HTTP Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', //va en formato JSON
      'Access-Control-Allow-Origin': '**'
    })
  }

  constructor(private http: HttpClient) { }

  // Definir direcciones HTTP
  direccionGenerarQR = "";
  direccionEscanearQR = "";

  // Crear los métodos para acceder a cada uno de los métodos de la BDD

  //Método listar sin parametros
  getPosts(): Observable<any> {
    return this.http.get(this.direccion).pipe(retry(3));
  }

  //Método buscar por id
  getPost(id): Observable<any> {
    return this.http.get(this.direccion + '/' + id).pipe(retry(3));
  }

  //Método para agregar
  crearPost(post): Observable<any> {
    return this.http.post(this.direccion, post, this.httpOptions).pipe(retry(3));
  }

  //Método para modificar
  updatePost(id, post): Observable<any> {
    return this.http.put(this.direccion + '/' + id, post, this.httpOptions).pipe(retry(2));
  }

  //Método para eliminar
  deletePost(id) {
    return this.http.delete(this.direccion + '/' + id, this.httpOptions).pipe(retry(2));
  }
}
