import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { RegistroIniciativaComponent } from './registro-iniciativa/registro-iniciativa.component';
import { ListadoAtencionComponent } from './listado-atencion/listado-atencion.component';
import { RegistroHorasComponent } from './registro-horas/registro-horas.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { DialogRecursosComponent} from './modal/dialog-recursos/dialog-recursos.component';
import { DialogRiesgosComponent} from './modal/dialog-riesgos/dialog-riesgos.component';
import { DialogRiesgosMantenedorComponent} from './modal/dialog-riesgos/dialog-riesgos-mantenedor/dialog-riesgos-mantenedor.component';
import { RegistroContactoComponent } from './registro-contacto/registro-contacto.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatusreportComponent } from './statusreport/statusreport.component';
import { MonitoreoComponent } from './monitoreo/monitoreo.component';

const routes: Routes = 
[
  { path: 'menu', component: MenuComponent},
  { path: 'registrar_iniciativa', component: RegistroIniciativaComponent},
  { path: 'registro_horas', component: RegistroHorasComponent},
  { path: 'listado_atencion', component: ListadoAtencionComponent},
  { path: 'configuracion', component: ConfiguracionComponent},
  { path: 'registro_contacto', component: RegistroContactoComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'statusreport', component: StatusreportComponent},
  { path: 'monitorea', component: MonitoreoComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  schemas: [NO_ERRORS_SCHEMA]

})
export class AppRoutingModule { }
export const routingComponents = [ MenuComponent ];