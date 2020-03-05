import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { FirebaseIniciativaService } from '../../shared/services/firebase-iniciativa.service';
import { IniciativaFire } from '../../shared/models/iniciativa-fire';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ActividadDetalleFire } from 'src/app/shared/models/actividad-detalle-fire';
import { ActividadFire } from 'src/app/shared/models/actividad-fire';
import { IniciativaDetalleFire } from 'src/app/shared/models/iniciativa-detalle-fire';
import { DialogStatusreportComponent } from '../dialog-statusreport/dialog-statusreport.component';
import { StatusReportFire } from 'src/app/shared/models/status-report-fire';
import { FirebaseStatusreportService } from 'src/app/shared/services/firebase-statusreport.service';
import { StatusreportComponent } from 'src/app/statusreport/statusreport.component';
import { IniciativaMainFire } from 'src/app/shared/models/iniciativa-main-fire';
import { StatusReportDocFire } from 'src/app/shared/models/status-report-doc-fire';

@Component({
  selector: 'app-dialog-listado-statusreport',
  templateUrl: './dialog-listado-statusreport.component.html',
  styleUrls: ['./dialog-listado-statusreport.component.css']
})
export class DialogListadoStatusreportComponent implements OnInit {habilitar: boolean;
  selected: boolean;
  nuevo: boolean;
  edit: boolean;
  delete: boolean;
  tabla: any;
  mensajeAccion: string;
  display: boolean = false;
  columnasTabla: string[] = ['codigo', 'fecha','usuario','estado','accion'];
  //iniciativas: IniciativaFire[] = [];
  actividades= new MatTableDataSource<ActividadDetalleFire>([]);
  selectedRowIndex: number = -1;
  tipoDocumentoData = new MatTableDataSource<IniciativaFire>([]);
  tipoDocumentoDataBuscar = new MatTableDataSource<IniciativaFire>([]);
  statusReport = new MatTableDataSource<StatusReportFire>([]);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  public tipoDocumento: IniciativaFire[];
  public tipoDocumentoSeleccionado: IniciativaFire;
  idIniciativaF: string;
  actividadesDetFire: ActividadDetalleFire[] = [];

  loading: boolean;
  constructor(private matDialog: MatDialog, 
    public dialogRef: MatDialogRef<DialogListadoStatusreportComponent>,
    private firebaseIniciativas: FirebaseIniciativaService,
    private firebaseStatusReport: FirebaseStatusreportService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.idIniciativaF = data.idIniciativa;
    }


  openDialogEdit(codigo: number, idIniciativaFire: string, estado: string){
    let actividadDetalleFire = new ActividadDetalleFire();
    let iniciativaDetFire = new StatusReportFire();
    iniciativaDetFire.idIniciativa = idIniciativaFire;
    iniciativaDetFire.codigo = codigo;
    iniciativaDetFire.esnuevo = false;
    iniciativaDetFire.estado = estado; 
    const dialogRef = this.matDialog.open(DialogStatusreportComponent, /*dialogConfig,*/
      { width: '2000px',
        height: '500px',
        data: iniciativaDetFire
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      this.callIniciativa();
    }); 
  }

  openDialogNew(idIniciativaFire: string){
    let actividadDetalleFire = new ActividadDetalleFire();
    let iniciativaDetFire = new StatusReportFire ();
    iniciativaDetFire.idIniciativa = idIniciativaFire;
    iniciativaDetFire.codigo = 0
    iniciativaDetFire.esnuevo = true;
    iniciativaDetFire.estado = ""
    this.matDialog.open(DialogStatusreportComponent, /*dialogConfig,*/
      { width: '2000px',
        height: '500px',
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

  callIniciativa(){
    this.loading = true;
   let datos = [];
            let statusReportRef = this.firebaseStatusReport.getStatusReport(this.idIniciativaF);
            statusReportRef.forEach(data=> {

                data.forEach(element => {                 
                  let statusrpt = new StatusReportFire    
                  let statusReportFire = element.payload.doc.data() as StatusReportFire;            
                  statusReportFire.idStatusReport = element.payload.doc.id;                
                  statusrpt.codigo = statusReportFire.codigo  
                  statusrpt.fechaReg = statusReportFire.fechaReg;
                  statusrpt.usuarioReg = statusReportFire.usuarioReg;
                  statusrpt.estado =statusReportFire.estado;              
                  datos.push(statusrpt);                                       
                  
                });
                this.statusReport =  new MatTableDataSource(datos);
                this.statusReport.paginator = this.paginator;
                this.statusReport.sort = this.sort;    
                this.loading = false;
            });
  }


  InicializaDatosBusqueda(){
     // Inicializa los datos de busqueda
     this.statusReport.filterPredicate = (data, filter) => {
      const dataStr = data.codigo + data.usuarioReg + data.fechaReg + data.estado;
      return dataStr.toLowerCase().indexOf(filter) != -1;       
    }
  }

  buscarDatos(filterValue: string) {
    this.statusReport.filter = filterValue.trim().toLowerCase();
  }

  buscarDatosHelp(filterValue: string) {
    this.statusReport.filter = filterValue.trim();
  }

  highlight(row){
    this.selectedRowIndex = row.codigo;
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
  closeDialogNew(){
    this.dialogRef.close();
  }
 
}
