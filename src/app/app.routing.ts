import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/compiler/src/core";

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './security/login/login.component';
import { LoggedInGuard } from './security/loggedIn.guard';

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login/:to', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'about', 
        loadChildren: './about/about.module#AboutModule' },
    { path: 'contato', 
        loadChildren: './contato/contato.module#ContatoModule',    
        canLoad: [LoggedInGuard], canActivate: [LoggedInGuard] },
    { path: 'consulta', 
        loadChildren: './pages/consultas/consultas.module#ConsultasModule',
        canLoad: [LoggedInGuard], canActivate: [LoggedInGuard] }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
