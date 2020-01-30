import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedColor = '';
  dataSource: Object;
  chartConfig: Object;
  
  colors = [
    {
      name: 'yellow',
      value: '#ffff00'
    },
    {
      name: 'red',
      value: '#ff3300'
    },
    {
      name: 'blue',
      value: '#0000ff'
    }
  ];

  onChange(value){
    this.selectedColor = value;
  }
  constructor() {
    this.chartConfig = {
       width: '700',
       height: '400',
       type: 'column2d',
       dataFormat: 'json',
   };
      
}
}

