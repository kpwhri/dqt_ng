import {Component, Injectable, Input, OnInit} from '@angular/core';
declare var google: any;

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

  constructor(increment: IdIncrement) {
    this.id = increment.increment();
    this.elementId = 'chart_' + this.id;
    console.log(this.id, increment.counter, this.elementId);
  }

  ngOnInit() {
    google.charts.load('current', {
      'packages': ['corechart', 'bar']
    });
    // google.charts.setOnLoadCallback(() => this.drawGraph());

    this.options = {
      chart: {

      },
      title: this.title,
      // bars: 'vertical',
      legend: {position: 'bottom', maxLines: 2},
      isStacked: true,
      height: 400,
      width: 400,
      colors: ['#243f86', '#92cdee', '#678197', '#F2D65C']
    }

  }

  drawGraph() {
    this.chart = this.createBarChart(document.getElementById(this.elementId));
    this.chart.draw(this.data, this.options);
  }

  createBarChart(element: any): any {
    // return new google.visualization.BarChart(element);
    // return new google.charts.Bar(element);
    return new google.visualization.ColumnChart(element);
  }

  createDataTable(array: any[]): any {
    return google.visualization.arrayToDataTable(array);
  }

  updateChart(data: any[]) {
    console.log('updating chart');
    this.data = this.createDataTable(data);
    this.drawGraph();
  };

}
