import { Component, OnInit } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorConfig } from '@kolkov/angular-editor'; 
import { FormGroup, FormControl } from '@angular/forms';
import { StatusReportFire } from '../shared/models/status-report-fire';
import { FirebaseStatusreportService } from '../shared/services/firebase-statusreport.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-statusreport',
  templateUrl: './statusreport.component.html',
  styleUrls: ['./statusreport.component.css']
})
export class StatusreportComponent implements OnInit {
  htmlContent='';
  generateStatusReport: FormGroup;
  statusReportFire: StatusReportFire;
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

  constructor(private firebaseStatusReport: FirebaseStatusreportService) {
    this.generateStatusReport = new FormGroup({
      actCompSemAnteAngularEditor: new FormControl(),
      actPlanSemProxAngularEditor: new FormControl(),
      temDeciRiesgosAngularEditor: new FormControl()
    });
  }

  ngOnInit() {
    localStorage.setItem('indinicio',"false");
    this.loadStatusReport();
  }

  loadStatusReport(){
    let statusReportRef = this.firebaseStatusReport.getStatusReport("40hsbW3oRCliJtKP0tkw");
    statusReportRef.subscribe(data => {
      data.forEach(element => {
        this.statusReportFire = element.payload.doc.data() as StatusReportFire;
        this.statusReportFire.idStatusReport = element.payload.doc.id;
        this.generateStatusReport.controls.actCompSemAnteAngularEditor.setValue(this.statusReportFire.actSemanaAnterior);
        this.generateStatusReport.controls.actPlanSemProxAngularEditor.setValue(this.statusReportFire.actSemanaProxima);
        this.generateStatusReport.controls.temDeciRiesgosAngularEditor.setValue(this.statusReportFire.temasDecisionesRiesgos);
      });
    });
  }

  saveStatusReport(){
    alert(this.editorConfig.editable.valueOf.toString  );
    let statusReportFire = new StatusReportFire();
    /*let actSemanaAnterior = (document.getElementById("editor1")) as HTMLTextAreaElement;
    let actSemanaProxima = (document.getElementById("editor2")) as HTMLTextAreaElement;
    let temasDeciRiesgos = (document.getElementById("editor3")) as HTMLTextAreaElement;*/
    statusReportFire.actSemanaAnterior = this.generateStatusReport.value.actCompSemAnteAngularEditor;
    statusReportFire.actSemanaProxima = this.generateStatusReport.value.actPlanSemProxAngularEditor;
    statusReportFire.temasDecisionesRiesgos = this.generateStatusReport.value.temDeciRiesgosAngularEditor;
    statusReportFire.idIniciativa = "40hsbW3oRCliJtKP0tkw";

    if(undefined != this.statusReportFire.codigo){
      statusReportFire.codigo = this.statusReportFire.codigo;
      statusReportFire.idStatusReport = this.statusReportFire.idStatusReport;
      this.firebaseStatusReport.updateStatusReport(statusReportFire).then(
        result => {
          Swal.fire('Guardado!', 'Se ha guardado correctamente.', 'success');
        },error => {
          Swal.fire('Error!', 'Error al guardar el status report.', 'error');
        });
    }else{
      this.firebaseStatusReport.createStatusReport(statusReportFire).then(
        result => {
          Swal.fire('Guardado!', 'Se ha guardado correctamente.', 'success');
        },error => {
          Swal.fire('Error!', 'Error al guardar el status report.', 'error');
        });
    }
  }
  saveHoras(){
    alert("sssssss");
  }
}
