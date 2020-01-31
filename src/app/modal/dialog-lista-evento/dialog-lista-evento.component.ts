import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DialogRecursosComponent } from '../../modal/dialog-recursos/dialog-recursos.component';
import { DialogRiesgosComponent } from '../../modal/dialog-riesgos/dialog-riesgos.component';
import { DialogSeguimientoComponent} from "../../modal/dialog-seguimiento/dialog-seguimiento.component";
import { FirebaseIniciativaService } from '../../shared/services/firebase-iniciativa.service';
import { IniciativaFire } from '../../shared/models/iniciativa-fire';
import { DialogRegistraSeguimientoComponent } from '../../modal/dialog-registra-seguimiento/dialog-registra-seguimiento.component';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { DialogRegistraEventoComponent } from '../dialog-registra-evento/dialog-registra-evento.component';
import { DialogRegistraRecursoEventoComponent } from '../dialog-registra-recurso-evento/dialog-registra-recurso-evento.component';
import { ActividadDetalleFire } from 'src/app/shared/models/actividad-detalle-fire';
import { ActividadFire } from 'src/app/shared/models/actividad-fire';
import { IniciativaDetalleFire } from 'src/app/shared/models/iniciativa-detalle-fire';


@Component({
  selector: 'app-dialog-lista-evento',
  templateUrl: './dialog-lista-evento.component.html',
  styleUrls: ['./dialog-lista-evento.component.css']
})
export class DialogListaEventoComponent implements OnInit {habilitar: boolean;
  selected: boolean;
  nuevo: boolean;
  edit: boolean;
  delete: boolean;
  tabla: any;
  mensajeAccion: string;
  display: boolean = false;
  columnasTabla: string[] = ['codigo', 'tipo','titulo','fechaInicio','horaAsignada','estado','accion'];
  //iniciativas: IniciativaFire[] = [];
  actividades= new MatTableDataSource<ActividadDetalleFire>([]);
  selectedRowIndex: number = -1;
  tipoDocumentoData = new MatTableDataSource<IniciativaFire>([]);
  tipoDocumentoDataBuscar = new MatTableDataSource<IniciativaFire>([]);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  public tipoDocumento: IniciativaFire[];
  public tipoDocumentoSeleccionado: IniciativaFire;
  iniciativa: IniciativaFire = new IniciativaFire();
  actividadesDetFire: ActividadDetalleFire[] = [];

  loading: boolean;
  constructor(private matDialog: MatDialog, 
    private firebaseIniciativas: FirebaseIniciativaService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.iniciativa = data;
    }

  openDialogRecurso(iniciativaFire: IniciativaFire, actividadDetalleFire: ActividadDetalleFire) {
    let iniciativaDetFire = new IniciativaDetalleFire();
    iniciativaDetFire.iniciativa = iniciativaFire;
    iniciativaDetFire.actividadDetalle = actividadDetalleFire;
    this.matDialog.open(DialogRegistraRecursoEventoComponent, /*dialogConfig,*/
      { width: '1200px',
        height: '600px',
        data: iniciativaDetFire
      }
    );
  }

  openDialogEdit(iniciativaFire: IniciativaFire, actividadDetalleFire: ActividadDetalleFire){
    let iniciativaDetFire = new IniciativaDetalleFire();
    iniciativaDetFire.iniciativa = iniciativaFire;
    iniciativaDetFire.actividadDetalle = actividadDetalleFire;
    this.matDialog.open(DialogRegistraEventoComponent, /*dialogConfig,*/
      { width: '2000px',
        height: '600px',
        data: iniciativaDetFire
      }
    );
  }

  openDialogNew(iniciativaFire: IniciativaFire){
    let actividadDetalleFire = new ActividadDetalleFire();
    let iniciativaDetFire = new IniciativaDetalleFire();
    iniciativaDetFire.iniciativa = iniciativaFire;
    iniciativaDetFire.actividadDetalle = actividadDetalleFire;
    this.matDialog.open(DialogRegistraEventoComponent, /*dialogConfig,*/
      { width: '2000px',
        height: '600px',
        data: iniciativaDetFire
      }
    );
  }

  onCloseHandled()
  {
 
  }

  ngOnInit() {
    this.callIniciativa();
  }

  async callIniciativa() {
    this.loading = true;
    let iniciativaRef = this.firebaseIniciativas.getIniciativa(this.iniciativa);
    iniciativaRef.subscribe(data => {
      var lista = [];
        //lista.push(data[i].payload.doc.data() as IniciativaFire);
        debugger;
        let iniciativaObject= data.payload.data() as IniciativaFire;
        let idIniciativa = data.payload.id;
        iniciativaObject.idIniciativa = idIniciativa;
        this.iniciativa = iniciativaObject;
        if(undefined != this.iniciativa.actividad){
          lista = this.iniciativa.actividad.actividades;
          this.actividadesDetFire = this.iniciativa.actividad.actividades;
        }
      
      this.actividades =  new MatTableDataSource(lista);
      this.actividades.paginator = this.paginator;
      this.actividades.sort = this.sort;
      this.InicializaDatosBusqueda();
      this.loading = false;
     
      
    });
  }

  InicializaDatosBusqueda(){
     // Inicializa los datos de busqueda
     this.actividades.filterPredicate = (data, filter) => {
      const dataStr = data.codigo + data.tipo.descripcion + data.titulo + data.fechaInicio + data.horaAsignada + data.estado.descripcion;
      return dataStr.toLowerCase().indexOf(filter) != -1;       
    }
  }

  buscarDatos(filterValue: string) {
    this.actividades.filter = filterValue.trim().toLowerCase();
  }

  buscarDatosHelp(filterValue: string) {
    this.actividades.filter = filterValue.trim();
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

 
}
