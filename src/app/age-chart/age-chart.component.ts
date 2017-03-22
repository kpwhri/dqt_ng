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
  @Input() data: AgeGraphClass;
  options: any;
  colors: string[] = ['#243f86', '#92cdee', '#678197', '#F2D65C'];
  bgColors: string[] = ['#243f86', '#92cdee', '#678197', '#F2D65C'];

  constructor() {
    this.options = {
      title: {
        display: true,
        text: 'Age Distribution'
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

  ngOnInit() {
  }

  updateChart(data) {
    this.data = this.updateColors(data);
    setTimeout(() => {
      this.chart.refresh();
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
