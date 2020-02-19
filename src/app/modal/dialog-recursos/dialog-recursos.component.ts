import { Component, OnInit, Inject, NgZone, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { IniciativaMainFire } from 'src/app/shared/models/iniciativa-main-fire';
import { FormControl, FormGroup } from '@angular/forms';
import { FirebaseParametroService } from 'src/app/shared/services/firebase-parametro.service';
import { FirebaseColaboradorService } from 'src/app/shared/services/firebase-colaborador.service';
import { FirebaseIniciativaMainService } from 'src/app/shared/services/firebase-iniciativa-main.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { ColaboradorFire } from 'src/app/shared/models/colaborador-fire';
import { ColaboradorDetalleFire } from 'src/app/shared/models/colaborador-detalle-fire';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-recursos',
  templateUrl: './dialog-recursos.component.html',
  styleUrls: ['./dialog-recursos.component.css']
})
export class DialogRecursosComponent implements OnInit, OnDestroy {
  regRecursos: FormGroup;
  iniciativa: IniciativaMainFire = new IniciativaMainFire();
  idIniciativaR: string;
  colaboradores: ColaboradorFire = new ColaboradorFire();

  public colaboradorCtrl: FormControl = new FormControl();
  public colaboradorFilterCtrl: FormControl = new FormControl();
  public filteredColaboradores: ReplaySubject<ColaboradorDetalleFire[]> = new ReplaySubject<ColaboradorDetalleFire[]>(1);
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  protected _onDestroy = new Subject<void>();

  colaboradorDetFireList: ColaboradorDetalleFire[] = [];
  loading: boolean;
  constructor(public dialogRef: MatDialogRef<DialogRecursosComponent>, 
    private firebaseColaboradores: FirebaseColaboradorService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firebaseIniciativas: FirebaseIniciativaMainService) {
      this.idIniciativaR = data;
      this.regRecursos = new FormGroup({
        tituloInputDialog: new FormControl(),
        nIniciativaInputDialog: new FormControl(),
        porAsignarLabel: new FormControl()
      })
  }

  close(): void {
    this.dialogRef.close();
  }
 

  ngOnInit() {
    this.callColaboradores();
  }

  callColaboradores() {
    this.loading = true;
    let colaboradoresRef = this.firebaseColaboradores.getColaboradores();

    colaboradoresRef.subscribe(data => {data.forEach(colabObj => {
        let colabObject= colabObj.payload.doc.data() as ColaboradorFire;
        let colabs = colabObject.colaboradores.sort((n1,n2) => {
          if (n1.nombres > n2.nombres){
              return 1;
          }
          if (n1.nombres < n2.nombres){
              return -1;
          }
          return 0;
        });
        colabObject.colaboradores = colabs;
        this.colaboradores =  colabObject;

        if("" != this.idIniciativaR){
          let iniciativaRef = this.firebaseIniciativas.getIniciativa2(this.idIniciativaR);
          iniciativaRef.forEach(data => {
            this.iniciativa = data.data() as IniciativaMainFire;
            this.loadData();
            this.activeSelect(this.colaboradores.colaboradores);
            this.updatePorcentajePorAsignar();
            this.loading = false;
          });
        }else{
          this.loadData();
          this.loading = false;
        }
      });
    });
  }

  loadData(){
    this.regRecursos.controls.tituloInputDialog.setValue(this.iniciativa.titulo);
    this.regRecursos.controls.nIniciativaInputDialog.setValue(this.iniciativa.numeroIniciativa);
    this.colaboradorDetFireList = this.iniciativa.recursos;
  }

  activeSelect(colaboradorDetList: ColaboradorDetalleFire[]){
    this.colaboradorCtrl.setValue(colaboradorDetList);
    this.filteredColaboradores.next(colaboradorDetList.slice());
    this.colaboradorFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks();
      });
  }

  protected filterBanks() {
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
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  agregarTablaRecursos(colaboradorDetFire: ColaboradorDetalleFire){
    if(undefined == this.colaboradorDetFireList){
      this.colaboradorDetFireList = [];
      this.colaboradorDetFireList.push(colaboradorDetFire);
      this.updatePorcentajePorAsignar();
    }else{
      let isExists = this.colaboradorDetFireList.filter(colabDetFire => colabDetFire.codigoUsuario == colaboradorDetFire.codigoUsuario).length > 0;
      if(!isExists){
        this.colaboradorDetFireList.push(colaboradorDetFire);
        this.updatePorcentajePorAsignar();
      }   
    }
  }

  eliminarRecursoTabla(colaboradorDetFire: ColaboradorDetalleFire){
    this.colaboradorDetFireList = this.colaboradorDetFireList.filter(colabDetFire => colabDetFire.codigoUsuario !== colaboradorDetFire.codigoUsuario); 
    this.updatePorcentajePorAsignar();
  }

  guardarRecursos(colabDetFireList: ColaboradorDetalleFire[]){
    this.loading = true;
    let resultValidate = false;
    if(undefined != colabDetFireList && 0 != colabDetFireList.length){
      resultValidate = this.validarPorcentajes(colabDetFireList);
      
      if(!resultValidate){
        this.loading = false;
        Swal.fire('Advertencia!', 'Los porcentajes asignados deben sumar 100%.', 'warning');
      }else{
        this.iniciativa.recursos = colabDetFireList;
        this.iniciativa.idIniciativa = this.idIniciativaR;
        this.iniciativa.fechaAct = new Date();
        this.firebaseIniciativas.updateIniciativa(this.iniciativa).then(
          result => {
            this.loading = false;
            Swal.fire('Guardado!', 'Se ha guardado correctamente.', 'success');
            this.close();
          },error => {
            this.loading = false;
            Swal.fire('Error!', 'Error al guardar los recursos.', 'error');});
      }
    }else{
      this.loading = false;
      Swal.fire('Advertencia!', 'Debe seleccionar recurso.', 'warning');
    }
  }

  focusOut(event: any, colaboradorDetFire: ColaboradorDetalleFire){
    var trObject = (document.getElementById(String(colaboradorDetFire.codigo))) as HTMLTableRowElement;
    let inputObject = trObject.cells[2].children[0] as HTMLInputElement;
    let valuePorcen = inputObject.value;
    colaboradorDetFire.porcentaje = Number(valuePorcen);
    this.updateColaboradorDetList(colaboradorDetFire);
    this.updatePorcentajePorAsignar();
    
  }

  updateColaboradorDetList(colaboDetFire: ColaboradorDetalleFire){
    let itemIndex = this.colaboradorDetFireList.findIndex(item => item.codigoUsuario == colaboDetFire.codigoUsuario);
    this.colaboradorDetFireList[itemIndex] = colaboDetFire;
  }

  validarPorcentajes(colabDetFireList: ColaboradorDetalleFire[]){
    let isValid = false;
    let sumatotal = this.sumaTotalPorcentaje(colabDetFireList);
    
    if(100 >= sumatotal){
      isValid = true;
    }
    return isValid;
  }

  sumaTotalPorcentaje(colabDetFireList: ColaboradorDetalleFire[]){
    let sumatotal: number = 0;
    if(undefined != colabDetFireList && 0 != colabDetFireList.length){
      colabDetFireList.forEach(element => {
        let valuePorcentaje = element.porcentaje;
        if(undefined != valuePorcentaje){
          sumatotal = sumatotal/colabDetFireList.length;
        }
      });
    }else{
      sumatotal = -1;
    }

    return sumatotal;
  }

  updatePorcentajePorAsignar(){
    if(-1 == this.sumaTotalPorcentaje(this.colaboradorDetFireList)){
      this.regRecursos.controls.porAsignarLabel.setValue("");
    }else{
      let diferencia = 100 - this.sumaTotalPorcentaje(this.colaboradorDetFireList);
      let textoDiferencia = diferencia;
      this.regRecursos.controls.porAsignarLabel.setValue(textoDiferencia);
    }
  }

}
