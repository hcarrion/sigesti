import { Component, OnInit, NgZone, ViewChild, ViewEncapsulation, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FirestoreService } from '../services/firestore/firestore.service';
import { ParametroFire } from '../shared/models/parametro-fire';
import { FirebaseParametroService } from '../shared/services/firebase-parametro.service';
import { ParametroDetalleFire } from '../shared/models/parametro-detalle-fire';

@Component({
  selector: 'app-registro-iniciativa',
  templateUrl: './registro-iniciativa.component.html',
  styleUrls: ['./registro-iniciativa.component.css'],
  encapsulation: ViewEncapsulation.None,
})



export class RegistroIniciativaComponent implements OnInit {

  regIniciativa: FormGroup;
  estado: ParametroFire = new ParametroFire();
  tipo: ParametroFire = new ParametroFire();
  clasificacion: ParametroFire = new ParametroFire();
  categoria: ParametroFire = new ParametroFire();
  prioridad: ParametroFire = new ParametroFire();
  area: ParametroFire = new ParametroFire();
  parametrosFire: ParametroFire[];

  panelColor = new FormControl('1');
  constructor(private _ngZone: NgZone, private firestoreService: FirestoreService, private firebaseParametros: FirebaseParametroService) {
    this.regIniciativa = new FormGroup({
      estadoSelect: new FormControl(),
      tipoSelect: new FormControl(),
      clasificacionSelect: new FormControl(),
      categoriaSelect: new FormControl(),
      prioridadSelect: new FormControl(),
      areaSelect: new FormControl()
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
    /*this.firebaseParametros.obtenerEstados(parametrosRef).then(
      result => {
          result.forEach(element => {
          this.estado = element.val()
        });
      });
    this.firebaseParametros.obtenerTipos(parametrosRef).then(
      result => {
          result.forEach(element => {
          this.tipo = element.val()
        });
      });
    this.firebaseParametros.obtenerClasificaciones(parametrosRef).then(
      result => {
          result.forEach(element => {
          this.clasificacion = element.val()
        });
      });
    this.firebaseParametros.obtenerCategorias(parametrosRef).then(
      result => {
          result.forEach(element => {
          this.categoria = element.val()
        });
      });
    this.firebaseParametros.obtenerPrioridades(parametrosRef).then(
      result => {
          result.forEach(element => {
          this.prioridad = element.val()
        });
      });
    this.firebaseParametros.obtenerAreas(parametrosRef).then(
      result => {
          result.forEach(element => {
          this.area = element.val()
        });
      });*/
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

  resetFields() {
    this.regIniciativa.controls.estadoSelect.reset();
    this.regIniciativa.controls.tipoSelect.reset();
    this.regIniciativa.controls.clasificacionSelect.reset();
    this.regIniciativa.controls.categoriaSelect.reset();
    this.regIniciativa.controls.prioridadSelect.reset();
    this.regIniciativa.controls.areaSelect.reset();
  }
}


