import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

import { InicioComponent } from './components/inicio/inicio.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { CitasComponent } from './components/citas/citas.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AutosComponent } from './components/autos/autos.component';
import { AdminComponent } from './components/admin/admin.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { ContactanosComponent } from './components/contactanos/contactanos.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { VisitanosComponent } from './components/visitanos/visitanos.component';

import {AuthService} from './services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'quienesSomos', component: QuienesSomosComponent},
  {path: 'visitanos', component: VisitanosComponent},
  {path: 'contactanos', component: ContactanosComponent},
  {path: 'login', component: LoginComponent},
  {path: 'citas', component: CitasComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'autos', component: AutosComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'calendario', component: CalendarioComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InicioComponent,
    FooterComponent,
    LoginComponent,
    AutosComponent,
    CitasComponent,
    PerfilComponent,
    AutosComponent,
    LandingPageComponent,
    VisitanosComponent,
    ContactanosComponent,
    QuienesSomosComponent,
    AdminComponent,
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
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
