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
@Component({
  selector: 'app-dialog-registra-recurso-evento',
  templateUrl: './dialog-registra-recurso-evento.component.html',
  styleUrls: ['./dialog-registra-recurso-evento.component.css']
})
export class DialogRegistraRecursoEventoComponent implements OnInit {
  regRecursos: FormGroup;
  iniciativa: IniciativaFire = new IniciativaFire();
  colaboradores: ColaboradorFire = new ColaboradorFire();
  columnasTabla: string[] = ['id', 'usuario','nombres','procentaje','horasasig','asignado'];
  public colaboradorCtrl: FormControl = new FormControl();
  public colaboradorFilterCtrl: FormControl = new FormControl();
  public filteredColaboradores: ReplaySubject<ColaboradorDetalleFire[]> = new ReplaySubject<ColaboradorDetalleFire[]>(1);
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  protected _onDestroy = new Subject<void>();

  colaboradorDetFireList: ColaboradorDetalleFire[] = [];
  loading: boolean;
  constructor(public dialogRef: MatDialogRef<DialogRegistraRecursoEventoComponent>, 
    private firebaseColaboradores: FirebaseColaboradorService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firebaseIniciativas: FirebaseIniciativaService) {
      this.iniciativa = data;
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
        this.colaboradores =  colabObject;
        this.loadData();
        this.activeSelect(this.colaboradores.colaboradores);
        this.updatePorcentajePorAsignar();
        this.loading = false;
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
    debugger;
    this.loading = true;
    let resultValidate = false;
    if(undefined != colabDetFireList && 0 != colabDetFireList.length){
      resultValidate = this.validarPorcentajes(colabDetFireList);
      
      if(!resultValidate){
        this.loading = false;
        Swal.fire('Advertencia!', 'Los porcentajes asignados deben sumar 100%.', 'warning');
      }else{
        this.iniciativa.recursos = colabDetFireList;
        this.firebaseIniciativas.updateIniciativa(this.iniciativa).then(
          result => {
            this.loading = false;
            Swal.fire('Guardado!', 'Se ha guardado correctamente.', 'success');
            this.close();
          },error => {Swal.fire('Error!', 'Error al guardar los recursos.', 'error');});
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
          sumatotal = sumatotal+valuePorcentaje;
        }
      });
    }else{
      sumatotal = -1;
    }

    return sumatotal;
  }

  updatePorcentajePorAsignar(){
    debugger;
    if(-1 == this.sumaTotalPorcentaje(this.colaboradorDetFireList)){
      this.regRecursos.controls.porAsignarLabel.setValue("");
    }else{
      let diferencia = 100 - this.sumaTotalPorcentaje(this.colaboradorDetFireList);
      let textoDiferencia = diferencia;
      this.regRecursos.controls.porAsignarLabel.setValue(textoDiferencia);
    }
  }

}