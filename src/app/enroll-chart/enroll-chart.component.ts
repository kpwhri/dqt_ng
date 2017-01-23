import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {UIChart} from "primeng/components/chart/chart";
import {EnrollGraphClass} from "../categories";

@Component({
  selector: 'app-enroll-chart',
  templateUrl: './enroll-chart.component.html',
  styleUrls: ['./enroll-chart.component.css']
})
export class EnrollChartComponent implements OnInit {
  @ViewChild('chart') chart: UIChart;
  @Input() data: EnrollGraphClass;
  bgColors: string[] = ['#5f4449', '#435d58', '#07182a', '#918037'];
  hoverColors: string[] = ['#8c646b', '#709c94', '#18528C', '#F2D65C'];

  constructor() { }

  ngOnInit() {
  }

  updateChart(data: EnrollGraphClass) {
    console.warn(data);
    this.data = this.updateColors(data);
    setTimeout(() => {
      this.chart.refresh();
    }, 500);
  }

  updateColors(data: EnrollGraphClass) {
    for (var i in data.labels) {

      if (i == '0') {
        data.datasets[0].hoverBackgroundColor = [this.hoverColors[i]];
        data.datasets[0].backgroundColor = [this.bgColors[i]];
      } else {
        data.datasets[0].hoverBackgroundColor.push(this.hoverColors[i]);
        data.datasets[0].backgroundColor.push(this.bgColors[i]);
      }

    }
    return data;
  }

}
