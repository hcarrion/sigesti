import { Component, OnInit, Inject, NgZone, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { IniciativaFire } from 'src/app/shared/models/iniciativa-fire';
import { FormControl, FormGroup } from '@angular/forms';
import { FirebaseParametroService } from 'src/app/shared/services/firebase-parametro.service';
import { FirebaseColaboradorService } from 'src/app/shared/services/firebase-colaborador.service';
import { FirebaseIniciativaService } from 'src/app/shared/services/firebase-iniciativa.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { ColaboradorFire } from 'src/app/shared/models/colaborador-fire';
import { ColaboradorDetalleFire } from 'src/app/shared/models/colaborador-detalle-fire';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';
import Swal from 'sweetalert2';
import { IniciativaDetalleFire } from 'src/app/shared/models/iniciativa-detalle-fire';
import { ActividadDetalleFire } from 'src/app/shared/models/actividad-detalle-fire';
import { MatCheckboxChange } from '@angular/material';
import { ParametroDetalleFire } from 'src/app/shared/models/parametro-detalle-fire';
import { ParametroFire } from 'src/app/shared/models/parametro-fire';
@Component({
  selector: 'app-dialog-registra-recurso-evento',
  templateUrl: './dialog-registra-recurso-evento.component.html',
  styleUrls: ['./dialog-registra-recurso-evento.component.css']
})
export class DialogRegistraRecursoEventoComponent implements OnInit {
  regRecursosAct: FormGroup;
  colaboradores: ColaboradorFire = new ColaboradorFire();
  columnasTabla: string[] = ['id', 'usuario','nombres','porcentaje','horasAsig','asignado'];
  public colaboradorCtrl: FormControl = new FormControl();
  public colaboradorFilterCtrl: FormControl = new FormControl();
  public filteredColaboradores: ReplaySubject<ColaboradorDetalleFire[]> = new ReplaySubject<ColaboradorDetalleFire[]>(1);
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  protected _onDestroy = new Subject<void>();

  colaboradorDetFireList: ColaboradorDetalleFire[] = [];
  recursosIniciativaFireListR: ColaboradorDetalleFire[] = [];
  recursosIniciativaFireList: ColaboradorDetalleFire[] = [];

  iniciativaDet: IniciativaDetalleFire = new IniciativaDetalleFire();
  actividadDetR: ActividadDetalleFire = new ActividadDetalleFire();
  actividadDet: ActividadDetalleFire = new ActividadDetalleFire();
  iniciativa: IniciativaFire = new IniciativaFire();
  idIniciativaR: string;
  recursosColabDetFireList: ColaboradorDetalleFire[] = [];
  loading: boolean;
  estado: ParametroDetalleFire[] = [];
  constructor(public dialogRef: MatDialogRef<DialogRegistraRecursoEventoComponent>, 
    private firebaseColaboradores: FirebaseColaboradorService,
    private firebaseParametros: FirebaseParametroService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firebaseIniciativas: FirebaseIniciativaService) {
      this.iniciativaDet = data;
      this.idIniciativaR = this.iniciativaDet.idIniciativa;
      this.actividadDetR = this.iniciativaDet.actividadDetalle;
      this.recursosIniciativaFireListR = this.iniciativa.recursos;
      this.regRecursosAct = new FormGroup({
        nIniciativaInputDialogResource: new FormControl(),
        tituloIniciativaInputDialogResource: new FormControl(),
        codigoActividadInputDialogResource: new FormControl(),
        tituloActividadInputDialogResource: new FormControl(),
        horasAsigActividadInputDialogResource: new FormControl(),
        porAsignarLabel: new FormControl()
      })
  }

  close(): void {
    this.dialogRef.close();
  }
 

  ngOnInit() {
    this.callIniciativa();
  }

  async callIniciativa() {
    this.loading = true;
    let iniciativasRef = this.firebaseIniciativas.getIniciativa3(this.idIniciativaR);
    let parametrosRef = this.firebaseParametros.getParametrosFiltro("nombre", "estado");
      
    parametrosRef.subscribe(data => {data.forEach(paramObj => {
          let paramObject= paramObj.payload.doc.data() as ParametroFire;
          this.estado = paramObject.detalle;
        });
      });
    iniciativasRef.subscribe(data => {
        let iniciativaObject= data.payload.data() as IniciativaFire;
        let idIniciativa = data.payload.id;
        iniciativaObject.idIniciativa = idIniciativa;
        this.iniciativa = iniciativaObject;
        let actDet = this.iniciativa.actividad.actividades.filter(actiDet => actiDet.codigo == this.actividadDetR.codigo);
        this.actividadDet = actDet[0];
        this.loadData(this.iniciativa);
        this.loading = false;
      });
  }

  loadData(iniciativaF: IniciativaFire){
    this.regRecursosAct.controls.nIniciativaInputDialogResource.setValue(iniciativaF.numeroIniciativa);
    this.regRecursosAct.controls.tituloIniciativaInputDialogResource.setValue(iniciativaF.titulo);
    this.regRecursosAct.controls.codigoActividadInputDialogResource.setValue(this.actividadDet.codigo);
    this.regRecursosAct.controls.tituloActividadInputDialogResource.setValue(this.actividadDet.titulo);
    this.regRecursosAct.controls.horasAsigActividadInputDialogResource.setValue(this.actividadDet.horaAsignada);
    this.colaboradorDetFireList = iniciativaF.recursos;
    if(undefined != this.actividadDet.recursos){
      this.recursosColabDetFireList = this.actividadDet.recursos;
      this.recursosColabDetFireList.forEach(element => {
        let itemIndex = this.colaboradorDetFireList.findIndex(item => item.codigo == element.codigo);
        this.colaboradorDetFireList[itemIndex] = element;
      });
    }
    this.updateHorasPorAsignar();
  }

  /*activeSelect(colaboradorDetList: ColaboradorDetalleFire[]){
    this.colaboradorCtrl.setValue(colaboradorDetList);
    this.filteredColaboradores.next(colaboradorDetList.slice());
    this.colaboradorFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks();
      });
  }*/

  /*protected filterBanks() {
    if (!this.colaboradores.colaboradores) {
      return;
    }
    let search = this.colaboradorFilterCtrl.value;
    if (!search) {
      this.filteredColaboradores.next(this.colaboradores.colaboradores.slice());
      this.agregarTablaRecursos(this.colaboradorCtrl.value);
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredColaboradores.next(
      this.colaboradores.colaboradores.filter(colaborador => colaborador.nombres.toLowerCase().indexOf(search) > -1)
    );
  }*/

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /*agregarTablaRecursos(colaboradorDetFire: ColaboradorDetalleFire){
    if(undefined == this.colaboradorDetFireList){
      this.colaboradorDetFireList = [];
      this.colaboradorDetFireList.push(colaboradorDetFire);
      this.updateHorasPorAsignar();
    }else{
      let isExists = this.colaboradorDetFireList.filter(colabDetFire => colabDetFire.codigoUsuario == colaboradorDetFire.codigoUsuario).length > 0;
      if(!isExists){
        this.colaboradorDetFireList.push(colaboradorDetFire);
        this.updateHorasPorAsignar();
      }   
    }
  }*/

  /*eliminarRecursoTabla(colaboradorDetFire: ColaboradorDetalleFire){
    this.colaboradorDetFireList = this.colaboradorDetFireList.filter(colabDetFire => colabDetFire.codigoUsuario !== colaboradorDetFire.codigoUsuario); 
    this.updateHorasPorAsignar();
  }*/

  guardarRecursos(recuColabDetFireList: ColaboradorDetalleFire[]){
    this.loading = true;
    let resultValidate = false;
    if(undefined != recuColabDetFireList && 0 != recuColabDetFireList.length){
      resultValidate = this.validarHoras(recuColabDetFireList);
      
      if(!resultValidate){
        this.loading = false;
        Swal.fire('Advertencia!', 'Las horas asignados deben sumar '+this.actividadDet.horaAsignada+'.', 'warning');
      }else{
        if("PENDIENTE" == this.actividadDet.estado.descripcion){
          this.estado.forEach(element =>{
            if("ASIGNADO" == element.descripcion){
              this.iniciativa.estado = element;
              this.actividadDet.estado = element;
            }
          });
        }
        this.actividadDet.recursos = recuColabDetFireList;
        let activityList = this.iniciativa.actividad.actividades;
        let itemActividadIndex = activityList.findIndex(item => item.codigo == this.actividadDet.codigo);
        activityList[itemActividadIndex] = this.actividadDet;
        this.iniciativa.actividad.actividades = activityList;
        this.iniciativa.recursos = this.recursosIniciativaFireListR;
        this.firebaseIniciativas.updateIniciativa(this.iniciativa).then(
          result => {
            this.loading = false;
            Swal.fire('Guardado!', 'Se ha guardado correctamente.', 'success');
            this.close();
          },error => {
            Swal.fire('Error!', 'Error al guardar los recursos de la actividad.', 'error');
          });
      }
    }else{
      this.loading = false;
      Swal.fire('Advertencia!', 'Debe seleccionar recurso para la actividad.', 'warning');
    }
  }

  guardarRecursosMASIVOS(recuColabDetFireList: ColaboradorDetalleFire[]){
    this.loading = true;
    let resultValidate = false;
    if(undefined != recuColabDetFireList && 0 != recuColabDetFireList.length){
      resultValidate = this.validarHoras(recuColabDetFireList);
      
      if(!resultValidate){
        this.loading = false;
        Swal.fire('Advertencia!', 'Las horas asignados deben sumar '+this.actividadDet.horaAsignada+'.', 'warning');
      }else{
        if("PENDIENTE" == this.actividadDet.estado.descripcion){
          this.estado.forEach(element =>{
            if("ASIGNADO" == element.descripcion){
              this.iniciativa.estado = element;
              this.actividadDet.estado = element;
            }
          });
        }
        this.actividadDet.recursos = recuColabDetFireList;
        let activityList = this.iniciativa.actividad.actividades;
        let itemActividadIndex = activityList.findIndex(item => item.codigo == this.actividadDet.codigo);
        activityList[itemActividadIndex] = this.actividadDet;
        this.iniciativa.actividad.actividades = activityList;
        this.iniciativa.recursos = this.recursosIniciativaFireListR;
        this.firebaseIniciativas.updateIniciativa(this.iniciativa).then(
          result => {
            this.loading = false;
            Swal.fire('Guardado!', 'Se ha guardado correctamente.', 'success');
            this.close();
          },error => {
            Swal.fire('Error!', 'Error al guardar los recursos de la actividad.', 'error');
          });
      }
    }else{
      this.loading = false;
      Swal.fire('Advertencia!', 'Debe seleccionar recurso para la actividad.', 'warning');
    }
  }

  focusOut(event: any, colaboradorDetFire: ColaboradorDetalleFire){
    var trObject = (document.getElementById(String(colaboradorDetFire.codigo))) as HTMLTableRowElement;
    let inputObject = trObject.cells[4].children[0] as HTMLInputElement;
    let valueHorasAsig = inputObject.value;
    colaboradorDetFire.horasAsig = Number(valueHorasAsig);
    this.updateRecursoDetList(colaboradorDetFire);
    this.updateHorasPorAsignar();
    
  }

  updateRecursoDetList(colaboDetFire: ColaboradorDetalleFire){
    let itemIndex = this.colaboradorDetFireList.findIndex(item => item.codigoUsuario == colaboDetFire.codigoUsuario);
    this.colaboradorDetFireList[itemIndex] = colaboDetFire;
    let itemRecursoIndex = this.recursosColabDetFireList.findIndex(item => item.codigoUsuario == colaboDetFire.codigoUsuario);
    this.recursosColabDetFireList[itemRecursoIndex] = colaboDetFire;
  }

  validarHoras(recursoColabDetFireList: ColaboradorDetalleFire[]){
    let isValid = false;
    let sumatotal = this.sumaTotalHoras(recursoColabDetFireList);
    let horaAsigActividad = this.actividadDet.horaAsignada;
    if(horaAsigActividad >= sumatotal){
      isValid = true;
    }
    return isValid;
  }

  sumaTotalHoras(recurDetFireList: ColaboradorDetalleFire[]){
    let sumatotal: number = 0;
    if(undefined != recurDetFireList && 0 != recurDetFireList.length){
      recurDetFireList.forEach(element => {
        let valueHorasAsig = element.horasAsig;
        if(undefined != valueHorasAsig){
          sumatotal = sumatotal+valueHorasAsig;
        }
      });
    }else{
      sumatotal = -1;
    }

    return sumatotal;
  }

  updateHorasPorAsignar(){
    if(-1 == this.sumaTotalHoras(this.recursosColabDetFireList)){
      this.regRecursosAct.controls.porAsignarLabel.setValue("");
    }else{
      let horaAsigActividad = this.actividadDet.horaAsignada;
      let diferencia = horaAsigActividad - this.sumaTotalHoras(this.recursosColabDetFireList);
      let textoDiferencia = diferencia;
      this.regRecursosAct.controls.porAsignarLabel.setValue(textoDiferencia);
    }
  }

  showOptions(event: MatCheckboxChange, colabDetFire: ColaboradorDetalleFire): void {
    if(event.checked){
      this.addResourcesActivity(colabDetFire);
    }else{
      this.deleteResourcesActivity(colabDetFire);
    }
  }

  addResourcesActivity(colabDetFire: ColaboradorDetalleFire){
    colabDetFire.isAsignado = true;
    this.recursosColabDetFireList.push(colabDetFire);
  }

  deleteResourcesActivity(colabDetFire: ColaboradorDetalleFire){
    colabDetFire.isAsignado = false;
    this.recursosColabDetFireList = this.recursosColabDetFireList.filter(colaboDetFire => colaboDetFire.codigoUsuario !== colabDetFire.codigoUsuario); 
  }

}
