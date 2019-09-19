import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';

import { APP_API } from 'src/app/app.api';
import { Empresa } from 'src/app/models/empresa.model';

import { LoginService } from 'src/app/security/login/login.service';
import { ErrorHandler } from '../app.error-handler';

@Injectable({
  providedIn: 'root'
})

export class EmpresaService {

  url: string = `${APP_API}/empresas`;
  empresa: Empresa;

  public subject = new BehaviorSubject(this.empresa);

  constructor( 
    private httpClient: HttpClient, 
    private loginService: LoginService 
  ) { }

  setDados(empresa: Empresa) {
    this.subject.next(empresa);
  }

  getEmpresaById(idEmpresa?: string): Observable<Empresa[]> {
      let urlGet: string = `${APP_API}/empresas/id/${idEmpresa}`;
      return this.httpClient
        .get<Empresa[]>( urlGet, { headers: this.getHeaders() } )
        .pipe( catchError( error => ErrorHandler.handleError(error) ) );
  };

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
}
