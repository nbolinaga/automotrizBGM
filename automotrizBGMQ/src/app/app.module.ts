import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { InicioComponent } from './components/inicio/inicio.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { CitasComponent } from './components/citas/citas.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AutosComponent } from './components/autos/autos.component';
import { AdminComponent } from './components/admin/admin.component';
import { GerenteComponent } from './components/gerente/gerente.component';

const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'citas', component: CitasComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'autos', component: AutosComponent},
  {path: 'admin', component: AdminComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InicioComponent,
    FooterComponent,
    LoginComponent,
    CitasComponent,
    PerfilComponent,
    AutosComponent,
    AdminComponent,
    GerenteComponent
  ],
  imports: [
    [BrowserModule, BrowserAnimationsModule],
    AppRoutingModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
