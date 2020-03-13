import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DialogRecursosComponent } from '../modal/dialog-recursos/dialog-recursos.component';
import { DialogRiesgosComponent } from '../modal/dialog-riesgos/dialog-riesgos.component';
import { DialogSeguimientoComponent} from "../modal/dialog-seguimiento/dialog-seguimiento.component";
import { FirebaseIniciativaMainService } from '../shared/services/firebase-iniciativa-main.service';
import { IniciativaFire } from '../shared/models/iniciativa-fire';
import { DialogRegistraSeguimientoComponent } from '../modal/dialog-registra-seguimiento/dialog-registra-seguimiento.component';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Listadoatencionhelp } from '../shared/models/listadoatencionhelp';
import { DialogListaEventoComponent } from '../modal/dialog-lista-evento/dialog-lista-evento.component';
import { DatePipe } from '@angular/common';
import { IniciativaMainFire } from '../shared/models/iniciativa-main-fire';
import { IniciativaHorasFire } from '../shared/models/iniciativa-horas-fire';
import { ActividadFireMonitor } from '../shared/models/actividad-fire-monitor';
import { stringify } from 'querystring';
import { RecurseVisitor } from '@angular/compiler/src/i18n/i18n_ast';
import { DialogMonitorRecursoComponent } from '../modal/dialog-monitor-recurso/dialog-monitor-recurso.component';
import { getMatScrollStrategyAlreadyAttachedError } from '@angular/cdk/overlay/typings/scroll/scroll-strategy';


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
  loadGroup: FormGroup;
  delete: boolean;
  tabla: any;
  mensajeAccion: string;
  display: boolean = false;
  mostrar1: string = 'false';
  mostrar2: string = 'false';
  columnasTabla: string[] =[];
  columnasTabla1: string[] = [];
  columnasFechTabla: string[] = []; 
  public ultimaDia: number;
  title = "Example Angular 8 Material Dialog";
  //iniciativas: IniciativaFire[] = [];
  iniciativas= new MatTableDataSource<ActividadFireMonitor>([]);
  iniciativasemp = new MatTableDataSource<ActividadFireMonitor>([]);
  selectedRowIndex: number = -1;
  listaInic: ActividadFireMonitor[] = [];
  tipoDocumentoData = new MatTableDataSource<IniciativaMainFire>([]);
  tipoDocumentoDataBuscar = new MatTableDataSource<IniciativaMainFire>([]);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  

  
  public tipoDocumento: IniciativaMainFire[];
  public tipoDocumentoSeleccionado: IniciativaMainFire;
  public TipoDocumenetHelp: Listadoatencionhelp[];
  public TipoDocumenetHelpSeleccionado: Listadoatencionhelp;
  public TipoActividad: string;
  public NivelAtencion: string;

  loading: boolean;
  
  
  tiporeporte = new FormControl();
  tipoiniciativa = new FormControl();
  codigosvt = new FormControl();

  tiporeportelista: string[] = ['INICIATIVA', 'PERSONAL'];
  tipoiniciativalista: string[] = ['PROYECTO', 'MANTENIMIENTO','SOPORTE','INCIDENCIA'];
  codigosvtlista: string[] = ['Alto', 'Medio','Bajo'];
  i: number;
  constructor(private matDialog: MatDialog,public datepipe: DatePipe, private firebaseIniciativas: FirebaseIniciativaMainService) {}

  ngOnInit() {
    localStorage.setItem('indinicio',"false");   
   

    let latest_date =new Date();
    let f =this.datepipe.transform(latest_date, 'yyyy-MM-dd');
    this.ultimaDia = +this.ultimoDiaMes(f);

    this.callIniciativas("","");
   
    switch (this.ultimaDia) {
      case 29:
        this.columnasTabla = ['codigo', 'titulo','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','Total'];
        this.columnasTabla1 = ['codigo', 'titulo','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','Total'];
        break;
      case 30:
        this.columnasTabla =['codigo', 'titulo','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','Total'];
        this.columnasTabla1 = ['codigo', 'titulo','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','Total'];
        break;
      default:
        this.columnasTabla =['codigo', 'titulo','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','Total'];
        this.columnasTabla1 = ['codigo', 'titulo','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','Total'];
        break;
    }
  } 

  ultimoDiaMes(fecha){    
    let arrayFecha = fecha.split('-');
    let fechaUltimo = new Date(arrayFecha[0], arrayFecha[1]);      
    fechaUltimo.setDate(fechaUltimo.getDate() - 1);    
    return fechaUltimo.getDate();
  } 

  async callIniciativas(campo,condicion) {
    this.loadGroup = new FormGroup({
      fechaFinActividadInput: new FormControl()
    });

    this.loading = true;
    
    let orden: string="codigoSVT";
    let iniciativasRef = this.firebaseIniciativas.getIniciativaMultiple(campo,condicion,orden,"desc");

    iniciativasRef.subscribe(data => {
      var lista = [];      
      for(var i = 0; i < data.length; i++){
        //lista.push(data[i].payload.doc.data() as IniciativaFire);
        let iniciativaObject= data[i].payload.doc.data() as IniciativaMainFire;
        let idIniciativa = data[i].payload.doc.id;
        iniciativaObject.idIniciativa = idIniciativa;
        lista.push(iniciativaObject);
      }
      
      this.listaInic = this.getIniciativas(lista);
      this.iniciativas =  new MatTableDataSource(this.listaInic);
      this.iniciativas.paginator = this.paginator;
      this.iniciativas.sort = this.sort;
     

      this.listaInic = this.getIniciativasEmp(lista);
      this.iniciativasemp =  new MatTableDataSource(this.listaInic);
      this.iniciativasemp.paginator = this.paginator;
      this.iniciativasemp.sort = this.sort;
    
    });
    this.InicializaDatosBusqueda();
    this.loading = false;
  }
  InicializaDatosBusqueda(){
    // Inicializa los datos de busqueda
    this.iniciativas.filterPredicate = (data, filter) => {
     const dataStr = data.codigo + data.titulo;
     return dataStr.toLowerCase().indexOf(filter) != -1;       
   }
   this.iniciativasemp.filterPredicate = (data, filter) => {
    const dataStr = data.codigousuario + data.titulo;
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
openDialogActivity(iniciativa: IniciativaFire){
  this.matDialog.open(DialogListaEventoComponent, /*dialogConfig,*/
    { width: '600px', height: '600px', data: iniciativa}
  );
}
openDialogEdit(iniciativa: IniciativaFire){
  this.matDialog.open(DialogRegistraSeguimientoComponent, /*dialogConfig,*/
    { width: '600px',
      height: '600px',
      data: iniciativa
    }
  );
}
buscarDatos(filterValue: string) {
  this.iniciativas.filter = filterValue.trim().toLowerCase();
}
buscarDatoemp(filterValue: string) {
  this.iniciativasemp.filter = filterValue.trim().toLowerCase();
}
select1(plan)
{
  this.TipoActividad=plan.value;
  this.callIniciativas("categoria.descripcion;",this.TipoActividad + ";");
}

select2(plan)
{
  this.NivelAtencion=plan.value;
  this.callIniciativas("prioridad.descripcion;",plan.value+";");
  alert(plan.value);
}

select(plan)
{
  this.mostrar1= "false";
  this.mostrar2= "false";
    if(plan.value.indexOf("PERSONAL")>-1){
      this.mostrar2= "true";
    } 
    if (plan.value.indexOf("INICIATIVA")>-1  ){
      this.mostrar1= "true";
    }
}


getIniciativas(lista: IniciativaMainFire[]){
  let listaProy: ActividadFireMonitor[] = [];
  lista.forEach(iniciativaFire => {
        let actividadFireMonitor = new ActividadFireMonitor();
        if(undefined != iniciativaFire.recursos && 0 != iniciativaFire.recursos.length){
         
            actividadFireMonitor.iniciativa = iniciativaFire;
            let dias: number[] = [];
            let total: number=0;
            for(var i = 1; i <= this.ultimaDia; i++){
              dias[i]=0;
            }
            actividadFireMonitor.codigo = iniciativaFire.codigoSVT;
            actividadFireMonitor.titulo = iniciativaFire.titulo;
           
            iniciativaFire.recursos.forEach(recurso => {
                recurso.horasReg.forEach(horasrec =>{
                     if (this.datepipe.transform(Date(), 'MM') == this.datepipe.transform(horasrec.fecha, 'MM')){                    
                        let aNumber: number = +(this.datepipe.transform(horasrec.fecha, 'dd'));
                        dias[aNumber] += horasrec.horas; 
                        total += horasrec.horas;
                    }                 
                });
            });                    
            actividadFireMonitor.dias = dias;
            actividadFireMonitor.total = total;
            actividadFireMonitor.totalhoras = '' + total + '/' + iniciativaFire.horaReal;
            listaProy.push(actividadFireMonitor);
        }
  });
  return listaProy;
}

pad(num:number, size:number): string {
  let s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}

getIniciativasEmp(lista: IniciativaMainFire[]){
  let listaProy1: ActividadFireMonitor[] = [];
  let empleado: string ="";
  var arrempresa = new Array();
  let indice: number = 0;
  lista.forEach(iniciativaFire => {
        if(undefined != iniciativaFire.recursos && 0 != iniciativaFire.recursos.length){            
            iniciativaFire.recursos.forEach(recurso => {
                let actividadFireMonitor = new ActividadFireMonitor();
                actividadFireMonitor.iniciativa = iniciativaFire;
                let dias: number[] = [];
                let total: number=0;
                for(var i = 1; i <= this.ultimaDia; i++){
                  dias[i]=0;
                }
                actividadFireMonitor.codigousuario = recurso.codigoUsuario;
                actividadFireMonitor.titulo = recurso.nombres;

                recurso.horasReg.forEach(horasrec =>{
                  if (this.datepipe.transform(Date(), 'MM') == this.datepipe.transform(horasrec.fecha, 'MM')){
                     let aNumber: number = +(this.datepipe.transform(horasrec.fecha, 'dd'));
                     dias[aNumber] += horasrec.horas; 
                     total += horasrec.horas;                 
                  }
                });
                actividadFireMonitor.dias = dias;
                actividadFireMonitor.total = total;                

                let existe: boolean = false;
                for (i=1; i<= listaProy1.length; i++){
                      if (arrempresa[i]==actividadFireMonitor.codigousuario){
                         indice = i;
                         existe =true; 
                         break;
                      }
                }
                if (!existe){                                  
                  listaProy1.push(actividadFireMonitor);
                  arrempresa[listaProy1.length] = actividadFireMonitor.codigousuario;                
                }else{
                  listaProy1.forEach(empl=>{
                    if (empl.codigousuario == actividadFireMonitor.codigousuario){
                      for(i=1; i<=empl.dias.length-1; i++){
                        empl.dias[i] += actividadFireMonitor.dias[i];
                        empl.total += actividadFireMonitor.dias[i];
                      }
                    }
                  })
                }
            });

        }
  });
  return listaProy1;
}

getFechWithFormat(fechaStr: string){
  let day = fechaStr.substring(0,2);
  let month = fechaStr.substring(3,5);
  let year = fechaStr.substring(6,9);
  let newFechStr = month+"/"+day+"/"+year;
  return newFechStr;
} 

openDialogRecursos(codigo: number, dia: number,usuario: string, tipo: string){
  let datos: ActividadFireMonitor;
  datos = new ActividadFireMonitor;
  datos.tipo = tipo;
  datos.codigousuario = usuario;
  datos.codigo = codigo;
  datos.dia = dia;
  this.matDialog.open(DialogMonitorRecursoComponent, 
    { width: '600px',
      height: '530px',
      data: datos
    }
  );
}

}
