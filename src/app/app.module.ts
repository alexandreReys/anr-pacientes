import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageModule } from 'angular-2-local-storage';

import { AppComponent } from './app.component';
import { HeaderComponent } from './home/header/header.component';
import { HomeComponent } from './home/home.component';
import { routing } from './app.routing';
import { LoginComponent } from './security/login/login.component';
import { LoginService } from './security/login/login.service';
import { LoggedInGuard } from './security/loggedIn.guard';
import { UserDatailsComponent } from './home/header/user-datails/user-datails.component';
import { NotificationService } from './shared/messages/notification.service';
import { SnackbarComponent } from './shared/messages/snackbar/snackbar.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    SnackbarComponent,
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    UserDatailsComponent
  ],
  imports: [
    SharedModule,
    HttpModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    routing,
    LocalStorageModule.forRoot({
      storageType: 'localStorage'
    })
  ],
  exports: [
    SnackbarComponent
  ],
  providers: [
    NotificationService,
    LoginService, 
    LoggedInGuard 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
