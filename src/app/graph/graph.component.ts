import {Component, ElementRef, Input} from '@angular/core';
import * as d3 from ".../../custom-d3";
import * as moment from "moment";
// var d3 = require("d3");


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent {

  @Input() config: Array<GraphComponentConfig>;

  private host;        // D3 object referebcing host dom object
  private svg;         // SVG in which we will print our chart
  private margin;      // Space between the svg borders and the actual chart graphic
  private width;       // Component width
  private height;      // Component height
  private xScale;      // D3 scale in X
  private yScale;      // D3 scale in Y
  private xAxis;       // D3 X Axis
  private yAxis;       // D3 Y Axis
  private htmlElement; // Host HTMLElement

  /* Constructor, needed to get @Injectables */
  constructor(private element: ElementRef) {
    this.htmlElement = this.element.nativeElement;
    this.host = d3.select(this.element.nativeElement);
  }

  /* Will Update on every @Input change */
  ngOnChanges(): void {
    if (!this.config || this.config.length === 0) return;
    this.setup();
    this.buildSVG();
    this.populate();
    this.drawXAxis();
    this.drawYAxis();
  }

  /* Will setup the chart container */
  private setup(): void {
    this.margin = { top: 20, right: 20, bottom: 40, left: 40 };
    this.width = this.htmlElement.clientWidth - this.margin.left - this.margin.right;
    this.height = this.width * 0.5 - this.margin.top - this.margin.bottom;
    this.xScale = d3.scaleTime().range([0, this.width]);
    this.yScale = d3.scaleLinear().range([this.height, 0]);
  }

  /* Will build the SVG Element */
  private buildSVG(): void {
    this.host.html('');
    this.svg = this.host.append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  /* Will draw the X Axis */
  private drawXAxis(): void {
    this.xAxis = d3.axisBottom(this.xScale)
      .tickFormat(t => moment(t).format('MMM').toUpperCase())
      .tickPadding(15);
    this.svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(this.xAxis);
  }

  /* Will draw the Y Axis */
  private drawYAxis(): void {
    this.yAxis = d3.axisLeft(this.yScale)
      .tickPadding(10);
    this.svg.append('g')
      .attr('class', 'y axis')
      .call(this.yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)');
  }

  /* Will get the Maximum value in Y */
  private getMaxY(): number {
    let maxValuesOfAreas = [];
    this.config.forEach(data => maxValuesOfAreas.push(Math.max.apply(Math, data.dataset.map(d => d.y))));
    return Math.max(...maxValuesOfAreas);
  }

  /* Will populate datasets into areas*/
  private populate(): void {
    this.config.forEach((area: any) => {
      this.xScale.domain(d3.extent(area.dataset, (d: any) => d.x));
      this.yScale.domain([0, this.getMaxY()]);
      this.svg.append('path')
        .datum(area.dataset)
        .attr('class', 'area')
        .style('fill', area.settings.fill)
        .attr('d', d3.area()
          .x((d: any) => this.xScale(d.x))
          .y0(this.height)
          .y1((d: any) => this.yScale(d.y))
          .curve(area.settings.interpolation));
    });
  }
}


export class GraphComponentConfig {
  settings: {fill: string, interpolation: string};
  dataset: Array<{x: string, y: number}>
}
