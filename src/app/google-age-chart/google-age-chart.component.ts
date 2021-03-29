import {Component, Injectable, Input, OnInit} from '@angular/core';

@Injectable()
export class IdIncrement {
  counter = 0;

  increment() {
    this.counter += 1;
    return this.counter;
  }
}

@Component({
  selector: 'app-google-age-chart',
  templateUrl: './google-age-chart.component.html',
  styleUrls: ['./google-age-chart.component.css'],
})
export class GoogleAgeChartComponent implements OnInit {

  @Input('title') title;
  elementId: string;
  id: number;
  data: any[];
  options: any;
  chart: any;
  loaded = false;

  constructor(increment: IdIncrement) {
    this.id = increment.increment();
    this.elementId = 'chart_' + this.id;
  }

  ngOnInit() {
    this.options = {
      chartArea: {
        right: 100
      },
      chart: {},
      title: this.title,
      legend: {
        position: 'right',  // otherwise legend overlaps
        maxLines: 2,
      },
      isStacked: true,
      height: 400,
      width: 400,
      colors: ['#243f86', '#92cdee', '#678197', '#F2D65C']
    };
  }

  drawGraph(google: any) {
    this.chart = this.createBarChart(google, document.getElementById(this.elementId));
    this.chart.draw(this.data, this.options);
  }

  createBarChart(google: any, element: any): any {
    return new google.visualization.ColumnChart(element);
  }

  createDataTable(google: any, array: any[]): any {
    return google.visualization.arrayToDataTable(array);
  }

  updateChart(google: any, data: any[]) {
    this.data = this.createDataTable(google, data);
    this.drawGraph(google);
  };

}
