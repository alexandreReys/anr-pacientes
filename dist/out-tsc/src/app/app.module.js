var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageModule } from 'angular-2-local-storage';
import { AppComponent } from './app.component';
import { HeaderComponent } from './home/header/header.component';
import { HomeComponent } from './home/home.component';
import { routing } from './app.routing';
import { InputComponent } from './shared/input/input.component';
import { LoginComponent } from './security/login/login.component';
import { LoginService } from './security/login/login.service';
import { LoggedInGuard } from './security/loggedIn.guard';
import { UserDatailsComponent } from './home/header/user-datails/user-datails.component';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                AppComponent,
                HeaderComponent,
                HomeComponent,
                LoginComponent,
                InputComponent,
                UserDatailsComponent
            ],
            imports: [
                HttpModule,
                HttpClientModule,
                BrowserModule,
                FormsModule,
                ReactiveFormsModule,
                BrowserAnimationsModule,
                routing,
                LocalStorageModule.forRoot({
                    storageType: 'localStorage'
                })
            ],
            providers: [LoginService, LoggedInGuard],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map