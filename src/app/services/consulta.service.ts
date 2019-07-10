import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';

import { APP_API } from 'src/app/app.api';

import { LoginService } from 'src/app/security/login/login.service';
import { ErrorHandler } from 'src/app/app.error-handler';

import { Consulta } from 'src/app/models/consulta.model';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ConsultaService {

  url: string = `${APP_API}/consultas`;

  consulta: Consulta;

  public subject = new BehaviorSubject(this.consulta);

  constructor( 
    private httpClient: HttpClient, 
    private loginService: LoginService ) { }

  setDados(consulta: Consulta) {
    this.subject.next(consulta);
  }

  getConsultas(search?: string): Observable<Consulta[]> {
    if(search){ 
      let urlGet: string = `${APP_API}/consultas/${search}?idEmpresa=${this.loginService.user.idEmpresaUsuario}`;
      return this.httpClient
        .get<Consulta[]>( urlGet, { headers: this.getHeaders() } )
        .pipe( catchError( error => ErrorHandler.handleError(error) ) );

    } else {
      let urlGet = `${APP_API}/consultas?idEmpresa=${this.loginService.user.idEmpresaUsuario}`;
      return this.httpClient
        .get<Consulta[]>( urlGet, { headers: this.getHeaders() })
        .pipe( catchError( error => ErrorHandler.handleError(error) ) );
    }
  };

  getConsultaId(idConsulta: string): Observable<Consulta[]> {
    let urlGet: string = `${APP_API}/consultas/id/${idConsulta}?idEmpresa=${this.loginService.user.idEmpresaUsuario}`;
    return this.httpClient
      .get<Consulta[]>( urlGet, { headers: this.getHeaders() } )
      .pipe( catchError( error => ErrorHandler.handleError(error) ) );
  };

  getConsultasData(dataConsulta: string): Observable<Consulta[]> {
    let urlGet: string = `${APP_API}/consultas/data/${dataConsulta}?idEmpresa=${this.loginService.user.idEmpresaUsuario}`;
    return this.httpClient
      .get<Consulta[]>( urlGet, { headers: this.getHeaders() } )
      .pipe( catchError( error => ErrorHandler.handleError(error) ) );
  };

  getConsultasPaciente(idPaciente: string): Observable<Consulta[]> {
      let urlGet: string = `${APP_API}/consultas/paciente/${idPaciente}?idEmpresa=${this.loginService.user.idEmpresaUsuario}`;
      return this.httpClient
        .get<Consulta[]>( urlGet, { headers: this.getHeaders() } )
        .pipe( catchError( error => ErrorHandler.handleError(error) ) );
  };

addConsulta(consulta: Consulta){
    return this.httpClient
      .post<Consulta>( this.url, consulta, this.getHttpOptions() )
      .pipe( catchError( error => ErrorHandler.handleError(error) ) )
      .subscribe();
  };

  updateConsulta(consulta: Consulta){
    return this.httpClient
      .put<Consulta>( this.url, consulta, this.getHttpOptions() )
      .pipe( catchError( error => ErrorHandler.handleError(error) ) )
      .subscribe();
  }
  
  deleteConsulta(consulta: Consulta){
    let url: string = `${APP_API}/consultas/${consulta.idConsulta}`;
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
