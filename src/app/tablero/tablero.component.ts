import { Component, OnInit } from '@angular/core';
import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { FirebaseIniciativaMainService } from '../shared/services/firebase-iniciativa-main.service';
import 'chart.piecelabel.js';

@Component({
  selector: 'app-inicio',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {
  anio: number;
  listaIniciativasAnio = [];
  listaParametros = [];
  listaCategoria = [];

  //Variables Cards
  totalatenciones: number;
  totalhorastrabajadas: number;
  totalatencionesfuerafecha: number;
  totalproduccion: number;

  lstAtencionesMesDetalle: detalle[];
  lstHorasConsumidasDetalle: any[];

  barChartOptions: ChartOptions = {
    legend: { position: 'right' },
    responsive: true,
    maintainAspectRatio: false
  };
  barChartLabels: Label[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: '', stack: 'a' },
    { data: [], label: '', stack: 'a' },
    { data: [], label: '', stack: 'a' },
    { data: [], label: '', stack: 'a' },
    { data: [], label: '', stack: 'a' }
  ];

  lineChartData: ChartDataSets[] = [
    {
      data: [], fill: false,
      pointRadius: 5,
      pointHoverRadius: 5
    },
    {
      data: [], fill: false,
      pointRadius: 5,
      pointHoverRadius: 5
    },
    {
      data: [], fill: false,
      pointRadius: 5,
      pointHoverRadius: 5
    },
    {
      data: [], fill: false,
      pointRadius: 5,
      pointHoverRadius: 5
    },
    {
      data: [], fill: false,
      pointRadius: 5,
      pointHoverRadius: 5
    }
  ];
  lineChartLabels: Label[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  lineChartOptions = {
    legend: { position: 'right' },
    responsive: true,
    maintainAspectRatio: false
  };

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  displayedColumns: string[] = [
    "descripcion",
    "mesEnero",
    "mesFebrero",
    "mesMarzo",
    "mesAbril",
    "mesMayo",
    "mesJunio",
    "mesJulio",
    "mesAgosto",
    "mesSeptiembre",
    "mesOctubre",
    "mesNoviembre",
    "mesDiciembre"
  ];

  constructor(private firebaseServices: FirebaseIniciativaMainService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  async CargarListaIniciativas() {
    let iniciativasAnio = this.firebaseServices.getAtenciones(this.anio);
    let parametros = this.firebaseServices.getParametros();

    parametros.subscribe(data => {
      this.listaParametros = [];
      data.forEach(element => {
        let parametro = element.payload.doc.data() as any;
        this.listaParametros.push(parametro);
      });
      console.log('Lista parámetros =>', this.listaParametros);

      //Categoría
      this.listaCategoria = [];
      this.listaParametros.forEach(x => {
        if (x.nombre == "categoria") {
          this.listaCategoria = x.detalle;
        }
      });
    });

    iniciativasAnio.subscribe(data => {
      this.listaIniciativasAnio = [];
      data.forEach(element => {
        let iniciativa = element.payload.doc.data() as any;
        this.listaIniciativasAnio.push(iniciativa);
      });
      console.log('Lista final =>', this.listaIniciativasAnio);
      this.CargarDatos();
    });
  }

  async CargarDatos() {
    //Atenciones
    this.totalhorastrabajadas = 0;
    this.totalatencionesfuerafecha = 0;
    this.totalproduccion = 0;

    this.listaIniciativasAnio.forEach(x => {
      let total: number = 0;
      if (x.recursos != null) {
        if (x.recursos.length > 0) {
          x.recursos.forEach(recursos => {
            recursos.horasReg.forEach(horasReg => {
              var horas: number = 0;
              if (horasReg.horas == null || horasReg.horas == 'undefined' || horasReg.horas == 'NaN') {
                horas = 0;
              } else {
                horas = horasReg.horas;
                total = total + horas;
              }
            });
          });
        }
      }
      if (total > 0) {
        this.totalatenciones = this.totalatenciones + 1;
      }
    });

    //Horas trabajadas
    this.listaIniciativasAnio.forEach(x => {
      if (x.recursos != null) {
        if (x.recursos.length > 0) {
          x.recursos.forEach(recursos => {
            recursos.horasReg.forEach(horasReg => {
              var horas: number = 0;
              if (horasReg.horas == null || horasReg.horas == 'undefined' || horasReg.horas == 'NaN') {
                horas = 0;
              } else {
                horas = horasReg.horas;
              }
              this.totalhorastrabajadas = this.totalhorastrabajadas + horas;
            });
          });
        }
      }
    });

    //Atenciones Fuera de Fecha
    this.listaIniciativasAnio.forEach(x => {
      let total: number = 0;
      if (x.recursos != null) {
        if (x.recursos.length > 0) {
          x.recursos.forEach(recursos => {
            recursos.horasReg.forEach(horasReg => {
              var fecha: number = horasReg.fecha;
              var horas: number = 0;
              if (horasReg.horas == null || horasReg.horas == 'undefined' || horasReg.horas == 'NaN') {
                horas = 0;
              } else {
                if (fecha > x.fechaFin) {
                  horas = horasReg.horas;
                  total = total + horas;
                }
              }
            });
          });
        }
      }
      if (total > 0) {
        this.totalatencionesfuerafecha = this.totalatencionesfuerafecha + 1;
      }
    });

    //Puesta en Producción
    this.listaIniciativasAnio.forEach(x => {
      let prod;
      if (x.estado.codigo == 4 || x.estado.codigo == 5 || x.estado.codigo == 6) {
        prod = 1;
      } else {
        prod = 0;
      }
      this.totalproduccion = this.totalproduccion + prod;
    });

    //Atenciones a la fecha
    this.lstAtencionesMesDetalle = [];
    this.listaCategoria.forEach(categoria => {
      let detalleCat: detalle;
      detalleCat = new detalle();
      detalleCat.descripcion = categoria.descripcion;
      detalleCat.mesEnero = 0;
      detalleCat.mesFebrero = 0;
      detalleCat.mesMarzo = 0;
      detalleCat.mesAbril = 0;
      detalleCat.mesMayo = 0;
      detalleCat.mesJunio = 0;
      detalleCat.mesJulio = 0;
      detalleCat.mesAgosto = 0;
      detalleCat.mesSeptiembre = 0;
      detalleCat.mesOctubre = 0;
      detalleCat.mesNoviembre = 0;
      detalleCat.mesDiciembre = 0;
      detalleCat.cantidad = 0;

      this.listaIniciativasAnio.forEach(x => {
        //Variables
        let ene: number = 0;
        let feb: number = 0;
        let mar: number = 0;
        let abr: number = 0;
        let may: number = 0;
        let jun: number = 0;
        let jul: number = 0;
        let ago: number = 0;
        let sep: number = 0;
        let oct: number = 0;
        let nov: number = 0;
        let dic: number = 0;
        let total: number = 0;
        if (categoria.codigo == x.categoria.codigo) {
          if (x.recursos != null) {
            if (x.recursos.length > 0) {
              x.recursos.forEach(recursos => {
                recursos.horasReg.forEach(horasReg => {
                  var mes: number = +horasReg.fecha.substring(5, 7);
                  var horas: number = 0;
                  if (horasReg.horas == null || horasReg.horas == 'undefined' || horasReg.horas == 'NaN') {
                    horas = 0;
                  } else {
                    horas = horasReg.horas;
                    switch (mes) {
                      case 1:
                        ene = ene + horas;
                        break;
                      case 2:
                        feb = feb + horas;
                        break;
                      case 3:
                        mar = mar + horas;
                        break;
                      case 4:
                        abr = abr + horas;
                        break;
                      case 5:
                        may = may + horas;
                        break;
                      case 6:
                        jun = jun + horas;
                        break;
                      case 7:
                        jul = jul + horas;
                        break;
                      case 8:
                        ago = ago + horas;
                        break;
                      case 9:
                        sep = sep + horas;
                        break;
                      case 10:
                        oct = oct + horas;
                        break;
                      case 11:
                        nov = nov + horas;
                        break;
                      case 12:
                        dic = dic + horas;
                        break;
                    }
                    total = total + horas;
                  }
                });
              });
            }
          }
          if (total > 0) {
            if (ene > 0) detalleCat.mesEnero = detalleCat.mesEnero + 1;
            if (feb > 0) detalleCat.mesFebrero = detalleCat.mesFebrero + 1;
            if (mar > 0) detalleCat.mesMarzo = detalleCat.mesMarzo + 1;
            if (abr > 0) detalleCat.mesAbril = detalleCat.mesAbril + 1;
            if (may > 0) detalleCat.mesMayo = detalleCat.mesMayo + 1;
            if (jun > 0) detalleCat.mesJunio = detalleCat.mesJunio + 1;
            if (jul > 0) detalleCat.mesJulio = detalleCat.mesJulio + 1;
            if (ago > 0) detalleCat.mesAgosto = detalleCat.mesAgosto + 1;
            if (sep > 0) detalleCat.mesSeptiembre = detalleCat.mesSeptiembre + 1;
            if (oct > 0) detalleCat.mesOctubre = detalleCat.mesOctubre + 1;
            if (nov > 0) detalleCat.mesNoviembre = detalleCat.mesNoviembre + 1;
            if (dic > 0) detalleCat.mesDiciembre = detalleCat.mesDiciembre + 1;

            detalleCat.cantidad = detalleCat.cantidad + 1;
          }
        }
      });
      this.lstAtencionesMesDetalle.push(detalleCat);
    });

    //Horas consumidas
    this.lstHorasConsumidasDetalle = [];
    this.listaCategoria.forEach(categoria => {
      let detalleCat: detalle;
      detalleCat = new detalle();
      detalleCat.descripcion = categoria.descripcion;
      detalleCat.mesEnero = 0;
      detalleCat.mesFebrero = 0;
      detalleCat.mesMarzo = 0;
      detalleCat.mesAbril = 0;
      detalleCat.mesMayo = 0;
      detalleCat.mesJunio = 0;
      detalleCat.mesJulio = 0;
      detalleCat.mesAgosto = 0;
      detalleCat.mesSeptiembre = 0;
      detalleCat.mesOctubre = 0;
      detalleCat.mesNoviembre = 0;
      detalleCat.mesDiciembre = 0;
      detalleCat.cantidad = 0;

      this.listaIniciativasAnio.forEach(x => {
        if (categoria.codigo == x.categoria.codigo) {
          if (x.recursos != null) {
            if (x.recursos.length > 0) {
              x.recursos.forEach(recursos => {
                recursos.horasReg.forEach(horasReg => {
                  var mes: number = +horasReg.fecha.substring(5, 7);
                  var horas: number = 0;
                  if (horasReg.horas == null || horasReg.horas == 'undefined' || horasReg.horas == 'NaN') {
                    horas = 0;
                  } else {
                    horas = horasReg.horas;
                    switch (mes) {
                      case 1:
                        detalleCat.mesEnero = detalleCat.mesEnero + horas;
                        break;
                      case 2:
                        detalleCat.mesFebrero = detalleCat.mesFebrero + horas;
                        break;
                      case 3:
                        detalleCat.mesMarzo = detalleCat.mesMarzo + horas;
                        break;
                      case 4:
                        detalleCat.mesAbril = detalleCat.mesAbril + horas;
                        break;
                      case 5:
                        detalleCat.mesMayo = detalleCat.mesMayo + horas;
                        break;
                      case 6:
                        detalleCat.mesJunio = detalleCat.mesJunio + horas;
                        break;
                      case 7:
                        detalleCat.mesJulio = detalleCat.mesJulio + horas;
                        break;
                      case 8:
                        detalleCat.mesAgosto = detalleCat.mesAgosto + horas;
                        break;
                      case 9:
                        detalleCat.mesSeptiembre = detalleCat.mesSeptiembre + horas;
                        break;
                      case 10:
                        detalleCat.mesOctubre = detalleCat.mesOctubre + horas;
                        break;
                      case 11:
                        detalleCat.mesNoviembre = detalleCat.mesNoviembre + horas;
                        break;
                      case 12:
                        detalleCat.mesDiciembre = detalleCat.mesDiciembre + horas;
                        break;
                    }
                    detalleCat.cantidad = detalleCat.cantidad + horas;
                  }
                });
              });
            }
          }
        }
      });
      this.lstHorasConsumidasDetalle.push(detalleCat);
    });    
    console.log('Listado Horas =>', this.lstHorasConsumidasDetalle);

    let i: number = 0;
    this.lstAtencionesMesDetalle.forEach(dat => {
      console.log('DATO GRAF =>', dat);
      this.lineChartData[i].data.push(dat.mesEnero);
      this.lineChartData[i].data.push(dat.mesFebrero);
      this.lineChartData[i].data.push(dat.mesMarzo);
      this.lineChartData[i].data.push(dat.mesFebrero);
      this.lineChartData[i].data.push(dat.mesAbril);
      this.lineChartData[i].data.push(dat.mesMayo);
      this.lineChartData[i].data.push(dat.mesJunio);
      this.lineChartData[i].data.push(dat.mesJulio);
      this.lineChartData[i].data.push(dat.mesAgosto);
      this.lineChartData[i].data.push(dat.mesSeptiembre);
      this.lineChartData[i].data.push(dat.mesOctubre);
      this.lineChartData[i].data.push(dat.mesNoviembre);
      this.lineChartData[i].data.push(dat.mesDiciembre);
      this.lineChartData[i].label = dat.descripcion;
      i = i + 1;
    });

    let j: number = 0;
    this.lstHorasConsumidasDetalle.forEach(dat => {
      console.log('DATO GRAF =>', dat);
      this.barChartData[j].data.push(dat.mesEnero);
      this.barChartData[j].data.push(dat.mesFebrero);
      this.barChartData[j].data.push(dat.mesMarzo);
      this.barChartData[j].data.push(dat.mesFebrero);
      this.barChartData[j].data.push(dat.mesAbril);
      this.barChartData[j].data.push(dat.mesMayo);
      this.barChartData[j].data.push(dat.mesJunio);
      this.barChartData[j].data.push(dat.mesJulio);
      this.barChartData[j].data.push(dat.mesAgosto);
      this.barChartData[j].data.push(dat.mesSeptiembre);
      this.barChartData[j].data.push(dat.mesOctubre);
      this.barChartData[j].data.push(dat.mesNoviembre);
      this.barChartData[j].data.push(dat.mesDiciembre);
      this.barChartData[j].label = dat.descripcion;
      j = j + 1;
    });
  }

  ngOnInit(): void {
    this.listaIniciativasAnio = [];
    this.listaParametros = [];
    this.listaCategoria = [];
    //Parámetros
    this.anio = 2020;
    this.totalatenciones = 0;
    this.totalhorastrabajadas = 0;
    this.totalatencionesfuerafecha = 0;
    this.totalproduccion = 0;
    this.CargarListaIniciativas();
  }
}

export class detalle {
  descripcion: string;
  mesEnero: number;
  mesFebrero: number;
  mesMarzo: number;
  mesAbril: number;
  mesMayo: number;
  mesJunio: number;
  mesJulio: number;
  mesAgosto: number;
  mesSeptiembre: number;
  mesOctubre: number;
  mesNoviembre: number;
  mesDiciembre: number;
  cantidad: number;
}