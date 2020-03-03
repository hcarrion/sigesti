import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormGroup, FormControl } from '@angular/forms';
import { StatusReportFire } from '../shared/models/status-report-fire';
import { FirebaseStatusreportService } from '../shared/services/firebase-statusreport.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { FirebaseIniciativaMainService } from '../shared/services/firebase-iniciativa-main.service';
import { IniciativaMainFire } from '../shared/models/iniciativa-main-fire';
import { DatePipe } from '@angular/common';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from '../shared/util/date.adapter';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { EmailFireService } from '../shared/services/email-fire.service';

@Component({
  selector: 'app-statusreport',
  templateUrl: './statusreport.component.html',
  styleUrls: ['./statusreport.component.css'],
  providers: [{
    provide: DateAdapter, useClass: AppDateAdapter
    },
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }]
})
export class StatusreportComponent implements OnInit {
  htmlContent='';
  loading: boolean;
  generateStatusReport: FormGroup;
  statusReportFire: StatusReportFire;
  actSemanaAnteriorStr: string;
  idIniciativa: string;
  iniciativa: IniciativaMainFire = new IniciativaMainFire();
  @ViewChild('statusReportPdf', {static: false}) statusReportPdf: ElementRef;
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

  constructor(private firebaseStatusReport: FirebaseStatusreportService,
    private route: ActivatedRoute,
    private firebaseIniciativas: FirebaseIniciativaMainService,
    public datePipe: DatePipe,
    public emailService: EmailFireService) {
    this.generateStatusReport = new FormGroup({
      actPlanSemProxAngularEditor: new FormControl(),
      temDeciRiesgosAngularEditor: new FormControl(),
    });
  }

  ngOnInit() {
    this.loading = true;
    this.idIniciativa = this.route.snapshot.paramMap.get('id');
    this.callIniciativa(this.idIniciativa);
  }

  callIniciativa(idInic: String){
    let iniciativaRef = this.firebaseIniciativas.getIniciativa2(this.idIniciativa);
          iniciativaRef.forEach(data => {
            this.iniciativa = data.data() as IniciativaMainFire;
            let statusReportRef = this.firebaseStatusReport.getStatusReport(this.idIniciativa);
            statusReportRef.subscribe(data => {
              if(0 == data.length){
                this.loadData(this.iniciativa);
                this.loadStatusReportNew(this.statusReportFire);
                this.loading = false;
              }else{
                data.forEach(element => {
                  this.statusReportFire = element.payload.doc.data() as StatusReportFire;
                  this.statusReportFire.idStatusReport = element.payload.doc.id;
                  this.loadData(this.iniciativa);
                  if(undefined != this.statusReportFire){
                    if(undefined == this.statusReportFire.fechaCierre){
                      this.loadStatusReport(this.statusReportFire)
                    }else{
                      this.loadStatusReportNew(this.statusReportFire);
                    }
                  }else{
                    this.loadStatusReportNew(this.statusReportFire);
                  }
                  this.loading = false;
                });
              }
            });
          });
  }

  loadData(iniciativa: IniciativaMainFire){
    let tituloSpanObj = document.getElementById('tituloIniciativaSpan') as HTMLSpanElement;
    let avanceSpanObj = document.getElementById('avanceIniciativaSpan') as HTMLSpanElement;
    let fechaInicioSpanObj = document.getElementById('fechaInicioIniciativaSpan') as HTMLSpanElement;
    let fechaFinSpanObj = document.getElementById('fechaFinIniciativaSpan') as HTMLSpanElement;
    let fechaFinEstimadoSpanObj = document.getElementById('fechaFinEstimadoIniciativaSpan') as HTMLSpanElement;
    tituloSpanObj.textContent = iniciativa.titulo;
    let porcentaje: number = 0;
    let horasTotales: number = 0;
    let porcentajeStr: string;
    let fechaInicioStr: string;
    let fechaFinStr: string;
    if(undefined != iniciativa.recursos){
      iniciativa.recursos.forEach(recurso => {
        if(undefined != recurso.horasReg && 0 != recurso.horasReg.length){
          recurso.horasReg.forEach(hora => {
            horasTotales = horasTotales + hora.horas;
          });
        }
      });
    }
    porcentaje = (horasTotales * 100)/iniciativa.horaEstimada;
    porcentajeStr = porcentaje.toPrecision(3)+"%";
    fechaInicioStr = this.datePipe.transform(new Date(iniciativa.fechaInicio), 'dd/MM/yy');
    fechaFinStr = this.datePipe.transform(new Date(iniciativa.fechaFin), 'dd/MM/yy');
    avanceSpanObj.textContent = porcentajeStr;
    fechaInicioSpanObj.textContent = fechaInicioStr;
    fechaFinSpanObj.textContent = fechaFinStr;
    fechaFinEstimadoSpanObj.textContent = fechaFinStr;
  }

  loadStatusReport(statusReport: StatusReportFire){
    let fechasSpanObj = document.getElementById('fechasIniciativaSpan') as HTMLSpanElement;
    let startDateStr = this.datePipe.transform(statusReport.fechaInicioSemana, 'dd/MM/yy');
    let endDateStr = this.datePipe.transform(statusReport.fechaFinSemana, 'dd/MM/yy');
    fechasSpanObj.textContent = 'Del '+startDateStr+' al '+endDateStr;
   }

  loadStatusReportNew(statusReport: StatusReportFire){
    this.statusReportFire = new StatusReportFire;
    let anioDate = (new Date).getFullYear();
    var currentWeekNumber = require('current-week-number');
    let numberWeek = currentWeekNumber(new Date());
    let startDate = this.getDateOfISOWeek(numberWeek, anioDate);
    let endDate = this.daysSum(startDate, 4);
    let fechasSpanObj = document.getElementById('fechasIniciativaSpan') as HTMLSpanElement;
    let startDateStr = this.datePipe.transform(startDate, 'dd/MM/yy');
    let endDateStr = this.datePipe.transform(endDate, 'dd/MM/yy');
    fechasSpanObj.textContent = 'Del '+startDateStr+' al '+endDateStr;
    this.statusReportFire.fechaInicioSemana = startDate;
    this.statusReportFire.fechaFinSemana = endDate;
    this.statusReportFire.numeroSemana = numberWeek;
    this.statusReportFire.anio = anioDate;
  }

  saveStatusReport(statusReportF: StatusReportFire){
    this.loading = true;
    let statusReportFire = statusReportF;
    alert(statusReportFire.usuarioAct);
    if(undefined != this.statusReportFire.codigo){
      alert(statusReportFire.usuarioAct);
      statusReportFire.idIniciativa = this.idIniciativa;
      statusReportFire.estado = 'ABIERTO';
      statusReportFire.fechaReg = this.datePipe.transform(Date(), 'yyyy-MM-dd ');
      statusReportFire.usuarioAct = localStorage.getItem("usuario");
      statusReportFire.usuarioReg = localStorage.getItem("usuario");
     
      statusReportFire.codigo = this.statusReportFire.codigo;
      statusReportFire.idStatusReport = this.statusReportFire.idStatusReport;
      this.firebaseStatusReport.updateStatusReport(statusReportFire).then(
        result => {
          this.loading = false;
          Swal.fire('Guardado!', 'Se ha guardado correctamente.', 'success');
        },error => {
          this.loading = false;
          Swal.fire('Error!', 'Error al guardar el status report.', 'error');
        });
    }else{
      this.firebaseStatusReport.createStatusReport(statusReportFire).then(
        result => {
          this.loading = false;
          Swal.fire('Guardado!', 'Se ha creado correctamente.', 'success');
        },error => {
          this.loading = false;
          Swal.fire('Error!', 'Error al guardar el status report.', 'error');
        });
    }
  }

  getDateOfISOWeek(w, y) {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
  }
  
  daysSum(fechaI: Date, numDias: number){
    let fechaF = new Date();
    let fechaIni = new Date(fechaI);
    let contador: number = 0;
    while(contador != numDias){
      fechaF = new Date(fechaIni.setDate(fechaIni.getDate() + 1));
      if(!this.isFinDeSemana(fechaF)){
        contador = contador+1;
      }
    }
    return fechaF;
  }

  isFinDeSemana(fech: Date){
    let fecha = new Date(fech);
    if(fecha.getDay() !== 0 && fecha.getDay() !== 6){
      return false;
    }else{
      return true;
    }
  }

  generateAndDownloadPdf(){
    let generateDate = new Date();
    let generateDateStr = this.datePipe.transform(generateDate, 'ddMMyyyy');
      this.headingCss = {
        'height': '0px'
      };
      window.scroll(0,0);
      let data = document.getElementById('statusReportPdf') as HTMLElement;
      //let data = document.body as HTMLElement;
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
        pdf.save("HTML-Document.pdf");
        this.headingCss = {
          'height': '390px'
        };
      });

  }

  sendEmail(statusReportF: StatusReportFire){
    this.loading = true;
    let statusReportFire = statusReportF;
    statusReportFire.idIniciativa = this.idIniciativa;
    statusReportFire.estado = 'CERRADO';
    if(undefined != this.statusReportFire.codigo){
      statusReportFire.codigo = this.statusReportFire.codigo;
      statusReportFire.idStatusReport = this.statusReportFire.idStatusReport;
      this.firebaseStatusReport.updateStatusReport(statusReportFire).then(
        result => {
          this.loading = false;
          Swal.fire('Guardado!', 'Se ha guardado correctamente.', 'success');
        },error => {
          this.loading = false;
          Swal.fire('Error!', 'Error al guardar el status report.', 'error');
        });
    }
    this.emailService.sendEmailStatusReport(statusReportFire);
  }
}
