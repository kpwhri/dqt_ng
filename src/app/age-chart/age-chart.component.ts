import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {UIChart} from "primeng/components/chart/chart";

@Component({
  selector: 'app-age-chart',
  templateUrl: './age-chart.component.html',
  styleUrls: ['./age-chart.component.css']
})
export class AgeChartComponent implements OnInit {
  @ViewChild('chart') chart: UIChart;
  @Input() data: any;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    // console.warn('Updating chart');
    // if (this.data) {
    //   console.warn('Updating chart');
    //   this.updateChart(null);
    // }
  }

  updateChart(data) {
    this.data = data;
    setTimeout(() => {
      this.chart.refresh();
    }, 500);
  }

}
