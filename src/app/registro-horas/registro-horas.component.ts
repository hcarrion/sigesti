import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseIniciativaService } from '../shared/services/firebase-iniciativa.service';
import { IniciativaFire } from '../shared/models/iniciativa-fire';
import { MatTableDataSource, MatPaginator, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { ActividadHorasFire } from '../shared/models/actividad-horas-fire';
import { AppDateAdapter, APP_DATE_FORMATS } from '../shared/util/date.adapter';
import { HoraFire } from '../shared/models/hora-fire';
import Swal from 'sweetalert2';
import { HoraRow } from '../shared/models/hora-row';

@Component({
  selector: 'app-registro-horas',
  templateUrl: './registro-horas.component.html',
  styleUrls: ['./registro-horas.component.css'],
  providers: [{
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }]
})
export class RegistroHorasComponent implements OnInit {
  habilitar: boolean;
  habilitar1: boolean;
  habilitar2: boolean;
  habilitar3: boolean;
  public usuario = "";
  listaAct: ActividadHorasFire[] = [];
  listaMantenimientoAct: ActividadHorasFire[] = [];
  listaSoporteAct: ActividadHorasFire[] = [];
  listaIncidenciaAct: ActividadHorasFire[] = [];
  regHoras: FormGroup;
  
  columnasTabla: string[] = ['codigosvt', 'titulo', 'fechainicio', 'fechafin', 'avance', 'prioridad'];

  columnasFechTabla: string[] = ['06/02/20', '07/02/20', '08/02/20'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  proyectoIniciativas= new MatTableDataSource<ActividadHorasFire>([]);
  mantenimientoIniciativas= new MatTableDataSource<ActividadHorasFire>([]);
  soporteIniciativas= new MatTableDataSource<ActividadHorasFire>([]);
  incidenciaIniciativas= new MatTableDataSource<ActividadHorasFire>([]);
  loading: boolean;
  constructor(private firebaseIniciativas: FirebaseIniciativaService,
    public datePipe: DatePipe) {
      this.regHoras = new FormGroup({
        estadoHorasSelect: new FormControl(),
        estadoHorasMantSelect: new FormControl(),
        estadoHorasSoporteSelect: new FormControl(),
        estadoHorasIncidenciaSelect: new FormControl()
      });
    }

  ngOnInit() {
    localStorage.setItem('indinicio',"false");   
    this.loading = true;
    this.loadColumns();
    this.getProyectoIniciativas();
    this.getMantenimientoIniciativas();
    this.getSoporteIniciativas();
    this.getIncidenciaIniciativas();
  }

  InActiva() {
  
   if (this.habilitar){this.habilitar = false;
   }else {this.habilitar = true;}
  }
 
  public onChange(valor){
    this.usuario = (event.target as HTMLInputElement).value;
    this.getProyectoIniciativas();
    this.getMantenimientoIniciativas();
    this.getSoporteIniciativas();
    this.getIncidenciaIniciativas();
  }

  InActiva1() {
 
    if (this.habilitar1){this.habilitar1 = false;
    }else {this.habilitar1 = true;}
   }
   InActiva2() {
 
    if (this.habilitar2){this.habilitar2 = false;
    }else {this.habilitar2 = true;}
   }
   InActiva3() {
 
    if (this.habilitar3){this.habilitar3 = false;
    }else {this.habilitar3 = true;}
   }

   loadColumns(){
     let dateToday = new Date();
     if(1 == dateToday.getDay()){
      let dateTodayStr =this.datePipe.transform(dateToday, 'dd/MM');
      let fechas: string[] = [];
      fechas.push(dateTodayStr);
      this.columnasFechTabla = fechas;
      this.columnasTabla.push(dateTodayStr);
     }else if(2 == dateToday.getDay()){
      let fechas: string[] = [];
      let fechaAnt1 = this.daysSubtraction(dateToday, 1);
      let fechaAnt1Str =this.datePipe.transform(fechaAnt1, 'dd/MM');
      fechas.push(fechaAnt1Str);
      this.columnasTabla.push(fechaAnt1Str);
      let dateTodayStr =this.datePipe.transform(dateToday, 'dd/MM');
      fechas.push(dateTodayStr);
      this.columnasFechTabla = fechas;
      this.columnasTabla.push(dateTodayStr);
     }else if(3 == dateToday.getDay()){
      let fechas: string[] = [];
      let fechaAnt2 = this.daysSubtraction(dateToday, 2);
      let fechaAnt2Str =this.datePipe.transform(fechaAnt2, 'dd/MM');
      fechas.push(fechaAnt2Str);
      this.columnasTabla.push(fechaAnt2Str);
      let fechaAnt1 = this.daysSubtraction(dateToday, 1);
      let fechaAnt1Str =this.datePipe.transform(fechaAnt1, 'dd/MM');
      fechas.push(fechaAnt1Str);
      this.columnasTabla.push(fechaAnt1Str);
      let dateTodayStr =this.datePipe.transform(dateToday, 'dd/MM');
      fechas.push(dateTodayStr);
      this.columnasFechTabla = fechas;
      this.columnasTabla.push(dateTodayStr);
     }else if(4 == dateToday.getDay()){
      let fechas: string[] = [];
      let fechaAnt3 = this.daysSubtraction(dateToday, 3);
      let fechaAnt3Str =this.datePipe.transform(fechaAnt3, 'dd/MM');
      fechas.push(fechaAnt3Str);
      this.columnasTabla.push(fechaAnt3Str);
      let fechaAnt2 = this.daysSubtraction(dateToday, 2);
      let fechaAnt2Str =this.datePipe.transform(fechaAnt2, 'dd/MM');
      fechas.push(fechaAnt2Str);
      this.columnasTabla.push(fechaAnt2Str);
      let fechaAnt1 = this.daysSubtraction(dateToday, 1);
      let fechaAnt1Str =this.datePipe.transform(fechaAnt1, 'dd/MM');
      fechas.push(fechaAnt1Str);
      this.columnasTabla.push(fechaAnt1Str);
      let dateTodayStr =this.datePipe.transform(dateToday, 'dd/MM');
      fechas.push(dateTodayStr);
      this.columnasFechTabla = fechas;
      this.columnasTabla.push(dateTodayStr);
     }else if(0 == dateToday.getDay()){
      let fechas: string[] = [];
      let fechaAnt4 = this.daysSubtraction(dateToday, 4);
      let fechaAnt4Str =this.datePipe.transform(fechaAnt4, 'dd/MM');
      fechas.push(fechaAnt4Str);
      this.columnasTabla.push(fechaAnt4Str);
      let fechaAnt3 = this.daysSubtraction(dateToday, 3);
      let fechaAnt3Str =this.datePipe.transform(fechaAnt3, 'dd/MM');
      fechas.push(fechaAnt3Str);
      this.columnasTabla.push(fechaAnt3Str);
      let fechaAnt2 = this.daysSubtraction(dateToday, 2);
      let fechaAnt2Str =this.datePipe.transform(fechaAnt2, 'dd/MM');
      fechas.push(fechaAnt2Str);
      this.columnasTabla.push(fechaAnt2Str);
      let fechaAnt1 = this.daysSubtraction(dateToday, 1);
      let fechaAnt1Str =this.datePipe.transform(fechaAnt1, 'dd/MM');
      fechas.push(fechaAnt1Str);
      this.columnasTabla.push(fechaAnt1Str);
      let dateTodayStr =this.datePipe.transform(dateToday, 'dd/MM');
      fechas.push(dateTodayStr);
      this.columnasFechTabla = fechas;
      this.columnasTabla.push(dateTodayStr);
     }
   }
   
   async getProyectoIniciativas() {
    let iniciativasRef = this.firebaseIniciativas.getPlanesIniciativaFiltro("categoria.descripcion","PROYECTO");
    iniciativasRef.subscribe(data => {
      var lista = [];
      data.forEach(dataElement => {
        let iniciativaObject= dataElement.payload.doc.data() as IniciativaFire;
        let idIniciativa = dataElement.payload.doc.id;
        iniciativaObject.idIniciativa = idIniciativa;
        lista.push(iniciativaObject);
      });
      this.listaAct = this.getActividades(lista, this.usuario);
      this.proyectoIniciativas =  new MatTableDataSource(this.listaAct);
      this.proyectoIniciativas.paginator = this.paginator;
      this.getFechaHoy(this.columnasTabla);
      this.loading = false;
    });
  }

  async getMantenimientoIniciativas() {
    let iniciativasRef = this.firebaseIniciativas.getPlanesIniciativaFiltro("categoria.descripcion","MANTENIMIENTO");
    iniciativasRef.subscribe(data => {
      var lista = [];
      data.forEach(dataElement => {
        let iniciativaObject= dataElement.payload.doc.data() as IniciativaFire;
        let idIniciativa = dataElement.payload.doc.id;
        iniciativaObject.idIniciativa = idIniciativa;
        lista.push(iniciativaObject);
      });
      this.listaMantenimientoAct = this.getActividades(lista, this.usuario);
      this.mantenimientoIniciativas =  new MatTableDataSource(this.listaMantenimientoAct);
      this.mantenimientoIniciativas.paginator = this.paginator;
      this.getFechaHoy(this.columnasTabla);
      this.loading = false;
    });
  }

  async getSoporteIniciativas() {
    let iniciativasRef = this.firebaseIniciativas.getPlanesIniciativaFiltro("categoria.descripcion","SOPORTE");
    iniciativasRef.subscribe(data => {
      var lista = [];
      data.forEach(dataElement => {
        let iniciativaObject= dataElement.payload.doc.data() as IniciativaFire;
        let idIniciativa = dataElement.payload.doc.id;
        iniciativaObject.idIniciativa = idIniciativa;
        lista.push(iniciativaObject);
      });
      this.listaSoporteAct = this.getActividades(lista, this.usuario);
      this.soporteIniciativas =  new MatTableDataSource(this.listaSoporteAct);
      this.soporteIniciativas.paginator = this.paginator;
      this.getFechaHoy(this.columnasTabla);
      this.loading = false;
    });
  }

  async getIncidenciaIniciativas() {
    let iniciativasRef = this.firebaseIniciativas.getPlanesIniciativaFiltro("categoria.descripcion","INCIDENCIA");
    iniciativasRef.subscribe(data => {
      var lista = [];
      data.forEach(dataElement => {
        let iniciativaObject= dataElement.payload.doc.data() as IniciativaFire;
        let idIniciativa = dataElement.payload.doc.id;
        iniciativaObject.idIniciativa = idIniciativa;
        lista.push(iniciativaObject);
      });
      this.listaIncidenciaAct = this.getActividades(lista, this.usuario);
      this.incidenciaIniciativas =  new MatTableDataSource(this.listaIncidenciaAct);
      this.incidenciaIniciativas.paginator = this.paginator;
      this.getFechaHoy(this.columnasTabla);
      this.loading = false;
    });
  }

  getFechaHoy(columnas: string[]){
    let dateToday = new Date();
    /*let dateTodayStr =this.datepipe.transform(dateToday, 'dd/MM/yyyy');
    let itemIndex = columnas.findIndex(columna => columna == "fechahoy");
    this.columnasTabla[itemIndex] = dateTodayStr;*/
  }

  getActividades(lista: IniciativaFire[], usuario: string){
    let listaActi: ActividadHorasFire[] = [];
    lista.forEach(iniciativaFire => {
      if(undefined != iniciativaFire.actividad){
        iniciativaFire.actividad.actividades.forEach(actividadDet => {
          let actividadHorasFire = new ActividadHorasFire();
          if(undefined != actividadDet.recursos){
            actividadDet.recursos.forEach(recurso => {
              if(usuario == recurso.codigoUsuario){
                actividadHorasFire.iniciativa = iniciativaFire;
                actividadHorasFire.codigoAct = actividadDet.codigo;
                actividadHorasFire.tituloAct = actividadDet.titulo;
                actividadHorasFire.fechaInicioAct = actividadDet.fechaInicio;
                actividadHorasFire.fechaFinAct = actividadDet.fechaFin;
                let porcentaje: number = 0;
                let horasTotales: number = 0;
                let horasFechas: number[] = [];
                if(undefined != recurso.horasReg){
                  recurso.horasReg.forEach(hora => {
                    horasTotales = horasTotales + hora.horas;
                    for(let i = 0; i < this.columnasFechTabla.length; i++){
                      let fechaSavedStr = hora.fecha;
                      let fechaSaved = (new Date(fechaSavedStr)).getTime();
                      let fechaColumnarStr = this.getFechWithFormat(this.columnasFechTabla[i]);
                      let fechaColumna = (new Date(fechaColumnarStr)).getTime();
                      if(fechaSaved == fechaColumna ){
                        horasFechas[i] = hora.horas;
                      }
                    }
                  });
                  porcentaje = (horasTotales * 100)/recurso.horasAsig;
                }else{
                  porcentaje = 0;
                }
                actividadHorasFire.avance = porcentaje.toPrecision(2)+"%";
                actividadHorasFire.horasFecha = horasFechas;
                listaActi.push(actividadHorasFire);
              }
            });
          }
        });
      }
    });

    return listaActi;
  }

  saveHoras(idTable: string, isUpdate: boolean){
    this.loading = true;
    let tblObject = (document.getElementById(idTable)) as HTMLTableElement;
    let horaRowList: HoraRow[] = [];
    for(let k = 1; k < tblObject.rows.length; k++){
      let horaRow = new HoraRow();
      var trObject = tblObject.rows[k] as HTMLTableRowElement;
      let idIniciativa = trObject.cells[0].id;
      let hRow = horaRowList.find(hRow => hRow.idIniciativa == idIniciativa);
      if(undefined != hRow){
        let nVeces = hRow.numVeces;
        hRow.numVeces = nVeces + 1;
        let indics = hRow.indicadores;
        indics.push(k)
        hRow.indicadores = indics;
        let indx = horaRowList.findIndex(hRow => hRow.idIniciativa == idIniciativa);
        horaRowList[indx] = hRow;
      }else{
        horaRow.idIniciativa = idIniciativa;
        let numIndic: number[] = [];
        numIndic.push(k);
        horaRow.numVeces = 1;
        horaRow.indicadores = numIndic;
        horaRowList.push(horaRow);
      }
    }
    horaRowList.forEach(horaRow =>{
      if(1 == horaRow.indicadores.length){
        horaRow.indicadores.forEach(indic => {
          var trObject = tblObject.rows[indic] as HTMLTableRowElement;
          let idIniciativa = trObject.cells[0].id;
          let codActividadStr = trObject.cells[1].id;
          let codActividad = Number.parseInt(codActividadStr);
          let numColumns = 6 + this.columnasFechTabla.length;
          let horaFireList: HoraFire[] = [];
          for(let w = 6; w < numColumns; w++){
            let fechaStr = this.getFechWithFormat(tblObject.rows[0].cells[w].textContent);
            let fechaDate = new Date(fechaStr);
            let inputObject = tblObject.rows[indic].cells[w].children[0] as HTMLInputElement;
            let horaStr = inputObject.value;
            let horaNum = Number.parseInt(horaStr);
            let horaFire = new HoraFire();
            horaFire.fecha = fechaDate;
            horaFire.horas = horaNum;
            horaFireList.push(horaFire);
          }
          let iniciativaRef = this.firebaseIniciativas.getIniciativa2(idIniciativa);
          let iniciativaFire = new IniciativaFire();
          iniciativaRef.forEach(data => {
            iniciativaFire = data.data() as IniciativaFire;
            for(let j = 0; j < iniciativaFire.actividad.actividades.length; j++){
              if(codActividad == iniciativaFire.actividad.actividades[j].codigo){
                for(let i = 0; i < iniciativaFire.actividad.actividades[j].recursos.length; i++){
                  if(this.usuario == iniciativaFire.actividad.actividades[j].recursos[i].codigoUsuario){
                    if(undefined == iniciativaFire.actividad.actividades[j].recursos[i].horasReg){
                      for(let x = 0; x < horaFireList.length; x++){
                        horaFireList[x].fechaReg = new Date();
                      }
                      iniciativaFire.actividad.actividades[j].recursos[i].horasReg = horaFireList;
                    }else{
                      let horaList = iniciativaFire.actividad.actividades[j].recursos[i].horasReg;
                      horaFireList.forEach(element => {
                        let indexHora = horaList.findIndex(horaFire => {
                          let fechaSavedStr = horaFire.fecha;
                          let fechaSaved = (new Date(fechaSavedStr)).getTime();
                          let fechaBuscar = element.fecha.getTime();
                          return fechaSaved == fechaBuscar;
                        });
                        if(-1 == indexHora){
                          element.fechaReg = new Date();
                          horaList.push(element);
                        }else{
                          element.fechaAct = new Date();
                          horaList[indexHora] = element;
                        }
                      });
                    }
                  }
                }
              }
            }
            this.firebaseIniciativas.updateIniciativa(iniciativaFire).then(
              result => {
              },error => {
                Swal.fire('Error!', 'Error al guardar las horas de la actividad.', 'error');
              });
          });
        });
      }else{
        let iniciativaRef = this.firebaseIniciativas.getIniciativa2(horaRow.idIniciativa);
        let iniciativaFire = new IniciativaFire();
        iniciativaRef.forEach(data => {
          iniciativaFire = data.data() as IniciativaFire;
          horaRow.indicadores.forEach(indix =>{
            var trObject = tblObject.rows[indix] as HTMLTableRowElement;
            let idIniciativa = trObject.cells[0].id;
            let codActividadStr = trObject.cells[1].id;
            let codActividad = Number.parseInt(codActividadStr);
            let numColumns = 6 + this.columnasFechTabla.length;
            let horaFireList: HoraFire[] = [];
            for(let w = 6; w < numColumns; w++){
              let fechaStr = this.getFechWithFormat(tblObject.rows[0].cells[w].textContent);
              let fechaDate = new Date(fechaStr);
              let inputObject = tblObject.rows[indix].cells[w].children[0] as HTMLInputElement;
              let horaStr = inputObject.value;
              let horaNum = Number.parseInt(horaStr);
              let horaFire = new HoraFire();
              horaFire.fecha = fechaDate;
              horaFire.horas = horaNum;
              horaFireList.push(horaFire);
            }

            for(let j = 0; j < iniciativaFire.actividad.actividades.length; j++){
              if(codActividad == iniciativaFire.actividad.actividades[j].codigo){
                for(let i = 0; i < iniciativaFire.actividad.actividades[j].recursos.length; i++){
                  if(this.usuario == iniciativaFire.actividad.actividades[j].recursos[i].codigoUsuario){
                    if(undefined == iniciativaFire.actividad.actividades[j].recursos[i].horasReg){
                      for(let x = 0; x < horaFireList.length; x++){
                        horaFireList[x].fechaReg = new Date();
                      }
                      iniciativaFire.actividad.actividades[j].recursos[i].horasReg = horaFireList;
                    }else{
                      let horaList = iniciativaFire.actividad.actividades[j].recursos[i].horasReg;
                      horaFireList.forEach(element => {
                        let indexHora = horaList.findIndex(horaFire => {
                          let fechaSavedStr = horaFire.fecha;
                          let fechaSaved = (new Date(fechaSavedStr)).getTime();
                          let fechaBuscar = element.fecha.getTime();
                          return fechaSaved == fechaBuscar;
                        });
                        if(-1 == indexHora){
                          element.fechaReg = new Date();
                          horaList.push(element);
                        }else{
                          element.fechaAct = new Date();
                          horaList[indexHora] = element;
                        }
                      });
                    }
                  }
                }
              }
            }
          });
          this.firebaseIniciativas.updateIniciativa(iniciativaFire).then(
            result => {
            },error => {
              Swal.fire('Error!', 'Error al guardar las horas de la actividad.', 'error');
            });
        });
      }
      
    });
    try {
      this.loading = false;
      Swal.fire('Guardado!', 'Se ha guardado correctamente.', 'success');
    } catch (error) {
      Swal.fire('Error!', 'Error al guardar las horas de la actividad.', 'error');
    }

/*
    for(let k = 1; k < tblObject.rows.length; k++){
      var trObject = tblObject.rows[k] as HTMLTableRowElement;
      let idIniciativa = trObject.cells[0].id;
      let codActividadStr = trObject.cells[1].id;
      let codActividad = Number.parseInt(codActividadStr);
      let numColumns = 6 + this.columnasFechTabla.length;
      let horaFireList: HoraFire[] = [];
      for(let w = 6; w < numColumns; w++){
        let fechaStr = this.getFechWithFormat(tblObject.rows[0].cells[w].textContent);
        let fechaDate = new Date(fechaStr);
        let inputObject = tblObject.rows[k].cells[w].children[0] as HTMLInputElement;
        let horaStr = inputObject.value;
        let horaNum = Number.parseInt(horaStr);
        let horaFire = new HoraFire();
        horaFire.fecha = fechaDate;
        horaFire.horas = horaNum;
        horaFireList.push(horaFire);
      }
      isUpdate = true;
      let iniciativaRef = this.firebaseIniciativas.getIniciativa2(idIniciativa);
      let iniciativaFire = new IniciativaFire();
      iniciativaRef.forEach(data => {
        iniciativaFire = data.data() as IniciativaFire;
        for(let j = 0; j < iniciativaFire.actividad.actividades.length; j++){
          if(codActividad == iniciativaFire.actividad.actividades[j].codigo){
            for(let i = 0; i < iniciativaFire.actividad.actividades[j].recursos.length; i++){
              if(this.usuario == iniciativaFire.actividad.actividades[j].recursos[i].codigoUsuario){
                if(undefined == iniciativaFire.actividad.actividades[j].recursos[i].horasReg){
                  for(let x = 0; x < horaFireList.length; x++){
                    horaFireList[x].fechaReg = new Date();
                  }
                  iniciativaFire.actividad.actividades[j].recursos[i].horasReg = horaFireList;
                }else{
                  let horaList = iniciativaFire.actividad.actividades[j].recursos[i].horasReg;
                  horaFireList.forEach(element => {
                    let indexHora = horaList.findIndex(horaFire => {
                      let fechaSavedStr = horaFire.fecha;
                      let fechaSaved = (new Date(fechaSavedStr)).getTime();
                      let fechaBuscar = element.fecha.getTime();
                      return fechaSaved == fechaBuscar;
                    });
                    if(-1 == indexHora){
                      element.fechaReg = new Date();
                      horaList.push(element);
                    }else{
                      element.fechaAct = new Date();
                      horaList[indexHora] = element;
                    }
                  });
                }
              }
            }
          }
        }
        this.firebaseIniciativas.updateIniciativa(iniciativaFire).then(
          result => {
          },error => {
            Swal.fire('Error!', 'Error al guardar las horas de la actividad.', 'error');
          });
      });

    }
    debugger;
    try {
      this.loading = false;
      Swal.fire('Guardado!', 'Se ha guardado correctamente.', 'success');
    } catch (error) {
      Swal.fire('Error!', 'Error al guardar las horas de la actividad.', 'error');
    }*/
  }

  daysSum(fechaI: Date, numDias: number){
    let fechaF = new Date();
    let fechaIni = new Date(fechaI);
    let contador: number = 0;
    while(contador != numDias){
      fechaF = new Date(fechaIni.setDate(fechaIni.getDate() + 1));
      contador = contador+1;
    }
    return fechaF;
  }

  daysSubtraction(fechaI: Date, numDias: number){
    let fechaF = new Date();
    let fechaIni = new Date(fechaI);
    let contador: number = 0;
    while(contador != numDias){
      fechaF = new Date(fechaIni.setDate(fechaIni.getDate() - 1));
      contador = contador+1;
    }
    return fechaF;
  }

  getFechWithFormat(fechaStr: string){
    let day = fechaStr.substring(0,2);
    let month = fechaStr.substring(3,5);
    let year = fechaStr.substring(6,9);
    let newFechStr = month+"/"+day+"/"+year;
    return newFechStr;
  }
}
