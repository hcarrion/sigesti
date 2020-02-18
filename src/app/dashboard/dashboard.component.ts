import { Component, OnInit, Inject, ViewChild, OnDestroy } from '@angular/core';
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
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit 
{

  
  private intervalUpdate: any = null; 
  public chart: any = null;
  habilitar: boolean;
  selected: boolean;
  nuevo: boolean;
  edit: boolean;
 
  delete: boolean;
  tabla: any;
  mensajeAccion: string;  
  display: boolean = false;
  columnasTablaP: string[] = ['codigosvt', 'titulo','fechafin','estado','accion'];
  columnasTablaM: string[] = ['codigosvt', 'titulo','fechafin','estado','accion'];
  columnasTablaI: string[] = ['codigosvt', 'titulo','fechafin','estado','accion'];
  columnasTablaJ: string[] = ['codigosvt', 'titulo','fechafin','estado','accion'];
  title = "Tablero de Control de las iniciativas";
  iniciativasR= new MatTableDataSource<IniciativaFire>([]);
  iniciativas= new MatTableDataSource<IniciativaFire>([]);
  iniciativas2= new MatTableDataSource<IniciativaFire>([]);
  iniciativas3= new MatTableDataSource<IniciativaFire>([]);
  iniciativas4= new MatTableDataSource<IniciativaFire>([]);
  
  selectedRowIndex: number = -1;
  tipoDocumentoData = new MatTableDataSource<IniciativaFire>([]);
  tipoDocumentoDataBuscar = new MatTableDataSource<IniciativaFire>([]);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  public estado: string="";
  public tipoDocumento: IniciativaFire[];
  public tipoDocumentoSeleccionado: IniciativaFire;
  public TipoDocumenetHelp: Listadoatencionhelp[];
  public TipoDocumenetHelpSeleccionado: Listadoatencionhelp;
  doughnutChartLabels: Label[] =  ['Por Hacer', 'En Progreso', 'QA', 'Cerrado'];
  barChartPlugins = [pluginDataLabels];
  doughnutChartDataP: MultiDataSet = [[0,0,0,0]];
  doughnutChartDataT: MultiDataSet = [[0,0,0,0]];
  doughnutChartDataM: MultiDataSet = [[0,0,0,0]];
  doughnutChartDataI: MultiDataSet = [[0,0,0,0]];
  doughnutChartType: ChartType = 'doughnut';
  


  loading: boolean;
  constructor(private matDialog: MatDialog, private   firebaseIniciativas: FirebaseIniciativaService) {} 

  FiltraCanvas(filterValue: string) {
    this.callIniciativas(filterValue.toUpperCase());    
    this.callIniciativas2(filterValue.toUpperCase());    
    this.callIniciativas3(filterValue.toUpperCase());    
    this.callIniciativas4(filterValue.toUpperCase());    
  }

  public chartOptions:any = { 
    responsive: true
  };


  esMuyListo():boolean {
          return true;    
}
  public chartClicked(e: any): void {
    
    if (e.active.length > 0) {
      
    const chart = e.active[0]._chart;
    const activePoints = chart.getElementAtEvent(e.event);
      if ( activePoints.length > 0) {
        // get the internal index of slice in pie chart
        const clickedElementIndex = activePoints[0]._index;
        const label = chart.data.labels[clickedElementIndex];
        // get value by index
        const value = chart.data.datasets[0].data[clickedElementIndex];
        // Por hacer Pendiente
        // Haciendo Asignado y en proceso
        // QA Terminado 
        // Done cerrado, rechazado, suspendido
        if (label=="Por Hacer"){this.FiltraCanvas("PENDIENTE");this.estado=" - Por Hacer";};
        if (label=="En Progreso"){this.FiltraCanvas("ASIGNADO,EN PROCESO");this.estado=" - En Progreso";};
        if (label=="QA"){this.FiltraCanvas("TERMINADO");this.estado=" - En Calidad";};
        if (label=="Cerrado"){this.FiltraCanvas("CERRADO,SUSPENDIDO,RECHAZADO");this.estado=" - Concluido";};        
      } 
     }
     else{
      this.callIniciativas("");    
      this.callIniciativas2("");    
      this.callIniciativas3("");    
      this.callIniciativas4("");    
      this.estado="";
     }
    }
  
  public chartHovered(e: any): void { 
    }

  onAgrupadorxCanvas(){
    
    }

  onCloseHandled()
  {
 
  }

  ngOnInit(){
    localStorage.setItem('indinicio',"false");   
    this.callIniciativasR(); 
    this.callIniciativas("");    
    this.callIniciativas2("");    
    this.callIniciativas3("");    
    this.callIniciativas4("");    	  
  } 

  openDialogActivity(idIniciativa: string){
    this.matDialog.open(DialogListaEventoComponent, /*dialogConfig,*/
      { width: '2000px', height: '600px', data: idIniciativa}
    );
  }

  openDialogEdit(idIniciativa: string){
    this.matDialog.open(DialogRegistraSeguimientoComponent, /*dialogConfig,*/
      { width: '2000px', height: '600px',data: idIniciativa }
    );
  }
  async callIniciativasR() {
    var arrayP= new Array();
    var arrayT= new Array();
    var arrayM= new Array();
    var arrayI= new Array();

    arrayP[0]= 0;
    arrayP[1]= 0;
    arrayP[2]= 0;
    arrayP[3]= 0;

    arrayT[0]= 0;
    arrayT[1]= 0;
    arrayT[2]= 0;
    arrayT[3]= 0;
    
    arrayM[0]= 0;
    arrayM[1]= 0;
    arrayM[2]= 0;
    arrayM[3]= 0;

    arrayI[0]= 0;
    arrayI[1]= 0;
    arrayI[2]= 0;
    arrayI[3]= 0;

    this.loading = true;    
     let iniciativasRef = this.firebaseIniciativas.getIniciativas();
     iniciativasRef.subscribe(data => {
       for(var i = 0; i < data.length; i++){                 
         let iniciativaObject= data[i].payload.doc.data() as IniciativaFire;
         this.alamcena_valor(iniciativaObject.categoria.descripcion.toLowerCase(), iniciativaObject.estado.descripcion.toLowerCase(),
         arrayP, arrayT, arrayM, arrayI) 
       }      
       //doughnutChartData:  [ [arrayP[0], arrayP[1], arrayP[2], arrayP[3]] ];
       
       this.doughnutChartDataP= arrayP;
       this.doughnutChartDataT= arrayT;
       this.doughnutChartDataM= arrayM;
       this.doughnutChartDataI= arrayI;
       this.loading = false;
    });
  }
  async callIniciativas(valor) {
    this.loading = true;
    let iniciativasRef = this.tipobusqueda(valor,"PROYECTO",valor);     
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
  tipobusqueda(valor: string, filtro1: string, filtro2: string)  {
    if (valor.trim()==""){
      return this.firebaseIniciativas.getIniciativaFiltro("categoria.descripcion",filtro1,"","");
    }else{
      return this.firebaseIniciativas.getIniciativaFiltro("categoria.descripcion",filtro1,"estado.descripcion",filtro2);
    }
     
  }
  alamcena_valor(tipo, estado, arrayP, arrayT, arrayM, arrayI){
    switch (tipo.toUpperCase()) {             
      case "PROYECTO": 
          this.alamcena_estado(estado,arrayP); 
          break;
      case "MANTENIMIENTO": 
          this.alamcena_estado(estado,arrayT); 
          break; 
      case "SOPORTE": 
          this.alamcena_estado(estado,arrayM); 
          break; 
      case "INCIDENCIA": 
          this.alamcena_estado(estado,arrayI); 
          break; 
    }    
  }
  alamcena_estado(estado, arraypr){
    switch (estado.toUpperCase()) {             
      case "PENDIENTE":
        arraypr[0]++;
        break;
      case "ASIGNADO":
        arraypr[1]++;
        break;
      case "EN PROCESO":
        arraypr[1]++;
        break;
      case "TERMINADO":
        arraypr[2]++;
        break;
      case "CERRADO":
        arraypr[3]++;
        break;
      case "RECHAZADO":
        arraypr[3]++;        
        break;
      case "SUSPENDIDO":
        arraypr[3]++;        
        break;
      default:
    }    
  }
  async callIniciativas2(valor) {
    this.loading = true;
    let iniciativasRef = this.tipobusqueda(valor,"MANTENIMIENTO",valor);
    //let iniciativasRef = this.firebaseIniciativas.getIniciativas();
    iniciativasRef.subscribe(data => {
      var lista = [];
      for(var i = 0; i < data.length; i++){
        //lista.push(data[i].payload.doc.data() as IniciativaFire);

        let iniciativaObject= data[i].payload.doc.data() as IniciativaFire;
        let idIniciativa = data[i].payload.doc.id;
        iniciativaObject.idIniciativa = idIniciativa;
        lista.push(iniciativaObject);

      }
      this.iniciativas2 =  new MatTableDataSource(lista);
      this.iniciativas2.paginator = this.paginator;
      this.iniciativas2.sort = this.sort;
      this.InicializaDatosBusqueda2();
      this.loading = false;
     
      
    });
  }

  async callIniciativas3(valor) {
    this.loading = true;
    let iniciativasRef = this.tipobusqueda(valor,"SOPORTE",valor);
    
    //let iniciativasRef = this.firebaseIniciativas.getIniciativas();
    iniciativasRef.subscribe(data => {
      var lista = [];
      for(var i = 0; i < data.length; i++){
        //lista.push(data[i].payload.doc.data() as IniciativaFire);
        let iniciativaObject= data[i].payload.doc.data() as IniciativaFire;
        let idIniciativa = data[i].payload.doc.id;
        iniciativaObject.idIniciativa = idIniciativa;
        lista.push(iniciativaObject);

      }
      this.iniciativas3 =  new MatTableDataSource(lista);
      this.iniciativas3.paginator = this.paginator;
      this.iniciativas3.sort = this.sort;
      this.InicializaDatosBusqueda3();
      this.loading = false;
     
      
    });
  }

  async callIniciativas4(valor) {
    this.loading = true;
    let iniciativasRef = this.tipobusqueda(valor,"INCIDENCIA",valor);
     //let iniciativasRef = this.firebaseIniciativas.getIniciativas();
    iniciativasRef.subscribe(data => {
      var lista = [];
      for(var i = 0; i < data.length; i++){
        //lista.push(data[i].payload.doc.data() as IniciativaFire);

        let iniciativaObject= data[i].payload.doc.data() as IniciativaFire;
        let idIniciativa = data[i].payload.doc.id;
        iniciativaObject.idIniciativa = idIniciativa;
        lista.push(iniciativaObject);

      }
      this.iniciativas4 =  new MatTableDataSource(lista);
      this.iniciativas4.paginator = this.paginator;
      this.iniciativas4.sort = this.sort;
      this.InicializaDatosBusqueda4();
      this.loading = false;
     
      
    });
  }

  InicializaDatosBusqueda(){
     // Inicializa los datos de busqueda
     this.iniciativas.filterPredicate = (data, filter) => {
      const dataStr = data.codigoSVT + data.numeroIniciativa + data.categoria.descripcion +  data.titulo + data.jefeProyecto.nombres + data.estado.descripcion + data.fechaInicio  + data.fechaFin + data.prioridad.descripcion;
      return dataStr.toUpperCase().indexOf(filter) != -1;       
    }
  }

  InicializaDatosBusqueda2(){
    // Inicializa los datos de busqueda
    this.iniciativas2.filterPredicate = (data, filter) => {
     const dataStr = data.codigoSVT + data.numeroIniciativa + data.categoria.descripcion +  data.titulo + data.jefeProyecto.nombres + data.estado.descripcion + data.fechaInicio  + data.fechaFin + data.prioridad.descripcion;
     return dataStr.toUpperCase().indexOf(filter) != -1;       
   }
  }

  InicializaDatosBusqueda3(){
  // Inicializa los datos de busqueda
  this.iniciativas3.filterPredicate = (data, filter) => {
   const dataStr = data.codigoSVT + data.numeroIniciativa + data.categoria.descripcion +  data.titulo + data.jefeProyecto.nombres + data.estado.descripcion + data.fechaInicio  + data.fechaFin + data.prioridad.descripcion;
   return dataStr.toUpperCase().indexOf(filter) != -1;       
    }
  }

  InicializaDatosBusqueda4(){
  // Inicializa los datos de busqueda
  this.iniciativas4.filterPredicate = (data, filter) => {
   const dataStr = data.codigoSVT + data.numeroIniciativa + data.categoria.descripcion +  data.titulo + data.jefeProyecto.nombres + data.estado.descripcion + data.fechaInicio  + data.fechaFin + data.prioridad.descripcion;
   return dataStr.toUpperCase().indexOf(filter) != -1;       
    }
  }

  buscarDatos(filterValue: string) {
    this.iniciativas.filter = filterValue.trim().toUpperCase();
  }
  buscarDatos2(filterValue: string) {
    this.iniciativas2.filter = filterValue.trim().toUpperCase();
  }
  buscarDatos3(filterValue: string) {
    this.iniciativas3.filter = filterValue.trim().toUpperCase();
  }
  buscarDatos4(filterValue: string) {
    this.iniciativas4.filter = filterValue.trim().toUpperCase();
  }

  buscarDatosHelp(filterValue: string) {
    this.iniciativas.filter = filterValue.trim();
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

}