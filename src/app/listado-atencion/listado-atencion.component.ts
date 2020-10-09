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
import { DATABASE_URL } from '@angular/fire';
import { convertMetaToOutput } from '@angular/compiler/src/render3/util';
import { IncidenciasListaFire } from '../shared/models/incidencias-lista-fire';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-listado-atencion',
  templateUrl: './listado-atencion.component.html',
  styleUrls: ['./listado-atencion.component.css']
})
export class ListadoAtencionComponent implements OnInit 
{
  habilitar: boolean;
  usuario: string;
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
  //iniciativas= new MatTableDataSource<IniciativaMainFire>([]);
  iniciativas=new MatTableDataSource<IncidenciasListaFire>([]);
  //listainiciativas = new MatTableDataSource<IncidenciasListaFire>([]);
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
    localStorage.setItem("eventoiniciativa","true");
    this.matDialog.open(DialogRegistraSeguimientoComponent, /*dialogConfig,*/
      { width: '2000px', height: '580px', data: '' }
    );
  }

  openDialogEdit(idIniciativa: string){
    localStorage.setItem("eventoiniciativa","true");
    this.matDialog.open(DialogRegistraSeguimientoComponent, /*dialogConfig,*/
      { width: '2000px', height: '580px', data: idIniciativa
      }
    );
  }

  openDialogActivity(idIniciativa: string){
    this.matDialog.open(DialogListaEventoComponent, /*dialogConfig,*/
      { width: '2000px',height: '530px', data: idIniciativa
      }
    );
  }

  onCloseHandled()
  {
 
  }

  ngOnInit() {
    localStorage.setItem('indinicio', "false");
    this.veraccion = false;
    this.usuario = localStorage.getItem("usuario"); 
    localStorage.setItem('indinicio',"false");   
    this.callIniciativas();
    this.perfil = localStorage.getItem("perfil");
    if (this.perfil=="USUARIO"){                      
        this.columnasTabla = ['codigoSVT', 'titulo','categoria','asignacion','fechainicio','fechafin','estado','accionini'];  
    }else{
        this.veraccion = true;
        this.columnasTabla = ['codigoSVT', 'titulo','categoria','asignacion','fechainicio','fechafin','estado','accion'];
    }
  }

  async callIniciativas() {
    this.loading = true;
    let iniciativasRef: any;

    if (localStorage.getItem("perfil")=="ADMINISTRADOR") {
        iniciativasRef = this.firebaseIniciativas.getIniciativas();        
    }else{      
        iniciativasRef = this.firebaseIniciativas.getIniciativaMultiple("categoria.descripcion;","PROYECTO,MANTENIMIENTO,INCIDENCIA,SOPORTE;","codigoSVT","asc");          
    }

conecta:
    iniciativasRef.subscribe(data => {
      var lista = [];
      data.forEach(element=>{
        let iniciativa = element.payload.doc.data() as IniciativaMainFire;
          let iniciativaObject = new  IncidenciasListaFire;
          if (undefined!=iniciativa.categoria){
            iniciativaObject.categoria = iniciativa.categoria.descripcion;  
          }else{
            conecta: 
            iniciativaObject.categoria = "";
          }
          if (undefined!=iniciativa.jefeProyecto){
            iniciativaObject.lider = iniciativa.jefeProyecto.nombres;  
          }else{
            iniciativaObject.lider = "";
          }
          if (undefined!=iniciativa.estado){
            iniciativaObject.estado = iniciativa.estado.descripcion;  
          }else{
            iniciativaObject.estado = "";
          }
          iniciativaObject.fechaInicio = iniciativa.fechaInicio;
          iniciativaObject.fechaFin = iniciativa.fechaFin;
          iniciativaObject.idIniciativa = element.payload.doc.id;
          iniciativaObject.codigoSVT = iniciativa.codigoSVT;
          iniciativaObject.titulo = iniciativa.titulo;
          if(iniciativaObject.codigoSVT>0) 
          lista.push(iniciativaObject);  
        });
        
        this.iniciativas =  new MatTableDataSource(lista);
        this.iniciativas.paginator = this.paginator;
        this.iniciativas.sort = this.sort;
        this.InicializaDatosBusqueda();
        this.loading = false;
        if (localStorage.getItem("perfil")!="ADMINISTRADOR" ) {        
          this.buscarDatos(this.usuario);
        } 
    });
  }

  InicializaDatosBusqueda(){
     // Inicializa los datos de busqueda
     this.iniciativas.filterPredicate = (data, filter) => {
      const dataStr = data.codigoSVT  + data.titulo + data.lider + data.estado + data.fechaInicio  + data.fechaFin + data.categoria;
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
    this.selectedRowIndex = row.idIniciativa;
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
    //this.tipoDocumentoSeleccionado.idIniciativa = this.TipoDocumenetHelpSeleccionado.idIniciativa;
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
