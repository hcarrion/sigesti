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
  doughnutChartLabels: Label[] = ['ToDo', 'DoIng', 'QA', 'Done'];
  barChartPlugins = [pluginDataLabels];
  doughnutChartData: MultiDataSet = [
    [80, 40, 90, 312]
  ];
  doughnutChartType: ChartType = 'doughnut';
  
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
  title = "Example Angular 8 Material Dialog";
  //iniciativas: IniciativaFire[] = [];
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
  
  loading: boolean;
  constructor(private matDialog: MatDialog, private firebaseIniciativas: FirebaseIniciativaService) {} 

  FiltraCanvas(filterValue: string) {
    this.iniciativas.filter = filterValue.trim().toLowerCase();
    this.iniciativas2.filter = filterValue.trim().toLowerCase();
    this.iniciativas3.filter = filterValue.trim().toLowerCase();
    this.iniciativas4.filter = filterValue.trim().toLowerCase();
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
        
        if (label=="ToDo"){this.FiltraCanvas("Pendiente");this.estado=" - Por Hacer";};
        if (label=="DoIng"){this.FiltraCanvas("Asignado");this.estado=" - En Progreso";};
        if (label=="QA"){this.FiltraCanvas("Rechazado");this.estado=" - En Calidad";};
        if (label=="Done"){this.FiltraCanvas("Suspendido");this.estado=" - Concluido";};
        
        console.log(clickedElementIndex, label, value)
      }
     }
    }
  
  private chartHovered(e: any): void { 
    console.log(e);    
    }

  onCloseHandled()
  {
 
  }

  ngOnInit(){
    this.callIniciativas();    
    this.callIniciativas2();    
    this.callIniciativas3();    
    this.callIniciativas4();    	  
  } 

  openDialogActivity(iniciativa: IniciativaFire){
    this.matDialog.open(DialogListaEventoComponent, /*dialogConfig,*/
      { width: '2000px', height: '600px', data: iniciativa}
    );
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

  async callIniciativas2() {
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
      this.iniciativas2 =  new MatTableDataSource(lista);
      this.iniciativas2.paginator = this.paginator;
      this.iniciativas2.sort = this.sort;
      this.InicializaDatosBusqueda2();
      this.loading = false;
     
      
    });
  }

  async callIniciativas3() {
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
      this.iniciativas3 =  new MatTableDataSource(lista);
      this.iniciativas3.paginator = this.paginator;
      this.iniciativas3.sort = this.sort;
      this.InicializaDatosBusqueda3();
      this.loading = false;
     
      
    });
  }

  async callIniciativas4() {
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
      return dataStr.toLowerCase().indexOf(filter) != -1;       
    }
  }

  InicializaDatosBusqueda2(){
    // Inicializa los datos de busqueda
    this.iniciativas2.filterPredicate = (data, filter) => {
     const dataStr = data.codigoSVT + data.numeroIniciativa + data.categoria.descripcion +  data.titulo + data.jefeProyecto.nombres + data.estado.descripcion + data.fechaInicio  + data.fechaFin + data.prioridad.descripcion;
     return dataStr.toLowerCase().indexOf(filter) != -1;       
   }
  }

  InicializaDatosBusqueda3(){
  // Inicializa los datos de busqueda
  this.iniciativas3.filterPredicate = (data, filter) => {
   const dataStr = data.codigoSVT + data.numeroIniciativa + data.categoria.descripcion +  data.titulo + data.jefeProyecto.nombres + data.estado.descripcion + data.fechaInicio  + data.fechaFin + data.prioridad.descripcion;
   return dataStr.toLowerCase().indexOf(filter) != -1;       
    }
  }

  InicializaDatosBusqueda4(){
  // Inicializa los datos de busqueda
  this.iniciativas4.filterPredicate = (data, filter) => {
   const dataStr = data.codigoSVT + data.numeroIniciativa + data.categoria.descripcion +  data.titulo + data.jefeProyecto.nombres + data.estado.descripcion + data.fechaInicio  + data.fechaFin + data.prioridad.descripcion;
   return dataStr.toLowerCase().indexOf(filter) != -1;       
    }
  }

  buscarDatos(filterValue: string) {
    this.iniciativas.filter = filterValue.trim().toLowerCase();
  }
  buscarDatos2(filterValue: string) {
    this.iniciativas2.filter = filterValue.trim().toLowerCase();
  }
  buscarDatos3(filterValue: string) {
    this.iniciativas3.filter = filterValue.trim().toLowerCase();
  }
  buscarDatos4(filterValue: string) {
    this.iniciativas4.filter = filterValue.trim().toLowerCase();
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