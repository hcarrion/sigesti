import { BrowserModule } from '@angular/platform-browser';
import { NgModule,NgZone, ViewChild } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroIniciativaComponent } from './registro-iniciativa/registro-iniciativa.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ListadoAtencionComponent } from './listado-atencion/listado-atencion.component';
import { RegistroHorasComponent } from './registro-horas/registro-horas.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { DialogRecursosComponent } from './modal/dialog-recursos/dialog-recursos.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogRiesgosComponent } from './modal/dialog-riesgos/dialog-riesgos.component';
import { DialogSeguimientoComponent } from './modal/dialog-seguimiento/dialog-seguimiento.component';
import { DialogRiesgosMantenedorComponent } from './modal/dialog-riesgos/dialog-riesgos-mantenedor/dialog-riesgos-mantenedor.component';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule, MatNativeDateModule, MatInputModule,MatSelectModule, MatProgressSpinnerModule} from '@angular/material';
//import { MbscModule } from '@mobiscroll/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// Modulos Para Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirebaseParametroService } from './shared/services/firebase-parametro.service';
import { DialogRegistraSeguimientoComponent } from './modal/dialog-registra-seguimiento/dialog-registra-seguimiento.component';
import { MaterialModule } from './material-module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { RegistroContactoComponent } from './registro-contacto/registro-contacto.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { DialogRegistraContactoComponent } from './modal/dialog-registra-contacto/dialog-registra-contacto.component';
import { DialogRegistraEventoComponent } from './modal/dialog-registra-evento/dialog-registra-evento.component';
import { DialogListaEventoComponent } from './modal/dialog-lista-evento/dialog-lista-evento.component';
import { DialogRegistraRecursoEventoComponent } from './modal/dialog-registra-recurso-evento/dialog-registra-recurso-evento.component';
import { ChartsModule } from 'ng2-charts';
import { StatusreportComponent } from './statusreport/statusreport.component';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CommonModule, DatePipe } from '@angular/common';
import { MonitoreoComponent } from './monitoreo/monitoreo.component';
import { EmailFireService } from './shared/services/email-fire.service';


@NgModule({
  declarations: 
  [
    AppComponent,
    RegistroIniciativaComponent,
    MenuComponent,
    ListadoAtencionComponent,
    RegistroHorasComponent,
    ConfiguracionComponent,
    DialogRecursosComponent,
    DialogRiesgosComponent,
    DialogSeguimientoComponent,
    DialogRiesgosMantenedorComponent,
    DialogRegistraSeguimientoComponent,
    RegistroContactoComponent,
    DashboardComponent,
    DialogRegistraContactoComponent,
    DialogRegistraEventoComponent,
    DialogListaEventoComponent,
    DialogRegistraRecursoEventoComponent,
    DialogRegistraEventoComponent,
    StatusreportComponent,
    MonitoreoComponent
  ],
  imports: 
  [
    BrowserModule,    
    ChartsModule,
    AppRoutingModule,
    MatSliderModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    MatProgressSpinnerModule,
    NgxMatSelectSearchModule,
    HttpClientModule, 
    AngularEditorModule,
    SelectDropDownModule,
    CommonModule,
    FormsModule
  ],
  providers: [AngularFireStorageModule,AngularFirestore, FirebaseParametroService, 
    DialogRecursosComponent, CommonModule, DatePipe, EmailFireService, ],
  entryComponents: [RegistroIniciativaComponent, DialogRecursosComponent, 
  DialogRiesgosComponent, DialogSeguimientoComponent, DialogRiesgosMantenedorComponent, DialogRegistraSeguimientoComponent, RegistroContactoComponent, DialogRegistraContactoComponent,
  DialogListaEventoComponent, DialogRegistraRecursoEventoComponent, DialogRegistraEventoComponent, MonitoreoComponent],
  bootstrap: [AppComponent]
})
export class AppModule {   
}
