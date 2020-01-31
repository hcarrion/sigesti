import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-graficobar',
  templateUrl: './graficobar.component.html',
  styleUrls: ['./graficobar.component.css']
})
export class GraficobarComponent implements OnInit {
  chartFilterValue: string;
  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}

  private _chartFilter: string;
  public filtered_value;
  public select_duration;
  public from_date;
  public to_date;
  public getEmpBandList;
  public errorMsg;
  public chartFetchParameter: any;
  public chartCallFunction: any;
  public chartLabel: any;
  public attritionCountDisplay: any;
  public ss: any;
  public modal_content_part = 'Attrited';

  @Input() from_page: any;

  @Input() labelIds: any;
  @Input() attritionPercentage: any;

  // Doughnut
  // public doughnutChartLabels: Label[] = [];
  @Input() doughnutChartLabels: Label[];
  @Input() attritionCount: any;

  // public doughnutChartData: MultiDataSet = [[5, 8, 3]];
  @Input() doughnutChartData: MultiDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';

  public doughnutChartOptions: any = {
    cutoutPercentage: 55,
    responsive: true,
    /*position: 'outside',
    pieceLabel: {
      render: 'label'
    },*/
    tooltips: {
      // Disable the on-canvas tooltip
      enabled: true,
      callbacks: {
        title: (tooltipItem, data) => {
          var tooltipLabel = data['labels'][tooltipItem[0]['index']];

          if (tooltipLabel !== null) {
            return tooltipLabel.toUpperCase();
          } else {
            return '';
          }
        },
        label: (tooltipItem, data) => {
          var allData = data.datasets[tooltipItem.datasetIndex].data;
          var tooltipLabel = data.labels[tooltipItem.index];
          var tooltipData = allData[tooltipItem.index];
          var total_attritions: number = 0;
          // tslint:disable-next-line: forin
          for (let i in allData) {
            total_attritions = total_attritions + Number(allData[i]);
          }
          let tooltipPercentage = (
            (Number(tooltipData) / total_attritions) *
            100
          ).toFixed(2);

          if (this.from_page === 'absent') {
            let tooltipPercentageFormat = this.getAbsentPercentage(
              tooltipItem.index
            );
            return [
              ' Absent Count : ' + tooltipData,
              ' Absent Percentage : ' + tooltipPercentageFormat + '%',
              ' Total Absent : ' + total_attritions
            ];
          } else {
            let tooltipPercentageFormat = this.getAttritionPercentage(
              tooltipPercentage
            ).toFixed(2);
            return [
              ' Attrition Count : ' + tooltipData,
              ' Attrition Percentage : ' + tooltipPercentageFormat + '%',
              ' Total Attritions : ' + total_attritions
            ];
          }
        }
      },
      titleFontSize: 18
    },
    legend: {
      display: true,
      position: 'bottom',
      fullWidth: false,
      labels: {
        padding: 15,
        fontSize: 13,
        usePointStyle: true,
        fontColor: 'rgb(143, 142, 142)',
        boxWidth: 10
      }
    }
   
  };

  get chartFilter(): any {
    return this._chartFilter;
  }

  @Input()
  set chartFilter(value: any) {
    //console.log('value===', value);
    this.filtered_value = value[0].filter_name;
    this.select_duration = value[1].select_duration;
    this.from_date = value[2].from_date;
    this.to_date = value[3].to_date;
  }

  ngOnInit() {
    this.attritionCountDisplay = this.attritionCount;
  }

  public getCount(index) {
    return this.attritionCount[index];
  }

  public getAttritionPercentage(attri_perc) {
    let calculated_perc = (attri_perc * this.attritionPercentage) / 100;
    return calculated_perc;
  }

  public getAbsentPercentage(index) {
    return this.attritionPercentage[index];
  }

  public chartClicked(e: any): void {

  }


  public chartHovered(e: any): void {

  }
}