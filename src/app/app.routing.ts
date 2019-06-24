import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/compiler/src/core";

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './security/login/login.component';
import { LoggedInGuard } from './security/loggedIn.guard';

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login/:to', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'about', 
        loadChildren: './pages/about/about.module#AboutModule' },
    { path: 'contato', 
        loadChildren: './pages/contato/contato.module#ContatoModule',    
        canLoad: [LoggedInGuard], canActivate: [LoggedInGuard] },
    { path: 'medico', 
        loadChildren: './pages/medicos/medicos.module#MedicosModule',    
        canLoad: [LoggedInGuard], canActivate: [LoggedInGuard] },
    { path: 'paciente', 
        loadChildren: './pages/pacientes/pacientes.module#PacientesModule',    
        canLoad: [LoggedInGuard], canActivate: [LoggedInGuard] },
    { path: 'agenda', 
        loadChildren: './pages/agenda/agenda.module#AgendaModule',
        canLoad: [LoggedInGuard], canActivate: [LoggedInGuard] },
    { path: 'consulta', 
        loadChildren: './pages/consultas/consultas.module#ConsultasModule',
        canLoad: [LoggedInGuard], canActivate: [LoggedInGuard] }





];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
