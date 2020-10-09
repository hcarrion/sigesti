import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseIniciativaMainService } from '../shared/services/firebase-iniciativa-main.service';
import { IniciativaMainFire } from '../shared/models/iniciativa-main-fire';
import { MatTableDataSource, MatPaginator, DateAdapter, MAT_DATE_FORMATS, MatDatepickerInputEvent } from '@angular/material';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { AppDateAdapter, APP_DATE_FORMATS } from '../shared/util/date.adapter';
import { HoraFire } from '../shared/models/hora-fire';
import Swal from 'sweetalert2';
import { HoraRow } from '../shared/models/hora-row';
import { IniciativaHorasFire } from '../shared/models/iniciativa-horas-fire';
import { isNull } from 'util';
import { forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';


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
  ejecutacon: boolean = false;
  grabbarcon: boolean = false;
  habilitar: boolean;
  habilitar1: boolean;
  habilitar2: boolean;
  habilitar3: boolean;
  sololectura: string="";
  desactivar: boolean;
  horasing: number = 0;
  fechaInputSelect: number=7;
  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth();
  currentDay = new Date().getDate();
  minDate: Date;
  maxDate: Date;
  minDateFin: Date;
  maxDateFin: Date;
  FechaHoy: Date = new Date();
  public usuario = "";
  bloquear: boolean;
  listaInic: IniciativaHorasFire[] = [];
  listaMantenimientoInic: IniciativaHorasFire[] = [];
  listaSoporteInic: IniciativaHorasFire[] = [];
  listaIncidenciaInic: IniciativaHorasFire[] = [];
  regHoras: FormGroup;
  public listaglobal  = [];  
  columnasTabla: string[] = ['codigosvt', 'titulo', 'fechainicio', 'fechafin', 'avance', 'prioridad'];
  columnTitulo: string[] = ['codigosvt', 'titulo', 'fechainicio', 'fechafin', 'avance', 'prioridad'];
  columnAncho: string[] =[];
  columnAnchoPie: string[] =[];
  columnaPie: string[] =[];
  columnasFechTabla: string[] = [];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  proyectoIniciativas= new MatTableDataSource<IniciativaHorasFire>([]);
  mantenimientoIniciativas= new MatTableDataSource<IniciativaHorasFire>([]);
  soporteIniciativas= new MatTableDataSource<IniciativaHorasFire>([]);
  incidenciaIniciativas= new MatTableDataSource<IniciativaHorasFire>([]);
  esfuerzoIniciativas= new MatTableDataSource<IniciativaHorasFire>([]);
  globalIniciativas= new MatTableDataSource<IniciativaHorasFire>([]);
  verProyecto:string="false";
  verMantenimiento:string="false";
  verSoporte:string="false";
  verIncidencia:string="false";
  verEsfuerzo:string="false";
  signoP='-';
  signoM='-';
  signoS='-';
  signoI='-';
  signoE='-';

  loading: boolean;
  constructor(private firebaseIniciativas: FirebaseIniciativaMainService,
    public datePipe: DatePipe) {
      this.regHoras = new FormGroup({
        estadoHorasSelect: new FormControl(),
        estadoHorasMantSelect: new FormControl(),
        estadoHorasSoporteSelect: new FormControl(),
        estadoHorasIncidenciaSelect: new FormControl(),
        fechaInputSelect: new FormControl()
      });
    }

  ngOnInit() {
    this.minDate = new Date(this.currentYear-1,1,1);
    this.maxDate = new Date(this.currentYear, 11, 31);
    this.minDateFin = new Date(this.currentYear-1, 1, 1);
    this.maxDateFin = new Date(this.currentYear, 11, 31);
    this.FechaHoy = new Date();
    this.desactivar = true;
    this.usuario = localStorage.getItem("usuario");
    if (localStorage.getItem("perfil")!="COLABORADOR"){
      this.bloquear = true;
    }else{  
      this.bloquear = false;
    }
    localStorage.setItem('indinicio',"false");   
    this.loading = true;
    let obs1='';
    let obs2='';
    let obs3='';
    let obs4='';
    let obs5='';
    let obs6='';
    this.changeFecha(this.FechaHoy),
    forkJoin(              
              of(this.getProyectoIniciativas()),
              of(this.getMantenimientoIniciativas()),
              of(this.getSoporteIniciativas()),
              of(this.getIncidenciaIniciativas()),
              of(this.getEsfuerzocontinuoIniciativas()),                            
             ).subscribe(res => {                        
                              console.log('Se cargo con exito', res);                              
                              this.loading=false;},                              
                         err => {
                            console.log('Ocurrio un error',err);
                            Swal.fire('Error!', 'Las horas no cargaron con exito.', 'error');                                
                            this.loading=false;
              });
  }

  onload(){
    this.consolida();
  }

  InActiva() {
   if (this.habilitar){this.habilitar = false;
   }else {this.habilitar = true;}
  }
 
  activar(datos: string){
    return true;
  }
  
  cambia(tipo:string, signo: string){
    switch(tipo) { 
      case 'Proyecto': { 
         //statements;
         if (signo=='-')
          this.signoP = '+'
         else  
          this.signoP = '+'
         break; 
      } 
      case 'Mantenimiento': { 
         //statements; 
         if (signo=='-')
          this.signoM = '+'
         else  
          this.signoM = '+'
         break; 
      }
      case 'Incidencia': { 
        //statements;
        if (signo=='-')
          this.signoI = '+'
         else  
          this.signoI = '+' 
        break; 
      } 
      case 'Soporte': { 
      //statements; 
         if (signo=='-')
          this.signoS = '+'
         else  
          this.signoS = '+'
        break; 
      }
      case 'Esfuerzo': { 
        //statements; 
         if (signo=='-')
          this.signoE = '+'
         else  
          this.signoE = '+'
        break; 
      }
   } 
  }

  onChange(event){
    this.loading= true;
    this.verProyecto="false";
    this.verMantenimiento="false";
    this.verSoporte="false";
    this.verIncidencia="false";
    this.verEsfuerzo="false";
    this.usuario = (event.target as HTMLInputElement).value;
    if(localStorage.getItem("perfil")=="LIDER"&&localStorage.getItem("usuario")!=this.usuario){
      this.desactivar = false;
    }else{
      this.desactivar = true;
    }
    this.fechaInputSelect = 7;
    this.loadColumns();
    forkJoin(              
      of(this.getProyectoIniciativas()),
      of(this.getMantenimientoIniciativas()),
      of(this.getSoporteIniciativas()),
      of(this.getIncidenciaIniciativas()),
      of(this.getEsfuerzocontinuoIniciativas()),                            
     ).subscribe(res => {                        
                      console.log('Se cargo con exito', res);                              
                      this.consolida();
                      this.loading=false;},                              
                 err => {
                    console.log('Ocurrio un error',err);
                    Swal.fire('Error!', 'Las horas no cargaron con exito.', 'error');                                
                    this.loading=false;
      });
  }

  onChangeFecha(event){
    this.loading= true;

    this.fechaInputSelect = +(event.target as HTMLInputElement).value;
    if(localStorage.getItem("perfil")=="LIDER"&&localStorage.getItem("usuario")!=this.usuario){
      this.desactivar = false;
    }else{
      this.desactivar = true;
    }
    this.loadColumns();
    forkJoin(              
      of(this.getProyectoIniciativas()),
      of(this.getMantenimientoIniciativas()),
      of(this.getSoporteIniciativas()),
      of(this.getIncidenciaIniciativas()),
      of(this.getEsfuerzocontinuoIniciativas()),                            
     ).subscribe(res => {                        
                      console.log('Se cargo con exito', res);
                      this.consolida();                              
                      this.loading=false;},                              
                 err => {
                    console.log('Ocurrio un error',err);
                    Swal.fire('Error!', 'Las horas no cargaron con exito.', 'error');                                
                    this.loading=false;
      });
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

  sumarDias(fecha, dias){
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }

  restaDias(fecha, dias){
    fecha.setDate(fecha.getDate() - dias);
    return fecha;
  }
  
  loadColumns(){
     let dateToday = this.FechaHoy;
     var d = this.fechaInputSelect; 
     this.columnasTabla = ['codigosvt', 'titulo', 'fechainicio', 'fechafin', 'avance', 'prioridad'];
     this.columnTitulo = [];
     this.columnAncho =[];
     this.columnasFechTabla  = [];
     this.columnaPie = [];
     let i: number = 0;
     let fechas: string[] = [];
     let diaSem: string[] = ['N° SVT/TICKET', 'TITULO', 'FECHA INICIO', 'FECHA FIN', 'AVANCE', 'ETAPA'];
     let idiaSem: string[] = ['11%','18%','6%','6%','5%','6%'];
     for(i=1; i<=d;i++){
        let dateadd = this.daysSubtraction(dateToday,d-i);
        let dateTodayStr =this.datePipe.transform(dateadd, 'dd/MM/yy');
        idiaSem.push('4%');
        diaSem.push(this.datePipe.transform(dateadd, 'E-dd','es-ES').replace('Sun','DOM')
                                                                    .replace('Mon','LUN')
                                                                    .replace('Tue','MAR')
                                                                    .replace('Wed','MIER')
                                                                    .replace('Thu','JUEV')
                                                                    .replace('Fri','VIER')
                                                                    .replace('Sat','SAB'));
        fechas.push(dateTodayStr);
        this.columnasFechTabla = fechas;
        this.columnasTabla.push(dateTodayStr);
        this.columnTitulo = diaSem;
        this.columnAncho = idiaSem;
        dateToday = this.FechaHoy;
     }
  }
  
  consolida(){
    this.loading = true;
    this.columnAnchoPie =[];
    let idiaSem: string[] = ['55%','10%','5%','5%','5%','5%','5%','5%','5%'];
    this.columnAnchoPie = idiaSem;
    let iPie: string[] =[];  
    iPie.push('RESUMEN TOTAL');
    let contador: number= 0;
    let dia: number[]= [];
    /* inicia valores en cero */
    for(let i=0;i<=6;i++){
      dia.push(0);
    }
    iPie.push('HORAS DIARIAS: ');
    iPie.push(''+dia[0]);
    iPie.push(''+dia[1]);
    iPie.push(''+dia[2]);
    iPie.push(''+dia[3]);
    iPie.push(''+dia[4]);
    iPie.push(''+dia[5]);
    iPie.push(''+dia[6]);
    this.columnaPie = iPie;
    return this.consolidaT();
  }

  validat(estado: boolean,i, idtabla){
    let tblObject = (document.getElementById(idtabla)) as HTMLTableElement;

    if (idtabla=='tableHorasEsfuerzo'&&i==6&&this.grabbarcon==false)
      this.consolida();        
  }

  valida(estado: boolean,i, idtabla){   
      if (this.grabbarcon==false){
        this.ejecutacon = estado;
        this.consolida(); 
      }
  }
   
  consolidaT(){
    this.loading = true;
    let obs1='';
    return  forkJoin(                  
                  of(this.consolidah("tableHorasProyecto")),
                  of(this.consolidah("tableHorasMantenimiento")),
                  of(this.consolidah("tableHorasIncidencias")),
                  of(this.consolidah("tableHorasSoporte")),
                  of(this.consolidah("tableHorasEsfuerzo")),                               
                ).subscribe(
                res => {                    
                    console.log('Se cargo con exito', res);                                                    
                    this.loading= false;
                },
                err =>{
                  console.log('Ocurrio un error',err);
                  Swal.fire('Error!', 'Las horas no se cargaron con exito.', 'error');                              
                  this.loading= false;
                }
              );
  }

  consolidah(idTable: string){
    switch(idTable){
      case "tableHorasProyecto":{
          if(this.verProyecto!='true') return;
          break;
      }
      case "tableHorasMantenimiento":{
        if(this.verMantenimiento!='true') return;
        break;
      }
      case "tableHorasIncidencias":{
        if(this.verIncidencia!='true') return;
        break;
      }
      case "tableHorasSoporte":{
        if(this.verSoporte!='true') return;
        break;
      }
      case "tableHorasEsfuerzo":{
        if(this.verEsfuerzo!='true') return;
        break;
      }
    }
    let tblObject = (document.getElementById(idTable)) as HTMLTableElement;
    for(let k = 1; k < tblObject.rows.length; k++){  
      var trObject = tblObject.rows[k] as HTMLTableRowElement;
      let idIniciativa = trObject.cells[0].id;
      let numColumns = 6 + this.columnasFechTabla.length;
      this.loading= true;
      for(let w = 6; w < numColumns; w++){
        this.loading= true;
        let inputObject = tblObject.rows[k].cells[w].children[0] as HTMLInputElement;
        let horaStr = inputObject.value;
        let horaactual: number=0;
        if (horaStr.length>0)
          horaactual =  Number.parseInt(horaStr);
        else  
          horaactual = 0;
        if ((Number.parseInt(this.columnaPie[w-4]) + horaactual)>14){
          Swal.fire('¡Error..!', 'La hora ingresada supera las 14 horas diarias permitidadas', 'error');
          inputObject.value ='0';
        }
        else 
          this.columnaPie[w-4] =''+(Number.parseInt(this.columnaPie[w-4]) + horaactual);
        horaactual=0
      }
    }
  }

  getProyectoIniciativas() {
    let iniciativasRef = this.firebaseIniciativas.getPlanesIniciativaFiltro("categoria.descripcion","PROYECTO");
    return iniciativasRef.subscribe(data => {
      var lista = [];
      data.forEach(dataElement => {
        let iniciativaObject= dataElement.payload.doc.data() as IniciativaMainFire;
        let idIniciativa = dataElement.payload.doc.id;
        iniciativaObject.idIniciativa = idIniciativa;
        lista.push(iniciativaObject);
      });
      this.listaInic = this.getIniciativas(lista, this.usuario);
      this.proyectoIniciativas =  new MatTableDataSource(this.listaInic);

      if(this.listaInic.length>0)
        this.verProyecto="true";

      this.proyectoIniciativas.paginator = this.paginator;
      this.getFechaHoy(this.columnasTabla);
    });
  }

  getMantenimientoIniciativas() {
    let iniciativasRef = this.firebaseIniciativas.getPlanesIniciativaFiltro("categoria.descripcion","MANTENIMIENTO");
    return iniciativasRef.subscribe(data => {
      var lista = [];
      data.forEach(dataElement => {
        let iniciativaObject= dataElement.payload.doc.data() as IniciativaMainFire;
        let idIniciativa = dataElement.payload.doc.id;
        iniciativaObject.idIniciativa = idIniciativa;
        lista.push(iniciativaObject);
      });
      this.listaMantenimientoInic = this.getIniciativas(lista, this.usuario);
      this.mantenimientoIniciativas =  new MatTableDataSource(this.listaMantenimientoInic);
      
      if(this.listaMantenimientoInic.length>0)
        this.verMantenimiento ="true";
      
      this.mantenimientoIniciativas.paginator = this.paginator;
      this.getFechaHoy(this.columnasTabla);
    });
  }

  getSoporteIniciativas() {
    let iniciativasRef = this.firebaseIniciativas.getPlanesIniciativaFiltro("categoria.descripcion","SOPORTE");
    return iniciativasRef.subscribe(data => {
      var lista = [];
      data.forEach(dataElement => {
        let iniciativaObject= dataElement.payload.doc.data() as IniciativaMainFire;
        let idIniciativa = dataElement.payload.doc.id;
        iniciativaObject.idIniciativa = idIniciativa;
        lista.push(iniciativaObject);
      });
      this.listaSoporteInic = this.getIniciativas(lista, this.usuario);
      this.soporteIniciativas =  new MatTableDataSource(this.listaSoporteInic);

      if(this.listaSoporteInic.length>0)
        this.verSoporte="true";

      this.soporteIniciativas.paginator = this.paginator;
      this.getFechaHoy(this.columnasTabla);
    });
  }

  getIncidenciaIniciativas() {
    let iniciativasRef = this.firebaseIniciativas.getPlanesIniciativaFiltro("categoria.descripcion","INCIDENCIA");
    return iniciativasRef.subscribe(data => {
      var lista = [];
      data.forEach(dataElement => {
        let iniciativaObject= dataElement.payload.doc.data() as IniciativaMainFire;
        let idIniciativa = dataElement.payload.doc.id;
        iniciativaObject.idIniciativa = idIniciativa;
        lista.push(iniciativaObject);
      });
      this.listaIncidenciaInic = this.getIniciativas(lista, this.usuario);
      this.incidenciaIniciativas =  new MatTableDataSource(this.listaIncidenciaInic);
    
      if(this.listaIncidenciaInic.length>0)
        this.verIncidencia="true";
      this.incidenciaIniciativas.paginator = this.paginator;
      this.getFechaHoy(this.columnasTabla);      
    });
  }

  getEsfuerzocontinuoIniciativas() {
    let esfuerzoRef = this.firebaseIniciativas.getPlanesIniciativaFiltro("categoria.descripcion","ESFUERZO CONTINUO");
    return esfuerzoRef.subscribe(data => {
      var lista = [];
      data.forEach(dataElement => {
        let iniciativaObject= dataElement.payload.doc.data() as IniciativaMainFire;
        let idIniciativa = dataElement.payload.doc.id;
        iniciativaObject.idIniciativa = idIniciativa;
        lista.push(iniciativaObject);
        this.listaglobal.push(iniciativaObject);
      });
      this.listaIncidenciaInic = this.getIniciativas(lista, this.usuario);
      this.esfuerzoIniciativas =  new MatTableDataSource(this.listaIncidenciaInic);

      this.listaInic = this.getIniciativas(this.listaglobal, this.usuario);
      this.globalIniciativas =  new MatTableDataSource(this.listaInic);
      if(this.listaIncidenciaInic.length>0)
        this.verEsfuerzo ="true";
      this.esfuerzoIniciativas.paginator = this.paginator;
      this.getFechaHoy(this.columnasTabla);    
    });
  }

  getFechaHoy(columnas: string[]){
    let dateToday = this.FechaHoy;
  }

  changeFechFin(type: string, event: MatDatepickerInputEvent<Date>) {
    if (type=='change') {
      this.loading = true;
        this.FechaHoy = new Date(event.value);
        this.changeFecha(this.FechaHoy);
        this.loading = false;              
      }
  }

  changeFecha(fecha: Date){
        this.FechaHoy = fecha;
        let dias: number= 0;
        switch (this.datePipe.transform(this.FechaHoy, 'E','es-ES').replace('Sun','DOM')
                                                                      .replace('Mon','LUN')
                                                                      .replace('Tue','MAR')
                                                                      .replace('Wed','MIER')
                                                                      .replace('Thu','JUEV')
                                                                      .replace('Fri','VIER')
                                                                      .replace('Sat','SAB')){
          /*** Determina el numero de dias de la semana  */ 
          case 'DOM':{
            dias= 0;
            break;}
          case 'LUN':{
            dias= 6;
            break;}
          case 'MAR':{
            dias= 5;
            break;}
          case 'MIER':{
            dias= 4;
            break;}
          case 'JUEV':{
            dias= 3;
            break;}
          case 'VIER':{
            dias= 2;
            break;}
          case 'SAB':{
            dias= 1;
            break;}                      
        }
        let dateadd = this.daysSum(this.FechaHoy,dias);
        
        this.FechaHoy = dateadd; /* Establece de Lunes a Domingo de donde este el calendario*/ 
        this.fechaInputSelect = 7

        if(localStorage.getItem("perfil")=="LIDER"&&localStorage.getItem("usuario")!=this.usuario){
          this.desactivar = false;
        }else{
          this.desactivar = true;
        }
        this.loadColumns();              
          
        forkJoin(
          of(this.getProyectoIniciativas()),
          of(this.getMantenimientoIniciativas()),
          of(this.getSoporteIniciativas()),
          of(this.getIncidenciaIniciativas()),
          of(this.getEsfuerzocontinuoIniciativas()),                            
         ).subscribe(res => {                        
                          console.log('Se cargo con exito', res);                              
                          this.loading=false;},                              
                     err => {
                        console.log('Ocurrio un error',err);
                        Swal.fire('Error!', 'Las horas no se cargaron con exito.', 'error');                                
                        this.loading=false;
          });
        //this.consolida();
  }

  getIniciativas(lista: IniciativaMainFire[], usuario: string){
    let listaProy: IniciativaHorasFire[] = [];
    lista.forEach(iniciativaFire => {
          let iniciativaHorasFire = new IniciativaHorasFire();
          if(undefined != iniciativaFire.recursos && 0 != iniciativaFire.recursos.length){
            let porcentaje: number = 0;
            let horasTotales: number = 0;
            iniciativaFire.recursos.forEach(recurso => {
              if(undefined != recurso.horasReg && 0 != recurso.horasReg.length){
                recurso.horasReg.forEach(hora => {
                  horasTotales = horasTotales + hora.horas;
                });
              }
            });
            iniciativaFire.recursos.forEach(recurso => {
              if(usuario == recurso.codigoUsuario){
                iniciativaHorasFire.iniciativa = iniciativaFire;
                let horasFechas: number[] = [];
                let sololectura: string[] = [];
                if(undefined != recurso.horasReg && 0 != recurso.horasReg.length){
                  recurso.horasReg.forEach(hora => {
                    for(let i = 0; i < this.columnasFechTabla.length; i++){
                      let fechaSavedStr = hora.fecha;
                      let fechaSaved = (new Date(fechaSavedStr)).getTime();
                      let fechaini = (new Date(iniciativaFire.fechaInicio)).getTime();
                      let fechaColumnarStr = this.getFechWithFormat(this.columnasFechTabla[i]);
                      let fechaColumna = (new Date(fechaColumnarStr)).getTime();

                      let f1 =this.datePipe.transform(this.FechaHoy, 'yyyyMMdd');
                      let f2 =this.datePipe.transform(fechaini, 'yyyyMMdd');
                      if (iniciativaFire.estado.descripcion!='CERRADO'){ 
                          if (f2<=f1){
                            sololectura[i]="";
                          }else{
                            sololectura[i] = "readonly";
                          }
                        }else{
                          sololectura[i] = "";
                        }
                      if(fechaSaved == fechaColumna ){
                        horasFechas[i] = hora.horas;
                      }
                    }
                  });
                }
                porcentaje = (horasTotales * 100)/iniciativaFire.horaEstimada;
                iniciativaHorasFire.avance = porcentaje.toPrecision(3)+"%";
                iniciativaHorasFire.horasFecha = horasFechas;
                iniciativaHorasFire.sololectura = sololectura;
                listaProy.push(iniciativaHorasFire);
              }
            });
          }
    });
    return listaProy;
  }
  
  saveHorasAll(){
    this.grabbarcon=true;
    this.ejecutacon=false;
    let obs1 ="tableHorasProyecto";
    let FormlyFieldConfig:any =[obs1]
    let rst = forkJoin(obs1).
              pipe(
                map(([obs1]) => {
                  if(this.verProyecto=='true')
                  this.saveHoras("tableHorasProyecto",true);
                  if(this.verMantenimiento=='true')
                  this.saveHoras("tableHorasMantenimiento",true);
                  if(this.verIncidencia=='true')
                  this.saveHoras("tableHorasIncidencias",true);
                  if(this.verSoporte=='true')
                  this.saveHoras("tableHorasSoporte",true);
                  if(this.verEsfuerzo=='true')
                  this.saveHoras("tableHorasEsfuerzo",true);
                })
              );
    let resultado = rst.subscribe(fields =>{
      this.grabbarcon = false;
      Swal.fire('Guardado!', 'Se ha guardado correctamente.', 'success');            
      this.loading = false;
      //Swal.fire('Guardado!', 'Se ha guardado correctamente.', 'success');
    });
  }

  saveHoras(idTable: string, isUpdate: boolean){
    this.loading = true;    
    let tblObject = (document.getElementById(idTable)) as HTMLTableElement;
    let horaRowList: HoraRow[] = [];
    let isValidSumHours: boolean = true;
        
            
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
    // Termino del recorrido
    try { 
      horaRowList.forEach(horaRow =>{
        if(1 == horaRow.indicadores.length){
          horaRow.indicadores.forEach(indic => {
            var trObject = tblObject.rows[indic] as HTMLTableRowElement;
            let idIniciativa = trObject.cells[0].id;
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
            let iniciativaFire = new IniciativaMainFire();
            iniciativaRef.forEach(data => {
              iniciativaFire = data.data() as IniciativaMainFire;
                  for(let i = 0; i < iniciativaFire.recursos.length; i++){
                    if(this.usuario == iniciativaFire.recursos[i].codigoUsuario){
                      if(undefined == iniciativaFire.recursos[i].horasReg){
                        for(let x = 0; x < horaFireList.length; x++){
                          horaFireList[x].fechaReg = new Date();
                        }
                        iniciativaFire.recursos[i].horasReg = horaFireList;
                      }else{
                        let horaList = iniciativaFire.recursos[i].horasReg;
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
                      let horasAsignadas = iniciativaFire.recursos[i].horasAsig;
                      let horasRegList = iniciativaFire.recursos[i].horasReg;
                      isValidSumHours = this.validarHorasRegistradas(horasAsignadas, horasRegList);
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
          let iniciativaFire = new IniciativaMainFire();
          iniciativaRef.forEach(data => {
            iniciativaFire = data.data() as IniciativaMainFire;
            horaRow.indicadores.forEach(indix =>{
              var trObject = tblObject.rows[indix] as HTMLTableRowElement;
              let idIniciativa = trObject.cells[0].id;
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
              for(let i = 0; i < iniciativaFire.recursos.length; i++){
                if(this.usuario == iniciativaFire.recursos[i].codigoUsuario){
                  if(undefined == iniciativaFire.recursos[i].horasReg){
                    for(let x = 0; x < horaFireList.length; x++){
                      horaFireList[x].fechaReg = new Date();
                    }
                    iniciativaFire.recursos[i].horasReg = horaFireList;
                  }else{
                    let horaList = iniciativaFire.recursos[i].horasReg;
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
            });
            this.firebaseIniciativas.updateIniciativa(iniciativaFire).then(
              result => {
              },error => {
                Swal.fire('Error!', 'Error al guardar las horas de la actividad.', 'error');
              });
          });
        }});
    } catch (error) {
      Swal.fire('Error!', 'Error al guardar las horas de la actividad.', 'error');
    }
  }

  daysSum(fechaI: Date, numDias: number){
    let fechaF = this.FechaHoy;
    let fechaIni = new Date(fechaI);
    let contador: number = 0;
    while(contador != numDias){
      fechaF = new Date(fechaIni.setDate(fechaIni.getDate() + 1));
      contador = contador+1;
    }
    return fechaF;
  }

  validacionMax(event){
    alert(event);
  }

  daysSubtraction(fechaI: Date, numDias: number){
    let fechaF = this.FechaHoy;
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

  validarHorasRegistradas(hAsig: number, horasReg: HoraFire[]){
    let sumaHorasReg: number = 0;
    horasReg.forEach(element =>{
      sumaHorasReg = sumaHorasReg + element.horas;
    });
    if(hAsig >= sumaHorasReg){
      return true;
    }else{
      return false;
    }
  }

}  

