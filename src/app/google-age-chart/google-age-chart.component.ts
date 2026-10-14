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
  private chartObserver?: IntersectionObserver;

  constructor(increment: IdIncrement) {
    this.id = increment.increment();
    this.elementId = 'chart_' + this.id;
  }

  ngOnInit() {
    this.options = {
      chartArea: {
        right: 100
      },
      vAxis: {
        viewWindow: {
          min: 0,
        },
        format: '0',
      },
      chart: {},
      title: this.title,
      legend: {
        position: 'right',  // otherwise legend overlaps
        maxLines: 2,
      },
      isStacked: true,
      height: 500,
      width: 500,
      colors: ['#243f86', '#92cdee', '#678197', '#F2D65C']
    };
  }

  ngAfterViewInit() {
    this.viewReady = true;
    if (this.lastGoogle && this.data) {
      this.drawGraph(this.lastGoogle, false);
    }
  }

  drawGraph(google: any, isAllZero: boolean) {
    const getElement = () =>
      this.containerRef?.nativeElement ??
      document.getElementById(this.elementId);

    const drawWhenVisible = (el: HTMLElement) => {
      this.chartObserver?.disconnect();

      this.chartObserver = new IntersectionObserver(([entry], observer) => {
        if (!entry.isIntersecting) {
          return;
        }

        observer.disconnect();

        requestAnimationFrame(() => {
          if (!el.isConnected) {
            return;
          }

          this.chart = this.createBarChart(google, el);
          this.chart.draw(this.data, this.getCurrentOptions(isAllZero));
          this.lastGoogle = null;
        });
      });

      this.chartObserver.observe(el);
    };

    const el = getElement();

    if (el) {
      drawWhenVisible(el);
    } else {
      setTimeout(() => {
        const retryEl = getElement();
        if (retryEl) {
          drawWhenVisible(retryEl);
        }
      });
    }
  }


  createBarChart(google: any, element: any): any {
    return new google.visualization.ColumnChart(element);
  }

  createDataTable(google: any, array: any[]): any {
    return google.visualization.arrayToDataTable(array);
  }

  updateChart(google: any, data: any[]) {
    if (!this.viewReady) {
      this.lastGoogle = google;
    }
    let isAllZero = this.allZero(data);
    this.data = this.createDataTable(google, data);
    this.drawGraph(google, isAllZero);
  };

  getCurrentOptions(isAllZero: boolean) {
    if (isAllZero) {
      let options = structuredClone(this.options);
      options.vAxis.viewWindow.max = 1;
      return options;
    }
    return this.options;
  }

  private allZero(data: any[]): boolean {
    return data
      .slice(1)
      .every(row => row.slice(1).every(value => value === 0));
  }
}
