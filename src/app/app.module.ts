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
import { ReactiveFormsModule } from '@angular/forms';
// Modulos Para Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirebaseParametroService } from './shared/services/firebase-parametro.service';
import { DialogRegistraSeguimientoComponent } from './modal/dialog-registra-seguimiento/dialog-registra-seguimiento.component';
import { MaterialModule } from './material-module';


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
    DialogRegistraSeguimientoComponent
  ],
  imports: 
  [
    BrowserModule,
    //MbscModule,
    AppRoutingModule,
    MatSliderModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    MatProgressSpinnerModule
  ],
  providers: [AngularFireStorageModule,AngularFirestore, FirebaseParametroService, 
    DialogRecursosComponent,],
  entryComponents: [RegistroIniciativaComponent, DialogRecursosComponent, 
  DialogRiesgosComponent, DialogSeguimientoComponent, DialogRiesgosMantenedorComponent, DialogRegistraSeguimientoComponent],
  bootstrap: [AppComponent]
})
export class AppModule { 

  
}

