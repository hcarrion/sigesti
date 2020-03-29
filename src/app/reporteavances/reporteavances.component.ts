import { Component, OnInit, ViewChild, Pipe, ElementRef } from '@angular/core';
import { IniciativaMainFire } from '../shared/models/iniciativa-main-fire';
import { ActividadFireMonitor } from '../shared/models/actividad-fire-monitor';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatCheckboxChange } from '@angular/material';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FirebaseIniciativaMainService } from '../shared/services/firebase-iniciativa-main.service';
import { IniciativaFire } from '../shared/models/iniciativa-fire';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { platformBrowser } from '@angular/platform-browser';
import { element } from 'protractor';
import { ColaboradorDetalleFire } from '../shared/models/colaborador-detalle-fire';
import * as xlsx from 'xlsx';
import { CdkStepperNext } from '@angular/cdk/stepper';

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
  campos: string;
  delete: boolean;
  tabla: any;
  muestrahoras: boolean=false;
  categoriaSel: string="";
  camposcat: string="";
  estadoSel: string="";
  camposest: string=""
  condicion: string;
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
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  
  public tipoDocumento: IniciativaMainFire[];
  public tipoDocumentoSeleccionado: IniciativaMainFire;
  public TipoActividad: string;
  public NivelAtencion: string;

  loading: boolean;
  
  tiporeporte = new FormControl();
  tipoiniciativa = new FormControl();
  codigosvt = new FormControl();
  tiporeportelista: string[] = ['PLANIFICACION','DESARROLLO','SUSPENDIDO','QA','SEGUIMIENTO POST','PRODUCCION','CERRADO','ANULADO'];
  tipoiniciativalista: string[] = ['PROYECTO', 'MANTENIMIENTO','SOPORTE','INCIDENCIA'];
  i: number;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Introducir texto aquí...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
    {
      name: 'quote',
      class: 'quote',
    },
    {
      name: 'redText',
      class: 'redText'
    },
    {
      name: 'titleText',
      class: 'titleText',
      tag: 'h1',
    },
  ],
  uploadUrl: 'assets/images',
  sanitize: false,
  outline: true,
  toolbarPosition: 'top',
  toolbarHiddenButtons: [
    ['insertImage', 'insertVideo']
  ]
};
headingCss = {
  'height': '390px'
};

  constructor(private matDialog: MatDialog,public datepipe: DatePipe,public datePipe: DatePipe, private firebaseIniciativas: FirebaseIniciativaMainService) {}

  ngOnInit() {
    localStorage.setItem('indinicio',"false");       
    this.nombreusuario = localStorage.getItem("usuario") + "-" + localStorage.getItem("nomusu");
    let latest_date =new Date();
    let f =this.datepipe.transform(latest_date, 'yyyy-MM-dd');
    this.ultimaDia = +this.ultimoDiaMes(f);
    this.generareportetotal("categoria.descripcion;","PROYECTO,MANTENIMIENTO,SOPORTE,INCIDENCIA;");
  } 

  ultimoDiaMes(fecha){    
    let arrayFecha = fecha.split('-');
    let fechaUltimo = new Date(arrayFecha[0], arrayFecha[1]);      
    fechaUltimo.setDate(fechaUltimo.getDate() - 1);    
    return fechaUltimo.getDate();
  } 

  generareportetotal(campo,condicion){
    let listaProy: ActividadFireMonitor[] = [];
    let detalleProy: ColaboradorDetalleFire[] =[];
    let ArrDatos: string[]
    let ContCampo: number=0;
    let cadena: string;
    let existe: boolean=false;
    this.loading = true;
    let orden: string="categoria.descripcion";
    let iniciativasRef = this.firebaseIniciativas.getIniciativaMultiple(campo,condicion,"codigoSVT","asc");   
    iniciativasRef.subscribe(data => {
      for(var i=0; i<=data.length-1; i++){
      //data.forEach(ele=>{
        let iniciativa = data[i].payload.doc.data() as IniciativaMainFire;
        if(undefined!=iniciativa.jefeProyecto){
          if (localStorage.getItem("perfil")!="ADMINISTRADOR"){
            if(iniciativa.jefeProyecto.codigoUsuario!=localStorage.getItem("usuario")){
               continue; 
            }
          }
        }


        let actividadFireMonitor = new ActividadFireMonitor();
        // poniendo la cabecera del los proyectos, tareas, soporte, etc...
        actividadFireMonitor.iniciativa = iniciativa;
        actividadFireMonitor.codigo = iniciativa.numeroIniciativa;
        actividadFireMonitor.estado = iniciativa.estado.descripcion;
        actividadFireMonitor.codigoSVT = iniciativa.codigoSVT;
        actividadFireMonitor.titulo = iniciativa.titulo;
        actividadFireMonitor.horas = iniciativa.horaReal;
        actividadFireMonitor.fechainicio = iniciativa.fechaInicio;
        actividadFireMonitor.fechafin = iniciativa.fechaFin;
        actividadFireMonitor.horastrabajadas = 0;
        actividadFireMonitor.avances = '0%'
        actividadFireMonitor.horasavance = '0/'+actividadFireMonitor.horas;
        actividadFireMonitor.tipo = iniciativa.categoria.descripcion;
        actividadFireMonitor.asignado = iniciativa.recursos;
        //Establecemos la suma de todos los datos segun los recursos
        if (undefined!=actividadFireMonitor.asignado){
          actividadFireMonitor.asignado.forEach(recursos=>{
              recursos.HorasTrabajadas =0; 
              recursos.sporcentaje = ''+recursos.porcentaje+'%';
              recursos.horasReg.forEach(hora=>{
                if (hora.horas>0){
                  recursos.HorasTrabajadas += hora.horas;
                  recursos.sporcentaje = ''+recursos.porcentaje+'%';
                  actividadFireMonitor.horastrabajadas += hora.horas;
                }
              })
          })
          actividadFireMonitor.avances=""+Math.round(actividadFireMonitor.horastrabajadas/actividadFireMonitor.horas*100)+'%';
          actividadFireMonitor.horasavance=""+actividadFireMonitor.horastrabajadas + '/'+actividadFireMonitor.horas;  
        } else{
          actividadFireMonitor.horastrabajadas = 0;  
        }
        listaProy.push(actividadFireMonitor);
      };              
      this.iniciativas =  new MatTableDataSource(listaProy);
      this.loading = false;
      this.loading = false;
    }); 
    
}

InicializaDatosBusqueda(objiniciativa){
    // Inicializa los datos de busqueda
    objiniciativa.filterPredicate = (data, filter) => {
     const dataStr = data.tipo + data.codigoSVT;
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
  this.iniciativas.filter = filterValue.trim().toLowerCase();
  if (this.iniciativas.filter.length>0) {
    return true;
  }else{
    return false;
  }
  
}


select1(plan){
  let valores = plan.value;
 
  if (valores==""){
    this.categoriaSel="";
    this.camposcat ="";
  }else{
    this.categoriaSel=plan.value+";";
    this.camposcat ="categoria.descripcion;";
  }

  this.condicion = this.categoriaSel + this.estadoSel;
  this.campos =  this.camposcat + this.camposest;

  this.generareportetotal(this.campos,this.condicion);
}

select2(plan){
  let valores = plan.value;

  if (valores==""){
    this.estadoSel ="";
    this.camposest ="";
  }else{
    this.estadoSel =plan.value+";";
    this.camposest ="estado.descripcion;";
  }

 

  this.condicion = this.categoriaSel + this.estadoSel;
  this.campos =  this.camposcat + this.camposest;
 
  this.generareportetotal(this.campos,this.condicion);
}

select3(event): void {
  if (event){
    this.muestrahoras = true;
  }else{
    this.muestrahoras = false;
  }
  
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

generateAndDownloadPdf(){
  this.editorConfig = {
        editable: true,
        spellcheck: true,
        height: 'auto',
        minHeight: '0',
        maxHeight: 'auto',
        width: 'auto',
        minWidth: '0',
        translate: 'yes',
        enableToolbar: true,
        showToolbar: false,
        placeholder: 'Introducir texto aquí...',
        defaultParagraphSeparator: '',
        defaultFontName: '',
        defaultFontSize: '',
        fonts: [
          {class: 'arial', name: 'Arial'},
          {class: 'times-new-roman', name: 'Times New Roman'},
          {class: 'calibri', name: 'Calibri'},
          {class: 'comic-sans-ms', name: 'Comic Sans MS'}
        ],
        customClasses: [
        {
          name: 'quote',
          class: 'quote',
        },
        {
          name: 'redText',
          class: 'redText'
        },
        {
          name: 'titleText',
          class: 'titleText',
          tag: 'h1',
        },
      ],
      uploadUrl: 'assets/images',
      sanitize: false,
      outline: true,
      toolbarPosition: 'top',
      toolbarHiddenButtons: [
        ['insertImage', 'insertVideo']
      ]
    };
  let generateDate = new Date();
  let generateDateStr = this.datePipe.transform(generateDate, 'ddMMyyyy');
    this.headingCss = {
      'height': '0px'
    };
    window.scroll(0,0);
    let data = document.getElementById('statusReportPdf') as HTMLElement;
    debugger;
    html2canvas(data, {
      allowTaint: true,
          useCORS: true,
          logging: false
    }).then(canvas => {
      let HTML_Width = canvas.width;
      let HTML_Height = canvas.height;
      let top_left_margin = 15;
      let PDF_Width = HTML_Width + (top_left_margin * 2);
      let PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
      let canvas_image_width = HTML_Width;
      let canvas_image_height = HTML_Height;
      let totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
      canvas.getContext('2d');
      let imgData = canvas.toDataURL("image/jpeg", 1.0);
      let pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
      pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
      for (let i = 1; i <= totalPDFPages; i++) {
        pdf.addPage([PDF_Width, PDF_Height], 'p');
        pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
      }
      pdf.save("ReporteAvances.pdf");
      this.headingCss = {
        'height': '390px'
      };
    });
}
exportToExcel() {
  const ws: xlsx.WorkSheet =   
  xlsx.utils.table_to_sheet(this.epltable.nativeElement);
  const wb: xlsx.WorkBook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
  xlsx.writeFile(wb, 'epltable.xlsx');
 }
}
