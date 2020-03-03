import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DialogRecursosComponent } from '../modal/dialog-recursos/dialog-recursos.component';
import { DialogRiesgosComponent } from '../modal/dialog-riesgos/dialog-riesgos.component';
import { DialogSeguimientoComponent} from "../modal/dialog-seguimiento/dialog-seguimiento.component";
import { FirebaseIniciativaMainService } from '../shared/services/firebase-iniciativa-main.service';
import { IniciativaMainFire } from '../shared/models/iniciativa-main-fire';
import { DialogRegistraSeguimientoComponent } from '../modal/dialog-registra-seguimiento/dialog-registra-seguimiento.component';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Listadoatencionhelp } from '../shared/models/listadoatencionhelp';
import { DialogListaEventoComponent } from '../modal/dialog-lista-evento/dialog-lista-evento.component';
import { Router } from '@angular/router';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';
import { DialogListadoStatusreportComponent } from '../modal/dialog-listado-statusreport/dialog-listado-statusreport.component';

@Component({
  selector: 'app-listado-atencion',
  templateUrl: './listado-atencion.component.html',
  styleUrls: ['./listado-atencion.component.css']
})
export class ListadoAtencionComponent implements OnInit 
{
  habilitar: boolean;
  selected: boolean;
  nuevo: boolean;
  edit: boolean;
  delete: boolean;
  perfil: string;
  tabla: any;
  mensajeAccion: string;
  display: boolean = false;
  
  columnasTabla: string[] = [];
  title = "Example Angular 8 Material Dialog";
  //iniciativas: IniciativaFire[] = [];
  iniciativas= new MatTableDataSource<IniciativaMainFire>([]);
  selectedRowIndex: number = -1;
  public veraccion: boolean;
  tipoDocumentoData = new MatTableDataSource<IniciativaMainFire>([]);
  tipoDocumentoDataBuscar = new MatTableDataSource<IniciativaMainFire>([]);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  public tipoDocumento: IniciativaMainFire[];
  public tipoDocumentoSeleccionado: IniciativaMainFire;
  public TipoDocumenetHelp: Listadoatencionhelp[];
  public TipoDocumenetHelpSeleccionado: Listadoatencionhelp;
  loading: boolean;
  constructor(private matDialog: MatDialog, 
    private firebaseIniciativas: FirebaseIniciativaMainService,
    private router: Router) {}

  openDialogRecursos(idIniciativa: string) {
    this.matDialog.open(DialogRecursosComponent, /*dialogConfig,*/
      { width: '1200px',
        height: '570px',
        data: idIniciativa
      }
    );
  }


  openDialog2()
  {
    this.matDialog.open(DialogRiesgosComponent, /*dialogConfig,*/
      { width: '1200px',
        height: '600px'
      }
      );
  }
  openDialog3()
  {
    this.matDialog.open(DialogSeguimientoComponent, /*dialogConfig,*/
    
      { width: '1200px',
        height: '600px'
      }
      );
  }
  openDialogNew(){
    this.matDialog.open(DialogRegistraSeguimientoComponent, /*dialogConfig,*/
      { width: '2000px', height: '540px', data: '' }
    );
  }

  openDialogEdit(idIniciativa: string){
    this.matDialog.open(DialogRegistraSeguimientoComponent, /*dialogConfig,*/
      { width: '2000px', height: '540px', data: idIniciativa
      }
    );
  }

  openDialogActivity(idIniciativa: string){
    this.matDialog.open(DialogListaEventoComponent, /*dialogConfig,*/
      { width: '2000px',
        height: '530px',
        data: idIniciativa
      }
    );
  }

  onCloseHandled()
  {
 
  }

  ngOnInit() {
    this.veraccion = false;
    localStorage.setItem('indinicio',"false");   
    this.callIniciativas();
    this.perfil = localStorage.getItem("perfil");
    if (this.perfil!="COLABORADOR"){
      this.veraccion = true;
      this.columnasTabla = ['codigosvt', 'titulo','asignacion','fechainicio','fechafin','estado','accion'];
    }else{
      this.columnasTabla = ['codigosvt', 'titulo','asignacion','fechainicio','fechafin','estado'];
    }

  }

  async callIniciativas() {
    this.loading = true;
    
    let iniciativasRef = this.firebaseIniciativas.getIniciativas();
    iniciativasRef.subscribe(data => {
      var lista = [];
      for(var i = 0; i < data.length; i++){
        //lista.push(data[i].payload.doc.data() as IniciativaFire);
        let iniciativaObject= data[i].payload.doc.data() as IniciativaMainFire;
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

  buscarDatos(filterValue: string) {
    this.iniciativas.filter = filterValue.trim().toLowerCase();
  }

  buscarDatosHelp(filterValue: string) {
    this.iniciativas.filter = filterValue.trim();
  }

  highlight(row){
    this.selectedRowIndex = row.numeroIniciativa;
  }

  selectedDocumento(todo: IniciativaMainFire) {
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
  
  openStatusReport(idIniciativa: string){
    let datos: IniciativaMainFire;
    datos = new IniciativaMainFire;
    datos.idIniciativa = idIniciativa
    this.matDialog.open(DialogListadoStatusreportComponent, 
      { width: '800px',
        height: '500px',
        data: datos
      }
    );
  }
  
}
