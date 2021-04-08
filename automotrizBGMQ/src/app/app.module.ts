import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthGuardGuard} from './guards/auth-guard.guard';
import { GerenteGuard} from './guards/gerente.guard';
import { AdminGuard} from './guards/admin.guard';
import { MecanicoGuard} from './guards/mecanico.guard';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { ContactanosComponent } from './components/contactanos/contactanos.component';
import { GerenteComponent } from './components/gerente/gerente.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AuthService } from './services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdenesComponent } from './components/ordenes/ordenes.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { DropZoneDirective } from './directives/drop-zone.directive';
import { UploaderComponent } from './components/file-upload/file-upload.component';
import { UploadTaskComponent } from './components/upload-task/upload-task.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'contactanos', component: ContactanosComponent},
  {path: 'login', component: LoginComponent},
  {path: 'citas', component: CitasComponent, canActivate: [AuthGuardGuard, GerenteGuard]},
  {path: 'perfil', component: PerfilComponent, canActivate: [AuthGuardGuard, GerenteGuard]},
  {path: 'autos', component: AutosComponent, canActivate: [AuthGuardGuard, GerenteGuard, MecanicoGuard, AdminGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuardGuard, AdminGuard]},
  {path: 'gerente', component: GerenteComponent, canActivate: [AuthGuardGuard, GerenteGuard]},
  {path: 'reportes', component: ReportesComponent, canActivate: [AuthGuardGuard, GerenteGuard]},
  {path: 'ordenes', component: OrdenesComponent, canActivate: [AuthGuardGuard, MecanicoGuard]}
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
    DropZoneDirective,
    UploaderComponent,
    UploadTaskComponent

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
    FormsModule,
  ],
  exports: [RouterModule],
  providers: [
    AuthService,
    AngularFirestore,
    AuthGuardGuard,
    GerenteGuard,
    MecanicoGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
