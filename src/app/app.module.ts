import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
// import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageModule } from 'angular-2-local-storage';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/home/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './security/login/login.component';
import { LoginService } from './security/login/login.service';
import { LoggedInGuard } from './security/loggedIn.guard';
import { UserDatailsComponent } from './pages/home/header/user-datails/user-datails.component';
import { NotificationService } from './shared/messages/notification.service';
import { SnackbarComponent } from './shared/messages/snackbar/snackbar.component';
import { SharedModule } from './shared/shared.module';

import { ContatoService } from './services/contato.service';
import { ConsultasPacienteFormComponent } from './pages/consultas/consulta-form/consulta-form.component';

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
    // HttpModule,
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
    LoggedInGuard,
    ConsultasPacienteFormComponent,
    ContatoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
