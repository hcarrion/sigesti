import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseIniciativaService } from '../shared/services/firebase-iniciativa.service';
import { IniciativaFire } from '../shared/models/iniciativa-fire';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-registro-horas',
  templateUrl: './registro-horas.component.html',
  styleUrls: ['./registro-horas.component.css']
})
export class RegistroHorasComponent implements OnInit {
  habilitar: boolean;
  habilitar1: boolean;
  habilitar2: boolean;
  habilitar3: boolean;

  columnasTabla: string[] = ['codigosvt', 'titulo', 'fechainicio', 'fechafin', 'avance', 'prioridad', 'fechahoy', 'accion'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  proyectoIniciativas= new MatTableDataSource<IniciativaFire>([]);
  loading: boolean;
  constructor(private firebaseIniciativas: FirebaseIniciativaService) { }

  ngOnInit() {
    this.loading = true;
    this.getProyectoIniciativas();
    
  }

  InActiva() {
  
   if (this.habilitar){this.habilitar = false;
   }else {this.habilitar = true;}
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
   
   async getProyectoIniciativas() {
    let iniciativasRef = this.firebaseIniciativas.getPlanesIniciativaFiltro("categoria.descripcion","Proyecto");
    iniciativasRef.subscribe(data => {
      var lista = [];
      data.forEach(dataElement => {
        let iniciativaObject= dataElement.payload.doc.data() as IniciativaFire;
        let idIniciativa = dataElement.payload.doc.id;
        iniciativaObject.idIniciativa = idIniciativa;
        lista.push(iniciativaObject);
      });
      this.proyectoIniciativas =  new MatTableDataSource(lista);
      this.proyectoIniciativas.paginator = this.paginator;
      this.getFechaHoy(this.columnasTabla);
      this.loading = false;
    });
  }

  getFechaHoy(columnas: string[]){
    let dateToday = new Date();
    debugger;
    /*let dateTodayStr =this.datepipe.transform(dateToday, 'dd/MM/yyyy');
    let itemIndex = columnas.findIndex(columna => columna == "fechahoy");
    this.columnasTabla[itemIndex] = dateTodayStr;*/
  }
}
