import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {UIChart} from 'primeng/components/chart/chart';
import {AgeGraphClass} from '../categories';

@Component({
  selector: 'app-age-chart',
  templateUrl: './age-chart.component.html',
  styleUrls: ['./age-chart.component.css']
})
export class AgeChartComponent implements OnInit {
  @ViewChild('chart') chart: UIChart;
  @Input('title') title = 'Age Distribution';
  data: AgeGraphClass;
  options: any;
  colors: string[] = ['#243f86', '#92cdee', '#678197', '#F2D65C'];
  bgColors: string[] = ['#243f86', '#92cdee', '#678197', '#F2D65C'];

  constructor() {

  }

  ngOnInit() {
    this.options = {
      // responsive: true,
      // maintainAspectRatio: true,
      title: {
        display: true,
        text: this.title
      },
      legend: {
        position: 'bottom'
      },
      scales: {
        xAxes: [{
          stacked: true
        }],
        yAxes: [{
          stacked: true,
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };
  }

  updateChart(data) {
    this.data = this.updateColors(data);
    setTimeout(() => {
      this.chart.reinit();
    }, 500);
  }

  updateColors(data: AgeGraphClass) {
    data.datasets.forEach((d, i) => {
      d.borderColor = this.colors[i];
      d.backgroundColor = this.bgColors[i];
    });
    return data;
  }

}
