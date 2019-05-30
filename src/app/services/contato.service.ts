import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';

import { APP_API } from 'src/app/app.api';
import { Contato } from 'src/app/models/contato.model';

import { LoginService } from 'src/app/security/login/login.service';
import { ErrorHandler } from '../app.error-handler';

@Injectable({
  providedIn: 'root'
})

export class ContatoService {

  url: string = `${APP_API}/contatos`;
  contato: Contato;
  public subject = new BehaviorSubject(this.contato);

  constructor( private httpClient: HttpClient, private loginService: LoginService ) { }
  
  setDados(contato: Contato) {
    this.subject.next(contato);
  }
    
  getContatos(search?: string): Observable<Contato[]> {
    if(search){ 
      let urlGet: string = `${APP_API}/contatos/${search}`;
      return this.httpClient
        .get<Contato[]>( urlGet, { headers: this.getHeaders() } )
        .pipe( catchError( error => ErrorHandler.handleError(error) ) );

    } else {
      return this.httpClient
        .get<Contato[]>( this.url, { headers: this.getHeaders() })
        .pipe( catchError( error => ErrorHandler.handleError(error) ) );
    }
  };

  getContatosCodigo(codigoPaciente?: string): Observable<Contato[]> {
      let urlGet: string = `${APP_API}/contatos/codigo/${codigoPaciente}`;
      return this.httpClient
        .get<Contato[]>( urlGet, { headers: this.getHeaders() } )
        .pipe( catchError( error => ErrorHandler.handleError(error) ) );
  };

  addContato(contato: Contato){
    return this.httpClient
      .post<Contato>( this.url, contato, this.getHttpOptions() )
      .pipe( catchError( error => ErrorHandler.handleError(error) ) )
      .subscribe();
  };

  updateContato(contato: Contato){
    return this.httpClient
      .put<Contato>( this.url, contato, this.getHttpOptions() )
      .pipe( catchError( error => ErrorHandler.handleError(error) ) )
      .subscribe();
  }
  
  deleteContato(contato: Contato){
    let url: string = `${APP_API}/contatos/${contato.codigo}`;
    return this.httpClient
      .delete( url, this.getHttpOptions() )
      .pipe( catchError( error => ErrorHandler.handleError(error) ) )
      .subscribe();
  }

// FUNÇOES AUXILIARES - FUNÇOES AUXILIARES - FUNÇOES AUXILIARES - FUNÇOES AUXILIARES      

  getHttpOptions() {
    var httpOptions;
    if(this.loginService.isLoggedIn()) {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.loginService.user.accessToken}`
        })
      } 
    } else {
      httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}) } 
    };
    return httpOptions;
  }

  getHeaders()  {
    let headers = new HttpHeaders()
    if(this.loginService.isLoggedIn()) {
      headers = headers.set('Authorization', `Bearer ${this.loginService.user.accessToken}`);
      return headers;
    };
  }
  
  // handleErrorLocal(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  //   // return an observable with a user-facing error message
  //   return throwError(
  //     'Something bad happened; please try again later.');
  // };
}
