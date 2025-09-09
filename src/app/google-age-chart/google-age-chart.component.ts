import {AfterViewInit, Component, ElementRef, Injectable, Input, OnInit, ViewChild} from '@angular/core';

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
  standalone: false
})
export class GoogleAgeChartComponent implements OnInit, AfterViewInit {

  @Input('title') title;
  @ViewChild('container', {static: false}) containerRef!: ElementRef<HTMLElement>;
  elementId: string;
  id: number;
  data: any[];
  options: any;
  chart: any;
  private lastGoogle: any | null = null;
  private viewReady = false;

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

  ngAfterViewInit() {
    this.viewReady = true;
    if (this.lastGoogle && this.data) {
      this.drawGraph(this.lastGoogle);
    }
  }

  drawGraph(google: any) {
    // Prefer the ViewChild; fall back to id lookup if needed
    const el = this.containerRef?.nativeElement ?? document.getElementById(this.elementId);
    if (el) {
      this.chart = this.createBarChart(google, el);
      this.chart.draw(this.data, this.options);
      this.lastGoogle = null;
    } else {
      // Element not in the DOM yet (e.g., collapsed accordion/lazy content).
      // Defer once to the next tick; caller can trigger again on visibility change.
      setTimeout(() => {
        const retryEl = this.containerRef?.nativeElement ?? document.getElementById(this.elementId);
        if (!retryEl) {
          return;
        }
        this.chart = this.createBarChart(google, retryEl);
        this.chart.draw(this.data, this.options);
        this.lastGoogle = null;
      });
      return;
    }
  }

  createBarChart(google: any, element: any): any {
    return new google.visualization.ColumnChart(element);
  }

  createDataTable(google: any, array: any[]): any {
    return google.visualization.arrayToDataTable(array);
  }

  updateChart(google: any, data: any[]) {
    if (! this.viewReady) {
      this.lastGoogle = google;
    }
    this.data = this.createDataTable(google, data);
    this.drawGraph(google);
  };

}
