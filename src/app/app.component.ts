import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Financiera';
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
   this.dataSource = {
    "chart": {
      "caption": "Paises con msa reservas en los años 2017 -2018",
      "subCaption": "In MMbbl = One Million barrels",
      "xAxisName": "Country",
      "yAxisName": "Reserves (MMbbl)",
      "numberSuffix": "K",
      "theme": "fusion",
    },
    "data": [{
      "label": "Venezuela",
      "value": "290"
    }, {
      "label": "Saudi",
      "value": "260"
    }, {
      "label": "Canada",
      "value": "180"
    }, {
      "label": "Iran",
      "value": "140"
    }, {
      "label": "Russia",
      "value": "115"
    }, {
      "label": "UAE",
      "value": "100"
    }, {
      "label": "US",
      "value": "30"
    }, {
      "label": "China",
      "value": "30"
    }]
  };
}
}

