import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DialogRecursosComponent } from '../../modal/dialog-recursos/dialog-recursos.component';
import { DialogRiesgosComponent } from '../../modal/dialog-riesgos/dialog-riesgos.component';
import { DialogSeguimientoComponent} from "../../modal/dialog-seguimiento/dialog-seguimiento.component";
import { DialogRegistraSeguimientoComponent } from '../../modal/dialog-registra-seguimiento/dialog-registra-seguimiento.component';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { DialogRegistraEventoComponent } from '../dialog-registra-evento/dialog-registra-evento.component';
import { DialogRegistraRecursoEventoComponent } from '../dialog-registra-recurso-evento/dialog-registra-recurso-evento.component';
import { ActividadDetalleFire } from 'src/app/shared/models/actividad-detalle-fire';
import { ActividadFire } from 'src/app/shared/models/actividad-fire';
import { IniciativaDetalleFire } from 'src/app/shared/models/iniciativa-detalle-fire';
import { FirebaseIniciativaMainService } from 'src/app/shared/services/firebase-iniciativa-main.service';
import { FormGroup, FormControl } from '@angular/forms';
import { IniciativaMainFire } from 'src/app/shared/models/iniciativa-main-fire';


@Component({
  selector: 'app-dialog-lista-evento',
  templateUrl: './dialog-lista-evento.component.html',
  styleUrls: ['./dialog-lista-evento.component.css']
})
export class DialogListaEventoComponent implements OnInit {habilitar: boolean;
  regRecursos: FormGroup;
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
  tipoDocumentoData = new MatTableDataSource<IniciativaMainFire>([]);
  tipoDocumentoDataBuscar = new MatTableDataSource<IniciativaMainFire>([]);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  public tipoDocumento: IniciativaMainFire[];
  public tipoDocumentoSeleccionado: IniciativaMainFire;
  iniciativa: IniciativaMainFire = new IniciativaMainFire();
  idIniciativaF: string;
  actividadesDetFire: ActividadDetalleFire[] = [];

  loading: boolean;

  constructor(private matDialog: MatDialog, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firebaseIniciativas: FirebaseIniciativaMainService) {
      this.idIniciativaF = data;
      this.regRecursos = new FormGroup({
        tituloInputDialog: new FormControl(),
        nIniciativaInputDialog: new FormControl(),
        porAsignarLabel: new FormControl()
      })
  }

  openDialogRecurso(idIniciativaFire: string, actividadDetalleFire: ActividadDetalleFire) {
    let iniciativaDetFire = new IniciativaDetalleFire();
    iniciativaDetFire.idIniciativa = idIniciativaFire;
    iniciativaDetFire.actividadDetalle = actividadDetalleFire;
    this.matDialog.open(DialogRegistraRecursoEventoComponent, /*dialogConfig,*/
      { width: '1200px',
        height: '600px',
        data: iniciativaDetFire
      }
    );
  }

  openDialogEdit(idIniciativaFire: string, actividadDetalleFire: ActividadDetalleFire){
    let iniciativaDetFire = new IniciativaDetalleFire();
    iniciativaDetFire.idIniciativa = idIniciativaFire;
    iniciativaDetFire.actividadDetalle = actividadDetalleFire;
    this.matDialog.open(DialogRegistraEventoComponent, /*dialogConfig,*/
      { width: '2000px',
        height: '600px',
        data: iniciativaDetFire
      }
    );
  }

  openDialogNew(idIniciativaFire: string){
    let actividadDetalleFire = new ActividadDetalleFire();
    let iniciativaDetFire = new IniciativaDetalleFire();
    iniciativaDetFire.idIniciativa = idIniciativaFire;
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
    let iniciativaRef = this.firebaseIniciativas.getIniciativa3(this.idIniciativaF);
    iniciativaRef.subscribe(data => {
      var lista = [];
        //lista.push(data[i].payload.doc.data() as IniciativaFire);
        let iniciativaObject= data.payload.data() as IniciativaMainFire;
        let idIniciativa = data.payload.id;
        iniciativaObject.idIniciativa = idIniciativa;
        this.iniciativa = iniciativaObject;
        if(undefined != this.iniciativa.actividad){
          this.iniciativa.actividad.forEach(ele=>{

          });
         // this.actividadesDetFire = this.iniciativa;
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

 
}
