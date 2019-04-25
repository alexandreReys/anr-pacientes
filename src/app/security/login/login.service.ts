
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, NavigationEnd } from "@angular/router";

import { Observable } from "rxjs";
import { tap } from 'rxjs/internal/operators';
import { filter } from 'rxjs/internal/operators';

import { APP_API} from "../../app.api";
import { User } from './user.model';
import { NotificationService } from "src/app/shared/messages/notification.service";

@Injectable()
export class LoginService{
    
    user: User;
    lastUrl: string;

    constructor(
        private http: HttpClient, 
        private router: Router,
        private notificationService: NotificationService
    ) {
        this.router.events.pipe( filter(e => e instanceof NavigationEnd) )
                          .subscribe( (e:NavigationEnd) => this.lastUrl = e.url);
    }

    isLoggedIn(): boolean {
        return this.user != undefined;
    }

    login(email: string, password: string): Observable<User> {
        return this.http
            .post<User>(`${APP_API}/login`, {email: email, password: password})
            .pipe( tap(user => this.user = user) );
    };

    logout(){
        this.notificationService.notify(`${this.user.name} logout !!`);
        this.user = undefined;
        this.router.navigate(['/']);
    }

    handleLogin(path: string = this.lastUrl) {
        this.router.navigate(['/login', btoa(path)])
    }
}