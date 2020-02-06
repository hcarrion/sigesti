import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dialogavancescategoria',
  templateUrl: './dialogavancescategoria.component.html',
  styleUrls: ['./dialogavancescategoria.component.css']
})
export class DialogavancescategoriaComponent implements OnInit {
  options = [];
  
  constructor() { }
 
  ngOnInit() {
    this.options.push({id: 34, description: 'Adding new item'},{id: 35, description: '1111111 new item'});
  }

}
