import { Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
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
import { NgStyle } from '@angular/common';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-dialog-monitor-recurso',
  templateUrl: './dialog-monitor-recurso.component.html',
  styleUrls: ['./dialog-monitor-recurso.component.css']
})
export class DialogMonitorRecursoComponent implements OnInit, OnDestroy {
  regRecursos: FormGroup;
  iniciativa= new MatTableDataSource<IniciativaMainFire>([]);
  codigoSVT: number;
  colaboradores: ColaboradorFire = new ColaboradorFire();
  dia: number;
  public lista = [] as IniciativaMainFire[];
  public colaboradorCtrl: FormControl = new FormControl();
  public colaboradorFilterCtrl: FormControl = new FormControl();
  public filteredColaboradores: ReplaySubject<ColaboradorDetalleFire[]> = new ReplaySubject<ColaboradorDetalleFire[]>(1);
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  protected _onDestroy = new Subject<void>();

  colaboradorDetFireList: ColaboradorDetalleFire[] = [];
  loading: boolean;
  constructor(public dialogRef: MatDialogRef<DialogMonitorRecursoComponent>, 
    private firebaseColaboradores: FirebaseColaboradorService,
    @Inject(MAT_DIALOG_DATA) public datafire:  any,
    private firebaseIniciativas: FirebaseIniciativaMainService) {
      this.codigoSVT = datafire.codigo;
      this.dia = datafire.dia;
      this.regRecursos = new FormGroup({
        tituloInputDialog: new FormControl(),
        codigoInputDialog: new FormControl(),
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
        let datos: string = ""+this.codigoSVT;
        alert(this.codigoSVT);
        if(0 != this.codigoSVT){
          let iniciativaRef = this.firebaseIniciativas.getIniciativaFiltro("codigoSVT",datos,"","");
          
          (this.codigoSVT);
          iniciativaRef.forEach(data => {
            for(var i = 0; i < data.length; i++){
              this.lista.push(data[i].payload.doc.data() as IniciativaMainFire);
            }
            this.iniciativa =  new MatTableDataSource(this.lista);            
            this.loadData(this.lista);
            this.activeSelect(this.colaboradores.colaboradores);
            this.updatePorcentajePorAsignar();
            this.loading = false;
          });
        }else{
          this.loadData(this.lista);
          this.loading = false;
        }
      });
    });
  }

  loadData(lista: IniciativaMainFire[]){
    lista.forEach(element=>{
      alert(element.codigoSVT);
      this.regRecursos.controls.tituloInputDialog.setValue(element.titulo);
      //this.regRecursos.controls.nIniciativaInputDialog.setValue(element.codigoSVT.toString());
      this.colaboradorDetFireList = element.recursos;
    })
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
