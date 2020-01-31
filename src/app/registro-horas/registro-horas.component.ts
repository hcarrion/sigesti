import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
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
}
