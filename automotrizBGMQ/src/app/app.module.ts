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
import { ContactComponent } from './components/contact/contact.component';
import { CitasComponent } from './components/citas/citas.component';

const routes: Routes = [
  {path: 'inicio', component: InicioComponent},
  {path: 'citas', component: CitasComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InicioComponent,
    FooterComponent,
    LoginComponent,
    ContactComponent,
    CitasComponent
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
