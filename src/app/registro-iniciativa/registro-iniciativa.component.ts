import { Component, OnInit, NgZone, ViewChild, ViewEncapsulation, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FirestoreService } from '../services/firestore/firestore.service';
import { ParametroFire } from '../shared/models/parametro-fire';
import { FirebaseParametroService } from '../shared/services/firebase-parametro.service';
import { ParametroDetalleFire } from '../shared/models/parametro-detalle-fire';
import { FirebaseColaboradorService } from '../shared/services/firebase-colaborador.service';
import { ColaboradorFire } from '../shared/models/colaborador-fire';
import { ColaboradorDetalleFire } from '../shared/models/colaborador-detalle-fire';
import { IniciativaFire } from '../shared/models/iniciativa-fire';
import { FirebaseIniciativaService } from '../shared/services/firebase-iniciativa.service';
import Swal from 'sweetalert2';

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
  colaboradores: ColaboradorFire = new ColaboradorFire();
  iniciativas: IniciativaFire = new IniciativaFire();

  panelColor = new FormControl('1');
  constructor(private _ngZone: NgZone, private firestoreService: FirestoreService, 
    private firebaseParametros: FirebaseParametroService, 
    private firebaseColaboradores: FirebaseColaboradorService, 
    private firebaseIniciativas: FirebaseIniciativaService) {
    this.regIniciativa = new FormGroup({
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
    /*this.regIniciativa.controls.numIniciativaInput.setValue('0000001');*/
    
  }

  async callParametros() {
    let parametrosRef = this.firebaseParametros.getParametros();
    let colaboradoresRef = this.firebaseColaboradores.getColaboradores();
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

      colaboradoresRef.subscribe(data => {data.forEach(colabObj => {
        let colabObject= colabObj.payload.doc.data() as ColaboradorFire;
        this.colaboradores = colabObject;
      });
    });
  }

  saveParametro() {
    let paramObject = new ParametroFire();
    paramObject.nombre = "area";
    let paramDetObjectList: Array<ParametroDetalleFire> = [];

    let paramDetObject1 = new ParametroDetalleFire();  paramDetObject1.codigo =1; paramDetObject1.descripcion = 'DIRECTORIO'; paramDetObject1.estado = 'A'; paramDetObjectList.push(paramDetObject1);
    let paramDetObject2 = new ParametroDetalleFire();  paramDetObject2.codigo =2; paramDetObject2.descripcion = 'GERENCIA GENERAL'; paramDetObject2.estado = 'A'; paramDetObjectList.push(paramDetObject2);
    let paramDetObject3 = new ParametroDetalleFire();  paramDetObject3.codigo =3; paramDetObject3.descripcion = 'CUMPLIMIENTO NORMATIVO'; paramDetObject3.estado = 'A'; paramDetObjectList.push(paramDetObject3);
    let paramDetObject4 = new ParametroDetalleFire();  paramDetObject4.codigo =4; paramDetObject4.descripcion = 'PLAFT'; paramDetObject4.estado = 'I'; paramDetObjectList.push(paramDetObject4);
    let paramDetObject5 = new ParametroDetalleFire();  paramDetObject5.codigo =5; paramDetObject5.descripcion = 'CONDUCTA DE MERCADO'; paramDetObject5.estado = 'A'; paramDetObjectList.push(paramDetObject5);
    let paramDetObject6 = new ParametroDetalleFire();  paramDetObject6.codigo =6; paramDetObject6.descripcion = 'GESTION DE RECLAMOS'; paramDetObject6.estado = 'A'; paramDetObjectList.push(paramDetObject6);
    let paramDetObject7 = new ParametroDetalleFire();  paramDetObject7.codigo =7; paramDetObject7.descripcion = 'AUDITORIA INTERNA'; paramDetObject7.estado = 'A'; paramDetObjectList.push(paramDetObject7);
    let paramDetObject8 = new ParametroDetalleFire();  paramDetObject8.codigo =8; paramDetObject8.descripcion = 'CALIDAD / AUDITORIA CONTINUA'; paramDetObject8.estado = 'A'; paramDetObjectList.push(paramDetObject8);
    let paramDetObject9 = new ParametroDetalleFire();  paramDetObject9.codigo =9; paramDetObject9.descripcion = 'AUDITORIA DE TI'; paramDetObject9.estado = 'A'; paramDetObjectList.push(paramDetObject9);
    let paramDetObject10 = new ParametroDetalleFire();  paramDetObject10.codigo =10; paramDetObject10.descripcion = 'AUDITORIA DE RED'; paramDetObject10.estado = 'A'; paramDetObjectList.push(paramDetObject10);
    let paramDetObject11 = new ParametroDetalleFire();  paramDetObject11.codigo =11; paramDetObject11.descripcion = 'AUDITORIA DE PROCESOS'; paramDetObject11.estado = 'A'; paramDetObjectList.push(paramDetObject11);
    let paramDetObject12 = new ParametroDetalleFire();  paramDetObject12.codigo =12; paramDetObject12.descripcion = 'COMERCIAL'; paramDetObject12.estado = 'A'; paramDetObjectList.push(paramDetObject12);
    let paramDetObject13 = new ParametroDetalleFire();  paramDetObject13.codigo =13; paramDetObject13.descripcion = 'TERRITORIO NORTE'; paramDetObject13.estado = 'A'; paramDetObjectList.push(paramDetObject13);
    let paramDetObject14 = new ParametroDetalleFire();  paramDetObject14.codigo =14; paramDetObject14.descripcion = 'REGIÓN NORTE 1'; paramDetObject14.estado = 'A'; paramDetObjectList.push(paramDetObject14);
    let paramDetObject15 = new ParametroDetalleFire();  paramDetObject15.codigo =15; paramDetObject15.descripcion = 'OF PIURA'; paramDetObject15.estado = 'A'; paramDetObjectList.push(paramDetObject15);
    let paramDetObject16 = new ParametroDetalleFire();  paramDetObject16.codigo =16; paramDetObject16.descripcion = 'OF SULLANA'; paramDetObject16.estado = 'A'; paramDetObjectList.push(paramDetObject16);
    let paramDetObject17 = new ParametroDetalleFire();  paramDetObject17.codigo =17; paramDetObject17.descripcion = 'OF TUMBES'; paramDetObject17.estado = 'A'; paramDetObjectList.push(paramDetObject17);
    let paramDetObject18 = new ParametroDetalleFire();  paramDetObject18.codigo =18; paramDetObject18.descripcion = 'BN  MONTERO'; paramDetObject18.estado = 'A'; paramDetObjectList.push(paramDetObject18);
    let paramDetObject19 = new ParametroDetalleFire();  paramDetObject19.codigo =19; paramDetObject19.descripcion = 'BN CHULUCANAS'; paramDetObject19.estado = 'A'; paramDetObjectList.push(paramDetObject19);
    let paramDetObject20 = new ParametroDetalleFire();  paramDetObject20.codigo =20; paramDetObject20.descripcion = 'BN LA UNION'; paramDetObject20.estado = 'A'; paramDetObjectList.push(paramDetObject20);
    let paramDetObject21 = new ParametroDetalleFire();  paramDetObject21.codigo =21; paramDetObject21.descripcion = 'BN MORROPON'; paramDetObject21.estado = 'A'; paramDetObjectList.push(paramDetObject21);
    let paramDetObject22 = new ParametroDetalleFire();  paramDetObject22.codigo =22; paramDetObject22.descripcion = 'BN AYABACA'; paramDetObject22.estado = 'A'; paramDetObjectList.push(paramDetObject22);
    let paramDetObject23 = new ParametroDetalleFire();  paramDetObject23.codigo =23; paramDetObject23.descripcion = 'BN CANCHAQUE'; paramDetObject23.estado = 'A'; paramDetObjectList.push(paramDetObject23);
    let paramDetObject24 = new ParametroDetalleFire();  paramDetObject24.codigo =24; paramDetObject24.descripcion = 'BN SALITRAL'; paramDetObject24.estado = 'I'; paramDetObjectList.push(paramDetObject24);
    let paramDetObject26 = new ParametroDetalleFire();  paramDetObject26.codigo =26; paramDetObject26.descripcion = 'BN MANCORA'; paramDetObject26.estado = 'A'; paramDetObjectList.push(paramDetObject26);
    let paramDetObject27 = new ParametroDetalleFire();  paramDetObject27.codigo =27; paramDetObject27.descripcion = 'BN EL ALTO'; paramDetObject27.estado = 'A'; paramDetObjectList.push(paramDetObject27);
    let paramDetObject28 = new ParametroDetalleFire();  paramDetObject28.codigo =28; paramDetObject28.descripcion = 'OPI TAMBO GRANDE'; paramDetObject28.estado = 'A'; paramDetObjectList.push(paramDetObject28);
    let paramDetObject29 = new ParametroDetalleFire();  paramDetObject29.codigo =29; paramDetObject29.descripcion = 'OF PAITA'; paramDetObject29.estado = 'A'; paramDetObjectList.push(paramDetObject29);
    let paramDetObject30 = new ParametroDetalleFire();  paramDetObject30.codigo =30; paramDetObject30.descripcion = 'OF SECHURA'; paramDetObject30.estado = 'A'; paramDetObjectList.push(paramDetObject30);
    let paramDetObject32 = new ParametroDetalleFire();  paramDetObject32.codigo =32; paramDetObject32.descripcion = 'OF CHULUCANAS'; paramDetObject32.estado = 'A'; paramDetObjectList.push(paramDetObject32);
    let paramDetObject33 = new ParametroDetalleFire();  paramDetObject33.codigo =33; paramDetObject33.descripcion = 'OF LA UNION'; paramDetObject33.estado = 'A'; paramDetObjectList.push(paramDetObject33);
    let paramDetObject34 = new ParametroDetalleFire();  paramDetObject34.codigo =34; paramDetObject34.descripcion = 'OF HUANCABAMBA'; paramDetObject34.estado = 'A'; paramDetObjectList.push(paramDetObject34);
    let paramDetObject35 = new ParametroDetalleFire();  paramDetObject35.codigo =35; paramDetObject35.descripcion = 'TAMBO CANCHAQUE'; paramDetObject35.estado = 'A'; paramDetObjectList.push(paramDetObject35);
    let paramDetObject36 = new ParametroDetalleFire();  paramDetObject36.codigo =36; paramDetObject36.descripcion = 'TAMBO MORROPON'; paramDetObject36.estado = 'A'; paramDetObjectList.push(paramDetObject36);
    let paramDetObject37 = new ParametroDetalleFire();  paramDetObject37.codigo =37; paramDetObject37.descripcion = 'TAMBO AYABACA'; paramDetObject37.estado = 'A'; paramDetObjectList.push(paramDetObject37);
    let paramDetObject38 = new ParametroDetalleFire();  paramDetObject38.codigo =38; paramDetObject38.descripcion = 'REGION NORTE 2'; paramDetObject38.estado = 'A'; paramDetObjectList.push(paramDetObject38);
    let paramDetObject39 = new ParametroDetalleFire();  paramDetObject39.codigo =39; paramDetObject39.descripcion = 'OF CHEPEN'; paramDetObject39.estado = 'A'; paramDetObjectList.push(paramDetObject39);
    let paramDetObject40 = new ParametroDetalleFire();  paramDetObject40.codigo =40; paramDetObject40.descripcion = 'OF CHICLAYO'; paramDetObject40.estado = 'A'; paramDetObjectList.push(paramDetObject40);
    let paramDetObject42 = new ParametroDetalleFire();  paramDetObject42.codigo =42; paramDetObject42.descripcion = 'BN CHONGOYAPE'; paramDetObject42.estado = 'I'; paramDetObjectList.push(paramDetObject42);
    let paramDetObject43 = new ParametroDetalleFire();  paramDetObject43.codigo =43; paramDetObject43.descripcion = 'BN TUCUME'; paramDetObject43.estado = 'A'; paramDetObjectList.push(paramDetObject43);
    let paramDetObject44 = new ParametroDetalleFire();  paramDetObject44.codigo =44; paramDetObject44.descripcion = 'BN MONSEFU'; paramDetObject44.estado = 'A'; paramDetObjectList.push(paramDetObject44);
    let paramDetObject45 = new ParametroDetalleFire();  paramDetObject45.codigo =45; paramDetObject45.descripcion = 'OF OLMOS'; paramDetObject45.estado = 'A'; paramDetObjectList.push(paramDetObject45);
    let paramDetObject46 = new ParametroDetalleFire();  paramDetObject46.codigo =46; paramDetObject46.descripcion = 'OF MOTUPE'; paramDetObject46.estado = 'A'; paramDetObjectList.push(paramDetObject46);
    let paramDetObject47 = new ParametroDetalleFire();  paramDetObject47.codigo =47; paramDetObject47.descripcion = 'OF LAMBAYEQUE'; paramDetObject47.estado = 'I'; paramDetObjectList.push(paramDetObject47);
    let paramDetObject48 = new ParametroDetalleFire();  paramDetObject48.codigo =48; paramDetObject48.descripcion = 'OF CHACHAPOYAS'; paramDetObject48.estado = 'A'; paramDetObjectList.push(paramDetObject48);
    let paramDetObject49 = new ParametroDetalleFire();  paramDetObject49.codigo =49; paramDetObject49.descripcion = 'OF JAEN'; paramDetObject49.estado = 'A'; paramDetObjectList.push(paramDetObject49);
    let paramDetObject50 = new ParametroDetalleFire();  paramDetObject50.codigo =50; paramDetObject50.descripcion = 'OF MULTIAG. PEDRO RUIZ'; paramDetObject50.estado = 'I'; paramDetObjectList.push(paramDetObject50);
    let paramDetObject51 = new ParametroDetalleFire();  paramDetObject51.codigo =51; paramDetObject51.descripcion = 'OF HUARMACA'; paramDetObject51.estado = 'A'; paramDetObjectList.push(paramDetObject51);
    let paramDetObject52 = new ParametroDetalleFire();  paramDetObject52.codigo =52; paramDetObject52.descripcion = 'TAMBO MOTUPE'; paramDetObject52.estado = 'A'; paramDetObjectList.push(paramDetObject52);
    let paramDetObject55 = new ParametroDetalleFire();  paramDetObject55.codigo =55; paramDetObject55.descripcion = 'TAMBO PLUS PEDRO RUIZ'; paramDetObject55.estado = 'A'; paramDetObjectList.push(paramDetObject55);
    let paramDetObject56 = new ParametroDetalleFire();  paramDetObject56.codigo =56; paramDetObject56.descripcion = 'TAMBO TUCUME'; paramDetObject56.estado = 'A'; paramDetObjectList.push(paramDetObject56);
    let paramDetObject58 = new ParametroDetalleFire();  paramDetObject58.codigo =58; paramDetObject58.descripcion = 'REGION NOR ANDINO 1'; paramDetObject58.estado = 'A'; paramDetObjectList.push(paramDetObject58);
    let paramDetObject59 = new ParametroDetalleFire();  paramDetObject59.codigo =59; paramDetObject59.descripcion = 'OF TRUJILLO'; paramDetObject59.estado = 'A'; paramDetObjectList.push(paramDetObject59);
    let paramDetObject60 = new ParametroDetalleFire();  paramDetObject60.codigo =60; paramDetObject60.descripcion = 'OF ZONA FRANCA'; paramDetObject60.estado = 'A'; paramDetObjectList.push(paramDetObject60);
    let paramDetObject62 = new ParametroDetalleFire();  paramDetObject62.codigo =62; paramDetObject62.descripcion = 'OF EL PORVENIR'; paramDetObject62.estado = 'A'; paramDetObjectList.push(paramDetObject62);
    let paramDetObject63 = new ParametroDetalleFire();  paramDetObject63.codigo =63; paramDetObject63.descripcion = 'OF LA ESPERANZA'; paramDetObject63.estado = 'A'; paramDetObjectList.push(paramDetObject63);
    let paramDetObject64 = new ParametroDetalleFire();  paramDetObject64.codigo =64; paramDetObject64.descripcion = 'OF VIRU'; paramDetObject64.estado = 'A'; paramDetObjectList.push(paramDetObject64);
    let paramDetObject65 = new ParametroDetalleFire();  paramDetObject65.codigo =65; paramDetObject65.descripcion = 'OF CHIMBOTE'; paramDetObject65.estado = 'A'; paramDetObjectList.push(paramDetObject65);
    let paramDetObject66 = new ParametroDetalleFire();  paramDetObject66.codigo =66; paramDetObject66.descripcion = 'BN OTUZCO'; paramDetObject66.estado = 'A'; paramDetObjectList.push(paramDetObject66);
    let paramDetObject67 = new ParametroDetalleFire();  paramDetObject67.codigo =67; paramDetObject67.descripcion = 'BN PAIJAN'; paramDetObject67.estado = 'A'; paramDetObjectList.push(paramDetObject67);
    let paramDetObject68 = new ParametroDetalleFire();  paramDetObject68.codigo =68; paramDetObject68.descripcion = 'BN CASCAS'; paramDetObject68.estado = 'A'; paramDetObjectList.push(paramDetObject68);
    let paramDetObject69 = new ParametroDetalleFire();  paramDetObject69.codigo =69; paramDetObject69.descripcion = 'BN CONTUMAZA'; paramDetObject69.estado = 'A'; paramDetObjectList.push(paramDetObject69);
    let paramDetObject70 = new ParametroDetalleFire();  paramDetObject70.codigo =70; paramDetObject70.descripcion = 'BN ASCOPE'; paramDetObject70.estado = 'A'; paramDetObjectList.push(paramDetObject70);
    let paramDetObject71 = new ParametroDetalleFire();  paramDetObject71.codigo =71; paramDetObject71.descripcion = 'BN TAYABAMBA'; paramDetObject71.estado = 'I'; paramDetObjectList.push(paramDetObject71);
    let paramDetObject72 = new ParametroDetalleFire();  paramDetObject72.codigo =72; paramDetObject72.descripcion = 'BN CARTAVIO'; paramDetObject72.estado = 'A'; paramDetObjectList.push(paramDetObject72);
    let paramDetObject73 = new ParametroDetalleFire();  paramDetObject73.codigo =73; paramDetObject73.descripcion = 'BN MORO'; paramDetObject73.estado = 'A'; paramDetObjectList.push(paramDetObject73);
    let paramDetObject75 = new ParametroDetalleFire();  paramDetObject75.codigo =75; paramDetObject75.descripcion = 'OF HUARAZ'; paramDetObject75.estado = 'A'; paramDetObjectList.push(paramDetObject75);
    let paramDetObject76 = new ParametroDetalleFire();  paramDetObject76.codigo =76; paramDetObject76.descripcion = 'OF CASMA'; paramDetObject76.estado = 'A'; paramDetObjectList.push(paramDetObject76);
    let paramDetObject78 = new ParametroDetalleFire();  paramDetObject78.codigo =78; paramDetObject78.descripcion = 'OF TAYABAMBA'; paramDetObject78.estado = 'A'; paramDetObjectList.push(paramDetObject78);
    let paramDetObject79 = new ParametroDetalleFire();  paramDetObject79.codigo =79; paramDetObject79.descripcion = 'OF CHOCOPE'; paramDetObject79.estado = 'A'; paramDetObjectList.push(paramDetObject79);
    let paramDetObject80 = new ParametroDetalleFire();  paramDetObject80.codigo =80; paramDetObject80.descripcion = 'TAMBO PLUS OTUZCO'; paramDetObject80.estado = 'A'; paramDetObjectList.push(paramDetObject80);
    let paramDetObject82 = new ParametroDetalleFire();  paramDetObject82.codigo =82; paramDetObject82.descripcion = 'TAMBO HUARMEY'; paramDetObject82.estado = 'A'; paramDetObjectList.push(paramDetObject82);
    let paramDetObject83 = new ParametroDetalleFire();  paramDetObject83.codigo =83; paramDetObject83.descripcion = 'REGION NOR ANDINO 2'; paramDetObject83.estado = 'A'; paramDetObjectList.push(paramDetObject83);
    let paramDetObject84 = new ParametroDetalleFire();  paramDetObject84.codigo =84; paramDetObject84.descripcion = 'OF HUAMACHUCO'; paramDetObject84.estado = 'A'; paramDetObjectList.push(paramDetObject84);
    let paramDetObject85 = new ParametroDetalleFire();  paramDetObject85.codigo =85; paramDetObject85.descripcion = 'OF QUIRUVILCA'; paramDetObject85.estado = 'I'; paramDetObjectList.push(paramDetObject85);
    let paramDetObject86 = new ParametroDetalleFire();  paramDetObject86.codigo =86; paramDetObject86.descripcion = 'OF CAJAMARCA'; paramDetObject86.estado = 'A'; paramDetObjectList.push(paramDetObject86);
    let paramDetObject87 = new ParametroDetalleFire();  paramDetObject87.codigo =87; paramDetObject87.descripcion = 'OF CAJABAMBA'; paramDetObject87.estado = 'A'; paramDetObjectList.push(paramDetObject87);
    let paramDetObject88 = new ParametroDetalleFire();  paramDetObject88.codigo =88; paramDetObject88.descripcion = 'BN SANTIAGO DE CHUCO'; paramDetObject88.estado = 'I'; paramDetObjectList.push(paramDetObject88);
    let paramDetObject89 = new ParametroDetalleFire();  paramDetObject89.codigo =89; paramDetObject89.descripcion = 'BN SAN MIGUEL'; paramDetObject89.estado = 'A'; paramDetObjectList.push(paramDetObject89);
    let paramDetObject90 = new ParametroDetalleFire();  paramDetObject90.codigo =90; paramDetObject90.descripcion = 'BN CUTERVO'; paramDetObject90.estado = 'A'; paramDetObjectList.push(paramDetObject90);
    let paramDetObject91 = new ParametroDetalleFire();  paramDetObject91.codigo =91; paramDetObject91.descripcion = 'BN CELENDIN'; paramDetObject91.estado = 'A'; paramDetObjectList.push(paramDetObject91);
    let paramDetObject92 = new ParametroDetalleFire();  paramDetObject92.codigo =92; paramDetObject92.descripcion = 'OF BAMBAMARCA'; paramDetObject92.estado = 'A'; paramDetObjectList.push(paramDetObject92);
    let paramDetObject93 = new ParametroDetalleFire();  paramDetObject93.codigo =93; paramDetObject93.descripcion = 'OF HUAURA'; paramDetObject93.estado = 'I'; paramDetObjectList.push(paramDetObject93);
    let paramDetObject94 = new ParametroDetalleFire();  paramDetObject94.codigo =94; paramDetObject94.descripcion = 'OF SAN MARCOS'; paramDetObject94.estado = 'A'; paramDetObjectList.push(paramDetObject94);
    let paramDetObject95 = new ParametroDetalleFire();  paramDetObject95.codigo =95; paramDetObject95.descripcion = 'OF SANTIAGO DE CHUCO'; paramDetObject95.estado = 'A'; paramDetObjectList.push(paramDetObject95);
    let paramDetObject97 = new ParametroDetalleFire();  paramDetObject97.codigo =97; paramDetObject97.descripcion = 'TAMBO PLUS CUTERVO'; paramDetObject97.estado = 'A'; paramDetObjectList.push(paramDetObject97);
    let paramDetObject98 = new ParametroDetalleFire();  paramDetObject98.codigo =98; paramDetObject98.descripcion = 'OF CHOTA'; paramDetObject98.estado = 'A'; paramDetObjectList.push(paramDetObject98);
    let paramDetObject99 = new ParametroDetalleFire();  paramDetObject99.codigo =99; paramDetObject99.descripcion = 'TAMBO PLUS CELENDIN'; paramDetObject99.estado = 'A'; paramDetObjectList.push(paramDetObject99);
    let paramDetObject100 = new ParametroDetalleFire();  paramDetObject100.codigo =100; paramDetObject100.descripcion = 'TAMBO PLUS SAN MIGUEL'; paramDetObject100.estado = 'A'; paramDetObjectList.push(paramDetObject100);
    let paramDetObject101 = new ParametroDetalleFire();  paramDetObject101.codigo =101; paramDetObject101.descripcion = 'TERRITORIO LIMA ORIENTE'; paramDetObject101.estado = 'A'; paramDetObjectList.push(paramDetObject101);
    let paramDetObject102 = new ParametroDetalleFire();  paramDetObject102.codigo =102; paramDetObject102.descripcion = 'REGION LIMA 1'; paramDetObject102.estado = 'A'; paramDetObjectList.push(paramDetObject102);
    let paramDetObject103 = new ParametroDetalleFire();  paramDetObject103.codigo =103; paramDetObject103.descripcion = 'OF BARRANCA'; paramDetObject103.estado = 'A'; paramDetObjectList.push(paramDetObject103);
    let paramDetObject105 = new ParametroDetalleFire();  paramDetObject105.codigo =105; paramDetObject105.descripcion = 'BN CANTA'; paramDetObject105.estado = 'A'; paramDetObjectList.push(paramDetObject105);
    let paramDetObject106 = new ParametroDetalleFire();  paramDetObject106.codigo =106; paramDetObject106.descripcion = 'BN CAJATAMBO'; paramDetObject106.estado = 'A'; paramDetObjectList.push(paramDetObject106);
    let paramDetObject108 = new ParametroDetalleFire();  paramDetObject108.codigo =108; paramDetObject108.descripcion = 'OF LOS OLIVOS'; paramDetObject108.estado = 'A'; paramDetObjectList.push(paramDetObject108);
    let paramDetObject109 = new ParametroDetalleFire();  paramDetObject109.codigo =109; paramDetObject109.descripcion = 'OF SJL LURIGANCHO'; paramDetObject109.estado = 'A'; paramDetObjectList.push(paramDetObject109);
    let paramDetObject110 = new ParametroDetalleFire();  paramDetObject110.codigo =110; paramDetObject110.descripcion = 'OF HUACHO'; paramDetObject110.estado = 'A'; paramDetObjectList.push(paramDetObject110);
    let paramDetObject111 = new ParametroDetalleFire();  paramDetObject111.codigo =111; paramDetObject111.descripcion = 'OF SAN JUAN PROCERES'; paramDetObject111.estado = 'A'; paramDetObjectList.push(paramDetObject111);
    let paramDetObject112 = new ParametroDetalleFire();  paramDetObject112.codigo =112; paramDetObject112.descripcion = 'OF VENTANILLA'; paramDetObject112.estado = 'A'; paramDetObjectList.push(paramDetObject112);
    let paramDetObject113 = new ParametroDetalleFire();  paramDetObject113.codigo =113; paramDetObject113.descripcion = 'OF CARABAYLLO'; paramDetObject113.estado = 'A'; paramDetObjectList.push(paramDetObject113);
    let paramDetObject115 = new ParametroDetalleFire();  paramDetObject115.codigo =115; paramDetObject115.descripcion = 'OF SAN MARTIN DE PORRES'; paramDetObject115.estado = 'A'; paramDetObjectList.push(paramDetObject115);
    let paramDetObject116 = new ParametroDetalleFire();  paramDetObject116.codigo =116; paramDetObject116.descripcion = 'OF JICAMARCA'; paramDetObject116.estado = 'A'; paramDetObjectList.push(paramDetObject116);
    let paramDetObject120 = new ParametroDetalleFire();  paramDetObject120.codigo =120; paramDetObject120.descripcion = 'OF MULTIAG. SAN JUAN DE LURIGANCHO'; paramDetObject120.estado = 'I'; paramDetObjectList.push(paramDetObject120);
    let paramDetObject121 = new ParametroDetalleFire();  paramDetObject121.codigo =121; paramDetObject121.descripcion = 'OF MULTIAG. SAN JUAN DE MIRAFLORES'; paramDetObject121.estado = 'I'; paramDetObjectList.push(paramDetObject121);
    let paramDetObject124 = new ParametroDetalleFire();  paramDetObject124.codigo =124; paramDetObject124.descripcion = 'REGION LIMA 2'; paramDetObject124.estado = 'A'; paramDetObjectList.push(paramDetObject124);
    let paramDetObject126 = new ParametroDetalleFire();  paramDetObject126.codigo =126; paramDetObject126.descripcion = 'OF VILLA MARIA DEL TRIUNFO'; paramDetObject126.estado = 'A'; paramDetObjectList.push(paramDetObject126);
    let paramDetObject127 = new ParametroDetalleFire();  paramDetObject127.codigo =127; paramDetObject127.descripcion = 'OF VILLA EL SALVADOR'; paramDetObject127.estado = 'A'; paramDetObjectList.push(paramDetObject127);
    let paramDetObject128 = new ParametroDetalleFire();  paramDetObject128.codigo =128; paramDetObject128.descripcion = 'OF CHORRILLOS'; paramDetObject128.estado = 'A'; paramDetObjectList.push(paramDetObject128);
    let paramDetObject129 = new ParametroDetalleFire();  paramDetObject129.codigo =129; paramDetObject129.descripcion = 'OF LURIN'; paramDetObject129.estado = 'A'; paramDetObjectList.push(paramDetObject129);
    let paramDetObject130 = new ParametroDetalleFire();  paramDetObject130.codigo =130; paramDetObject130.descripcion = 'OF MANCHAY'; paramDetObject130.estado = 'A'; paramDetObjectList.push(paramDetObject130);
    let paramDetObject131 = new ParametroDetalleFire();  paramDetObject131.codigo =131; paramDetObject131.descripcion = 'OF CAÑETE'; paramDetObject131.estado = 'A'; paramDetObjectList.push(paramDetObject131);
    let paramDetObject132 = new ParametroDetalleFire();  paramDetObject132.codigo =132; paramDetObject132.descripcion = 'OF ICA'; paramDetObject132.estado = 'A'; paramDetObjectList.push(paramDetObject132);
    let paramDetObject133 = new ParametroDetalleFire();  paramDetObject133.codigo =133; paramDetObject133.descripcion = 'OF PUERTO MALDONADO'; paramDetObject133.estado = 'A'; paramDetObjectList.push(paramDetObject133);
    let paramDetObject134 = new ParametroDetalleFire();  paramDetObject134.codigo =134; paramDetObject134.descripcion = 'REGION LIMA 3'; paramDetObject134.estado = 'A'; paramDetObjectList.push(paramDetObject134);
    let paramDetObject135 = new ParametroDetalleFire();  paramDetObject135.codigo =135; paramDetObject135.descripcion = 'OF IQUITOS'; paramDetObject135.estado = 'A'; paramDetObjectList.push(paramDetObject135);
    let paramDetObject136 = new ParametroDetalleFire();  paramDetObject136.codigo =136; paramDetObject136.descripcion = 'OF ATE'; paramDetObject136.estado = 'A'; paramDetObjectList.push(paramDetObject136);
    let paramDetObject137 = new ParametroDetalleFire();  paramDetObject137.codigo =137; paramDetObject137.descripcion = 'OF HUAYCAN'; paramDetObject137.estado = 'A'; paramDetObjectList.push(paramDetObject137);
    let paramDetObject138 = new ParametroDetalleFire();  paramDetObject138.codigo =138; paramDetObject138.descripcion = 'OF CHOSICA'; paramDetObject138.estado = 'A'; paramDetObjectList.push(paramDetObject138);
    let paramDetObject139 = new ParametroDetalleFire();  paramDetObject139.codigo =139; paramDetObject139.descripcion = 'OF SANTA ANITA'; paramDetObject139.estado = 'A'; paramDetObjectList.push(paramDetObject139);
    let paramDetObject140 = new ParametroDetalleFire();  paramDetObject140.codigo =140; paramDetObject140.descripcion = 'OF HUACHIPA'; paramDetObject140.estado = 'A'; paramDetObjectList.push(paramDetObject140);
    let paramDetObject141 = new ParametroDetalleFire();  paramDetObject141.codigo =141; paramDetObject141.descripcion = 'REGION ORIENTE'; paramDetObject141.estado = 'A'; paramDetObjectList.push(paramDetObject141);
    let paramDetObject142 = new ParametroDetalleFire();  paramDetObject142.codigo =142; paramDetObject142.descripcion = 'OF TARAPOTO'; paramDetObject142.estado = 'A'; paramDetObjectList.push(paramDetObject142);
    let paramDetObject144 = new ParametroDetalleFire();  paramDetObject144.codigo =144; paramDetObject144.descripcion = 'OF CAMPO VERDE'; paramDetObject144.estado = 'A'; paramDetObjectList.push(paramDetObject144);
    let paramDetObject145 = new ParametroDetalleFire();  paramDetObject145.codigo =145; paramDetObject145.descripcion = 'OF PUCALLPA'; paramDetObject145.estado = 'A'; paramDetObjectList.push(paramDetObject145);
    let paramDetObject146 = new ParametroDetalleFire();  paramDetObject146.codigo =146; paramDetObject146.descripcion = 'OF AGUAYTIA'; paramDetObject146.estado = 'A'; paramDetObjectList.push(paramDetObject146);
    let paramDetObject147 = new ParametroDetalleFire();  paramDetObject147.codigo =147; paramDetObject147.descripcion = 'OF TINGO MARIA'; paramDetObject147.estado = 'A'; paramDetObjectList.push(paramDetObject147);
    let paramDetObject148 = new ParametroDetalleFire();  paramDetObject148.codigo =148; paramDetObject148.descripcion = 'BN CAMPO VERDE'; paramDetObject148.estado = 'A'; paramDetObjectList.push(paramDetObject148);
    let paramDetObject149 = new ParametroDetalleFire();  paramDetObject149.codigo =149; paramDetObject149.descripcion = 'OF MOYOBAMBA'; paramDetObject149.estado = 'A'; paramDetObjectList.push(paramDetObject149);
    let paramDetObject151 = new ParametroDetalleFire();  paramDetObject151.codigo =151; paramDetObject151.descripcion = 'TERRITORIO CENTRO'; paramDetObject151.estado = 'A'; paramDetObjectList.push(paramDetObject151);
    let paramDetObject152 = new ParametroDetalleFire();  paramDetObject152.codigo =152; paramDetObject152.descripcion = 'REGIÓN CENTRO 1'; paramDetObject152.estado = 'A'; paramDetObjectList.push(paramDetObject152);
    let paramDetObject153 = new ParametroDetalleFire();  paramDetObject153.codigo =153; paramDetObject153.descripcion = 'TAMBO PLUS LIRCAY'; paramDetObject153.estado = 'A'; paramDetObjectList.push(paramDetObject153);
    let paramDetObject154 = new ParametroDetalleFire();  paramDetObject154.codigo =154; paramDetObject154.descripcion = 'OF CENTENARIO'; paramDetObject154.estado = 'A'; paramDetObjectList.push(paramDetObject154);
    let paramDetObject155 = new ParametroDetalleFire();  paramDetObject155.codigo =155; paramDetObject155.descripcion = 'OF PAMPAS'; paramDetObject155.estado = 'A'; paramDetObjectList.push(paramDetObject155);
    let paramDetObject156 = new ParametroDetalleFire();  paramDetObject156.codigo =156; paramDetObject156.descripcion = 'OF CONSTITUCION'; paramDetObject156.estado = 'A'; paramDetObjectList.push(paramDetObject156);
    let paramDetObject157 = new ParametroDetalleFire();  paramDetObject157.codigo =157; paramDetObject157.descripcion = 'OF JAUJA'; paramDetObject157.estado = 'A'; paramDetObjectList.push(paramDetObject157);
    let paramDetObject158 = new ParametroDetalleFire();  paramDetObject158.codigo =158; paramDetObject158.descripcion = 'OF EL TAMBO'; paramDetObject158.estado = 'A'; paramDetObjectList.push(paramDetObject158);
    let paramDetObject159 = new ParametroDetalleFire();  paramDetObject159.codigo =159; paramDetObject159.descripcion = 'OF CHILCA'; paramDetObject159.estado = 'A'; paramDetObjectList.push(paramDetObject159);
    let paramDetObject160 = new ParametroDetalleFire();  paramDetObject160.codigo =160; paramDetObject160.descripcion = 'OF HUANCAVELICA'; paramDetObject160.estado = 'A'; paramDetObjectList.push(paramDetObject160);
    let paramDetObject161 = new ParametroDetalleFire();  paramDetObject161.codigo =161; paramDetObject161.descripcion = 'OF CHUPACA'; paramDetObject161.estado = 'A'; paramDetObjectList.push(paramDetObject161);
    let paramDetObject162 = new ParametroDetalleFire();  paramDetObject162.codigo =162; paramDetObject162.descripcion = 'BN LIRCAY'; paramDetObject162.estado = 'A'; paramDetObjectList.push(paramDetObject162);
    let paramDetObject163 = new ParametroDetalleFire();  paramDetObject163.codigo =163; paramDetObject163.descripcion = 'BN CHURCAMPA'; paramDetObject163.estado = 'A'; paramDetObjectList.push(paramDetObject163);
    let paramDetObject164 = new ParametroDetalleFire();  paramDetObject164.codigo =164; paramDetObject164.descripcion = 'BN IZCUCHACA'; paramDetObject164.estado = 'A'; paramDetObjectList.push(paramDetObject164);
    let paramDetObject165 = new ParametroDetalleFire();  paramDetObject165.codigo =165; paramDetObject165.descripcion = 'BN COLCABAMBA'; paramDetObject165.estado = 'A'; paramDetObjectList.push(paramDetObject165);
    let paramDetObject166 = new ParametroDetalleFire();  paramDetObject166.codigo =166; paramDetObject166.descripcion = 'TAMBO PLUS CONCEPCION'; paramDetObject166.estado = 'A'; paramDetObjectList.push(paramDetObject166);
    let paramDetObject167 = new ParametroDetalleFire();  paramDetObject167.codigo =167; paramDetObject167.descripcion = 'BN PAUCARA'; paramDetObject167.estado = 'A'; paramDetObjectList.push(paramDetObject167);
    let paramDetObject168 = new ParametroDetalleFire();  paramDetObject168.codigo =168; paramDetObject168.descripcion = 'BN ACOBAMBA'; paramDetObject168.estado = 'A'; paramDetObjectList.push(paramDetObject168);
    let paramDetObject169 = new ParametroDetalleFire();  paramDetObject169.codigo =169; paramDetObject169.descripcion = 'TAMBO PLUS COLCABAMBA'; paramDetObject169.estado = 'A'; paramDetObjectList.push(paramDetObject169);
    let paramDetObject170 = new ParametroDetalleFire();  paramDetObject170.codigo =170; paramDetObject170.descripcion = 'REGION CENTRO 2'; paramDetObject170.estado = 'A'; paramDetObjectList.push(paramDetObject170);
    let paramDetObject172 = new ParametroDetalleFire();  paramDetObject172.codigo =172; paramDetObject172.descripcion = 'OF SATIPO'; paramDetObject172.estado = 'A'; paramDetObjectList.push(paramDetObject172);
    let paramDetObject173 = new ParametroDetalleFire();  paramDetObject173.codigo =173; paramDetObject173.descripcion = 'OF PICHANAKI'; paramDetObject173.estado = 'A'; paramDetObjectList.push(paramDetObject173);
    let paramDetObject174 = new ParametroDetalleFire();  paramDetObject174.codigo =174; paramDetObject174.descripcion = 'OF LA MERCED'; paramDetObject174.estado = 'A'; paramDetObjectList.push(paramDetObject174);
    let paramDetObject175 = new ParametroDetalleFire();  paramDetObject175.codigo =175; paramDetObject175.descripcion = 'OF HUANUCO'; paramDetObject175.estado = 'A'; paramDetObjectList.push(paramDetObject175);
    let paramDetObject176 = new ParametroDetalleFire();  paramDetObject176.codigo =176; paramDetObject176.descripcion = 'OF CERRO DE PASCO'; paramDetObject176.estado = 'A'; paramDetObjectList.push(paramDetObject176);
    let paramDetObject177 = new ParametroDetalleFire();  paramDetObject177.codigo =177; paramDetObject177.descripcion = 'OF TARMA'; paramDetObject177.estado = 'A'; paramDetObjectList.push(paramDetObject177);
    let paramDetObject178 = new ParametroDetalleFire();  paramDetObject178.codigo =178; paramDetObject178.descripcion = 'OF LA OROYA'; paramDetObject178.estado = 'A'; paramDetObjectList.push(paramDetObject178);
    let paramDetObject179 = new ParametroDetalleFire();  paramDetObject179.codigo =179; paramDetObject179.descripcion = 'OF OXAPAMPA'; paramDetObject179.estado = 'A'; paramDetObjectList.push(paramDetObject179);
    let paramDetObject180 = new ParametroDetalleFire();  paramDetObject180.codigo =180; paramDetObject180.descripcion = 'OF VILLA RICA'; paramDetObject180.estado = 'A'; paramDetObjectList.push(paramDetObject180);
    let paramDetObject181 = new ParametroDetalleFire();  paramDetObject181.codigo =181; paramDetObject181.descripcion = 'OF SAN MARTIN DE PANGOA'; paramDetObject181.estado = 'A'; paramDetObjectList.push(paramDetObject181);
    let paramDetObject189 = new ParametroDetalleFire();  paramDetObject189.codigo =189; paramDetObject189.descripcion = 'REGION CENTRO 3'; paramDetObject189.estado = 'A'; paramDetObjectList.push(paramDetObject189);
    let paramDetObject190 = new ParametroDetalleFire();  paramDetObject190.codigo =190; paramDetObject190.descripcion = 'OF ANDAHUAYLAS'; paramDetObject190.estado = 'A'; paramDetObjectList.push(paramDetObject190);
    let paramDetObject191 = new ParametroDetalleFire();  paramDetObject191.codigo =191; paramDetObject191.descripcion = 'OF CUZCO'; paramDetObject191.estado = 'A'; paramDetObjectList.push(paramDetObject191);
    let paramDetObject192 = new ParametroDetalleFire();  paramDetObject192.codigo =192; paramDetObject192.descripcion = 'BN YANAOCA'; paramDetObject192.estado = 'A'; paramDetObjectList.push(paramDetObject192);
    let paramDetObject193 = new ParametroDetalleFire();  paramDetObject193.codigo =193; paramDetObject193.descripcion = 'OF AYACUCHO'; paramDetObject193.estado = 'A'; paramDetObjectList.push(paramDetObject193);
    let paramDetObject194 = new ParametroDetalleFire();  paramDetObject194.codigo =194; paramDetObject194.descripcion = 'OF PISAC'; paramDetObject194.estado = 'A'; paramDetObjectList.push(paramDetObject194);
    let paramDetObject195 = new ParametroDetalleFire();  paramDetObject195.codigo =195; paramDetObject195.descripcion = 'OF URCOS'; paramDetObject195.estado = 'A'; paramDetObjectList.push(paramDetObject195);
    let paramDetObject196 = new ParametroDetalleFire();  paramDetObject196.codigo =196; paramDetObject196.descripcion = 'OF ANTA'; paramDetObject196.estado = 'A'; paramDetObjectList.push(paramDetObject196);
    let paramDetObject197 = new ParametroDetalleFire();  paramDetObject197.codigo =197; paramDetObject197.descripcion = 'OF ABANCAY'; paramDetObject197.estado = 'A'; paramDetObjectList.push(paramDetObject197);
    let paramDetObject198 = new ParametroDetalleFire();  paramDetObject198.codigo =198; paramDetObject198.descripcion = 'TERRITORIO SUR'; paramDetObject198.estado = 'A'; paramDetObjectList.push(paramDetObject198);
    let paramDetObject199 = new ParametroDetalleFire();  paramDetObject199.codigo =199; paramDetObject199.descripcion = 'REGION SUR 1'; paramDetObject199.estado = 'A'; paramDetObjectList.push(paramDetObject199);
    let paramDetObject200 = new ParametroDetalleFire();  paramDetObject200.codigo =200; paramDetObject200.descripcion = 'OF CAMANA'; paramDetObject200.estado = 'A'; paramDetObjectList.push(paramDetObject200);
    let paramDetObject201 = new ParametroDetalleFire();  paramDetObject201.codigo =201; paramDetObject201.descripcion = 'OF AREQUIPA'; paramDetObject201.estado = 'A'; paramDetObjectList.push(paramDetObject201);
    let paramDetObject202 = new ParametroDetalleFire();  paramDetObject202.codigo =202; paramDetObject202.descripcion = 'OF MOLLENDO'; paramDetObject202.estado = 'A'; paramDetObjectList.push(paramDetObject202);
    let paramDetObject203 = new ParametroDetalleFire();  paramDetObject203.codigo =203; paramDetObject203.descripcion = 'OF CORIRE'; paramDetObject203.estado = 'A'; paramDetObjectList.push(paramDetObject203);
    let paramDetObject204 = new ParametroDetalleFire();  paramDetObject204.codigo =204; paramDetObject204.descripcion = 'OF EL PEDREGAL'; paramDetObject204.estado = 'A'; paramDetObjectList.push(paramDetObject204);
    let paramDetObject205 = new ParametroDetalleFire();  paramDetObject205.codigo =205; paramDetObject205.descripcion = 'OF C.C. LA NEGRITA'; paramDetObject205.estado = 'A'; paramDetObjectList.push(paramDetObject205);
    let paramDetObject206 = new ParametroDetalleFire();  paramDetObject206.codigo =206; paramDetObject206.descripcion = 'OF CAYMA'; paramDetObject206.estado = 'A'; paramDetObjectList.push(paramDetObject206);
    let paramDetObject207 = new ParametroDetalleFire();  paramDetObject207.codigo =207; paramDetObject207.descripcion = 'OF LA JOYA'; paramDetObject207.estado = 'A'; paramDetObjectList.push(paramDetObject207);
    let paramDetObject208 = new ParametroDetalleFire();  paramDetObject208.codigo =208; paramDetObject208.descripcion = 'OF CHIVAY'; paramDetObject208.estado = 'A'; paramDetObjectList.push(paramDetObject208);
    let paramDetObject209 = new ParametroDetalleFire();  paramDetObject209.codigo =209; paramDetObject209.descripcion = 'OF COCACHACRA'; paramDetObject209.estado = 'A'; paramDetObjectList.push(paramDetObject209);
    let paramDetObject210 = new ParametroDetalleFire();  paramDetObject210.codigo =210; paramDetObject210.descripcion = 'OF AVELINO CACERES'; paramDetObject210.estado = 'A'; paramDetObjectList.push(paramDetObject210);
    let paramDetObject211 = new ParametroDetalleFire();  paramDetObject211.codigo =211; paramDetObject211.descripcion = 'OF SOCABAYA'; paramDetObject211.estado = 'I'; paramDetObjectList.push(paramDetObject211);
    let paramDetObject214 = new ParametroDetalleFire();  paramDetObject214.codigo =214; paramDetObject214.descripcion = 'OF SANTA RITA DE SIGUAS'; paramDetObject214.estado = 'I'; paramDetObjectList.push(paramDetObject214);
    let paramDetObject215 = new ParametroDetalleFire();  paramDetObject215.codigo =215; paramDetObject215.descripcion = 'OF CHUQUIBAMBA'; paramDetObject215.estado = 'A'; paramDetObjectList.push(paramDetObject215);
    let paramDetObject218 = new ParametroDetalleFire();  paramDetObject218.codigo =218; paramDetObject218.descripcion = 'REGION SUR 2'; paramDetObject218.estado = 'A'; paramDetObjectList.push(paramDetObject218);
    let paramDetObject219 = new ParametroDetalleFire();  paramDetObject219.codigo =219; paramDetObject219.descripcion = 'OF JULIACA'; paramDetObject219.estado = 'A'; paramDetObjectList.push(paramDetObject219);
    let paramDetObject220 = new ParametroDetalleFire();  paramDetObject220.codigo =220; paramDetObject220.descripcion = 'OF PUNO'; paramDetObject220.estado = 'A'; paramDetObjectList.push(paramDetObject220);
    let paramDetObject221 = new ParametroDetalleFire();  paramDetObject221.codigo =221; paramDetObject221.descripcion = 'OF TACNA'; paramDetObject221.estado = 'A'; paramDetObjectList.push(paramDetObject221);
    let paramDetObject223 = new ParametroDetalleFire();  paramDetObject223.codigo =223; paramDetObject223.descripcion = 'OF MOQUEGUA'; paramDetObject223.estado = 'A'; paramDetObjectList.push(paramDetObject223);
    let paramDetObject224 = new ParametroDetalleFire();  paramDetObject224.codigo =224; paramDetObject224.descripcion = 'OF CONO NORTE'; paramDetObject224.estado = 'A'; paramDetObjectList.push(paramDetObject224);
    let paramDetObject225 = new ParametroDetalleFire();  paramDetObject225.codigo =225; paramDetObject225.descripcion = 'OF CONO SUR'; paramDetObject225.estado = 'A'; paramDetObjectList.push(paramDetObject225);
    let paramDetObject226 = new ParametroDetalleFire();  paramDetObject226.codigo =226; paramDetObject226.descripcion = 'OF PAMPA INALAMBRICA'; paramDetObject226.estado = 'A'; paramDetObjectList.push(paramDetObject226);
    let paramDetObject228 = new ParametroDetalleFire();  paramDetObject228.codigo =228; paramDetObject228.descripcion = 'BN LOCUMBA'; paramDetObject228.estado = 'A'; paramDetObjectList.push(paramDetObject228);
    let paramDetObject229 = new ParametroDetalleFire();  paramDetObject229.codigo =229; paramDetObject229.descripcion = 'BN TARATA'; paramDetObject229.estado = 'A'; paramDetObjectList.push(paramDetObject229);
    let paramDetObject230 = new ParametroDetalleFire();  paramDetObject230.codigo =230; paramDetObject230.descripcion = 'BN CANDARAVE'; paramDetObject230.estado = 'A'; paramDetObjectList.push(paramDetObject230);
    let paramDetObject231 = new ParametroDetalleFire();  paramDetObject231.codigo =231; paramDetObject231.descripcion = 'BN TORATA'; paramDetObject231.estado = 'A'; paramDetObjectList.push(paramDetObject231);
    let paramDetObject232 = new ParametroDetalleFire();  paramDetObject232.codigo =232; paramDetObject232.descripcion = 'TAMBO PLUS OMATE'; paramDetObject232.estado = 'A'; paramDetObjectList.push(paramDetObject232);
    let paramDetObject233 = new ParametroDetalleFire();  paramDetObject233.codigo =233; paramDetObject233.descripcion = 'MARKETING'; paramDetObject233.estado = 'A'; paramDetObjectList.push(paramDetObject233);
    let paramDetObject234 = new ParametroDetalleFire();  paramDetObject234.codigo =234; paramDetObject234.descripcion = 'PRODUCTO PASIVOS'; paramDetObject234.estado = 'A'; paramDetObjectList.push(paramDetObject234);
    let paramDetObject235 = new ParametroDetalleFire();  paramDetObject235.codigo =235; paramDetObject235.descripcion = 'PP TERRITORIO NORTE'; paramDetObject235.estado = 'A'; paramDetObjectList.push(paramDetObject235);
    let paramDetObject236 = new ParametroDetalleFire();  paramDetObject236.codigo =236; paramDetObject236.descripcion = 'PP TERRITORIO LIMA ORIENTE'; paramDetObject236.estado = 'A'; paramDetObjectList.push(paramDetObject236);
    let paramDetObject237 = new ParametroDetalleFire();  paramDetObject237.codigo =237; paramDetObject237.descripcion = 'PP TERRITORIO CENTRO'; paramDetObject237.estado = 'A'; paramDetObjectList.push(paramDetObject237);
    let paramDetObject238 = new ParametroDetalleFire();  paramDetObject238.codigo =238; paramDetObject238.descripcion = 'PP TERRITORIO SUR'; paramDetObject238.estado = 'A'; paramDetObjectList.push(paramDetObject238);
    let paramDetObject239 = new ParametroDetalleFire();  paramDetObject239.codigo =239; paramDetObject239.descripcion = 'PRODUCTO CREDITOS'; paramDetObject239.estado = 'A'; paramDetObjectList.push(paramDetObject239);
    let paramDetObject240 = new ParametroDetalleFire();  paramDetObject240.codigo =240; paramDetObject240.descripcion = 'PRODUCTO SEGUROS Y ALIANZAS'; paramDetObject240.estado = 'A'; paramDetObjectList.push(paramDetObject240);
    let paramDetObject241 = new ParametroDetalleFire();  paramDetObject241.codigo =241; paramDetObject241.descripcion = 'PROYECTOS ESPECIALES'; paramDetObject241.estado = 'A'; paramDetObjectList.push(paramDetObject241);
    let paramDetObject242 = new ParametroDetalleFire();  paramDetObject242.codigo =242; paramDetObject242.descripcion = 'DESARROLLO DE NEGOCIO E INNOVACION'; paramDetObject242.estado = 'A'; paramDetObjectList.push(paramDetObject242);
    let paramDetObject243 = new ParametroDetalleFire();  paramDetObject243.codigo =243; paramDetObject243.descripcion = 'CANALES'; paramDetObject243.estado = 'A'; paramDetObjectList.push(paramDetObject243);
    let paramDetObject244 = new ParametroDetalleFire();  paramDetObject244.codigo =244; paramDetObject244.descripcion = 'ESQUEMAS DE GESTION COMERCIAL'; paramDetObject244.estado = 'A'; paramDetObjectList.push(paramDetObject244);
    let paramDetObject245 = new ParametroDetalleFire();  paramDetObject245.codigo =245; paramDetObject245.descripcion = 'FINANZAS'; paramDetObject245.estado = 'A'; paramDetObjectList.push(paramDetObject245);
    let paramDetObject246 = new ParametroDetalleFire();  paramDetObject246.codigo =246; paramDetObject246.descripcion = 'PLANIFICACION, CONTROL E INFORMACION DE GESTION'; paramDetObject246.estado = 'A'; paramDetObjectList.push(paramDetObject246);
    let paramDetObject247 = new ParametroDetalleFire();  paramDetObject247.codigo =247; paramDetObject247.descripcion = 'GESTION Y CONTROL PRESUPUESTAL'; paramDetObject247.estado = 'A'; paramDetObjectList.push(paramDetObject247);
    let paramDetObject248 = new ParametroDetalleFire();  paramDetObject248.codigo =248; paramDetObject248.descripcion = 'CONTROL DE GESTION'; paramDetObject248.estado = 'A'; paramDetObjectList.push(paramDetObject248);
    let paramDetObject249 = new ParametroDetalleFire();  paramDetObject249.codigo =249; paramDetObject249.descripcion = 'DESARROLLO Y METODOLOGIAS'; paramDetObject249.estado = 'A'; paramDetObjectList.push(paramDetObject249);
    let paramDetObject250 = new ParametroDetalleFire();  paramDetObject250.codigo =250; paramDetObject250.descripcion = 'TESORERIA'; paramDetObject250.estado = 'A'; paramDetObjectList.push(paramDetObject250);
    let paramDetObject251 = new ParametroDetalleFire();  paramDetObject251.codigo =251; paramDetObject251.descripcion = 'GESTION FINANCIERA'; paramDetObject251.estado = 'A'; paramDetObjectList.push(paramDetObject251);
    let paramDetObject252 = new ParametroDetalleFire();  paramDetObject252.codigo =252; paramDetObject252.descripcion = 'CONTABILIDAD'; paramDetObject252.estado = 'A'; paramDetObjectList.push(paramDetObject252);
    let paramDetObject253 = new ParametroDetalleFire();  paramDetObject253.codigo =253; paramDetObject253.descripcion = 'GESTION CONTABLE'; paramDetObject253.estado = 'A'; paramDetObjectList.push(paramDetObject253);
    let paramDetObject254 = new ParametroDetalleFire();  paramDetObject254.codigo =254; paramDetObject254.descripcion = 'GESTION TRIBUTARIA'; paramDetObject254.estado = 'A'; paramDetObjectList.push(paramDetObject254);
    let paramDetObject255 = new ParametroDetalleFire();  paramDetObject255.codigo =255; paramDetObject255.descripcion = 'REGISTRO Y CONTROL DE PAGOS'; paramDetObject255.estado = 'A'; paramDetObjectList.push(paramDetObject255);
    let paramDetObject256 = new ParametroDetalleFire();  paramDetObject256.codigo =256; paramDetObject256.descripcion = 'MEDIOS'; paramDetObject256.estado = 'A'; paramDetObjectList.push(paramDetObject256);
    let paramDetObject257 = new ParametroDetalleFire();  paramDetObject257.codigo =257; paramDetObject257.descripcion = 'OFICINA DE PROYECTOS'; paramDetObject257.estado = 'A'; paramDetObjectList.push(paramDetObject257);
    let paramDetObject258 = new ParametroDetalleFire();  paramDetObject258.codigo =258; paramDetObject258.descripcion = 'SEGURIDAD'; paramDetObject258.estado = 'A'; paramDetObjectList.push(paramDetObject258);
    let paramDetObject259 = new ParametroDetalleFire();  paramDetObject259.codigo =259; paramDetObject259.descripcion = 'ADMINISTRACION'; paramDetObject259.estado = 'A'; paramDetObjectList.push(paramDetObject259);
    let paramDetObject260 = new ParametroDetalleFire();  paramDetObject260.codigo =260; paramDetObject260.descripcion = 'COMPRAS Y CONTRATOS'; paramDetObject260.estado = 'A'; paramDetObjectList.push(paramDetObject260);
    let paramDetObject261 = new ParametroDetalleFire();  paramDetObject261.codigo =261; paramDetObject261.descripcion = 'GESTION DE INMUEBLES Y ACTIVOS FIJOS'; paramDetObject261.estado = 'A'; paramDetObjectList.push(paramDetObject261);
    let paramDetObject262 = new ParametroDetalleFire();  paramDetObject262.codigo =262; paramDetObject262.descripcion = 'SISTEMAS Y PROCESOS'; paramDetObject262.estado = 'I'; paramDetObjectList.push(paramDetObject262);
    let paramDetObject263 = new ParametroDetalleFire();  paramDetObject263.codigo =263; paramDetObject263.descripcion = 'GESTION POR PROCESOS'; paramDetObject263.estado = 'A'; paramDetObjectList.push(paramDetObject263);
    let paramDetObject264 = new ParametroDetalleFire();  paramDetObject264.codigo =264; paramDetObject264.descripcion = 'ARQUITECTURA NORMATIVA'; paramDetObject264.estado = 'A'; paramDetObjectList.push(paramDetObject264);
    let paramDetObject265 = new ParametroDetalleFire();  paramDetObject265.codigo =265; paramDetObject265.descripcion = 'PROYECT MANAGER'; paramDetObject265.estado = 'I'; paramDetObjectList.push(paramDetObject265);
    let paramDetObject266 = new ParametroDetalleFire();  paramDetObject266.codigo =266; paramDetObject266.descripcion = 'GESTION DE LA DEMANDA'; paramDetObject266.estado = 'I'; paramDetObjectList.push(paramDetObject266);
    let paramDetObject267 = new ParametroDetalleFire();  paramDetObject267.codigo =267; paramDetObject267.descripcion = 'PRODUCTOS PASIVOS Y OPERACIONES'; paramDetObject267.estado = 'I'; paramDetObjectList.push(paramDetObject267);
    let paramDetObject268 = new ParametroDetalleFire();  paramDetObject268.codigo =268; paramDetObject268.descripcion = 'REGULATORIOS Y BI'; paramDetObject268.estado = 'I'; paramDetObjectList.push(paramDetObject268);
    let paramDetObject269 = new ParametroDetalleFire();  paramDetObject269.codigo =269; paramDetObject269.descripcion = 'MANTENIMIENTO DE SOFTWARE Y CORRECTIVOS'; paramDetObject269.estado = 'I'; paramDetObjectList.push(paramDetObject269);
    let paramDetObject270 = new ParametroDetalleFire();  paramDetObject270.codigo =270; paramDetObject270.descripcion = 'TECNOLOGIA Y EXPLOTACION'; paramDetObject270.estado = 'A'; paramDetObjectList.push(paramDetObject270);
    let paramDetObject271 = new ParametroDetalleFire();  paramDetObject271.codigo =271; paramDetObject271.descripcion = 'INFRAESTRUCTURA DE SISTEMAS'; paramDetObject271.estado = 'A'; paramDetObjectList.push(paramDetObject271);
    let paramDetObject272 = new ParametroDetalleFire();  paramDetObject272.codigo =272; paramDetObject272.descripcion = 'PRODUCCION'; paramDetObject272.estado = 'A'; paramDetObjectList.push(paramDetObject272);
    let paramDetObject273 = new ParametroDetalleFire();  paramDetObject273.codigo =273; paramDetObject273.descripcion = 'SERVICIOS DE TECNOLOGIA'; paramDetObject273.estado = 'A'; paramDetObjectList.push(paramDetObject273);
    let paramDetObject274 = new ParametroDetalleFire();  paramDetObject274.codigo =274; paramDetObject274.descripcion = 'OPERACIONES'; paramDetObject274.estado = 'A'; paramDetObjectList.push(paramDetObject274);
    let paramDetObject275 = new ParametroDetalleFire();  paramDetObject275.codigo =275; paramDetObject275.descripcion = 'PROCESOS OPERATIVOS'; paramDetObject275.estado = 'A'; paramDetObjectList.push(paramDetObject275);
    let paramDetObject276 = new ParametroDetalleFire();  paramDetObject276.codigo =276; paramDetObject276.descripcion = 'CAJA CENTRAL'; paramDetObject276.estado = 'A'; paramDetObjectList.push(paramDetObject276);
    let paramDetObject277 = new ParametroDetalleFire();  paramDetObject277.codigo =277; paramDetObject277.descripcion = 'BANCA ELECTRONICA Y CANALES'; paramDetObject277.estado = 'A'; paramDetObjectList.push(paramDetObject277);
    let paramDetObject278 = new ParametroDetalleFire();  paramDetObject278.codigo =278; paramDetObject278.descripcion = 'PROCESOS MASIVOS'; paramDetObject278.estado = 'A'; paramDetObjectList.push(paramDetObject278);
    let paramDetObject279 = new ParametroDetalleFire();  paramDetObject279.codigo =279; paramDetObject279.descripcion = 'RIESGOS'; paramDetObject279.estado = 'A'; paramDetObjectList.push(paramDetObject279);
    let paramDetObject280 = new ParametroDetalleFire();  paramDetObject280.codigo =280; paramDetObject280.descripcion = 'ADMISION Y SEGUIMIENTO'; paramDetObject280.estado = 'A'; paramDetObjectList.push(paramDetObject280);
    let paramDetObject281 = new ParametroDetalleFire();  paramDetObject281.codigo =281; paramDetObject281.descripcion = 'ADMISION DE RIESGO DE CREDITO'; paramDetObject281.estado = 'A'; paramDetObjectList.push(paramDetObject281);
    let paramDetObject282 = new ParametroDetalleFire();  paramDetObject282.codigo =282; paramDetObject282.descripcion = 'ARC TERRITORIO NORTE'; paramDetObject282.estado = 'A'; paramDetObjectList.push(paramDetObject282);
    let paramDetObject283 = new ParametroDetalleFire();  paramDetObject283.codigo =283; paramDetObject283.descripcion = 'ARC TERRITORIO LIMA ORIENTE'; paramDetObject283.estado = 'A'; paramDetObjectList.push(paramDetObject283);
    let paramDetObject284 = new ParametroDetalleFire();  paramDetObject284.codigo =284; paramDetObject284.descripcion = 'ARC TERRITORIO CENTRO'; paramDetObject284.estado = 'A'; paramDetObjectList.push(paramDetObject284);
    let paramDetObject285 = new ParametroDetalleFire();  paramDetObject285.codigo =285; paramDetObject285.descripcion = 'ARC TERRITORIO SUR'; paramDetObject285.estado = 'A'; paramDetObjectList.push(paramDetObject285);
    let paramDetObject286 = new ParametroDetalleFire();  paramDetObject286.codigo =286; paramDetObject286.descripcion = 'SEGUIMIENTO'; paramDetObject286.estado = 'I'; paramDetObjectList.push(paramDetObject286);
    let paramDetObject287 = new ParametroDetalleFire();  paramDetObject287.codigo =287; paramDetObject287.descripcion = 'SEG TERRITORIO NORTE'; paramDetObject287.estado = 'A'; paramDetObjectList.push(paramDetObject287);
    let paramDetObject288 = new ParametroDetalleFire();  paramDetObject288.codigo =288; paramDetObject288.descripcion = 'SEG TERRITORIO LIMA ORIENTE'; paramDetObject288.estado = 'A'; paramDetObjectList.push(paramDetObject288);
    let paramDetObject289 = new ParametroDetalleFire();  paramDetObject289.codigo =289; paramDetObject289.descripcion = 'SEG TERRITORIO CENTRO'; paramDetObject289.estado = 'A'; paramDetObjectList.push(paramDetObject289);
    let paramDetObject290 = new ParametroDetalleFire();  paramDetObject290.codigo =290; paramDetObject290.descripcion = 'SEG TERRITORIO SUR'; paramDetObject290.estado = 'A'; paramDetObjectList.push(paramDetObject290);
    let paramDetObject291 = new ParametroDetalleFire();  paramDetObject291.codigo =291; paramDetObject291.descripcion = 'RECUPERACIONES'; paramDetObject291.estado = 'A'; paramDetObjectList.push(paramDetObject291);
    let paramDetObject292 = new ParametroDetalleFire();  paramDetObject292.codigo =292; paramDetObject292.descripcion = 'GESTION Y ESTRATEGIA DE RECUPERACIONES'; paramDetObject292.estado = 'A'; paramDetObjectList.push(paramDetObject292);
    let paramDetObject293 = new ParametroDetalleFire();  paramDetObject293.codigo =293; paramDetObject293.descripcion = 'GE RE TERRITORIO NORTE'; paramDetObject293.estado = 'A'; paramDetObjectList.push(paramDetObject293);
    let paramDetObject294 = new ParametroDetalleFire();  paramDetObject294.codigo =294; paramDetObject294.descripcion = 'GE RE TERRITORIO LIMA ORIENTE'; paramDetObject294.estado = 'A'; paramDetObjectList.push(paramDetObject294);
    let paramDetObject295 = new ParametroDetalleFire();  paramDetObject295.codigo =295; paramDetObject295.descripcion = 'GE RE TERRITORIO CENTRO'; paramDetObject295.estado = 'A'; paramDetObjectList.push(paramDetObject295);
    let paramDetObject296 = new ParametroDetalleFire();  paramDetObject296.codigo =296; paramDetObject296.descripcion = 'GE RE TERRITORIO SUR'; paramDetObject296.estado = 'A'; paramDetObjectList.push(paramDetObject296);
    let paramDetObject297 = new ParametroDetalleFire();  paramDetObject297.codigo =297; paramDetObject297.descripcion = 'GESTION GLOBAL DEL RIESGO'; paramDetObject297.estado = 'A'; paramDetObjectList.push(paramDetObject297);
    let paramDetObject298 = new ParametroDetalleFire();  paramDetObject298.codigo =298; paramDetObject298.descripcion = 'ANALISIS DE RIESGO Y REGULACION'; paramDetObject298.estado = 'A'; paramDetObjectList.push(paramDetObject298);
    let paramDetObject299 = new ParametroDetalleFire();  paramDetObject299.codigo =299; paramDetObject299.descripcion = 'MODELOS Y GESTION DE POLITICAS'; paramDetObject299.estado = 'A'; paramDetObjectList.push(paramDetObject299);
    let paramDetObject300 = new ParametroDetalleFire();  paramDetObject300.codigo =300; paramDetObject300.descripcion = 'SERVICIOS JURIDICOS'; paramDetObject300.estado = 'A'; paramDetObjectList.push(paramDetObject300);
    let paramDetObject301 = new ParametroDetalleFire();  paramDetObject301.codigo =301; paramDetObject301.descripcion = 'SUB SECRETARIA'; paramDetObject301.estado = 'A'; paramDetObjectList.push(paramDetObject301);
    let paramDetObject302 = new ParametroDetalleFire();  paramDetObject302.codigo =302; paramDetObject302.descripcion = 'NEGOCIO BANCARIO Y CONTRATACION'; paramDetObject302.estado = 'A'; paramDetObjectList.push(paramDetObject302);
    let paramDetObject303 = new ParametroDetalleFire();  paramDetObject303.codigo =303; paramDetObject303.descripcion = 'NEG BC TERRITORIO NORTE'; paramDetObject303.estado = 'A'; paramDetObjectList.push(paramDetObject303);
    let paramDetObject304 = new ParametroDetalleFire();  paramDetObject304.codigo =304; paramDetObject304.descripcion = 'NEG BC TERRITORIO LIMA ORIENTE Y CENTRO'; paramDetObject304.estado = 'A'; paramDetObjectList.push(paramDetObject304);
    let paramDetObject305 = new ParametroDetalleFire();  paramDetObject305.codigo =305; paramDetObject305.descripcion = 'NEG BC TERRITORIO CENTRO'; paramDetObject305.estado = 'A'; paramDetObjectList.push(paramDetObject305);
    let paramDetObject306 = new ParametroDetalleFire();  paramDetObject306.codigo =306; paramDetObject306.descripcion = 'NEG BC TERRITORIO SUR'; paramDetObject306.estado = 'A'; paramDetObjectList.push(paramDetObject306);
    let paramDetObject307 = new ParametroDetalleFire();  paramDetObject307.codigo =307; paramDetObject307.descripcion = 'ASUNTOS ADMINISTRATIVOS Y CONTROL INTERNO'; paramDetObject307.estado = 'A'; paramDetObjectList.push(paramDetObject307);
    let paramDetObject308 = new ParametroDetalleFire();  paramDetObject308.codigo =308; paramDetObject308.descripcion = 'ASUNTOS CONTENCIOSOS'; paramDetObject308.estado = 'A'; paramDetObjectList.push(paramDetObject308);
    let paramDetObject309 = new ParametroDetalleFire();  paramDetObject309.codigo =309; paramDetObject309.descripcion = 'ASUNTOS REGULATORIOS'; paramDetObject309.estado = 'A'; paramDetObjectList.push(paramDetObject309);
    let paramDetObject310 = new ParametroDetalleFire();  paramDetObject310.codigo =310; paramDetObject310.descripcion = 'ESTUDIOS ECONOMICOS'; paramDetObject310.estado = 'A'; paramDetObjectList.push(paramDetObject310);
    let paramDetObject311 = new ParametroDetalleFire();  paramDetObject311.codigo =311; paramDetObject311.descripcion = 'ESTUDIOS DEL ENTORNO Y LA COMPETENCIA'; paramDetObject311.estado = 'I'; paramDetObjectList.push(paramDetObject311);
    let paramDetObject312 = new ParametroDetalleFire();  paramDetObject312.codigo =312; paramDetObject312.descripcion = 'DESEMPEÑO SOCIAL'; paramDetObject312.estado = 'A'; paramDetObjectList.push(paramDetObject312);
    let paramDetObject313 = new ParametroDetalleFire();  paramDetObject313.codigo =313; paramDetObject313.descripcion = 'ANALITICA DE NEGOCIOS'; paramDetObject313.estado = 'A'; paramDetObjectList.push(paramDetObject313);
    let paramDetObject314 = new ParametroDetalleFire();  paramDetObject314.codigo =314; paramDetObject314.descripcion = 'GESTION HUMANA'; paramDetObject314.estado = 'A'; paramDetObjectList.push(paramDetObject314);
    let paramDetObject315 = new ParametroDetalleFire();  paramDetObject315.codigo =315; paramDetObject315.descripcion = 'GESTION DE LA NOMINA E INFORMACION'; paramDetObject315.estado = 'A'; paramDetObjectList.push(paramDetObject315);
    let paramDetObject316 = new ParametroDetalleFire();  paramDetObject316.codigo =316; paramDetObject316.descripcion = 'GESTION DE INFORMACION Y PRESUPUESTO'; paramDetObject316.estado = 'A'; paramDetObjectList.push(paramDetObject316);
    let paramDetObject317 = new ParametroDetalleFire();  paramDetObject317.codigo =317; paramDetObject317.descripcion = 'ASUNTOS LABORALES Y GESTION DE LA DISCIPLINA'; paramDetObject317.estado = 'I'; paramDetObjectList.push(paramDetObject317);
    let paramDetObject318 = new ParametroDetalleFire();  paramDetObject318.codigo =318; paramDetObject318.descripcion = 'GESTION CENTRALIZADA DE PERSONAS'; paramDetObject318.estado = 'A'; paramDetObjectList.push(paramDetObject318);
    let paramDetObject319 = new ParametroDetalleFire();  paramDetObject319.codigo =319; paramDetObject319.descripcion = 'INCORPORACION, FORMACION Y DESARROLLO'; paramDetObject319.estado = 'A'; paramDetObjectList.push(paramDetObject319);
    let paramDetObject320 = new ParametroDetalleFire();  paramDetObject320.codigo =320; paramDetObject320.descripcion = 'GH TERRITORIO NORTE'; paramDetObject320.estado = 'A'; paramDetObjectList.push(paramDetObject320);
    let paramDetObject321 = new ParametroDetalleFire();  paramDetObject321.codigo =321; paramDetObject321.descripcion = 'GH TERRITORIO LIMA ORIENTE'; paramDetObject321.estado = 'A'; paramDetObjectList.push(paramDetObject321);
    let paramDetObject322 = new ParametroDetalleFire();  paramDetObject322.codigo =322; paramDetObject322.descripcion = 'GH TERRITORIO CENTRO'; paramDetObject322.estado = 'A'; paramDetObjectList.push(paramDetObject322);
    let paramDetObject323 = new ParametroDetalleFire();  paramDetObject323.codigo =323; paramDetObject323.descripcion = 'GH TERRITORIO SUR'; paramDetObject323.estado = 'A'; paramDetObjectList.push(paramDetObject323);
    let paramDetObject324 = new ParametroDetalleFire();  paramDetObject324.codigo =324; paramDetObject324.descripcion = 'RIESGO OPERACIONAL'; paramDetObject324.estado = 'A'; paramDetObjectList.push(paramDetObject324);
    let paramDetObject325 = new ParametroDetalleFire();  paramDetObject325.codigo =325; paramDetObject325.descripcion = 'OF CIUDAD CONSTITUCION'; paramDetObject325.estado = 'A'; paramDetObjectList.push(paramDetObject325);
    let paramDetObject326 = new ParametroDetalleFire();  paramDetObject326.codigo =326; paramDetObject326.descripcion = 'OF BN PAUCARTAMBO '; paramDetObject326.estado = 'A'; paramDetObjectList.push(paramDetObject326);
    let paramDetObject327 = new ParametroDetalleFire();  paramDetObject327.codigo =327; paramDetObject327.descripcion = 'UNIDAD OPE. CESADOS'; paramDetObject327.estado = 'A'; paramDetObjectList.push(paramDetObject327);
    let paramDetObject328 = new ParametroDetalleFire();  paramDetObject328.codigo =328; paramDetObject328.descripcion = 'SISTEMAS'; paramDetObject328.estado = 'A'; paramDetObjectList.push(paramDetObject328);
    let paramDetObject329 = new ParametroDetalleFire();  paramDetObject329.codigo =329; paramDetObject329.descripcion = 'COMUNICACIÓN E IMAGEN'; paramDetObject329.estado = 'A'; paramDetObjectList.push(paramDetObject329);
    let paramDetObject330 = new ParametroDetalleFire();  paramDetObject330.codigo =330; paramDetObject330.descripcion = 'ESTRUCTURAS Y PROCESOS'; paramDetObject330.estado = 'A'; paramDetObjectList.push(paramDetObject330);
    let paramDetObject331 = new ParametroDetalleFire();  paramDetObject331.codigo =331; paramDetObject331.descripcion = 'TERRITORIO NOR ANDINO'; paramDetObject331.estado = 'A'; paramDetObjectList.push(paramDetObject331);
    let paramDetObject332 = new ParametroDetalleFire();  paramDetObject332.codigo =332; paramDetObject332.descripcion = 'PLANIFICACION Y ANALISIS'; paramDetObject332.estado = 'A'; paramDetObjectList.push(paramDetObject332);
    let paramDetObject333 = new ParametroDetalleFire();  paramDetObject333.codigo =333; paramDetObject333.descripcion = 'SERVICIOS GENERALES'; paramDetObject333.estado = 'A'; paramDetObjectList.push(paramDetObject333);
    let paramDetObject334 = new ParametroDetalleFire();  paramDetObject334.codigo =334; paramDetObject334.descripcion = 'GE RE TERRITORIO NOR ANDINO'; paramDetObject334.estado = 'A'; paramDetObjectList.push(paramDetObject334);
    let paramDetObject335 = new ParametroDetalleFire();  paramDetObject335.codigo =335; paramDetObject335.descripcion = 'ARC TERRITORIO NOR ANDINO'; paramDetObject335.estado = 'A'; paramDetObjectList.push(paramDetObject335);
    let paramDetObject336 = new ParametroDetalleFire();  paramDetObject336.codigo =336; paramDetObject336.descripcion = 'SEG TERRITORIO NOR ANDINO'; paramDetObject336.estado = 'A'; paramDetObjectList.push(paramDetObject336);
    let paramDetObject337 = new ParametroDetalleFire();  paramDetObject337.codigo =337; paramDetObject337.descripcion = 'PLANIFICACION Y GESTION DE PROYECTOS'; paramDetObject337.estado = 'A'; paramDetObjectList.push(paramDetObject337);
    let paramDetObject338 = new ParametroDetalleFire();  paramDetObject338.codigo =338; paramDetObject338.descripcion = 'SOFTWARE FACTORY'; paramDetObject338.estado = 'A'; paramDetObjectList.push(paramDetObject338);
    let paramDetObject339 = new ParametroDetalleFire();  paramDetObject339.codigo =339; paramDetObject339.descripcion = 'Regulatorios, No Core y BI'; paramDetObject339.estado = 'A'; paramDetObjectList.push(paramDetObject339);
    let paramDetObject340 = new ParametroDetalleFire();  paramDetObject340.codigo =340; paramDetObject340.descripcion = 'Mantenimiento y Correctivos de Software'; paramDetObject340.estado = 'A'; paramDetObjectList.push(paramDetObject340);
    let paramDetObject341 = new ParametroDetalleFire();  paramDetObject341.codigo =341; paramDetObject341.descripcion = 'CUMPLIMIENTO GRLA/FT'; paramDetObject341.estado = 'A'; paramDetObjectList.push(paramDetObject341);
    let paramDetObject342 = new ParametroDetalleFire();  paramDetObject342.codigo =342; paramDetObject342.descripcion = 'ASUNTOS LABORALES'; paramDetObject342.estado = 'A'; paramDetObjectList.push(paramDetObject342);
    let paramDetObject343 = new ParametroDetalleFire();  paramDetObject343.codigo =343; paramDetObject343.descripcion = 'TAMBO PLUS PAUCARTAMBO'; paramDetObject343.estado = 'A'; paramDetObjectList.push(paramDetObject343);
    let paramDetObject344 = new ParametroDetalleFire();  paramDetObject344.codigo =344; paramDetObject344.descripcion = 'TAMBO PLUS TOCACHE'; paramDetObject344.estado = 'A'; paramDetObjectList.push(paramDetObject344);
    let paramDetObject345 = new ParametroDetalleFire();  paramDetObject345.codigo =345; paramDetObject345.descripcion = 'ESTRATEGIA Y FINANZAS'; paramDetObject345.estado = 'A'; paramDetObjectList.push(paramDetObject345);
    let paramDetObject346 = new ParametroDetalleFire();  paramDetObject346.codigo =346; paramDetObject346.descripcion = 'PLANIFICACIÓN FINANCIERA Y CONTROL DE GESTIÓN'; paramDetObject346.estado = 'A'; paramDetObjectList.push(paramDetObject346);
    let paramDetObject347 = new ParametroDetalleFire();  paramDetObject347.codigo =347; paramDetObject347.descripcion = 'CONTROL PRESUPUESTAL'; paramDetObject347.estado = 'A'; paramDetObjectList.push(paramDetObject347);
    let paramDetObject348 = new ParametroDetalleFire();  paramDetObject348.codigo =348; paramDetObject348.descripcion = 'SISTEMAS DE INFORMACIÓN DE GESTIÓN'; paramDetObject348.estado = 'A'; paramDetObjectList.push(paramDetObject348);
    let paramDetObject349 = new ParametroDetalleFire();  paramDetObject349.codigo =349; paramDetObject349.descripcion = 'PLANIFICACIÓN Y PRESUPUESTO'; paramDetObject349.estado = 'A'; paramDetObjectList.push(paramDetObject349);
    let paramDetObject350 = new ParametroDetalleFire();  paramDetObject350.codigo =350; paramDetObject350.descripcion = 'GESTIÓN INTEGRAL DEL RIESGO'; paramDetObject350.estado = 'A'; paramDetObjectList.push(paramDetObject350);
    let paramDetObject351 = new ParametroDetalleFire();  paramDetObject351.codigo =351; paramDetObject351.descripcion = 'MODELOS Y ORIGINACIÓN'; paramDetObject351.estado = 'A'; paramDetObjectList.push(paramDetObject351);
    let paramDetObject352 = new ParametroDetalleFire();  paramDetObject352.codigo =352; paramDetObject352.descripcion = 'RIESGO OPERACIONAL, CONTINUIDAD DEL NEGOCIO Y SEGURIDAD DE LA INFORMACIÓN'; paramDetObject352.estado = 'A'; paramDetObjectList.push(paramDetObject352);
    let paramDetObject353 = new ParametroDetalleFire();  paramDetObject353.codigo =353; paramDetObject353.descripcion = 'SEGURIDAD DE LA INFORMACIÓN'; paramDetObject353.estado = 'A'; paramDetObjectList.push(paramDetObject353);
    let paramDetObject354 = new ParametroDetalleFire();  paramDetObject354.codigo =354; paramDetObject354.descripcion = 'CONTINUIDAD DEL NEGOCIO'; paramDetObject354.estado = 'A'; paramDetObjectList.push(paramDetObject354);
    let paramDetObject355 = new ParametroDetalleFire();  paramDetObject355.codigo =355; paramDetObject355.descripcion = 'RED DE DISTRIBUCIÓN'; paramDetObject355.estado = 'A'; paramDetObjectList.push(paramDetObject355);
    let paramDetObject356 = new ParametroDetalleFire();  paramDetObject356.codigo =356; paramDetObject356.descripcion = 'GESTIÓN BACK DE REDES'; paramDetObject356.estado = 'A'; paramDetObjectList.push(paramDetObject356);
    let paramDetObject357 = new ParametroDetalleFire();  paramDetObject357.codigo =357; paramDetObject357.descripcion = 'DESARROLLO DE CLIENTES'; paramDetObject357.estado = 'A'; paramDetObjectList.push(paramDetObject357);
    let paramDetObject358 = new ParametroDetalleFire();  paramDetObject358.codigo =358; paramDetObject358.descripcion = 'GESTIÓN DE PRODUCTOS'; paramDetObject358.estado = 'A'; paramDetObjectList.push(paramDetObject358);
    let paramDetObject359 = new ParametroDetalleFire();  paramDetObject359.codigo =359; paramDetObject359.descripcion = 'ESTRATEGIA DE CLIENTES Y PRODUCTOS'; paramDetObject359.estado = 'A'; paramDetObjectList.push(paramDetObject359);
    let paramDetObject360 = new ParametroDetalleFire();  paramDetObject360.codigo =360; paramDetObject360.descripcion = 'INTELIGENCIA COMERCIAL'; paramDetObject360.estado = 'A'; paramDetObjectList.push(paramDetObject360);
    let paramDetObject361 = new ParametroDetalleFire();  paramDetObject361.codigo =361; paramDetObject361.descripcion = 'GESTIÓN DE PRODUCTOS DEL ACTIVO'; paramDetObject361.estado = 'A'; paramDetObjectList.push(paramDetObject361);
    let paramDetObject362 = new ParametroDetalleFire();  paramDetObject362.codigo =362; paramDetObject362.descripcion = 'GESTION DE PERSONAS Y RECURSOS'; paramDetObject362.estado = 'A'; paramDetObjectList.push(paramDetObject362);
    let paramDetObject363 = new ParametroDetalleFire();  paramDetObject363.codigo =363; paramDetObject363.descripcion = 'COMPENSACIONES Y NOMINA'; paramDetObject363.estado = 'A'; paramDetObjectList.push(paramDetObject363);
    let paramDetObject364 = new ParametroDetalleFire();  paramDetObject364.codigo =364; paramDetObject364.descripcion = 'GESTION DE PERSONAS'; paramDetObject364.estado = 'A'; paramDetObjectList.push(paramDetObject364);
    let paramDetObject365 = new ParametroDetalleFire();  paramDetObject365.codigo =365; paramDetObject365.descripcion = 'SEGURIDAD INTERNA'; paramDetObject365.estado = 'A'; paramDetObjectList.push(paramDetObject365);
    let paramDetObject366 = new ParametroDetalleFire();  paramDetObject366.codigo =366; paramDetObject366.descripcion = 'TECNOLOGIA Y PROCESOS'; paramDetObject366.estado = 'A'; paramDetObjectList.push(paramDetObject366);
    let paramDetObject367 = new ParametroDetalleFire();  paramDetObject367.codigo =367; paramDetObject367.descripcion = 'INGENIERIA DE SISTEMAS '; paramDetObject367.estado = 'A'; paramDetObjectList.push(paramDetObject367);
    let paramDetObject368 = new ParametroDetalleFire();  paramDetObject368.codigo =368; paramDetObject368.descripcion = 'BANCA DE SERVICIO'; paramDetObject368.estado = 'A'; paramDetObjectList.push(paramDetObject368);
    let paramDetObject369 = new ParametroDetalleFire();  paramDetObject369.codigo =369; paramDetObject369.descripcion = 'ARQUITECTURA DE PROCESOS Y ESTRUCTURAS '; paramDetObject369.estado = 'A'; paramDetObjectList.push(paramDetObject369);
    let paramDetObject370 = new ParametroDetalleFire();  paramDetObject370.codigo =370; paramDetObject370.descripcion = 'FABRICA DE SOFTWARE'; paramDetObject370.estado = 'A'; paramDetObjectList.push(paramDetObject370);
    let paramDetObject371 = new ParametroDetalleFire();  paramDetObject371.codigo =371; paramDetObject371.descripcion = 'APLICATIVOS MOVILES '; paramDetObject371.estado = 'A'; paramDetObjectList.push(paramDetObject371);
    let paramDetObject372 = new ParametroDetalleFire();  paramDetObject372.codigo =372; paramDetObject372.descripcion = 'MANTENIMIENTO DE SOFTWARE'; paramDetObject372.estado = 'A'; paramDetObjectList.push(paramDetObject372);
    let paramDetObject373 = new ParametroDetalleFire();  paramDetObject373.codigo =373; paramDetObject373.descripcion = 'SERVICIO DE CAJA CENTRAL'; paramDetObject373.estado = 'A'; paramDetObjectList.push(paramDetObject373);
    let paramDetObject374 = new ParametroDetalleFire();  paramDetObject374.codigo =374; paramDetObject374.descripcion = 'SERVICIO DE CANALES'; paramDetObject374.estado = 'A'; paramDetObjectList.push(paramDetObject374);
    let paramDetObject375 = new ParametroDetalleFire();  paramDetObject375.codigo =375; paramDetObject375.descripcion = 'SERVICIO CENTRAL'; paramDetObject375.estado = 'A'; paramDetObjectList.push(paramDetObject375);
    let paramDetObject376 = new ParametroDetalleFire();  paramDetObject376.codigo =376; paramDetObject376.descripcion = 'ARQUITECTURA DE NEGOCIOS Y ESTRUCTURAS'; paramDetObject376.estado = 'A'; paramDetObjectList.push(paramDetObject376);
    let paramDetObject377 = new ParametroDetalleFire();  paramDetObject377.codigo =377; paramDetObject377.descripcion = 'SERVICIOS JURIDICOS Y CUMPLIMIENTO'; paramDetObject377.estado = 'A'; paramDetObjectList.push(paramDetObject377);
    let paramDetObject378 = new ParametroDetalleFire();  paramDetObject378.codigo =378; paramDetObject378.descripcion = 'ASUNTOS ADMINISTRATIVOS E INSTITUCIONALES'; paramDetObject378.estado = 'A'; paramDetObjectList.push(paramDetObject378);
    let paramDetObject379 = new ParametroDetalleFire();  paramDetObject379.codigo =379; paramDetObject379.descripcion = 'GESTION DE ASUNTOS CONTENCIOSOS'; paramDetObject379.estado = 'A'; paramDetObjectList.push(paramDetObject379);
    let paramDetObject380 = new ParametroDetalleFire();  paramDetObject380.codigo =380; paramDetObject380.descripcion = 'RED DE DESARROLLO DE CLIENTES Y PRODUCTOS'; paramDetObject380.estado = 'A'; paramDetObjectList.push(paramDetObject380);
    let paramDetObject381 = new ParametroDetalleFire();  paramDetObject381.codigo =381; paramDetObject381.descripcion = 'OF CERRO COLORADO'; paramDetObject381.estado = 'A'; paramDetObjectList.push(paramDetObject381);
    let paramDetObject382 = new ParametroDetalleFire();  paramDetObject382.codigo =382; paramDetObject382.descripcion = 'OF PERENE'; paramDetObject382.estado = 'A'; paramDetObjectList.push(paramDetObject382);
    let paramDetObject383 = new ParametroDetalleFire();  paramDetObject383.codigo =383; paramDetObject383.descripcion = 'TAMBO PLUS JUNIN'; paramDetObject383.estado = 'A'; paramDetObjectList.push(paramDetObject383);
    let paramDetObject384 = new ParametroDetalleFire();  paramDetObject384.codigo =384; paramDetObject384.descripcion = 'TAMBO PLUS CHINCHERO'; paramDetObject384.estado = 'A'; paramDetObjectList.push(paramDetObject384);
    let paramDetObject385 = new ParametroDetalleFire();  paramDetObject385.codigo =385; paramDetObject385.descripcion = 'TAMBO PLUS JUANJUI'; paramDetObject385.estado = 'A'; paramDetObjectList.push(paramDetObject385);
    let paramDetObject386 = new ParametroDetalleFire();  paramDetObject386.codigo =386; paramDetObject386.descripcion = 'TAMBO PLUS UCHIZA'; paramDetObject386.estado = 'A'; paramDetObjectList.push(paramDetObject386);
    let paramDetObject387 = new ParametroDetalleFire();  paramDetObject387.codigo =387; paramDetObject387.descripcion = 'TAMBO PLUS QUILLABAMBA'; paramDetObject387.estado = 'A'; paramDetObjectList.push(paramDetObject387);
    let paramDetObject388 = new ParametroDetalleFire();  paramDetObject388.codigo =388; paramDetObject388.descripcion = 'TAMBO PLUS CABALLOCOCHA'; paramDetObject388.estado = 'A'; paramDetObjectList.push(paramDetObject388);
    let paramDetObject389 = new ParametroDetalleFire();  paramDetObject389.codigo =389; paramDetObject389.descripcion = 'TAMBO PLUS BELLAVISTA'; paramDetObject389.estado = 'A'; paramDetObjectList.push(paramDetObject389);
    let paramDetObject390 = new ParametroDetalleFire();  paramDetObject390.codigo =390; paramDetObject390.descripcion = 'TAMBO PLUS NUEVA CAJAMARCA'; paramDetObject390.estado = 'A'; paramDetObjectList.push(paramDetObject390);
    let paramDetObject391 = new ParametroDetalleFire();  paramDetObject391.codigo =391; paramDetObject391.descripcion = 'TAMBO PLUS CHURIN'; paramDetObject391.estado = 'A'; paramDetObjectList.push(paramDetObject391);
    let paramDetObject392 = new ParametroDetalleFire();  paramDetObject392.codigo =392; paramDetObject392.descripcion = 'TAMBO PLUS PARCOY'; paramDetObject392.estado = 'A'; paramDetObjectList.push(paramDetObject392);
    let paramDetObject393 = new ParametroDetalleFire();  paramDetObject393.codigo =393; paramDetObject393.descripcion = 'TAMBO PLUS SANTA CRUZ'; paramDetObject393.estado = 'A'; paramDetObjectList.push(paramDetObject393);
    let paramDetObject394 = new ParametroDetalleFire();  paramDetObject394.codigo =394; paramDetObject394.descripcion = 'TAMBO PLUS DESAGUADERO'; paramDetObject394.estado = 'A'; paramDetObjectList.push(paramDetObject394);
    let paramDetObject395 = new ParametroDetalleFire();  paramDetObject395.codigo =395; paramDetObject395.descripcion = 'TAMBO PLUS YUNGUYO'; paramDetObject395.estado = 'A'; paramDetObjectList.push(paramDetObject395);
    let paramDetObject396 = new ParametroDetalleFire();  paramDetObject396.codigo =396; paramDetObject396.descripcion = 'BANCA INDIVIDUAL'; paramDetObject396.estado = 'A'; paramDetObjectList.push(paramDetObject396);
    let paramDetObject397 = new ParametroDetalleFire();  paramDetObject397.codigo =397; paramDetObject397.descripcion = 'MARKETING Y EXPERIENCIA DEL CLIENTE'; paramDetObject397.estado = 'A'; paramDetObjectList.push(paramDetObject397);
    let paramDetObject398 = new ParametroDetalleFire();  paramDetObject398.codigo =398; paramDetObject398.descripcion = 'BANCA GRUPAL'; paramDetObject398.estado = 'A'; paramDetObjectList.push(paramDetObject398);
    let paramDetObject399 = new ParametroDetalleFire();  paramDetObject399.codigo =399; paramDetObject399.descripcion = 'SEGUROS, CAPTACIONES Y SERVICIOS'; paramDetObject399.estado = 'A'; paramDetObjectList.push(paramDetObject399);
    let paramDetObject400 = new ParametroDetalleFire();  paramDetObject400.codigo =400; paramDetObject400.descripcion = 'ALIANZAS Y ESTRATEGIA COMERCIAL'; paramDetObject400.estado = 'A'; paramDetObjectList.push(paramDetObject400);
    let paramDetObject401 = new ParametroDetalleFire();  paramDetObject401.codigo =401; paramDetObject401.descripcion = 'TAMBO CARAZ'; paramDetObject401.estado = 'A'; paramDetObjectList.push(paramDetObject401);
    let paramDetObject402 = new ParametroDetalleFire();  paramDetObject402.codigo =402; paramDetObject402.descripcion = 'TAMBO CHUGAY'; paramDetObject402.estado = 'A'; paramDetObjectList.push(paramDetObject402);

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
    this.regIniciativa.controls.numIniciativaInput.reset();
    this.regIniciativa.controls.estadoSelect.reset();
    this.regIniciativa.controls.tituloInput.reset();
    this.regIniciativa.controls.jefeProyectoSelect.reset();
    this.regIniciativa.controls.sumillaInput.reset();
    this.regIniciativa.controls.usuarioProcesosSelect.reset();
    this.regIniciativa.controls.objPrincipalTextArea.reset();
    this.regIniciativa.controls.objSecundarioTextArea.reset();
    this.regIniciativa.controls.horaEstimadaInput.reset();
    this.regIniciativa.controls.fechaInicioInput.reset();
    this.regIniciativa.controls.fechaFinInput.reset();
    /*this.panelColor.reset();*/
    this.regIniciativa.controls.clasificacionSelect.reset();
    this.regIniciativa.controls.areaSelect.reset();
    this.regIniciativa.controls.categoriaSelect.reset();
    this.regIniciativa.controls.tipoSelect.reset();
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
    iniciativaObject.numeroIniciativa = this.regIniciativa.value.numIniciativaInput;
    if(this.validarField(iniciativaObject.numeroIniciativa)) resultValidate = true;
    iniciativaObject.estado = this.regIniciativa.value.estadoSelect as ParametroDetalleFire;
    if(this.validarField(iniciativaObject.estado)) resultValidate = true;
    iniciativaObject.titulo = this.regIniciativa.value.tituloInput;
    if(this.validarField(iniciativaObject.titulo)) resultValidate = true;
    iniciativaObject.jefeProyecto = this.regIniciativa.value.jefeProyectoSelect as ColaboradorDetalleFire;
    if(this.validarField(iniciativaObject.jefeProyecto)) resultValidate = true;
    iniciativaObject.sumilla = this.regIniciativa.value.sumillaInput;
    if(this.validarField(iniciativaObject.sumilla)) resultValidate = true;
    iniciativaObject.usuarioProcesos = this.regIniciativa.value.usuarioProcesosSelect as ColaboradorDetalleFire;
    if(this.validarField(iniciativaObject.usuarioProcesos)) resultValidate = true;
    iniciativaObject.objetivoPrincipal = this.regIniciativa.value.objPrincipalTextArea;
    if(this.validarField(iniciativaObject.objetivoPrincipal)) resultValidate = true;
    iniciativaObject.objetivoSecundario = this.regIniciativa.value.objSecundarioTextArea;
    if(this.validarField(iniciativaObject.objetivoSecundario)) resultValidate = true;
    iniciativaObject.fechaInicio = this.regIniciativa.value.fechaInicioInput;
    if(this.validarField(iniciativaObject.fechaInicio)) resultValidate = true;
    iniciativaObject.horaEstimada = this.regIniciativa.value.horaEstimadaInput;
    if(this.validarField(iniciativaObject.horaEstimada)) resultValidate = true;
    iniciativaObject.fechaFin = this.regIniciativa.value.fechaFinInput;
    if(this.validarField(iniciativaObject.fechaFin)) resultValidate = true;
    iniciativaObject.prioridad = this.panelColor.value as ParametroDetalleFire;
    if(this.validarField2(iniciativaObject.prioridad)) resultValidate = true;
    iniciativaObject.clasificacion = this.regIniciativa.value.clasificacionSelect as ParametroDetalleFire;
    if(this.validarField(iniciativaObject.clasificacion)) resultValidate = true;
    iniciativaObject.area = this.regIniciativa.value.areaSelect as ParametroDetalleFire;
    if(this.validarField(iniciativaObject.area)) resultValidate = true;
    iniciativaObject.categoria = this.regIniciativa.value.categoriaSelect as ParametroDetalleFire;
    if(this.validarField(iniciativaObject.categoria)) resultValidate = true;
    iniciativaObject.tipo = this.regIniciativa.value.tipoSelect as ParametroDetalleFire;
    if(this.validarField(iniciativaObject.tipo)) resultValidate = true;
    
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
}


