import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthGuardGuard} from './guards/auth-guard.guard';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { CitasComponent } from './components/citas/citas.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AutosComponent } from './components/autos/autos.component';
import { AdminComponent } from './components/admin/admin.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { ContactanosComponent } from './components/contactanos/contactanos.component';
import { GerenteComponent } from './components/gerente/gerente.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

import { AuthService } from './services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdenesComponent } from './components/ordenes/ordenes.component';
import { ReportesComponent } from './components/reportes/reportes.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'contactanos', component: ContactanosComponent},
  {path: 'login', component: LoginComponent},
  {path: 'citas', component: CitasComponent, canActivate: [AuthGuardGuard]},
  {path: 'perfil', component: PerfilComponent, canActivate: [AuthGuardGuard]},
  {path: 'autos', component: AutosComponent, canActivate: [AuthGuardGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuardGuard]},
  {path: 'gerente', component: GerenteComponent, canActivate: [AuthGuardGuard]},
  {path: 'reportes', component: ReportesComponent, canActivate: [AuthGuardGuard]},
  {path: 'calendario', component: CalendarioComponent, canActivate: [AuthGuardGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    AutosComponent,
    CitasComponent,
    PerfilComponent,
    AutosComponent,
    LandingPageComponent,
    ContactanosComponent,
    AdminComponent,
    GerenteComponent,
    OrdenesComponent,
    ReportesComponent,
    CalendarioComponent

  ],
  imports: [
    [BrowserModule, BrowserAnimationsModule],
    AppRoutingModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [RouterModule],
  providers: [AuthService, AngularFirestore],
  bootstrap: [AppComponent]
})

export class AppModule { }
