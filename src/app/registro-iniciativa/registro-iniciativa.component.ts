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

  panelColor = new FormControl('red');
  constructor(private _ngZone: NgZone, private firestoreService: FirestoreService, private firebaseParametros: FirebaseParametroService) {
    this.regIniciativa = new FormGroup({
      estadoSelect: new FormControl()
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
    let parametrosRef = this.firebaseParametros.obtenerParametros();
    this.firebaseParametros.obtenerEstados(parametrosRef).then(
      result => {
          result.forEach(element => {
          this.estado = element.val()
        });
      });
    }

  saveParametro() {
    const paramObject = new ParametroFire();
    paramObject.nombre = "area";
    const paramDetObjectList: Array<ParametroDetalleFire> = [];
    const paramDetObject = new ParametroDetalleFire();
    paramDetObject.codigo = 1;
    paramDetObject.descripcion = 'Sistemas';
    paramDetObjectList.push(paramDetObject);
    const paramDetObject2 = new ParametroDetalleFire();
    paramDetObject2.codigo = 2;
    paramDetObject2.descripcion = 'Operaciones';
    paramDetObjectList.push(paramDetObject2);
    const paramDetObject3 = new ParametroDetalleFire();
    paramDetObject3.codigo = 3;
    paramDetObject3.descripcion = 'Procesos';
    paramDetObjectList.push(paramDetObject3);
    const paramDetObject4 = new ParametroDetalleFire();
    paramDetObject4.codigo = 4;
    paramDetObject4.descripcion = 'Negocios';
    paramDetObjectList.push(paramDetObject4);
    const paramDetObject5 = new ParametroDetalleFire();
    paramDetObject5.codigo = 5;
    paramDetObject5.descripcion = 'Recursos Humanos';
    paramDetObjectList.push(paramDetObject5);
    const paramDetObject6 = new ParametroDetalleFire();
    paramDetObject6.codigo = 6;
    paramDetObject6.descripcion = 'Contabilidad';
    paramDetObjectList.push(paramDetObject6);
    const paramDetObject7 = new ParametroDetalleFire();
    paramDetObject7.codigo = 7;
    paramDetObject7.descripcion = 'Finanzas';
    paramDetObjectList.push(paramDetObject7);
    paramObject.detalle = paramDetObjectList;
    /*this.firebaseParametros.parametrarFirebase(paramObject);*/
  }

  resetFields() {
    this.regIniciativa.controls.estadoSelect.reset();
  }
}


