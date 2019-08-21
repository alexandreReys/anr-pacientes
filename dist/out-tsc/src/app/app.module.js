var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
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
import { MedicoService } from 'src/app/services/medico.service';
import { ContatoService } from './services/contato.service';
import { ConsultaService } from './services/consulta.service';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
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
                ContatoService,
                ConsultaService,
                MedicoService
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map