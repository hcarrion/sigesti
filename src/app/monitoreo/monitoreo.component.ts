import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DialogRecursosComponent } from '../modal/dialog-recursos/dialog-recursos.component';
import { DialogRiesgosComponent } from '../modal/dialog-riesgos/dialog-riesgos.component';
import { DialogSeguimientoComponent} from "../modal/dialog-seguimiento/dialog-seguimiento.component";
import { FirebaseIniciativaService } from '../shared/services/firebase-iniciativa.service';
import { IniciativaFire } from '../shared/models/iniciativa-fire';
import { DialogRegistraSeguimientoComponent } from '../modal/dialog-registra-seguimiento/dialog-registra-seguimiento.component';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Listadoatencionhelp } from '../shared/models/listadoatencionhelp';
import { DialogListaEventoComponent } from '../modal/dialog-lista-evento/dialog-lista-evento.component';


@Component({
  selector: 'app-monitoreo',
  templateUrl: './monitoreo.component.html',
  styleUrls: ['./monitoreo.component.css']
})
export class MonitoreoComponent implements OnInit {
  habilitar: boolean;
  selected: boolean;
  nuevo: boolean;
  edit: boolean;
  delete: boolean;
  tabla: any;
  mensajeAccion: string;
  display: boolean = false;
  mostrar1: string = 'false';
  mostrar2: string = 'false';
  columnasTabla: string[] = ['codigosvt', 'titulo','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'];
  columnasTabla1: string[] = ['codigosvt', 'titulo','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'];
  
  title = "Example Angular 8 Material Dialog";
  //iniciativas: IniciativaFire[] = [];
  iniciativas= new MatTableDataSource<IniciativaFire>([]);
  selectedRowIndex: number = -1;
  tipoDocumentoData = new MatTableDataSource<IniciativaFire>([]);
  tipoDocumentoDataBuscar = new MatTableDataSource<IniciativaFire>([]);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  public tipoDocumento: IniciativaFire[];
  public tipoDocumentoSeleccionado: IniciativaFire;
  public TipoDocumenetHelp: Listadoatencionhelp[];
  public TipoDocumenetHelpSeleccionado: Listadoatencionhelp;
  loading: boolean;
  
  tiporeporte = new FormControl();
  tipoiniciativa = new FormControl();
  codigosvt = new FormControl();

  tiporeportelista: string[] = ['Iniciativa', 'Personal'];
  tipoiniciativalista: string[] = ['Proyecto', 'Mantenimiento','Soporte','Incidencias'];
  codigosvtlista: string[] = ['Iniciativa', 'Personal'];
  i: number;
  constructor(private matDialog: MatDialog, private firebaseIniciativas: FirebaseIniciativaService) {}

  ngOnInit() {

    localStorage.setItem('indinicio',"false");   
    this.callIniciativas();
  }

  async callIniciativas() {
    this.loading = true;
    
    let iniciativasRef = this.firebaseIniciativas.getIniciativas();
    iniciativasRef.subscribe(data => {
      var lista = [];
      for(var i = 0; i < data.length; i++){
        //lista.push(data[i].payload.doc.data() as IniciativaFire);
        let iniciativaObject= data[i].payload.doc.data() as IniciativaFire;
        let idIniciativa = data[i].payload.doc.id;
        iniciativaObject.idIniciativa = idIniciativa;
        lista.push(iniciativaObject);

      }
      this.iniciativas =  new MatTableDataSource(lista);
      this.iniciativas.paginator = this.paginator;
      this.iniciativas.sort = this.sort;
      this.InicializaDatosBusqueda();
      this.loading = false;
     
      
    });
  }
  InicializaDatosBusqueda(){
    // Inicializa los datos de busqueda
    this.iniciativas.filterPredicate = (data, filter) => {
     const dataStr = data.codigoSVT + data.numeroIniciativa + data.titulo + data.jefeProyecto.nombres + data.estado.descripcion + data.fechaInicio  + data.fechaFin + data.prioridad.descripcion;
     return dataStr.toLowerCase().indexOf(filter) != -1;       
   }
 }
diasDelMesYAñoActual() {
	var fecha = new Date();
	return new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0).getDate();
}
highlight(row){
  this.selectedRowIndex = row.numeroIniciativa;
}

selectedDocumento(todo: IniciativaFire) {
  this.InReset();
  this.habilitar = true;
  this.selected = true;
  this.delete = true;
  this.nuevo = false;
  this.edit = false;
  this.tipoDocumentoSeleccionado = todo;
}

InReset() {
  this.habilitar = false;
  this.nuevo = false;
  this.edit = false;
  this.delete = false;
  this.selected = false;
  this.display = false;
}

selectedTipoDocumentoHelp(tipo: Listadoatencionhelp){
  this.TipoDocumenetHelpSeleccionado = tipo;
  this.tipoDocumentoSeleccionado.numeroIniciativa = this.TipoDocumenetHelpSeleccionado.numeroIniciativa;
  /*$("#modalTipoDocumento").modal('hide');*/
}  
openDialogActivity(iniciativa: IniciativaFire){
  this.matDialog.open(DialogListaEventoComponent, /*dialogConfig,*/
    { width: '2000px', height: '600px', data: iniciativa}
  );
}
openDialogEdit(iniciativa: IniciativaFire){
  this.matDialog.open(DialogRegistraSeguimientoComponent, /*dialogConfig,*/
    { width: '2000px',
      height: '600px',
      data: iniciativa
    }
  );
}
buscarDatos(filterValue: string) {
  this.iniciativas.filter = filterValue.trim().toLowerCase();
}
select1(plan)
{
  alert(plan);
}
select(plan)
{
  this.mostrar1= "false";
  this.mostrar2= "false";
    if(plan.value.indexOf("Personal")>-1){
      this.mostrar2= "true";
    } 
    if (plan.value.indexOf("Iniciativa")>-1  ){
      this.mostrar1= "true";
    }
}
}
