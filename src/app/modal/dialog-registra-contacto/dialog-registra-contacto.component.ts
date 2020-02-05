import { Component, OnInit, NgZone, ViewChild, ViewEncapsulation, Input, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { take } from 'rxjs/operators';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { ParametroFire } from '../../shared/models/parametro-fire';
import { FirebaseParametroService } from '../../shared/services/firebase-parametro.service';
import { ParametroDetalleFire } from '../../shared/models/parametro-detalle-fire';
import { FirebaseColaboradorService } from '../../shared/services/firebase-colaborador.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ContactoFire } from 'src/app/shared/models/contacto-fire';
import { FirebaseContactoService } from 'src/app/shared/services/firebase-contacto.service';


@Component({
  selector: 'app-dialog-registra-contacto',
  templateUrl: './dialog-registra-contacto.component.html',
  styleUrls: ['./dialog-registra-contacto.component.css']
})
export class DialogRegistraContactoComponent implements OnInit {

  regContacto: FormGroup;
  contacto: ContactoFire = new ContactoFire();
  submitted = false;
  estadoGen: ParametroFire = new ParametroFire();
  cargo: ParametroFire = new ParametroFire();

  panelColor = new FormControl('1');
  loading: boolean;
  constructor(public dialogRef: MatDialogRef<DialogRegistraContactoComponent>, 
    private _ngZone: NgZone, private firestoreService: FirestoreService, 
    private formBuilder: FormBuilder, 
    private firebaseParametros: FirebaseParametroService, 
    private firebaseColaboradores: FirebaseColaboradorService, 
    private firebaseContactos: FirebaseContactoService, 
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.contacto = data;
    this.regContacto = new FormGroup({
      codigoContactoInput: new FormControl(),
      estadoGenSelect: new FormControl(),
      nombresInput: new FormControl(),
      cargoSelect: new FormControl(),
      telefonoInput: new FormControl(),
      correoInput: new FormControl(),
      anexoInput: new FormControl()
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
    this.loading = true;
    let parametrosRef = this.firebaseParametros.getParametros();
    let colaboradoresRef = this.firebaseColaboradores.getColaboradores();

      parametrosRef.subscribe(data => {data.forEach(paramObj => {
          let paramObject= paramObj.payload.doc.data() as ParametroFire;
          if("estado-gen" == paramObject.nombre) this.estadoGen = paramObject;
          if("cargo" == paramObject.nombre) this.cargo = paramObject;
          this.loadData();
          this.loading = false;
        });
      });
  }

  loadData(){
    this.regContacto.controls.codigoContactoInput.setValue(this.contacto.codigo);
    this.regContacto.controls.nombresInput.setValue(this.contacto.nombres);
    this.regContacto.controls.telefonoInput.setValue(this.contacto.telefono);
    this.regContacto.controls.anexoInput.setValue(this.contacto.anexo);
    this.regContacto.controls.correoInput.setValue(this.contacto.correo);
    /*this.regContacto.controls.estado.setValue(this.contacto.estado);*/
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
    this.regContacto.reset();
  }

  

 saveContacto(contacto: ContactoFire){
    this.loading = true;
    let resultValidate = false;
    let contactoObject = new ContactoFire();

    contactoObject.codigo = this.regContacto.value.codigoContactoInput;
    contactoObject.estado = this.regContacto.value.estadoGenSelect as ParametroDetalleFire;
    contactoObject.nombres = this.regContacto.value.nombresInput;
    contactoObject.cargo = this.regContacto.value.cargoSelect as ParametroDetalleFire;
    contactoObject.telefono = this.regContacto.value.telefonoInput;
    contactoObject.anexo = this.regContacto.value.anexoInput;
    contactoObject.correo = this.regContacto.value.correoInput;
    
    this.regContacto = this.formBuilder.group({
      codigoContactoInput: [contactoObject.codigo, Validators.required],
      estadoGenSelect: [contactoObject.estado, Validators.required],
      nombresInput: [contactoObject.nombres, Validators.required],
      cargoSelect: [contactoObject.cargo, Validators.required],
      telefonoInput: [contactoObject.telefono, Validators.required],
      anexoInput: [contactoObject.anexo, Validators.required],
      correoInput: [contactoObject.correo, Validators.required],
    });

    if (this.regContacto.invalid){
      this.submitted = true;
      resultValidate = true;
    }
   
    if(resultValidate){
      this.loading = false;
      Swal.fire('Advertencia!', 'Debe completar la información requerida.', 'warning');
    }else{
      if(undefined == contacto.idContacto){
        this.firebaseContactos.createContacto(contactoObject).then(
          result => {
            this.loading = false;
            Swal.fire('Guardado!', 'Se ha guardado correctamente.', 'success');
            /*this.resetFields();*/
            this.close();
          },
          error => {
            this.loading = false;
            if("repetido" == error.message){
              Swal.fire('Advertencia!', 'Contacto ya existe.', 'warning');
            }else{
              Swal.fire('Error!', 'Error al guardar el contacto.', 'error');
            }
          }
        );
      }else{
        contactoObject.idContacto = contacto.idContacto;
        this.firebaseContactos.updateContacto(contactoObject).then(
          result => {
            this.loading = false;
            Swal.fire('Guardado!', 'Se ha guardado correctamente.', 'success');
            /*this.resetFields();*/
            this.close();
          },
          error => {
            this.loading = false;
            if("repetido" == error.message){
              Swal.fire('Advertencia!', 'Contacto ya existe.', 'warning');
            }else{
              Swal.fire('Error!', 'Error al guardar el contacto.', 'error');
            }
          }
        );
      }
    }
  }
  close(): void {
    this.dialogRef.close();
  }

  compareItems(obj1, obj2) {
    return obj1 && obj2 && obj1.codigo===obj2.codigo;
  }









  


  /* Add parameter */
  saveParametro() {
    let paramObject = new ParametroFire();
    paramObject.nombre = "subtipo-actividad";
    let paramDetObjectList: Array<ParametroDetalleFire> = [];
    let paramDetObject = new ParametroDetalleFire();
    paramDetObject.codigo = 1;
    paramDetObject.codigoDependencia = 3;
    paramDetObject.descripcion = 'Levantamiento de Información';
    paramDetObject.estado = 'A';
    paramDetObjectList.push(paramDetObject);
    let paramDetObject2 = new ParametroDetalleFire();
    paramDetObject2.codigo = 2;
    paramDetObject2.codigoDependencia = 3;
    paramDetObject2.descripcion = 'Lanzamiento';
    paramDetObject2.estado = 'A';
    paramDetObjectList.push(paramDetObject2);
    let paramDetObject3 = new ParametroDetalleFire();
    paramDetObject3.codigo = 3;
    paramDetObject3.codigoDependencia = 3;
    paramDetObject3.descripcion = 'Evaluación de Equipo de Trabajo';
    paramDetObject3.estado = 'A';
    paramDetObjectList.push(paramDetObject3);
    let paramDetObject4 = new ParametroDetalleFire();
    paramDetObject4.codigo = 4;
    paramDetObject4.codigoDependencia = 4;
    paramDetObject4.descripcion = 'Asignación de Actividades';
    paramDetObject4.estado = 'A';
    paramDetObjectList.push(paramDetObject4);
    let paramDetObject5 = new ParametroDetalleFire();
    paramDetObject5.codigo = 5;
    paramDetObject5.codigoDependencia = 4;
    paramDetObject5.descripcion = 'Asignacion de Recursos';
    paramDetObject5.estado = 'A';
    paramDetObjectList.push(paramDetObject5);
    let paramDetObject6 = new ParametroDetalleFire();
    paramDetObject6.codigo = 6;
    paramDetObject6.codigoDependencia = 4;
    paramDetObject6.descripcion = 'Ingreso de Horas de Trabajo x Recurso';
    paramDetObject6.estado = 'A';
    paramDetObjectList.push(paramDetObject6);
    let paramDetObject7 = new ParametroDetalleFire();
    paramDetObject7.codigo = 7;
    paramDetObject7.codigoDependencia = 4;
    paramDetObject7.descripcion = 'Ingreso de Pruebas Unitarias';
    paramDetObject7.estado = 'A';
    paramDetObjectList.push(paramDetObject7);
    let paramDetObject8 = new ParametroDetalleFire();
    paramDetObject8.codigo = 8;
    paramDetObject8.codigoDependencia = 5;
    paramDetObject8.descripcion = 'Ingreso de Pruebas con Usuario Final';
    paramDetObject8.estado = 'A';
    paramDetObjectList.push(paramDetObject8);
    let paramDetObject9 = new ParametroDetalleFire();
    paramDetObject9.codigo = 9;
    paramDetObject9.codigoDependencia = 5;
    paramDetObject9.descripcion = 'Pruebas de Estres';
    paramDetObject9.estado = 'A';
    paramDetObjectList.push(paramDetObject9);
    let paramDetObject10 = new ParametroDetalleFire();
    paramDetObject10.codigo = 10;
    paramDetObject10.codigoDependencia = 6;
    paramDetObject10.descripcion = 'Ingreso Flujo de Pase a Producción';
    paramDetObject10.estado = 'A';
    paramDetObjectList.push(paramDetObject10);
    let paramDetObject11 = new ParametroDetalleFire();
    paramDetObject11.codigo = 11;
    paramDetObject11.codigoDependencia = 6;
    paramDetObject11.descripcion = 'Planificación de Pase';
    paramDetObject11.estado = 'A';
    paramDetObjectList.push(paramDetObject11);
    let paramDetObject12 = new ParametroDetalleFire();
    paramDetObject12.codigo = 12;
    paramDetObject12.codigoDependencia = 6;
    paramDetObject12.descripcion = 'Seguimiento';
    paramDetObject12.estado = 'A';
    paramDetObjectList.push(paramDetObject12);
    let paramDetObject13 = new ParametroDetalleFire();
    paramDetObject13.codigo = 13;
    paramDetObject13.codigoDependencia = 6;
    paramDetObject13.descripcion = 'Cierre';
    paramDetObject13.estado = 'A';
    paramDetObjectList.push(paramDetObject13);
    let paramDetObject14 = new ParametroDetalleFire();
    paramDetObject14.codigo = 14;
    paramDetObject14.codigoDependencia = 1;
    paramDetObject14.descripcion = 'General';
    paramDetObject14.estado = 'A';
    paramDetObjectList.push(paramDetObject14);
    let paramDetObject15 = new ParametroDetalleFire();
    paramDetObject15.codigo = 15;
    paramDetObject15.codigoDependencia = 2;
    paramDetObject15.descripcion = 'General';
    paramDetObject15.estado = 'A';
    paramDetObjectList.push(paramDetObject15);
    
    paramObject.detalle = paramDetObjectList;
    this.firebaseParametros.createParameter(paramObject);

  }

  /* Add Cargo */
  saveCargo() {
    let paramObject = new ParametroFire();
    paramObject.nombre = "cargo";
    let paramDetObjectList: Array<ParametroDetalleFire> = [];
    
    let paramDetObject1 = new ParametroDetalleFire(); paramDetObject1.codigo = 1069; paramDetObject1.descripcion = 'ABOGADO DE ASUNTOS REGULATORIOS'; paramDetObject1.estado = 'Activo'; paramDetObjectList.push(paramDetObject1);
    let paramDetObject2 = new ParametroDetalleFire(); paramDetObject2.codigo = 33; paramDetObject2.descripcion = 'ADMINISTRADOR DE AGENCIA'; paramDetObject2.estado = 'Activo'; paramDetObjectList.push(paramDetObject2);
    let paramDetObject3 = new ParametroDetalleFire(); paramDetObject3.codigo = 372; paramDetObject3.descripcion = 'ADMINISTRADOR DE BASE DE DATOS'; paramDetObject3.estado = 'Activo'; paramDetObjectList.push(paramDetObject3);
    let paramDetObject4 = new ParametroDetalleFire(); paramDetObject4.codigo = 1317; paramDetObject4.descripcion = 'ANALISTA DE ADMINISTRACION DE EFECTIVO Y BANCA PREFERENTE'; paramDetObject4.estado = 'Activo'; paramDetObjectList.push(paramDetObject4);
    let paramDetObject5 = new ParametroDetalleFire(); paramDetObject5.codigo = 818; paramDetObject5.descripcion = 'ANALISTA DE ADMINISTRACION DE INMUEBLES'; paramDetObject5.estado = 'Activo'; paramDetObjectList.push(paramDetObject5);
    let paramDetObject6 = new ParametroDetalleFire(); paramDetObject6.codigo = 1139; paramDetObject6.descripcion = 'ANALISTA DE ADMISION DE RIESGO DE CREDITO'; paramDetObject6.estado = 'Activo'; paramDetObjectList.push(paramDetObject6);
    let paramDetObject7 = new ParametroDetalleFire(); paramDetObject7.codigo = 1330; paramDetObject7.descripcion = 'ANALISTA DE ARQUITECTURA DE NEGOCIOS'; paramDetObject7.estado = 'Activo'; paramDetObjectList.push(paramDetObject7);
    let paramDetObject8 = new ParametroDetalleFire(); paramDetObject8.codigo = 1332; paramDetObject8.descripcion = 'ANALISTA DE ASEGURAMIENTO DE CALIDAD'; paramDetObject8.estado = 'Activo'; paramDetObjectList.push(paramDetObject8);
    let paramDetObject9 = new ParametroDetalleFire(); paramDetObject9.codigo = 1217; paramDetObject9.descripcion = 'ANALISTA DE ASUNTOS LABORALES'; paramDetObject9.estado = 'Activo'; paramDetObjectList.push(paramDetObject9);
    let paramDetObject10 = new ParametroDetalleFire(); paramDetObject10.codigo = 1316; paramDetObject10.descripcion = 'ANALISTA DE BACK OFFICE'; paramDetObject10.estado = 'Activo'; paramDetObjectList.push(paramDetObject10);
    let paramDetObject11 = new ParametroDetalleFire(); paramDetObject11.codigo = 1236; paramDetObject11.descripcion = 'ANALISTA DE BACK OFFICE DE TESORERIA'; paramDetObject11.estado = 'Activo'; paramDetObjectList.push(paramDetObject11);
    let paramDetObject12 = new ParametroDetalleFire(); paramDetObject12.codigo = 1092; paramDetObject12.descripcion = 'ANALISTA DE CAMPAÑAS Y PUBLICIDAD'; paramDetObject12.estado = 'Activo'; paramDetObjectList.push(paramDetObject12);
    let paramDetObject13 = new ParametroDetalleFire(); paramDetObject13.codigo = 1287; paramDetObject13.descripcion = 'ANALISTA DE CANALES FÍSICOS'; paramDetObject13.estado = 'Activo'; paramDetObjectList.push(paramDetObject13);
    let paramDetObject14 = new ParametroDetalleFire(); paramDetObject14.codigo = 1294; paramDetObject14.descripcion = 'ANALISTA DE CLIENTES Y PRODUCTOS'; paramDetObject14.estado = 'Activo'; paramDetObjectList.push(paramDetObject14);
    let paramDetObject15 = new ParametroDetalleFire(); paramDetObject15.codigo = 1267; paramDetObject15.descripcion = 'ANALISTA DE COMUNICACIÓN E IMAGEN'; paramDetObject15.estado = 'Activo'; paramDetObjectList.push(paramDetObject15);
    let paramDetObject16 = new ParametroDetalleFire(); paramDetObject16.codigo = 1184; paramDetObject16.descripcion = 'ANALISTA DE CONTROL DE ACCESOS'; paramDetObject16.estado = 'Activo'; paramDetObjectList.push(paramDetObject16);
    let paramDetObject17 = new ParametroDetalleFire(); paramDetObject17.codigo = 906; paramDetObject17.descripcion = 'ANALISTA DE CONTROL DE GESTION'; paramDetObject17.estado = 'Activo'; paramDetObjectList.push(paramDetObject17);
    let paramDetObject18 = new ParametroDetalleFire(); paramDetObject18.codigo = 926; paramDetObject18.descripcion = 'ANALISTA DE CONTROL DE PAGOS'; paramDetObject18.estado = 'Activo'; paramDetObjectList.push(paramDetObject18);
    let paramDetObject19 = new ParametroDetalleFire(); paramDetObject19.codigo = 1260; paramDetObject19.descripcion = 'ANALISTA DE CONTROL INTERNO'; paramDetObject19.estado = 'Activo'; paramDetObjectList.push(paramDetObject19);
    let paramDetObject20 = new ParametroDetalleFire(); paramDetObject20.codigo = 1111; paramDetObject20.descripcion = 'ANALISTA DE CONTROL PATRIMONIAL Y SEGUROS'; paramDetObject20.estado = 'Activo'; paramDetObjectList.push(paramDetObject20);
    let paramDetObject21 = new ParametroDetalleFire(); paramDetObject21.codigo = 1273; paramDetObject21.descripcion = 'ANALISTA DE CONTROL PRESUPUESTAL'; paramDetObject21.estado = 'Activo'; paramDetObjectList.push(paramDetObject21);
    let paramDetObject22 = new ParametroDetalleFire(); paramDetObject22.codigo = 1256; paramDetObject22.descripcion = 'ANALISTA DE CUMPLIMIENTO DE GESTION DE RIESGOS DE LA/FT'; paramDetObject22.estado = 'Activo'; paramDetObjectList.push(paramDetObject22);
    let paramDetObject23 = new ParametroDetalleFire(); paramDetObject23.codigo = 1207; paramDetObject23.descripcion = 'ANALISTA DE CUMPLIMIENTO NORMATIVO'; paramDetObject23.estado = 'Activo'; paramDetObjectList.push(paramDetObject23);
    let paramDetObject24 = new ParametroDetalleFire(); paramDetObject24.codigo = 1240; paramDetObject24.descripcion = 'ANALISTA DE DESEMPEÑO SOCIAL'; paramDetObject24.estado = 'Activo'; paramDetObjectList.push(paramDetObject24);
    let paramDetObject25 = new ParametroDetalleFire(); paramDetObject25.codigo = 1167; paramDetObject25.descripcion = 'ANALISTA DE FORMACION Y DESARROLLO'; paramDetObject25.estado = 'Activo'; paramDetObjectList.push(paramDetObject25);
    let paramDetObject26 = new ParametroDetalleFire(); paramDetObject26.codigo = 1134; paramDetObject26.descripcion = 'ANALISTA DE GARANTIAS Y SEGUROS'; paramDetObject26.estado = 'Activo'; paramDetObjectList.push(paramDetObject26);
    let paramDetObject27 = new ParametroDetalleFire(); paramDetObject27.codigo = 1206; paramDetObject27.descripcion = 'ANALISTA DE GESTION CONTABLE'; paramDetObject27.estado = 'Activo'; paramDetObjectList.push(paramDetObject27);
    let paramDetObject28 = new ParametroDetalleFire(); paramDetObject28.codigo = 1265; paramDetObject28.descripcion = 'ANALISTA DE GESTION DE PERSONAS'; paramDetObject28.estado = 'Activo'; paramDetObjectList.push(paramDetObject28);
    let paramDetObject29 = new ParametroDetalleFire(); paramDetObject29.codigo = 1296; paramDetObject29.descripcion = 'ANALISTA DE GESTIÓN DE PRODUCTOS'; paramDetObject29.estado = 'Activo'; paramDetObjectList.push(paramDetObject29);
    let paramDetObject30 = new ParametroDetalleFire(); paramDetObject30.codigo = 1057; paramDetObject30.descripcion = 'ANALISTA DE GESTION DE RECLAMOS'; paramDetObject30.estado = 'Activo'; paramDetObjectList.push(paramDetObject30);
    let paramDetObject31 = new ParametroDetalleFire(); paramDetObject31.codigo = 753; paramDetObject31.descripcion = 'ANALISTA DE GESTION FINANCIERA'; paramDetObject31.estado = 'Activo'; paramDetObjectList.push(paramDetObject31);
    let paramDetObject32 = new ParametroDetalleFire(); paramDetObject32.codigo = 1228; paramDetObject32.descripcion = 'ANALISTA DE GESTION POR PROCESOS'; paramDetObject32.estado = 'Activo'; paramDetObjectList.push(paramDetObject32);
    let paramDetObject33 = new ParametroDetalleFire(); paramDetObject33.codigo = 923; paramDetObject33.descripcion = 'ANALISTA DE GESTION TRIBUTARIA'; paramDetObject33.estado = 'Activo'; paramDetObjectList.push(paramDetObject33);
    let paramDetObject34 = new ParametroDetalleFire(); paramDetObject34.codigo = 544; paramDetObject34.descripcion = 'ANALISTA DE INTELIGENCIA COMERCIAL'; paramDetObject34.estado = 'Activo'; paramDetObjectList.push(paramDetObject34);
    let paramDetObject35 = new ParametroDetalleFire(); paramDetObject35.codigo = 1025; paramDetObject35.descripcion = 'ANALISTA DE NOMINA'; paramDetObject35.estado = 'Activo'; paramDetObjectList.push(paramDetObject35);
    let paramDetObject36 = new ParametroDetalleFire(); paramDetObject36.codigo = 843; paramDetObject36.descripcion = 'ANALISTA DE PLANIFICACION Y ANALISIS'; paramDetObject36.estado = 'Activo'; paramDetObjectList.push(paramDetObject36);
    let paramDetObject37 = new ParametroDetalleFire(); paramDetObject37.codigo = 1323; paramDetObject37.descripcion = 'ANALISTA DE PROCESOS MASIVOS'; paramDetObject37.estado = 'Activo'; paramDetObjectList.push(paramDetObject37);
    let paramDetObject38 = new ParametroDetalleFire(); paramDetObject38.codigo = 1188; paramDetObject38.descripcion = 'ANALISTA DE PROCESOS Y FACTORES DE RIESGOS DE LA/FT'; paramDetObject38.estado = 'Activo'; paramDetObjectList.push(paramDetObject38);
    let paramDetObject39 = new ParametroDetalleFire(); paramDetObject39.codigo = 695; paramDetObject39.descripcion = 'ANALISTA DE PRODUCCION'; paramDetObject39.estado = 'Activo'; paramDetObjectList.push(paramDetObject39);
    let paramDetObject40 = new ParametroDetalleFire(); paramDetObject40.codigo = 757; paramDetObject40.descripcion = 'ANALISTA DE RECUPERACIONES'; paramDetObject40.estado = 'Activo'; paramDetObjectList.push(paramDetObject40);
    let paramDetObject41 = new ParametroDetalleFire(); paramDetObject41.codigo = 925; paramDetObject41.descripcion = 'ANALISTA DE REGISTRO'; paramDetObject41.estado = 'Activo'; paramDetObjectList.push(paramDetObject41);
    let paramDetObject42 = new ParametroDetalleFire(); paramDetObject42.codigo = 1324; paramDetObject42.descripcion = 'ANALISTA DE RETENCIONES Y SERVICIOS BANCARIOS'; paramDetObject42.estado = 'Activo'; paramDetObjectList.push(paramDetObject42);
    let paramDetObject43 = new ParametroDetalleFire(); paramDetObject43.codigo = 636; paramDetObject43.descripcion = 'ANALISTA DE RIESGO OPERACIONAL'; paramDetObject43.estado = 'Activo'; paramDetObjectList.push(paramDetObject43);
    let paramDetObject44 = new ParametroDetalleFire(); paramDetObject44.codigo = 931; paramDetObject44.descripcion = 'ANALISTA DE SEGURIDAD DE LA INFORMACION'; paramDetObject44.estado = 'Activo'; paramDetObjectList.push(paramDetObject44);
    let paramDetObject45 = new ParametroDetalleFire(); paramDetObject45.codigo = 1165; paramDetObject45.descripcion = 'ANALISTA DE SELECCION E INCORPORACION'; paramDetObject45.estado = 'Activo'; paramDetObjectList.push(paramDetObject45);
    let paramDetObject46 = new ParametroDetalleFire(); paramDetObject46.codigo = 1321; paramDetObject46.descripcion = 'ANALISTA DE SERVICIO DE CANALES'; paramDetObject46.estado = 'Activo'; paramDetObjectList.push(paramDetObject46);
    let paramDetObject47 = new ParametroDetalleFire(); paramDetObject47.codigo = 940; paramDetObject47.descripcion = 'ANALISTA DE SERVICIOS GENERALES'; paramDetObject47.estado = 'Activo'; paramDetObjectList.push(paramDetObject47);
    let paramDetObject48 = new ParametroDetalleFire(); paramDetObject48.codigo = 1180; paramDetObject48.descripcion = 'ANALISTA DE SISTEMAS'; paramDetObject48.estado = 'Activo'; paramDetObjectList.push(paramDetObject48);
    let paramDetObject49 = new ParametroDetalleFire(); paramDetObject49.codigo = 1276; paramDetObject49.descripcion = 'ANALISTA DE SISTEMAS DE INFORMACIÓN DE GESTIÓN'; paramDetObject49.estado = 'Activo'; paramDetObjectList.push(paramDetObject49);
    let paramDetObject50 = new ParametroDetalleFire(); paramDetObject50.codigo = 1257; paramDetObject50.descripcion = 'ANALISTA FORENSE DE RIESGOS LA/FT'; paramDetObject50.estado = 'Activo'; paramDetObjectList.push(paramDetObject50);
    let paramDetObject51 = new ParametroDetalleFire(); paramDetObject51.codigo = 760; paramDetObject51.descripcion = 'ANALISTA LEGAL'; paramDetObject51.estado = 'Activo'; paramDetObjectList.push(paramDetObject51);
    let paramDetObject52 = new ParametroDetalleFire(); paramDetObject52.codigo = 1289; paramDetObject52.descripcion = 'ANALISTA LÍDER DE CAMBIO'; paramDetObject52.estado = 'Activo'; paramDetObjectList.push(paramDetObject52);
    let paramDetObject53 = new ParametroDetalleFire(); paramDetObject53.codigo = 848; paramDetObject53.descripcion = 'ASESOR COMERCIAL EN FORMACION'; paramDetObject53.estado = 'Activo'; paramDetObjectList.push(paramDetObject53);
    let paramDetObject54 = new ParametroDetalleFire(); paramDetObject54.codigo = 1031; paramDetObject54.descripcion = 'ASESOR COMERCIAL EN FORMACION PALABRA DE MUJER'; paramDetObject54.estado = 'Activo'; paramDetObjectList.push(paramDetObject54);
    let paramDetObject55 = new ParametroDetalleFire(); paramDetObject55.codigo = 853; paramDetObject55.descripcion = 'ASESOR COMERCIAL FUNCIONARIO'; paramDetObject55.estado = 'Activo'; paramDetObjectList.push(paramDetObject55);
    let paramDetObject56 = new ParametroDetalleFire(); paramDetObject56.codigo = 1036; paramDetObject56.descripcion = 'ASESOR COMERCIAL FUNCIONARIO PALABRA DE MUJER'; paramDetObject56.estado = 'Activo'; paramDetObjectList.push(paramDetObject56);
    let paramDetObject57 = new ParametroDetalleFire(); paramDetObject57.codigo = 849; paramDetObject57.descripcion = 'ASESOR COMERCIAL JUNIOR 1'; paramDetObject57.estado = 'Activo'; paramDetObjectList.push(paramDetObject57);
    let paramDetObject58 = new ParametroDetalleFire(); paramDetObject58.codigo = 1032; paramDetObject58.descripcion = 'ASESOR COMERCIAL JUNIOR 1 PALABRA DE MUJER'; paramDetObject58.estado = 'Activo'; paramDetObjectList.push(paramDetObject58);
    let paramDetObject59 = new ParametroDetalleFire(); paramDetObject59.codigo = 850; paramDetObject59.descripcion = 'ASESOR COMERCIAL JUNIOR 2'; paramDetObject59.estado = 'Activo'; paramDetObjectList.push(paramDetObject59);
    let paramDetObject60 = new ParametroDetalleFire(); paramDetObject60.codigo = 1033; paramDetObject60.descripcion = 'ASESOR COMERCIAL JUNIOR 2 PALABRA DE MUJER'; paramDetObject60.estado = 'Activo'; paramDetObjectList.push(paramDetObject60);
    let paramDetObject61 = new ParametroDetalleFire(); paramDetObject61.codigo = 852; paramDetObject61.descripcion = 'ASESOR COMERCIAL MASTER'; paramDetObject61.estado = 'Activo'; paramDetObjectList.push(paramDetObject61);
    let paramDetObject62 = new ParametroDetalleFire(); paramDetObject62.codigo = 1035; paramDetObject62.descripcion = 'ASESOR COMERCIAL MASTER PALABRA DE MUJER'; paramDetObject62.estado = 'Activo'; paramDetObjectList.push(paramDetObject62);
    let paramDetObject63 = new ParametroDetalleFire(); paramDetObject63.codigo = 851; paramDetObject63.descripcion = 'ASESOR COMERCIAL SENIOR'; paramDetObject63.estado = 'Activo'; paramDetObjectList.push(paramDetObject63);
    let paramDetObject64 = new ParametroDetalleFire(); paramDetObject64.codigo = 1034; paramDetObject64.descripcion = 'ASESOR COMERCIAL SENIOR PALABRA DE MUJER'; paramDetObject64.estado = 'Activo'; paramDetObjectList.push(paramDetObject64);
    let paramDetObject65 = new ParametroDetalleFire(); paramDetObject65.codigo = 1318; paramDetObject65.descripcion = 'ASISTENTE DE BANCA DE SERVICIO'; paramDetObject65.estado = 'Activo'; paramDetObjectList.push(paramDetObject65);
    let paramDetObject66 = new ParametroDetalleFire(); paramDetObject66.codigo = 1238; paramDetObject66.descripcion = 'ASISTENTE DE COMPRAS'; paramDetObject66.estado = 'Activo'; paramDetObjectList.push(paramDetObject66);
    let paramDetObject67 = new ParametroDetalleFire(); paramDetObject67.codigo = 1342; paramDetObject67.descripcion = 'ASISTENTE DE COMUNICACIÓN E IMAGEN'; paramDetObject67.estado = 'Activo'; paramDetObjectList.push(paramDetObject67);
    let paramDetObject68 = new ParametroDetalleFire(); paramDetObject68.codigo = 1040; paramDetObject68.descripcion = 'ASISTENTE DE GERENCIA GENERAL'; paramDetObject68.estado = 'Activo'; paramDetObjectList.push(paramDetObject68);
    let paramDetObject69 = new ParametroDetalleFire(); paramDetObject69.codigo = 1096; paramDetObject69.descripcion = 'ASISTENTE DE GERENCIA TERRITORIAL'; paramDetObject69.estado = 'Activo'; paramDetObjectList.push(paramDetObject69);
    let paramDetObject70 = new ParametroDetalleFire(); paramDetObject70.codigo = 1305; paramDetObject70.descripcion = 'ASISTENTE DE GESTION DE PERSONAS'; paramDetObject70.estado = 'Activo'; paramDetObjectList.push(paramDetObject70);
    let paramDetObject71 = new ParametroDetalleFire(); paramDetObject71.codigo = 1221; paramDetObject71.descripcion = 'ASISTENTE DE INCORPORACION Y FORMACION'; paramDetObject71.estado = 'Activo'; paramDetObjectList.push(paramDetObject71);
    let paramDetObject72 = new ParametroDetalleFire(); paramDetObject72.codigo = 768; paramDetObject72.descripcion = 'ASISTENTE DE MARKETING'; paramDetObject72.estado = 'Activo'; paramDetObjectList.push(paramDetObject72);
    let paramDetObject73 = new ParametroDetalleFire(); paramDetObject73.codigo = 965; paramDetObject73.descripcion = 'ASISTENTE DE MESA DE AYUDA'; paramDetObject73.estado = 'Activo'; paramDetObjectList.push(paramDetObject73);
    let paramDetObject74 = new ParametroDetalleFire(); paramDetObject74.codigo = 1063; paramDetObject74.descripcion = 'ASISTENTE DE NOMINA'; paramDetObject74.estado = 'Activo'; paramDetObjectList.push(paramDetObject74);
    let paramDetObject75 = new ParametroDetalleFire(); paramDetObject75.codigo = 1116; paramDetObject75.descripcion = 'ASISTENTE DE SERVICIOS GENERALES'; paramDetObject75.estado = 'Activo'; paramDetObjectList.push(paramDetObject75);
    let paramDetObject76 = new ParametroDetalleFire(); paramDetObject76.codigo = 1183; paramDetObject76.descripcion = 'ASISTENTE DE SOPORTE TECNOLOGICO'; paramDetObject76.estado = 'Activo'; paramDetObjectList.push(paramDetObject76);
    let paramDetObject77 = new ParametroDetalleFire(); paramDetObject77.codigo = 309; paramDetObject77.descripcion = 'ASISTENTE DE TESORERIA'; paramDetObject77.estado = 'Activo'; paramDetObjectList.push(paramDetObject77);
    let paramDetObject78 = new ParametroDetalleFire(); paramDetObject78.codigo = 138; paramDetObject78.descripcion = 'ASISTENTE SOCIAL'; paramDetObject78.estado = 'Activo'; paramDetObjectList.push(paramDetObject78);
    let paramDetObject79 = new ParametroDetalleFire(); paramDetObject79.codigo = 857; paramDetObject79.descripcion = 'AUDITOR GENERAL'; paramDetObject79.estado = 'Activo'; paramDetObjectList.push(paramDetObject79);
    let paramDetObject80 = new ParametroDetalleFire(); paramDetObject80.codigo = 1340; paramDetObject80.descripcion = 'AUDITOR SENIOR DE FRAUDES'; paramDetObject80.estado = 'Activo'; paramDetObjectList.push(paramDetObject80);
    let paramDetObject81 = new ParametroDetalleFire(); paramDetObject81.codigo = 871; paramDetObject81.descripcion = 'AUDITOR SENIOR DE PROCESOS'; paramDetObject81.estado = 'Activo'; paramDetObjectList.push(paramDetObject81);
    let paramDetObject82 = new ParametroDetalleFire(); paramDetObject82.codigo = 1061; paramDetObject82.descripcion = 'AUDITOR SENIOR DE RED'; paramDetObject82.estado = 'Activo'; paramDetObjectList.push(paramDetObject82);
    let paramDetObject83 = new ParametroDetalleFire(); paramDetObject83.codigo = 869; paramDetObject83.descripcion = 'AUDITOR SENIOR DE TI'; paramDetObject83.estado = 'Activo'; paramDetObjectList.push(paramDetObject83);
    let paramDetObject84 = new ParametroDetalleFire(); paramDetObject84.codigo = 1226; paramDetObject84.descripcion = 'AUXILIAR DE CONTRATOS'; paramDetObject84.estado = 'Activo'; paramDetObjectList.push(paramDetObject84);
    let paramDetObject85 = new ParametroDetalleFire(); paramDetObject85.codigo = 1341; paramDetObject85.descripcion = 'AUXILIAR DE GERENCIA GENERAL'; paramDetObject85.estado = 'Activo'; paramDetObjectList.push(paramDetObject85);
    let paramDetObject86 = new ParametroDetalleFire(); paramDetObject86.codigo = 1242; paramDetObject86.descripcion = 'AUXILIAR DE INMUEBLES Y ACTIVOS FIJOS'; paramDetObject86.estado = 'Activo'; paramDetObjectList.push(paramDetObject86);
    let paramDetObject87 = new ParametroDetalleFire(); paramDetObject87.codigo = 1328; paramDetObject87.descripcion = 'COORDINADOR DE ARQUITECTURA DE NEGOCIOS'; paramDetObject87.estado = 'Activo'; paramDetObjectList.push(paramDetObject87);
    let paramDetObject88 = new ParametroDetalleFire(); paramDetObject88.codigo = 1277; paramDetObject88.descripcion = 'COORDINADOR DE ASEGURAMIENTO DE CALIDAD'; paramDetObject88.estado = 'Activo'; paramDetObjectList.push(paramDetObject88);
    let paramDetObject89 = new ParametroDetalleFire(); paramDetObject89.codigo = 1103; paramDetObject89.descripcion = 'COORDINADOR DE ASUNTOS CONTENCIOSOS'; paramDetObject89.estado = 'Activo'; paramDetObjectList.push(paramDetObject89);
    let paramDetObject90 = new ParametroDetalleFire(); paramDetObject90.codigo = 779; paramDetObject90.descripcion = 'COORDINADOR DE CREDITOS PALABRA DE MUJER'; paramDetObject90.estado = 'Activo'; paramDetObjectList.push(paramDetObject90);
    let paramDetObject91 = new ParametroDetalleFire(); paramDetObject91.codigo = 1288; paramDetObject91.descripcion = 'COORDINADOR DE GESTIÓN BACK DE REDES'; paramDetObject91.estado = 'Activo'; paramDetObjectList.push(paramDetObject91);
    let paramDetObject92 = new ParametroDetalleFire(); paramDetObject92.codigo = 1335; paramDetObject92.descripcion = 'COORDINADOR DE GESTION DE ASUNTOS CONTENCIOSOS'; paramDetObject92.estado = 'Activo'; paramDetObjectList.push(paramDetObject92);
    let paramDetObject93 = new ParametroDetalleFire(); paramDetObject93.codigo = 1197; paramDetObject93.descripcion = 'COORDINADOR DE GESTION NORMATIVA Y COBRANZA JUDICIAL'; paramDetObject93.estado = 'Activo'; paramDetObjectList.push(paramDetObject93);
    let paramDetObject94 = new ParametroDetalleFire(); paramDetObject94.codigo = 1301; paramDetObject94.descripcion = 'COORDINADOR DE NOMINA'; paramDetObject94.estado = 'Activo'; paramDetObjectList.push(paramDetObject94);
    let paramDetObject95 = new ParametroDetalleFire(); paramDetObject95.codigo = 1241; paramDetObject95.descripcion = 'COORDINADOR DE SERVICIOS GENERALES'; paramDetObject95.estado = 'Activo'; paramDetObjectList.push(paramDetObject95);
    let paramDetObject96 = new ParametroDetalleFire(); paramDetObject96.codigo = 442; paramDetObject96.descripcion = 'EJECUTIVO DE BANCA PREFERENTE'; paramDetObject96.estado = 'Activo'; paramDetObjectList.push(paramDetObject96);
    let paramDetObject97 = new ParametroDetalleFire(); paramDetObject97.codigo = 1246; paramDetObject97.descripcion = 'EJECUTIVO DE COBRANZA'; paramDetObject97.estado = 'Activo'; paramDetObjectList.push(paramDetObject97);
    let paramDetObject98 = new ParametroDetalleFire(); paramDetObject98.codigo = 1027; paramDetObject98.descripcion = 'EJECUTIVO DE PLATAFORMA'; paramDetObject98.estado = 'Activo'; paramDetObjectList.push(paramDetObject98);
    let paramDetObject99 = new ParametroDetalleFire(); paramDetObject99.codigo = 1028; paramDetObject99.descripcion = 'EJECUTIVO DE SERVICIOS'; paramDetObject99.estado = 'Activo'; paramDetObjectList.push(paramDetObject99);
    let paramDetObject100 = new ParametroDetalleFire(); paramDetObject100.codigo = 1279; paramDetObject100.descripcion = 'ESPECIALISTA DE ADMISIÓN'; paramDetObject100.estado = 'Activo'; paramDetObjectList.push(paramDetObject100);
    let paramDetObject101 = new ParametroDetalleFire(); paramDetObject101.codigo = 1201; paramDetObject101.descripcion = 'ESPECIALISTA DE ANALISIS DE RIESGO Y REGULACION'; paramDetObject101.estado = 'Activo'; paramDetObjectList.push(paramDetObject101);
    let paramDetObject102 = new ParametroDetalleFire(); paramDetObject102.codigo = 1329; paramDetObject102.descripcion = 'ESPECIALISTA DE ARQUITECTURA DE NEGOCIOS'; paramDetObject102.estado = 'Activo'; paramDetObjectList.push(paramDetObject102);
    let paramDetObject103 = new ParametroDetalleFire(); paramDetObject103.codigo = 1331; paramDetObject103.descripcion = 'ESPECIALISTA DE ASEGURAMIENTO DE CALIDAD'; paramDetObject103.estado = 'Activo'; paramDetObjectList.push(paramDetObject103);
    let paramDetObject104 = new ParametroDetalleFire(); paramDetObject104.codigo = 1263; paramDetObject104.descripcion = 'ESPECIALISTA DE ASUNTOS LABORALES'; paramDetObject104.estado = 'Activo'; paramDetObjectList.push(paramDetObject104);
    let paramDetObject105 = new ParametroDetalleFire(); paramDetObject105.codigo = 1315; paramDetObject105.descripcion = 'ESPECIALISTA DE BACK OFFICE'; paramDetObject105.estado = 'Activo'; paramDetObjectList.push(paramDetObject105);
    let paramDetObject106 = new ParametroDetalleFire(); paramDetObject106.codigo = 1293; paramDetObject106.descripcion = 'ESPECIALISTA DE CLIENTES Y PRODUCTOS'; paramDetObject106.estado = 'Activo'; paramDetObjectList.push(paramDetObject106);
    let paramDetObject107 = new ParametroDetalleFire(); paramDetObject107.codigo = 935; paramDetObject107.descripcion = 'ESPECIALISTA DE COMPRAS'; paramDetObject107.estado = 'Activo'; paramDetObjectList.push(paramDetObject107);
    let paramDetObject108 = new ParametroDetalleFire(); paramDetObject108.codigo = 1177; paramDetObject108.descripcion = 'ESPECIALISTA DE CONTINUIDAD DEL NEGOCIO'; paramDetObject108.estado = 'Activo'; paramDetObjectList.push(paramDetObject108);
    let paramDetObject109 = new ParametroDetalleFire(); paramDetObject109.codigo = 1109; paramDetObject109.descripcion = 'ESPECIALISTA DE CONTRATOS'; paramDetObject109.estado = 'Activo'; paramDetObjectList.push(paramDetObject109);
    let paramDetObject110 = new ParametroDetalleFire(); paramDetObject110.codigo = 1248; paramDetObject110.descripcion = 'ESPECIALISTA DE CONTROL DE GESTIÓN DE RECUPERACIONES'; paramDetObject110.estado = 'Activo'; paramDetObjectList.push(paramDetObject110);
    let paramDetObject111 = new ParametroDetalleFire(); paramDetObject111.codigo = 1247; paramDetObject111.descripcion = 'ESPECIALISTA DE CONTROL INTERNO'; paramDetObject111.estado = 'Activo'; paramDetObjectList.push(paramDetObject111);
    let paramDetObject112 = new ParametroDetalleFire(); paramDetObject112.codigo = 946; paramDetObject112.descripcion = 'ESPECIALISTA DE ESTRUCTURAS'; paramDetObject112.estado = 'Activo'; paramDetObjectList.push(paramDetObject112);
    let paramDetObject113 = new ParametroDetalleFire(); paramDetObject113.codigo = 1264; paramDetObject113.descripcion = 'ESPECIALISTA DE GESTION DE PERSONAS'; paramDetObject113.estado = 'Activo'; paramDetObjectList.push(paramDetObject113);
    let paramDetObject114 = new ParametroDetalleFire(); paramDetObject114.codigo = 1298; paramDetObject114.descripcion = 'ESPECIALISTA DE GESTIÓN DE PRODUCTOS DE SEGUROS Y ALIANZAS'; paramDetObject114.estado = 'Activo'; paramDetObjectList.push(paramDetObject114);
    let paramDetObject115 = new ParametroDetalleFire(); paramDetObject115.codigo = 1204; paramDetObject115.descripcion = 'ESPECIALISTA DE GESTION FINANCIERA'; paramDetObject115.estado = 'Activo'; paramDetObjectList.push(paramDetObject115);
    let paramDetObject116 = new ParametroDetalleFire(); paramDetObject116.codigo = 1258; paramDetObject116.descripcion = 'ESPECIALISTA DE MODELOS DE RIESGOS'; paramDetObject116.estado = 'Activo'; paramDetObjectList.push(paramDetObject116);
    let paramDetObject117 = new ParametroDetalleFire(); paramDetObject117.codigo = 928; paramDetObject117.descripcion = 'ESPECIALISTA DE PROYECTOS'; paramDetObject117.estado = 'Activo'; paramDetObjectList.push(paramDetObject117);
    let paramDetObject118 = new ParametroDetalleFire(); paramDetObject118.codigo = 1154; paramDetObject118.descripcion = 'ESPECIALISTA DE RIESGO DE MERCADO Y LIQUIDEZ'; paramDetObject118.estado = 'Activo'; paramDetObjectList.push(paramDetObject118);
    let paramDetObject119 = new ParametroDetalleFire(); paramDetObject119.codigo = 1143; paramDetObject119.descripcion = 'ESPECIALISTA DE RIESGO OPERACIONAL'; paramDetObject119.estado = 'Activo'; paramDetObjectList.push(paramDetObject119);
    let paramDetObject120 = new ParametroDetalleFire(); paramDetObject120.codigo = 1280; paramDetObject120.descripcion = 'ESPECIALISTA DE SEGUIMIENTO'; paramDetObject120.estado = 'Activo'; paramDetObjectList.push(paramDetObject120);
    let paramDetObject121 = new ParametroDetalleFire(); paramDetObject121.codigo = 1338; paramDetObject121.descripcion = 'ESPECIALISTA DE SEGURIDAD DE LA INFORMACIÓN'; paramDetObject121.estado = 'Activo'; paramDetObjectList.push(paramDetObject121);
    let paramDetObject122 = new ParametroDetalleFire(); paramDetObject122.codigo = 1125; paramDetObject122.descripcion = 'ESPECIALISTA DE SERVICIOS DATA CENTER'; paramDetObject122.estado = 'Activo'; paramDetObjectList.push(paramDetObject122);
    let paramDetObject123 = new ParametroDetalleFire(); paramDetObject123.codigo = 1312; paramDetObject123.descripcion = 'ESPECIALISTA DE SISTEMAS'; paramDetObject123.estado = 'Activo'; paramDetObjectList.push(paramDetObject123);
    let paramDetObject124 = new ParametroDetalleFire(); paramDetObject124.codigo = 1275; paramDetObject124.descripcion = 'ESPECIALISTA EN INFORMACIÓN DE GESTIÓN'; paramDetObject124.estado = 'Activo'; paramDetObjectList.push(paramDetObject124);
    let paramDetObject125 = new ParametroDetalleFire(); paramDetObject125.codigo = 1259; paramDetObject125.descripcion = 'ESPECIALISTA EN INFORMACION E INTEGRACION DE SISTEMAS'; paramDetObject125.estado = 'Activo'; paramDetObjectList.push(paramDetObject125);
    let paramDetObject126 = new ParametroDetalleFire(); paramDetObject126.codigo = 1045; paramDetObject126.descripcion = 'ESPECIALISTA LEGAL'; paramDetObject126.estado = 'Activo'; paramDetObjectList.push(paramDetObject126);
    let paramDetObject127 = new ParametroDetalleFire(); paramDetObject127.codigo = 934; paramDetObject127.descripcion = 'GERENTE DE ADMINISTRACION'; paramDetObject127.estado = 'Activo'; paramDetObjectList.push(paramDetObject127);
    let paramDetObject128 = new ParametroDetalleFire(); paramDetObject128.codigo = 1195; paramDetObject128.descripcion = 'GERENTE DE ADMISION Y SEGUIMIENTO'; paramDetObject128.estado = 'Activo'; paramDetObjectList.push(paramDetObject128);
    let paramDetObject129 = new ParametroDetalleFire(); paramDetObject129.codigo = 1354; paramDetObject129.descripcion = 'GERENTE DE ALIANZAS Y ESTRATEGIA COMERCIAL'; paramDetObject129.estado = 'Activo'; paramDetObjectList.push(paramDetObject129);
    let paramDetObject130 = new ParametroDetalleFire(); paramDetObject130.codigo = 1325; paramDetObject130.descripcion = 'GERENTE DE ARQUITECTURA DE PROCESOS Y ESTRUCTURAS'; paramDetObject130.estado = 'Activo'; paramDetObjectList.push(paramDetObject130);
    let paramDetObject131 = new ParametroDetalleFire(); paramDetObject131.codigo = 1334; paramDetObject131.descripcion = 'GERENTE DE ASUNTOS ADMINISTRATIVOS E INSTITUCIONALES'; paramDetObject131.estado = 'Activo'; paramDetObjectList.push(paramDetObject131);
    let paramDetObject132 = new ParametroDetalleFire(); paramDetObject132.codigo = 1070; paramDetObject132.descripcion = 'GERENTE DE ASUNTOS ADMINISTRATIVOS Y CONTROL INTERNO'; paramDetObject132.estado = 'Activo'; paramDetObjectList.push(paramDetObject132);
    let paramDetObject133 = new ParametroDetalleFire(); paramDetObject133.codigo = 1262; paramDetObject133.descripcion = 'GERENTE DE ASUNTOS LABORALES'; paramDetObject133.estado = 'Activo'; paramDetObjectList.push(paramDetObject133);
    let paramDetObject134 = new ParametroDetalleFire(); paramDetObject134.codigo = 1313; paramDetObject134.descripcion = 'GERENTE DE BANCA DE SERVICIO'; paramDetObject134.estado = 'Activo'; paramDetObjectList.push(paramDetObject134);
    let paramDetObject135 = new ParametroDetalleFire(); paramDetObject135.codigo = 1348; paramDetObject135.descripcion = 'GERENTE DE BANCA GRUPAL'; paramDetObject135.estado = 'Activo'; paramDetObjectList.push(paramDetObject135);
    let paramDetObject136 = new ParametroDetalleFire(); paramDetObject136.codigo = 1343; paramDetObject136.descripcion = 'GERENTE DE BANCA INDIVIDUAL'; paramDetObject136.estado = 'Activo'; paramDetObjectList.push(paramDetObject136);
    let paramDetObject137 = new ParametroDetalleFire(); paramDetObject137.codigo = 1352; paramDetObject137.descripcion = 'GERENTE DE CANALES'; paramDetObject137.estado = 'Activo'; paramDetObjectList.push(paramDetObject137);
    let paramDetObject138 = new ParametroDetalleFire(); paramDetObject138.codigo = 1300; paramDetObject138.descripcion = 'GERENTE DE COMPENSACIONES Y NOMINA'; paramDetObject138.estado = 'Activo'; paramDetObjectList.push(paramDetObject138);
    let paramDetObject139 = new ParametroDetalleFire(); paramDetObject139.codigo = 916; paramDetObject139.descripcion = 'GERENTE DE CONTABILIDAD'; paramDetObject139.estado = 'Activo'; paramDetObjectList.push(paramDetObject139);
    let paramDetObject140 = new ParametroDetalleFire(); paramDetObject140.codigo = 1292; paramDetObject140.descripcion = 'GERENTE DE ESTRATEGIA DE CLIENTES Y PRODUCTOS'; paramDetObject140.estado = 'Activo'; paramDetObjectList.push(paramDetObject140);
    let paramDetObject141 = new ParametroDetalleFire(); paramDetObject141.codigo = 1291; paramDetObject141.descripcion = 'GERENTE DE GESTIÓN DE PRODUCTOS'; paramDetObject141.estado = 'Activo'; paramDetObjectList.push(paramDetObject141);
    let paramDetObject142 = new ParametroDetalleFire(); paramDetObject142.codigo = 1199; paramDetObject142.descripcion = 'GERENTE DE GESTION GLOBAL DEL RIESGO'; paramDetObject142.estado = 'Activo'; paramDetObjectList.push(paramDetObject142);
    let paramDetObject143 = new ParametroDetalleFire(); paramDetObject143.codigo = 1220; paramDetObject143.descripcion = 'GERENTE DE INCORPORACION, FORMACION Y DESARROLLO'; paramDetObject143.estado = 'Activo'; paramDetObjectList.push(paramDetObject143);
    let paramDetObject144 = new ParametroDetalleFire(); paramDetObject144.codigo = 1308; paramDetObject144.descripcion = 'GERENTE DE INGENIERIA DE SISTEMAS'; paramDetObject144.estado = 'Activo'; paramDetObjectList.push(paramDetObject144);
    let paramDetObject145 = new ParametroDetalleFire(); paramDetObject145.codigo = 1357; paramDetObject145.descripcion = 'GERENTE DE INTELIGENCIA COMERCIAL'; paramDetObject145.estado = 'Activo'; paramDetObjectList.push(paramDetObject145);
    let paramDetObject146 = new ParametroDetalleFire(); paramDetObject146.codigo = 1346; paramDetObject146.descripcion = 'GERENTE DE MARKETING Y EXPERIENCIA DEL CLIENTE'; paramDetObject146.estado = 'Activo'; paramDetObjectList.push(paramDetObject146);
    let paramDetObject147 = new ParametroDetalleFire(); paramDetObject147.codigo = 1008; paramDetObject147.descripcion = 'GERENTE DE NEGOCIO BANCARIO Y CONTRATACION'; paramDetObject147.estado = 'Activo'; paramDetObjectList.push(paramDetObject147);
    let paramDetObject148 = new ParametroDetalleFire(); paramDetObject148.codigo = 1270; paramDetObject148.descripcion = 'GERENTE DE PLANIFICACIÓN FINANCIERA Y CONTROL DE GESTIÓN'; paramDetObject148.estado = 'Activo'; paramDetObjectList.push(paramDetObject148);
    let paramDetObject149 = new ParametroDetalleFire(); paramDetObject149.codigo = 1049; paramDetObject149.descripcion = 'GERENTE DE RECUPERACIONES'; paramDetObject149.estado = 'Activo'; paramDetObjectList.push(paramDetObject149);
    let paramDetObject150 = new ParametroDetalleFire(); paramDetObject150.codigo = 1282; paramDetObject150.descripcion = 'GERENTE DE RO, CONTINUIDAD DEL NEGOCIO Y SDI'; paramDetObject150.estado = 'Activo'; paramDetObjectList.push(paramDetObject150);
    let paramDetObject151 = new ParametroDetalleFire(); paramDetObject151.codigo = 1349; paramDetObject151.descripcion = 'GERENTE DE SEGUROS, CAPTACIONES Y SERVICIOS'; paramDetObject151.estado = 'Activo'; paramDetObjectList.push(paramDetObject151);
    let paramDetObject152 = new ParametroDetalleFire(); paramDetObject152.codigo = 960; paramDetObject152.descripcion = 'GERENTE DE TECNOLOGIA Y EXPLOTACION'; paramDetObject152.estado = 'Activo'; paramDetObjectList.push(paramDetObject152);
    let paramDetObject153 = new ParametroDetalleFire(); paramDetObject153.codigo = 910; paramDetObject153.descripcion = 'GERENTE DE TESORERIA'; paramDetObject153.estado = 'Activo'; paramDetObjectList.push(paramDetObject153);
    let paramDetObject154 = new ParametroDetalleFire(); paramDetObject154.codigo = 1; paramDetObject154.descripcion = 'GERENTE GENERAL'; paramDetObject154.estado = 'Activo'; paramDetObjectList.push(paramDetObject154);
    let paramDetObject155 = new ParametroDetalleFire(); paramDetObject155.codigo = 1290; paramDetObject155.descripcion = 'GERENTE GENERAL ADJUNTO DE DESARROLLO DE CLIENTES'; paramDetObject155.estado = 'Activo'; paramDetObjectList.push(paramDetObject155);
    let paramDetObject156 = new ParametroDetalleFire(); paramDetObject156.codigo = 1269; paramDetObject156.descripcion = 'GERENTE GENERAL ADJUNTO DE ESTRATEGIA Y FINANZAS'; paramDetObject156.estado = 'Activo'; paramDetObjectList.push(paramDetObject156);
    let paramDetObject157 = new ParametroDetalleFire(); paramDetObject157.codigo = 1299; paramDetObject157.descripcion = 'GERENTE GENERAL ADJUNTO DE GESTION DE PERSONAS Y RECURSOS'; paramDetObject157.estado = 'Activo'; paramDetObjectList.push(paramDetObject157);
    let paramDetObject158 = new ParametroDetalleFire(); paramDetObject158.codigo = 1278; paramDetObject158.descripcion = 'GERENTE GENERAL ADJUNTO DE GESTIÓN INTEGRAL DEL RIESGO'; paramDetObject158.estado = 'Activo'; paramDetObjectList.push(paramDetObject158);
    let paramDetObject159 = new ParametroDetalleFire(); paramDetObject159.codigo = 1284; paramDetObject159.descripcion = 'GERENTE GENERAL ADJUNTO DE RED DE DISTRIBUCIÓN'; paramDetObject159.estado = 'Activo'; paramDetObjectList.push(paramDetObject159);
    let paramDetObject160 = new ParametroDetalleFire(); paramDetObject160.codigo = 1073; paramDetObject160.descripcion = 'GERENTE GENERAL ADJUNTO DE SERVICIOS JURIDICOS Y SECRETARIA'; paramDetObject160.estado = 'Activo'; paramDetObjectList.push(paramDetObject160);
    let paramDetObject161 = new ParametroDetalleFire(); paramDetObject161.codigo = 1333; paramDetObject161.descripcion = 'GERENTE GENERAL ADJUNTO DE SSJJ/SECRETARIA GRAL/CUMPLIMIENTO'; paramDetObject161.estado = 'Activo'; paramDetObjectList.push(paramDetObject161);
    let paramDetObject162 = new ParametroDetalleFire(); paramDetObject162.codigo = 1307; paramDetObject162.descripcion = 'GERENTE GENERAL ADJUNTO DE TECNOLOGIA Y PROCESOS'; paramDetObject162.estado = 'Activo'; paramDetObjectList.push(paramDetObject162);
    let paramDetObject163 = new ParametroDetalleFire(); paramDetObject163.codigo = 708; paramDetObject163.descripcion = 'GERENTE REGIONAL'; paramDetObject163.estado = 'Activo'; paramDetObjectList.push(paramDetObject163);
    let paramDetObject164 = new ParametroDetalleFire(); paramDetObject164.codigo = 404; paramDetObject164.descripcion = 'GERENTE TERRITORIAL'; paramDetObject164.estado = 'Activo'; paramDetObjectList.push(paramDetObject164);
    let paramDetObject165 = new ParametroDetalleFire(); paramDetObject165.codigo = 1107; paramDetObject165.descripcion = 'JEFE AGROPECUARIO'; paramDetObject165.estado = 'Activo'; paramDetObjectList.push(paramDetObject165);
    let paramDetObject166 = new ParametroDetalleFire(); paramDetObject166.codigo = 1200; paramDetObject166.descripcion = 'JEFE DE ANALISIS DE RIESGO Y REGULACION'; paramDetObject166.estado = 'Activo'; paramDetObjectList.push(paramDetObject166);
    let paramDetObject167 = new ParametroDetalleFire(); paramDetObject167.codigo = 1310; paramDetObject167.descripcion = 'JEFE DE APLICATIVOS MOVILES'; paramDetObject167.estado = 'Activo'; paramDetObjectList.push(paramDetObject167);
    let paramDetObject168 = new ParametroDetalleFire(); paramDetObject168.codigo = 1327; paramDetObject168.descripcion = 'JEFE DE ARQUITECTURA DE NEGOCIOS Y ESTRUCTURAS'; paramDetObject168.estado = 'Activo'; paramDetObjectList.push(paramDetObject168);
    let paramDetObject169 = new ParametroDetalleFire(); paramDetObject169.codigo = 870; paramDetObject169.descripcion = 'JEFE DE AUDITORIA DE PROCESOS'; paramDetObject169.estado = 'Activo'; paramDetObjectList.push(paramDetObject169);
    let paramDetObject170 = new ParametroDetalleFire(); paramDetObject170.codigo = 1060; paramDetObject170.descripcion = 'JEFE DE AUDITORIA DE RED'; paramDetObject170.estado = 'Activo'; paramDetObjectList.push(paramDetObject170);
    let paramDetObject171 = new ParametroDetalleFire(); paramDetObject171.codigo = 868; paramDetObject171.descripcion = 'JEFE DE AUDITORIA DE TI'; paramDetObject171.estado = 'Activo'; paramDetObjectList.push(paramDetObject171);
    let paramDetObject172 = new ParametroDetalleFire(); paramDetObject172.codigo = 1059; paramDetObject172.descripcion = 'JEFE DE CALIDAD / AUDITORIA CONTINUA'; paramDetObject172.estado = 'Activo'; paramDetObjectList.push(paramDetObject172);
    let paramDetObject173 = new ParametroDetalleFire(); paramDetObject173.codigo = 789; paramDetObject173.descripcion = 'JEFE DE CANALES'; paramDetObject173.estado = 'Activo'; paramDetObjectList.push(paramDetObject173);
    let paramDetObject174 = new ParametroDetalleFire(); paramDetObject174.codigo = 1108; paramDetObject174.descripcion = 'JEFE DE COMPRAS Y CONTRATOS'; paramDetObject174.estado = 'Activo'; paramDetObjectList.push(paramDetObject174);
    let paramDetObject175 = new ParametroDetalleFire(); paramDetObject175.codigo = 1268; paramDetObject175.descripcion = 'JEFE DE COMUNICACIÓN E IMAGEN'; paramDetObject175.estado = 'Activo'; paramDetObjectList.push(paramDetObject175);
    let paramDetObject176 = new ParametroDetalleFire(); paramDetObject176.codigo = 904; paramDetObject176.descripcion = 'JEFE DE CONTROL DE GESTION'; paramDetObject176.estado = 'Activo'; paramDetObjectList.push(paramDetObject176);
    let paramDetObject177 = new ParametroDetalleFire(); paramDetObject177.codigo = 1272; paramDetObject177.descripcion = 'JEFE DE CONTROL PRESUPUESTAL'; paramDetObject177.estado = 'Activo'; paramDetObjectList.push(paramDetObject177);
    let paramDetObject178 = new ParametroDetalleFire(); paramDetObject178.codigo = 1309; paramDetObject178.descripcion = 'JEFE DE FABRICA DE SOFTWARE'; paramDetObject178.estado = 'Activo'; paramDetObjectList.push(paramDetObject178);
    let paramDetObject179 = new ParametroDetalleFire(); paramDetObject179.codigo = 1205; paramDetObject179.descripcion = 'JEFE DE GESTION CONTABLE'; paramDetObject179.estado = 'Activo'; paramDetObjectList.push(paramDetObject179);
    let paramDetObject180 = new ParametroDetalleFire(); paramDetObject180.codigo = 937; paramDetObject180.descripcion = 'JEFE DE GESTION DE INMUEBLES Y ACTIVOS FIJOS'; paramDetObject180.estado = 'Activo'; paramDetObjectList.push(paramDetObject180);
    let paramDetObject181 = new ParametroDetalleFire(); paramDetObject181.codigo = 1304; paramDetObject181.descripcion = 'JEFE DE GESTION DE PERSONAS'; paramDetObject181.estado = 'Activo'; paramDetObjectList.push(paramDetObject181);
    let paramDetObject182 = new ParametroDetalleFire(); paramDetObject182.codigo = 1295; paramDetObject182.descripcion = 'JEFE DE GESTIÓN DE PRODUCTOS DEL ACTIVO'; paramDetObject182.estado = 'Activo'; paramDetObjectList.push(paramDetObject182);
    let paramDetObject183 = new ParametroDetalleFire(); paramDetObject183.codigo = 1056; paramDetObject183.descripcion = 'JEFE DE GESTION DE RECLAMOS'; paramDetObject183.estado = 'Activo'; paramDetObjectList.push(paramDetObject183);
    let paramDetObject184 = new ParametroDetalleFire(); paramDetObject184.codigo = 1326; paramDetObject184.descripcion = 'JEFE DE GESTION POR PROCESOS'; paramDetObject184.estado = 'Activo'; paramDetObjectList.push(paramDetObject184);
    let paramDetObject185 = new ParametroDetalleFire(); paramDetObject185.codigo = 834; paramDetObject185.descripcion = 'JEFE DE GESTION TRIBUTARIA'; paramDetObject185.estado = 'Activo'; paramDetObjectList.push(paramDetObject185);
    let paramDetObject186 = new ParametroDetalleFire(); paramDetObject186.codigo = 1198; paramDetObject186.descripcion = 'JEFE DE GESTION Y ESTRATEGIA DE RECUPERACIONES'; paramDetObject186.estado = 'Activo'; paramDetObjectList.push(paramDetObject186);
    let paramDetObject187 = new ParametroDetalleFire(); paramDetObject187.codigo = 1044; paramDetObject187.descripcion = 'JEFE DE INCLUSION'; paramDetObject187.estado = 'Activo'; paramDetObjectList.push(paramDetObject187);
    let paramDetObject188 = new ParametroDetalleFire(); paramDetObject188.codigo = 1123; paramDetObject188.descripcion = 'JEFE DE INFRAESTRUCTURA DE SISTEMAS'; paramDetObject188.estado = 'Activo'; paramDetObjectList.push(paramDetObject188);
    let paramDetObject189 = new ParametroDetalleFire(); paramDetObject189.codigo = 543; paramDetObject189.descripcion = 'JEFE DE INTELIGENCIA COMERCIAL'; paramDetObject189.estado = 'Activo'; paramDetObjectList.push(paramDetObject189);
    let paramDetObject190 = new ParametroDetalleFire(); paramDetObject190.codigo = 1311; paramDetObject190.descripcion = 'JEFE DE MANTENIMIENTO DE SOFTWARE'; paramDetObject190.estado = 'Activo'; paramDetObjectList.push(paramDetObject190);
    let paramDetObject191 = new ParametroDetalleFire(); paramDetObject191.codigo = 1281; paramDetObject191.descripcion = 'JEFE DE MODELOS Y ORIGINACIÓN'; paramDetObject191.estado = 'Activo'; paramDetObjectList.push(paramDetObject191);
    let paramDetObject192 = new ParametroDetalleFire(); paramDetObject192.codigo = 927; paramDetObject192.descripcion = 'JEFE DE OFICINA DE PROYECTOS'; paramDetObject192.estado = 'Activo'; paramDetObjectList.push(paramDetObject192);
    let paramDetObject193 = new ParametroDetalleFire(); paramDetObject193.codigo = 1026; paramDetObject193.descripcion = 'JEFE DE OPERACIONES DE AGENCIA'; paramDetObject193.estado = 'Activo'; paramDetObjectList.push(paramDetObject193);
    let paramDetObject194 = new ParametroDetalleFire(); paramDetObject194.codigo = 1126; paramDetObject194.descripcion = 'JEFE DE PRODUCCION'; paramDetObject194.estado = 'Activo'; paramDetObjectList.push(paramDetObject194);
    let paramDetObject195 = new ParametroDetalleFire(); paramDetObject195.codigo = 1336; paramDetObject195.descripcion = 'JEFE DE RED DE DESARROLLO DE CLIENTES Y PRODUCTOS'; paramDetObject195.estado = 'Activo'; paramDetObjectList.push(paramDetObject195);
    let paramDetObject196 = new ParametroDetalleFire(); paramDetObject196.codigo = 833; paramDetObject196.descripcion = 'JEFE DE REGISTRO Y CONTROL DE PAGOS'; paramDetObject196.estado = 'Activo'; paramDetObjectList.push(paramDetObject196);
    let paramDetObject197 = new ParametroDetalleFire(); paramDetObject197.codigo = 1169; paramDetObject197.descripcion = 'JEFE DE RIESGO OPERACIONAL'; paramDetObject197.estado = 'Activo'; paramDetObjectList.push(paramDetObject197);
    let paramDetObject198 = new ParametroDetalleFire(); paramDetObject198.codigo = 1322; paramDetObject198.descripcion = 'JEFE DE SERVICIO CENTRAL'; paramDetObject198.estado = 'Activo'; paramDetObjectList.push(paramDetObject198);
    let paramDetObject199 = new ParametroDetalleFire(); paramDetObject199.codigo = 1314; paramDetObject199.descripcion = 'JEFE DE SERVICIO DE CAJA CENTRAL'; paramDetObject199.estado = 'Activo'; paramDetObjectList.push(paramDetObject199);
    let paramDetObject200 = new ParametroDetalleFire(); paramDetObject200.codigo = 1320; paramDetObject200.descripcion = 'JEFE DE SERVICIO DE CANALES'; paramDetObject200.estado = 'Activo'; paramDetObjectList.push(paramDetObject200);
    let paramDetObject201 = new ParametroDetalleFire(); paramDetObject201.codigo = 1182; paramDetObject201.descripcion = 'JEFE DE SERVICIOS DE TECNOLOGIA'; paramDetObject201.estado = 'Activo'; paramDetObjectList.push(paramDetObject201);
    let paramDetObject202 = new ParametroDetalleFire(); paramDetObject202.codigo = 1274; paramDetObject202.descripcion = 'JEFE DE SISTEMAS DE INFORMACIÓN DE GESTIÓN'; paramDetObject202.estado = 'Activo'; paramDetObjectList.push(paramDetObject202);
    let paramDetObject203 = new ParametroDetalleFire(); paramDetObject203.codigo = 1337; paramDetObject203.descripcion = 'JEFE DE TERRITORIO DE ASESORIA JURIDICA'; paramDetObject203.estado = 'Activo'; paramDetObjectList.push(paramDetObject203);
    let paramDetObject204 = new ParametroDetalleFire(); paramDetObject204.codigo = 1319; paramDetObject204.descripcion = 'JEFE REGIONAL DE BANCA DE SERVICIO'; paramDetObject204.estado = 'Activo'; paramDetObjectList.push(paramDetObject204);
    let paramDetObject205 = new ParametroDetalleFire(); paramDetObject205.codigo = 1138; paramDetObject205.descripcion = 'JEFE TERRITORIAL DE ADMISION DE RIESGO DE CREDITO'; paramDetObject205.estado = 'Activo'; paramDetObjectList.push(paramDetObject205);
    let paramDetObject206 = new ParametroDetalleFire(); paramDetObject206.codigo = 1303; paramDetObject206.descripcion = 'JEFE TERRITORIAL DE GESTION DE PERSONAS Y RECURSOS'; paramDetObject206.estado = 'Activo'; paramDetObjectList.push(paramDetObject206);
    let paramDetObject207 = new ParametroDetalleFire(); paramDetObject207.codigo = 1071; paramDetObject207.descripcion = 'JEFE TERRITORIAL DE NEGOCIO BANCARIO Y CONTRATACION'; paramDetObject207.estado = 'Activo'; paramDetObjectList.push(paramDetObject207);
    let paramDetObject208 = new ParametroDetalleFire(); paramDetObject208.codigo = 1146; paramDetObject208.descripcion = 'JEFE TERRITORIAL DE SEGUIMIENTO'; paramDetObject208.estado = 'Activo'; paramDetObjectList.push(paramDetObject208);
    let paramDetObject209 = new ParametroDetalleFire(); paramDetObject209.codigo = 1243; paramDetObject209.descripcion = 'OFICIAL DE CONDUCTA DE MERCADO'; paramDetObject209.estado = 'Activo'; paramDetObjectList.push(paramDetObject209);
    let paramDetObject210 = new ParametroDetalleFire(); paramDetObject210.codigo = 1255; paramDetObject210.descripcion = 'OFICIAL DE CUMPLIMIENTO GRLA/FT'; paramDetObject210.estado = 'Activo'; paramDetObjectList.push(paramDetObject210);
    let paramDetObject211 = new ParametroDetalleFire(); paramDetObject211.codigo = 813; paramDetObject211.descripcion = 'OFICIAL DE CUMPLIMIENTO NORMATIVO'; paramDetObject211.estado = 'Activo'; paramDetObjectList.push(paramDetObject211);
    let paramDetObject212 = new ParametroDetalleFire(); paramDetObject212.codigo = 1339; paramDetObject212.descripcion = 'OFICIAL DE SEGURIDAD DE LA INFORMACIÓN'; paramDetObject212.estado = 'Activo'; paramDetObjectList.push(paramDetObject212);
    let paramDetObject213 = new ParametroDetalleFire(); paramDetObject213.codigo = 144; paramDetObject213.descripcion = 'PRACTICANTE'; paramDetObject213.estado = 'Activo'; paramDetObjectList.push(paramDetObject213);
    let paramDetObject214 = new ParametroDetalleFire(); paramDetObject214.codigo = 1345; paramDetObject214.descripcion = 'RESPONSABLE DE ACTIVOS TRADICIONALES'; paramDetObject214.estado = 'Activo'; paramDetObjectList.push(paramDetObject214);
    let paramDetObject215 = new ParametroDetalleFire(); paramDetObject215.codigo = 1344; paramDetObject215.descripcion = 'RESPONSABLE DE AGRO SOSTENIBLES'; paramDetObject215.estado = 'Activo'; paramDetObjectList.push(paramDetObject215);
    let paramDetObject216 = new ParametroDetalleFire(); paramDetObject216.codigo = 1355; paramDetObject216.descripcion = 'RESPONSABLE DE ALIANZAS ESTRATÉGICAS'; paramDetObject216.estado = 'Activo'; paramDetObjectList.push(paramDetObject216);
    let paramDetObject217 = new ParametroDetalleFire(); paramDetObject217.codigo = 1285; paramDetObject217.descripcion = 'RESPONSABLE DE CANALES DIGITALES'; paramDetObject217.estado = 'Activo'; paramDetObjectList.push(paramDetObject217);
    let paramDetObject218 = new ParametroDetalleFire(); paramDetObject218.codigo = 1353; paramDetObject218.descripcion = 'RESPONSABLE DE CANALES FÍSICOS'; paramDetObject218.estado = 'Activo'; paramDetObjectList.push(paramDetObject218);
    let paramDetObject219 = new ParametroDetalleFire(); paramDetObject219.codigo = 1350; paramDetObject219.descripcion = 'RESPONSABLE DE CAPTACIONES'; paramDetObject219.estado = 'Activo'; paramDetObjectList.push(paramDetObject219);
    let paramDetObject220 = new ParametroDetalleFire(); paramDetObject220.codigo = 1302; paramDetObject220.descripcion = 'RESPONSABLE DE COMPENSACIONES Y PRESUPUESTO'; paramDetObject220.estado = 'Activo'; paramDetObjectList.push(paramDetObject220);
    let paramDetObject221 = new ParametroDetalleFire(); paramDetObject221.codigo = 1359; paramDetObject221.descripcion = 'RESPONSABLE DE DESARROLLO COMERCIAL'; paramDetObject221.estado = 'Activo'; paramDetObjectList.push(paramDetObject221);
    let paramDetObject222 = new ParametroDetalleFire(); paramDetObject222.codigo = 1361; paramDetObject222.descripcion = 'RESPONSABLE DE DESEMPEÑO SOCIAL'; paramDetObject222.estado = 'Activo'; paramDetObjectList.push(paramDetObject222);
    let paramDetObject223 = new ParametroDetalleFire(); paramDetObject223.codigo = 1356; paramDetObject223.descripcion = 'RESPONSABLE DE ESTRATEGIA COMERCIAL'; paramDetObject223.estado = 'Activo'; paramDetObjectList.push(paramDetObject223);
    let paramDetObject224 = new ParametroDetalleFire(); paramDetObject224.codigo = 1358; paramDetObject224.descripcion = 'RESPONSABLE DE GESTIÓN DE LA INFORMACIÓN Y DIAGNÓSTICO'; paramDetObject224.estado = 'Activo'; paramDetObjectList.push(paramDetObject224);
    let paramDetObject225 = new ParametroDetalleFire(); paramDetObject225.codigo = 1297; paramDetObject225.descripcion = 'RESPONSABLE DE GESTIÓN DE PRODUCTOS DEL PASIVO'; paramDetObject225.estado = 'Activo'; paramDetObjectList.push(paramDetObject225);
    let paramDetObject226 = new ParametroDetalleFire(); paramDetObject226.codigo = 1360; paramDetObject226.descripcion = 'RESPONSABLE DE MODELOS'; paramDetObject226.estado = 'Activo'; paramDetObjectList.push(paramDetObject226);
    let paramDetObject227 = new ParametroDetalleFire(); paramDetObject227.codigo = 1347; paramDetObject227.descripcion = 'RESPONSABLE DE PUBLICIDAD'; paramDetObject227.estado = 'Activo'; paramDetObjectList.push(paramDetObject227);
    let paramDetObject228 = new ParametroDetalleFire(); paramDetObject228.codigo = 1306; paramDetObject228.descripcion = 'RESPONSABLE DE SEGURIDAD INTERNA'; paramDetObject228.estado = 'Activo'; paramDetObjectList.push(paramDetObject228);
    let paramDetObject229 = new ParametroDetalleFire(); paramDetObject229.codigo = 1351; paramDetObject229.descripcion = 'RESPONSABLE DE SEGUROS Y SERVICIOS'; paramDetObject229.estado = 'Activo'; paramDetObjectList.push(paramDetObject229);
    let paramDetObject230 = new ParametroDetalleFire(); paramDetObject230.codigo = 1286; paramDetObject230.descripcion = 'RESPONSABLE DE VENTAS MASIVAS'; paramDetObject230.estado = 'Activo'; paramDetObjectList.push(paramDetObject230);
    let paramDetObject231 = new ParametroDetalleFire(); paramDetObject231.codigo = 1271; paramDetObject231.descripcion = 'SUB GERENTE DE PLANIFICACIÓN Y PRESUPUESTO'; paramDetObject231.estado = 'Activo'; paramDetObjectList.push(paramDetObject231);
    let paramDetObject232 = new ParametroDetalleFire(); paramDetObject232.codigo = 1072; paramDetObject232.descripcion = 'SUB SECRETARIA GENERAL'; paramDetObject232.estado = 'Activo'; paramDetObjectList.push(paramDetObject232);
    let paramDetObject233 = new ParametroDetalleFire(); paramDetObject233.codigo = 1151; paramDetObject233.descripcion = 'SUPERVISOR DE RECUPERACIONES'; paramDetObject233.estado = 'Activo'; paramDetObjectList.push(paramDetObject233);
    let paramDetObject234 = new ParametroDetalleFire(); paramDetObject234.codigo = 1147; paramDetObject234.descripcion = 'SUPERVISOR DE SEGUIMIENTO'; paramDetObject234.estado = 'Activo'; paramDetObjectList.push(paramDetObject234);
    let paramDetObject235 = new ParametroDetalleFire(); paramDetObject235.codigo = 913; paramDetObject235.descripcion = 'TRADER DE CAMBIOS'; paramDetObject235.estado = 'Activo'; paramDetObjectList.push(paramDetObject235);
    let paramDetObject236 = new ParametroDetalleFire(); paramDetObject236.codigo = 590; paramDetObject236.descripcion = 'TRADER DE TESORERIA'; paramDetObject236.estado = 'Activo'; paramDetObjectList.push(paramDetObject236);
    
    paramObject.detalle = paramDetObjectList;
    this.firebaseParametros.createParameter(paramObject);
  }
}