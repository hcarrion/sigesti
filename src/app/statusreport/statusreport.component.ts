import { Component, OnInit } from '@angular/core';
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
  idIniciativa: string;
  iniciativa: IniciativaMainFire = new IniciativaMainFire();
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
      placeholder: 'Enter text here...',
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
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      
      ['insertImage', 'insertVideo']
    ]
};

  constructor(private firebaseStatusReport: FirebaseStatusreportService,
    private route: ActivatedRoute,
    private firebaseIniciativas: FirebaseIniciativaMainService,
    public datePipe: DatePipe) {
    this.generateStatusReport = new FormGroup({
      actCompSemAnteAngularEditor: new FormControl(),
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
              data.forEach(element => {
                this.statusReportFire = element.payload.doc.data() as StatusReportFire;
                this.statusReportFire.idStatusReport = element.payload.doc.id;
              });
            });
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
    iniciativa.recursos.forEach(recurso => {
      if(undefined != recurso.horasReg && 0 != recurso.horasReg.length){
        recurso.horasReg.forEach(hora => {
          horasTotales = horasTotales + hora.horas;
        });
      }
    });
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
    this.generateStatusReport.controls.actCompSemAnteAngularEditor.setValue(this.statusReportFire.actSemanaAnterior);
    this.generateStatusReport.controls.actPlanSemProxAngularEditor.setValue(this.statusReportFire.actSemanaProxima);
    this.generateStatusReport.controls.temDeciRiesgosAngularEditor.setValue(this.statusReportFire.temasDecisionesRiesgos);
  }

  loadStatusReportNew(statusReport: StatusReportFire){
    this.statusReportFire = new StatusReportFire;
    var currentWeekNumber = require('current-week-number');
    let numberWeek = currentWeekNumber(new Date());
    let startDate = this.getDateOfISOWeek(numberWeek, 2020);
    let endDate = this.daysSum(startDate, 4);
    let fechasSpanObj = document.getElementById('fechasIniciativaSpan') as HTMLSpanElement;
    let startDateStr = this.datePipe.transform(startDate, 'dd/MM/yy');
    let endDateStr = this.datePipe.transform(endDate, 'dd/MM/yy');
    fechasSpanObj.textContent = 'Del '+startDateStr+' al '+endDateStr;
    debugger;
  }

  saveStatusReport(){
    this.loading = true;
    let statusReportFire = new StatusReportFire();
    /*let actSemanaAnterior = (document.getElementById("editor1")) as HTMLTextAreaElement;
    let actSemanaProxima = (document.getElementById("editor2")) as HTMLTextAreaElement;
    let temasDeciRiesgos = (document.getElementById("editor3")) as HTMLTextAreaElement;*/
    statusReportFire.actSemanaAnterior = this.generateStatusReport.value.actCompSemAnteAngularEditor;
    statusReportFire.actSemanaProxima = this.generateStatusReport.value.actPlanSemProxAngularEditor;
    statusReportFire.temasDecisionesRiesgos = this.generateStatusReport.value.temDeciRiesgosAngularEditor;
    statusReportFire.idIniciativa = this.idIniciativa;

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
    }else{
      this.firebaseStatusReport.createStatusReport(statusReportFire).then(
        result => {
          this.loading = false;
          Swal.fire('Guardado!', 'Se ha guardado correctamente.', 'success');
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
}
