import { Component, OnInit, ViewChild, Pipe } from '@angular/core';
import { IniciativaMainFire } from '../shared/models/iniciativa-main-fire';
import { ActividadFireMonitor } from '../shared/models/actividad-fire-monitor';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FirebaseIniciativaMainService } from '../shared/services/firebase-iniciativa-main.service';
import { IniciativaFire } from '../shared/models/iniciativa-fire';
@Pipe({
  name: 'ReporteavancesComponent'
})
@Component({
  selector: 'app-reporteavances',
  templateUrl: './reporteavances.component.html',
  styleUrls: ['./reporteavances.component.css']
})
export class ReporteavancesComponent implements OnInit { habilitar: boolean;
  selected: boolean;
  nuevo: boolean;
  edit: boolean;
  delete: boolean;
  tabla: any;
  nombreusuario: string;
  fecha: string=Date(); 
  hora: string=Date(); 
  mensajeAccion: string;
  display: boolean = false;
  mostrar1: string = 'false';
  mostrar2: string = 'false';  
  public ultimaDia: number;
  title = "Example Angular 8 Material Dialog";
  //iniciativas: IniciativaFire[] = [];
  iniciativas= new MatTableDataSource<ActividadFireMonitor>([]);

  iniciativasP= new MatTableDataSource<ActividadFireMonitor>([]);
  iniciativasM= new MatTableDataSource<ActividadFireMonitor>([]);
  iniciativasI= new MatTableDataSource<ActividadFireMonitor>([]);

  iniciativasemp = new MatTableDataSource<ActividadFireMonitor>([]);
  selectedRowIndex: number = -1;
  listaInic: ActividadFireMonitor[] = [];
  tipoDocumentoData = new MatTableDataSource<IniciativaMainFire>([]);
  tipoDocumentoDataBuscar = new MatTableDataSource<IniciativaMainFire>([]);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  public tipoDocumento: IniciativaMainFire[];
  public tipoDocumentoSeleccionado: IniciativaMainFire;
  public TipoActividad: string;
  public NivelAtencion: string;

  loading: boolean;
  
  tiporeporte = new FormControl();
  tipoiniciativa = new FormControl();
  codigosvt = new FormControl();
  tiporeportelista: string[] = ['POR HACER', 'EN PROGRESO','QA','CERRADO' ];
  tipoiniciativalista: string[] = ['PROYECTO', 'MANTENIMIENTO','SOPORTE','INCIDENCIA'];
  i: number;
  constructor(private matDialog: MatDialog,public datepipe: DatePipe, private firebaseIniciativas: FirebaseIniciativaMainService) {}

  ngOnInit() {
    localStorage.setItem('indinicio',"false");       
    this.nombreusuario = localStorage.getItem("usuario") + "-" + localStorage.getItem("nomusu");
    let latest_date =new Date();
    let f =this.datepipe.transform(latest_date, 'yyyy-MM-dd');
    this.ultimaDia = +this.ultimoDiaMes(f);

    this.callIniciativas("","");
  } 

  ultimoDiaMes(fecha){    
    let arrayFecha = fecha.split('-');
    let fechaUltimo = new Date(arrayFecha[0], arrayFecha[1]);      
    fechaUltimo.setDate(fechaUltimo.getDate() - 1);    
    return fechaUltimo.getDate();
  } 

  async callIniciativas(campo,condicion) {    
    this.ObtienexTipo();
  }

  ObtienexTipo(){
    this.loading = true;
    let iniciativasRef = this.firebaseIniciativas.getIniciativas();

    iniciativasRef.subscribe(data => {
      var lista = [];           
      for(var i = 0; i < data.length; i++){
        lista.push(data[i].payload.doc.data() as IniciativaMainFire);        
      }      
      this.listaInic = this.getIniciativas(lista);
      this.iniciativas =  new MatTableDataSource(this.listaInic);  
      let listaemp = this.getIniciativasEmp(lista);
      this.iniciativasemp =  new MatTableDataSource(listaemp);  
      this.InicializaDatosBusqueda(this.iniciativas);
      this.loading = false;      
    });
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
                  actividadFireMonitor.tipo = iniciativaFire.categoria.descripcion
                  actividadFireMonitor.codigoSVT = iniciativaFire.codigoSVT;

  
                  recurso.horasReg.forEach(horasrec =>{                   
                       total += horasrec.horas;                 
                  });                
                  actividadFireMonitor.total = total;                
                  actividadFireMonitor.porcentaje = ''+recurso.porcentaje+'%';
                  
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
  InicializaDatosBusqueda(objiniciativa){
    // Inicializa los datos de busqueda
    objiniciativa.filterPredicate = (data, filter) => {
     const dataStr = data.codigo + data.titulo;
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

buscarDatos(filterValue: string) {

  alert(filterValue);
  this.iniciativas.filter = filterValue.trim().toLowerCase();
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
            let total: number=0;
            let porc: number=0;            
            actividadFireMonitor.tipo = iniciativaFire.categoria.descripcion;
            actividadFireMonitor.codigoSVT = iniciativaFire.codigoSVT;
            actividadFireMonitor.titulo = iniciativaFire.titulo;
            actividadFireMonitor.fechainicio = ''+iniciativaFire.fechaInicio;
            actividadFireMonitor.fechafin = ''+iniciativaFire.fechaFin;

            iniciativaFire.recursos.forEach(recurso => {
                recurso.horasReg.forEach(horasrec =>{                     
                        total += horasrec.horas;                                    
                });
            });  
            actividadFireMonitor.avances =  ''  + Math.round( ( (total / iniciativaFire.horaReal) * 100 ))  + '%'         
            actividadFireMonitor.horasavance = '' + total + '/' + iniciativaFire.horaReal;
            actividadFireMonitor.total = total;
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


getFechWithFormat(fechaStr: string){
  let day = fechaStr.substring(0,2);
  let month = fechaStr.substring(3,5);
  let year = fechaStr.substring(6,9);
  let newFechStr = month+"/"+day+"/"+year;
  return newFechStr;
} 

}
