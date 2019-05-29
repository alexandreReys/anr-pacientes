import { RouterModule } from "@angular/router";
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './security/login/login.component';
import { LoggedInGuard } from './security/loggedIn.guard';
var APP_ROUTES = [
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
    { path: 'consulta',
        loadChildren: './pages/consultas/consultas.module#ConsultasModule',
        canLoad: [LoggedInGuard], canActivate: [LoggedInGuard] }
];
export var routing = RouterModule.forRoot(APP_ROUTES);
//# sourceMappingURL=app.routing.js.map