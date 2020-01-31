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
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { MultiDataSet, Label, monkeyPatchChartJsTooltip, monkeyPatchChartJsLegend } from 'ng2-charts';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit 
{


  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  public doughnutChartTypeB:string = 'bar'
  public doughnutChartLabels: Label[] = ['ToDo', 'DoIng', 'QA', 'Done'];
  public doughnutChartData: number[] = [80, 40, 90, 312];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutchartOpti: any = {
    pieceLabel: {
      render: function (args) {
      const label = args.label,
          value = args.value;
      return label + ': ' + value;
      }
    },
      legend: {
        display: true
      }
   }
  habilitar: boolean;
  selected: boolean;
  nuevo: boolean;
  edit: boolean;
  delete: boolean;
  tabla: any;
  mensajeAccion: string;  
  display: boolean = false;
  columnasTabla: string[] = ['numeroIniciativa', 'titulo','fechafin','estado'];
  title = "DahBoard - Confianza";
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
  constructor(private matDialog: MatDialog, private firebaseIniciativas: FirebaseIniciativaService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }  
  FiltraCanvas(filterValue: string) {
    this.iniciativas.filter = filterValue.trim().toLowerCase();
  }
 
  chartClicked(e:any) {
    
    if(e.active.length > 0){
      var points = [];
      var pointSelected = e.active[0]._chart.tooltip._model.caretY;
      //alert(pointSelected);
      if (pointSelected>96&&pointSelected<98){
        this.iniciativas.filter = "Terminado".trim().toLowerCase();
      }
      if (pointSelected>65&&pointSelected<67){
        this.iniciativas.filter = "Pendiente".trim().toLowerCase();
      }
      if (pointSelected>79&&pointSelected<81){
        this.iniciativas.filter = "Asignado".trim().toLowerCase();
      }
      if (pointSelected>99&&pointSelected<101){
        this.iniciativas.filter = "Suspendido".trim().toLowerCase();
      }
    } 
  }

  onCloseHandled()
  {
 
  }

  ngOnInit(){
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
      const dataStr = data.numeroIniciativa + data.categoria.descripcion +  data.titulo + data.jefeProyecto.nombres + data.estado.descripcion + data.fechaInicio  + data.fechaFin + data.prioridad.descripcion;
      return dataStr.toLowerCase().indexOf(filter) != -1;       
    }
  }

  buscarDatos(filterValue: string) {
    this.iniciativas.filter = filterValue.trim().toLowerCase();
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
  
  public chartHovered(e:any):void {
    console.log("hover",e);
    }

}
