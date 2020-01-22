import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DialogRecursosComponent } from '../modal/dialog-recursos/dialog-recursos.component';
import { DialogRiesgosComponent } from '../modal/dialog-riesgos/dialog-riesgos.component';
import { DialogSeguimientoComponent} from "../modal/dialog-seguimiento/dialog-seguimiento.component";
import { FirebaseIniciativaService } from '../shared/services/firebase-iniciativa.service';
import { IniciativaFire } from '../shared/models/iniciativa-fire';
import { DialogRegistraSeguimientoComponent } from '../modal/dialog-registra-seguimiento/dialog-registra-seguimiento.component';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Listadoatencionhelp } from '../shared/models/listadoatencionhelp';

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
  tabla: any;
  mensajeAccion: string;
  display: boolean = false;
  columnasTabla: string[] = ['numeroIniciativa', 'titulo','nombres','fechainicio','fechafin','estado','accion'];
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
  constructor(private matDialog: MatDialog, private firebaseIniciativas: FirebaseIniciativaService) {

  }

  openDialog(iniciativa: IniciativaFire) {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(DialogRecursosComponent, /*dialogConfig,*/
      { width: '1200px',
        height: '600px',
        data: iniciativa
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
  openDialog4()
  {
    this.matDialog.open(DialogRegistraSeguimientoComponent, /*dialogConfig,*/
    
      { width: '2000px',
        height: '600px'
      }
      );
  }

  onCloseHandled()
  {
 
  }

  ngOnInit() {
    this.callIniciativas();
    this.tipoDocumentoData.sort = this.sort;

  }

  async callIniciativas() {
    //this.loading = true;
    let iniciativasRef = this.firebaseIniciativas.getIniciativas();
    iniciativasRef.subscribe(data => {
      var lista = [];
      //this.iniciativas = []
      /*data.forEach(iniciativaObj => {
        let iniciativaObject= iniciativaObj.payload.doc.data() as IniciativaFire;
        this.iniciativas.push(iniciativaObject);
      });*/
      for(var i = 0; i < data.length; i++){
        lista.push(data[i].payload.doc.data() as IniciativaFire);
      }
      console.log(lista);
      this.iniciativas =  new MatTableDataSource(lista);
      this.iniciativas.paginator = this.paginator;
      this.iniciativas.sort = this.sort;
      this.InicializaDatosBusqueda();
    });
  }

  InicializaDatosBusqueda(){
     // Inicializa los datos de busqueda
     this.iniciativas.filterPredicate = (data, filter) => {
      const dataStr = data.numeroIniciativa + data.titulo + data.jefeProyecto.nombres + data.estado.descripcion + data.fechaInicio  + data.fechaFin + data.prioridad.descripcion;
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

  
}
