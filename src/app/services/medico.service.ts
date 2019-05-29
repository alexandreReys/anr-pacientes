import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';

import { APP_API } from 'src/app/app.api';
import { Medico } from 'src/app/models/medico.model';

import { LoginService } from 'src/app/security/login/login.service';
import { ErrorHandler } from '../app.error-handler';

@Injectable({
  providedIn: 'root'
})

export class MedicoService {

  url: string = `${APP_API}/medicos`;
  medico: Medico;

  public subject = new BehaviorSubject(this.medico);

  constructor( private httpClient: HttpClient, private loginService: LoginService ) { }

  setDados(medico: Medico) {
    this.subject.next(medico);
  }

  getMedicos(search?: string): Observable<Medico[]> {
    if(search){ 
      let urlGet: string = `${APP_API}/medicos/${search}`;
      return this.httpClient
        .get<Medico[]>( urlGet, { headers: this.getHeaders() } )
        .pipe( catchError( error => ErrorHandler.handleError(error)) );
    } else {
      return this.httpClient
        .get<Medico[]>( this.url, { headers: this.getHeaders() })
        .pipe( catchError( error => ErrorHandler.handleError(error) ) );
    }
  };

  getMedicoByCodigo(idMedico?: string): Observable<Medico[]> {
      let urlGet: string = `${APP_API}/medicos/id/${idMedico}`;
      return this.httpClient
        .get<Medico[]>( urlGet, { headers: this.getHeaders() } )
        .pipe( catchError( error => ErrorHandler.handleError(error) ) );
  };

  addMedico(medico: Medico){
    return this.httpClient
      .post<Medico>( this.url, medico, this.getHttpOptions() )
      .pipe( catchError( error => ErrorHandler.handleError(error) ) )
      .subscribe();
  };

  updateMedico(medico: Medico){
    return this.httpClient
      .put<Medico>( this.url, medico, this.getHttpOptions() )
      .pipe( catchError( error => ErrorHandler.handleError(error) ) )
      .subscribe();
  }
  
  deleteMedico(medico: Medico){
    let url: string = `${APP_API}/medicos/${medico.idMedico}`;
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
