import { Component, OnInit, NgZone, ViewChild, ViewEncapsulation, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { take } from 'rxjs/operators';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { ParametroFire } from '../../shared/models/parametro-fire';
import { FirebaseParametroService } from '../../shared/services/firebase-parametro.service';
import { ParametroDetalleFire } from '../../shared/models/parametro-detalle-fire';
import { FirebaseColaboradorService } from '../../shared/services/firebase-colaborador.service';
import { ColaboradorFire } from '../../shared/models/colaborador-fire';
import { ColaboradorDetalleFire } from '../../shared/models/colaborador-detalle-fire';
import { IniciativaFire } from '../../shared/models/iniciativa-fire';
import { FirebaseIniciativaService } from '../../shared/services/firebase-iniciativa.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import {MAT_DATE_LOCALE} from '@angular/material';

@Component({
  selector: 'app-dialog-registra-evento',
  templateUrl: './dialog-registra-evento.component.html',
  styleUrls: ['./dialog-registra-evento.component.css']
})
export class DialogRegistraEventoComponent implements OnInit {

  regEvento: FormGroup;
  submitted = false;
  estado: ParametroFire = new ParametroFire();
  tipo: ParametroFire = new ParametroFire();
  clasificacion: ParametroFire = new ParametroFire();
  categoria: ParametroFire = new ParametroFire();
  prioridad: ParametroFire = new ParametroFire();
  area: ParametroFire = new ParametroFire();
  colaboradores: ColaboradorFire = new ColaboradorFire();
  iniciativas: IniciativaFire = new IniciativaFire();

  panelColor = new FormControl('1');
  constructor(public dialogRef: MatDialogRef<DialogRegistraEventoComponent>, private _ngZone: NgZone, private firestoreService: FirestoreService, 
    private formBuilder: FormBuilder, 
    private firebaseParametros: FirebaseParametroService, 
    private firebaseColaboradores: FirebaseColaboradorService, 
    private firebaseIniciativas: FirebaseIniciativaService) {
    this.regEvento = new FormGroup({
      estadoSelect: new FormControl(),
      tipoSelect: new FormControl(),
      clasificacionSelect: new FormControl(),
      categoriaSelect: new FormControl(),
      prioridadSelect: new FormControl(),
      areaSelect: new FormControl(),
      jefeProyectoSelect: new FormControl(),
      numIniciativaInput: new FormControl(),
      tituloInput: new FormControl(),
      sumillaInput: new FormControl(),
      usuarioProcesosSelect: new FormControl(),
      objPrincipalTextArea: new FormControl(),
      objSecundarioTextArea: new FormControl(),
      fechaInicioInput: new FormControl(),
      horaEstimadaInput: new FormControl(),
      fechaFinInput: new FormControl()
    });
  }
  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit() {
    this.callParametros();
  }

  async callParametros() {
    let parametrosRef = this.firebaseParametros.getParametros();
    let colaboradoresRef = this.firebaseColaboradores.getColaboradores();

      parametrosRef.subscribe(data => {data.forEach(paramObj => {
          let paramObject= paramObj.payload.doc.data() as ParametroFire;
          if("estado" == paramObject.nombre) this.estado = paramObject;
          if("tipo" == paramObject.nombre) this.tipo = paramObject;
          if("clasificacion" == paramObject.nombre) this.clasificacion = paramObject;
          if("categoria" == paramObject.nombre) this.categoria = paramObject;
          if("prioridad" == paramObject.nombre) this.prioridad = paramObject;
          if("area" == paramObject.nombre) this.area = paramObject;
        });
      });

      colaboradoresRef.subscribe(data => {data.forEach(colabObj => {
        let colabObject= colabObj.payload.doc.data() as ColaboradorFire;
        this.colaboradores = colabObject;
      });
    });
  }

  saveParametro() {
    let paramObject = new ParametroFire();
    paramObject.nombre = "prioridad";
    let paramDetObjectList: Array<ParametroDetalleFire> = [];
    let paramDetObject = new ParametroDetalleFire();
    paramDetObject.codigo = 1;
    paramDetObject.descripcion = 'Alto';
    paramDetObjectList.push(paramDetObject);
    let paramDetObject2 = new ParametroDetalleFire();
    paramDetObject2.codigo = 2;
    paramDetObject2.descripcion = 'Medio';
    paramDetObjectList.push(paramDetObject2);
    let paramDetObject3 = new ParametroDetalleFire();
    paramDetObject3.codigo = 3;
    paramDetObject3.descripcion = 'Bajo';
    paramDetObjectList.push(paramDetObject3);
    
    paramObject.detalle = paramDetObjectList;
    this.firebaseParametros.createParameter(paramObject);
  }

  validarField(fieldValue) {
    let result;
    if(undefined == fieldValue || null == fieldValue || 0 == fieldValue.toString().length){
      result = true;
    }
    return result;
  }

  validarField2(fieldValue) {
    let result;
    if(undefined == fieldValue || null == fieldValue || 0 == fieldValue.toString().length || '1' == fieldValue){
      result = true;
    }
    return result;
  }

  resetFields() {
    this.submitted = false;
    this.regEvento.reset();
  }

  saveColaborador() {
    let colabObject = new ColaboradorFire();
    let colabDetObjectList: Array<ColaboradorDetalleFire> = [];
    
    let colabDetObject1 = new ColaboradorDetalleFire(); colabDetObject1.codigo = 1;colabDetObject1.codigoUsuario = 'TCPEG001';					colabDetObject1.nombres = 'Perez Guerrero, Cesar Daniel';						colabDetObject1.cargo = 'Analista de Sistemas';colabDetObject1.isJefe = false;colabDetObjectList.push(colabDetObject1);
    let colabDetObject2 = new ColaboradorDetalleFire(); colabDetObject2.codigo = 2;colabDetObject2.codigoUsuario = 'THALG001';					colabDetObject2.nombres = 'Alvarado García, Hernán';						colabDetObject2.cargo = 'Jefe de Linea';colabDetObject2.isJefe = true;colabDetObjectList.push(colabDetObject2);
    let colabDetObject3 = new ColaboradorDetalleFire(); colabDetObject3.codigo = 3;colabDetObject3.codigoUsuario = 'THSOH002';					colabDetObject3.nombres = 'Solis Huamani, Henry';						colabDetObject3.cargo = 'Analista de Sistemas';colabDetObject3.isJefe = false;colabDetObjectList.push(colabDetObject3);
    let colabDetObject4 = new ColaboradorDetalleFire(); colabDetObject4.codigo = 4;colabDetObject4.codigoUsuario = 'TRCAM002';					colabDetObject4.nombres = 'Casa Machuca, Rosa Pamela';						colabDetObject4.cargo = 'Analista de Sistemas';colabDetObject4.isJefe = false;colabDetObjectList.push(colabDetObject4);
    let colabDetObject5 = new ColaboradorDetalleFire(); colabDetObject5.codigo = 5;colabDetObject5.codigoUsuario = 'TJCOQ001';					colabDetObject5.nombres = 'Condori Quispe, Jonathan';						colabDetObject5.cargo = 'Analista de Sistemas';colabDetObject5.isJefe = false;colabDetObjectList.push(colabDetObject5);
    let colabDetObject6 = new ColaboradorDetalleFire(); colabDetObject6.codigo = 6;colabDetObject6.codigoUsuario = 'TBCHS001';					colabDetObject6.nombres = 'Chiclla Saenz, Beatriz Lorenza';						colabDetObject6.cargo = 'Analista de Sistemas';colabDetObject6.isJefe = false;colabDetObjectList.push(colabDetObject6);
    let colabDetObject7 = new ColaboradorDetalleFire(); colabDetObject7.codigo = 7;colabDetObject7.codigoUsuario = 'TPEUD001';					colabDetObject7.nombres = 'Eulogio De La Cruz, Pablo César';						colabDetObject7.cargo = 'Analista de Sistemas';colabDetObject7.isJefe = false;colabDetObjectList.push(colabDetObject7);
    let colabDetObject8 = new ColaboradorDetalleFire(); colabDetObject8.codigo = 8;colabDetObject8.codigoUsuario = 'TEROL001';					colabDetObject8.nombres = 'Rodriguez Lara, Ernesto Joseph';						colabDetObject8.cargo = 'Analista de Sistemas';colabDetObject8.isJefe = false;colabDetObjectList.push(colabDetObject8);
    let colabDetObject9 = new ColaboradorDetalleFire(); colabDetObject9.codigo = 9;colabDetObject9.codigoUsuario = 'TJSAJ001';					colabDetObject9.nombres = 'Salazar Jacobe, Juan';						colabDetObject9.cargo = 'Especialista de Sistemas';colabDetObject9.isJefe = false;colabDetObjectList.push(colabDetObject9);
    let colabDetObject10 = new ColaboradorDetalleFire(); colabDetObject10.codigo = 10;colabDetObject10.codigoUsuario = 'TEPAA001';					colabDetObject10.nombres = 'Paredes Arteaga, Edwin Manuel';						colabDetObject10.cargo = 'Analista de Sistemas';colabDetObject10.isJefe = false;colabDetObjectList.push(colabDetObject10);
    let colabDetObject11 = new ColaboradorDetalleFire(); colabDetObject11.codigo = 11;colabDetObject11.codigoUsuario = 'TREGG001';					colabDetObject11.nombres = 'Reinaldo Egoavil Guzman';						colabDetObject11.cargo = 'Analista de Sistemas';colabDetObject11.isJefe = false;colabDetObjectList.push(colabDetObject11);
    let colabDetObject12 = new ColaboradorDetalleFire(); colabDetObject12.codigo = 12;colabDetObject12.codigoUsuario = 'TLDEV001';					colabDetObject12.nombres = 'Luis Fernando De La Flor Vargas';						colabDetObject12.cargo = 'Especialista de Sistemas';colabDetObject12.isJefe = false;colabDetObjectList.push(colabDetObject12);
    let colabDetObject13 = new ColaboradorDetalleFire(); colabDetObject13.codigo = 13;colabDetObject13.codigoUsuario = 'TGSAA001';					colabDetObject13.nombres = 'Gary David Sandoval Arangurí';						colabDetObject13.cargo = 'Analista de Sistemas';colabDetObject13.isJefe = false;colabDetObjectList.push(colabDetObject13);
    let colabDetObject14 = new ColaboradorDetalleFire(); colabDetObject14.codigo = 14;colabDetObject14.codigoUsuario = 'TACOT001';					colabDetObject14.nombres = 'Alfredo Condori Tipula';						colabDetObject14.cargo = 'Analista de Sistemas';colabDetObject14.isJefe = false;colabDetObjectList.push(colabDetObject14);
    let colabDetObject15 = new ColaboradorDetalleFire(); colabDetObject15.codigo = 15;colabDetObject15.codigoUsuario = 'TRLAG001';					colabDetObject15.nombres = 'Ricardo Lazo Gómez';						colabDetObject15.cargo = 'Analista de Sistemas';colabDetObject15.isJefe = false;colabDetObjectList.push(colabDetObject15);
    let colabDetObject16 = new ColaboradorDetalleFire(); colabDetObject16.codigo = 16;colabDetObject16.codigoUsuario = 'TCMOH001';					colabDetObject16.nombres = 'Morales Herrera Carlos';						colabDetObject16.cargo = 'Jefe de Linea';colabDetObject16.isJefe = true;colabDetObjectList.push(colabDetObject16);
    let colabDetObject17 = new ColaboradorDetalleFire(); colabDetObject17.codigo = 17;colabDetObject17.codigoUsuario = 'TSCAP001';					colabDetObject17.nombres = 'Sulla Rocio Cajacuri Pacheco';						colabDetObject17.cargo = 'Analista de Sistemas';colabDetObject17.isJefe = false;colabDetObjectList.push(colabDetObject17);
    let colabDetObject18 = new ColaboradorDetalleFire(); colabDetObject18.codigo = 18;colabDetObject18.codigoUsuario = 'TJLOM002';					colabDetObject18.nombres = 'Jiam Carlos López Malca';						colabDetObject18.cargo = 'Jefe de Linea';colabDetObject18.isJefe = true;colabDetObjectList.push(colabDetObject18);
    let colabDetObject19 = new ColaboradorDetalleFire(); colabDetObject19.codigo = 19;colabDetObject19.codigoUsuario = 'TWVIR002';					colabDetObject19.nombres = 'Walberto Vilchez Rodriguez';						colabDetObject19.cargo = 'Analista de Sistemas';colabDetObject19.isJefe = false;colabDetObjectList.push(colabDetObject19);
    let colabDetObject20 = new ColaboradorDetalleFire(); colabDetObject20.codigo = 20;colabDetObject20.codigoUsuario = 'TLTOC001';					colabDetObject20.nombres = 'Luis Brando Torres Coronel';						colabDetObject20.cargo = 'Especialista de Sistemas';colabDetObject20.isJefe = false;colabDetObjectList.push(colabDetObject20);
    let colabDetObject21 = new ColaboradorDetalleFire(); colabDetObject21.codigo = 21;colabDetObject21.codigoUsuario = 'TRVAP001';					colabDetObject21.nombres = 'Valladares Portilla Raul';						colabDetObject21.cargo = 'Analista de Sistemas';colabDetObject21.isJefe = false;colabDetObjectList.push(colabDetObject21);
    let colabDetObject22 = new ColaboradorDetalleFire(); colabDetObject22.codigo = 22;colabDetObject22.codigoUsuario = 'TCVEG001';					colabDetObject22.nombres = 'Vera García Carlos';						colabDetObject22.cargo = 'Analista de Sistemas';colabDetObject22.isJefe = false;colabDetObjectList.push(colabDetObject22);
    let colabDetObject23 = new ColaboradorDetalleFire(); colabDetObject23.codigo = 23;colabDetObject23.codigoUsuario = 'TEBEL001';					colabDetObject23.nombres = 'Elisabeth Benites Llerena';						colabDetObject23.cargo = 'Analista de Sistemas';colabDetObject23.isJefe = false;colabDetObjectList.push(colabDetObject23);
    let colabDetObject24 = new ColaboradorDetalleFire(); colabDetObject24.codigo = 24;colabDetObject24.codigoUsuario = 'TCWAL001';					colabDetObject24.nombres = 'Waidhofer Ludeña Christopher';						colabDetObject24.cargo = 'Analista de Sistemas';colabDetObject24.isJefe = false;colabDetObjectList.push(colabDetObject24);

    colabObject.colaboradores = colabDetObjectList;
    this.firebaseColaboradores.createColaborador(colabObject);
  }

  saveIniciativa(){
    let resultValidate = false;
    let iniciativaObject = new IniciativaFire();

    iniciativaObject.numeroIniciativa = this.regEvento.value.numIniciativaInput;
    iniciativaObject.estado = this.regEvento.value.estadoSelect as ParametroDetalleFire;
    iniciativaObject.titulo = this.regEvento.value.tituloInput;
    iniciativaObject.jefeProyecto = this.regEvento.value.jefeProyectoSelect as ColaboradorDetalleFire;
    iniciativaObject.sumilla = this.regEvento.value.sumillaInput;
    iniciativaObject.usuarioProcesos = this.regEvento.value.usuarioProcesosSelect as ColaboradorDetalleFire;
    
    iniciativaObject.objetivoPrincipal = this.regEvento.value.objPrincipalTextArea;
    
    iniciativaObject.objetivoSecundario = this.regEvento.value.objSecundarioTextArea;
    
    iniciativaObject.fechaInicio = this.regEvento.value.fechaInicioInput;
    
    iniciativaObject.horaEstimada = this.regEvento.value.horaEstimadaInput;
    
    iniciativaObject.fechaFin = this.regEvento.value.fechaFinInput;
   
    iniciativaObject.prioridad = this.panelColor.value as ParametroDetalleFire;
    
    iniciativaObject.clasificacion = this.regEvento.value.clasificacionSelect as ParametroDetalleFire;
   
    iniciativaObject.area = this.regEvento.value.areaSelect as ParametroDetalleFire;
   
    iniciativaObject.categoria = this.regEvento.value.categoriaSelect as ParametroDetalleFire;
    
    iniciativaObject.tipo = this.regEvento.value.tipoSelect as ParametroDetalleFire;
    
    this.regEvento = this.formBuilder.group({
      tituloInput: [iniciativaObject.titulo, Validators.required],
      estadoSelect: [iniciativaObject.estado, Validators.required],
      jefeProyectoSelect: [iniciativaObject.jefeProyecto, Validators.required],
      sumillaInput: [iniciativaObject.sumilla, Validators.required],
      usuarioProcesosSelect: [iniciativaObject.usuarioProcesos, Validators.required],
      objPrincipalTextArea: [iniciativaObject.objetivoPrincipal, Validators.required],
      objSecundarioTextArea: [iniciativaObject.objetivoSecundario, Validators.required],
      fechaInicioInput: [iniciativaObject.fechaInicio, Validators.required],
      horaEstimadaInput: [iniciativaObject.horaEstimada, Validators.required],
      fechaFinInput: [iniciativaObject.fechaFin, Validators.required],
      clasificacionSelect: [iniciativaObject.clasificacion, Validators.required],
      areaSelect: [iniciativaObject.area, Validators.required],
      categoriaSelect: [iniciativaObject.categoria , Validators.required],
      tipoSelect: [iniciativaObject.tipo, Validators.required],
    });

    if (this.regEvento.invalid) 
    {
      this.submitted = true;
      resultValidate = true;
    }


    
    if(resultValidate){
      Swal.fire('Advertencia!', 'Debe completar la información requerida.', 'warning');
    }else{
      this.firebaseIniciativas.createIniciativa(iniciativaObject).then(
        result => {
          Swal.fire('Guardado!', 'Se ha guardado correctamente.', 'success');
          this.resetFields();
        },error => {Swal.fire('Error!', 'Error al guardar la iniciativa.', 'error');});
    }
  }
  close(): void {
    this.dialogRef.close();
  }
}