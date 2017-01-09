import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import {IData} from "../../interfaces";


@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BarchartComponent implements OnInit, OnChanges {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private data: string;
  private margin: any = { top: 20, bottom: 20, left: 20, right: 20};
  private host;
  private chart: any;
  private width: number;
  private height: number;
  private svg;
  private g;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;
  public serverAddress: string = "http://localhost:8090";

  constructor() {
  }

  ngOnInit() {
    this.createChart();
  }

  ngOnChanges() {
    if (this.data && this.data.length > 0) {
      this.updateChart(this.data);
    } else if (this.data) {
      this.resetChart();
    } else {
      this.createChart();
    }
  }

  createChart() {
    this.svg = d3.select("svg");
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = +this.svg.attr("width") - margin.left - margin.right,
      height = +this.svg.attr("height") - margin.top - margin.bottom,
      g = this.svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    var x = d3.scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.05)
      .align(0.1);
    var y = d3.scaleLinear()
      .rangeRound([height, 0]);
    var z = d3.scaleOrdinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    d3.json(`${this.serverAddress}/api/filter?`,
      function (error, d) {
        var data = d['data'];
        if (error) throw error;
        var keys = d['columns'];
        data.sort(function (a, b) {
          return a['age'] - b['age']
        });
        console.warn(data);
        x.domain(data.map(function (d) {
          return d.age;
        }));
        y.domain([0, d3.max(data, function (d) {
          return d['total'] + (d['total'] * 0.1);
        })]).nice();

        z.domain(keys);
        g.append("g")
          .selectAll("g")
          .data(d3.stack().keys(keys)(data))
          .enter().append("g")
          .attr("fill", function (d): string {
            return <string> z(d.key);
          })
          .selectAll("rect")
          .data(function (d) {
            return <any> d;
          })
          .enter().append("rect")
          .attr("x", function (d) {
            return x(d['data']['age']);
          })
          .attr("y", function (d) {
            return y(d[1]);
          })
          .attr("height", function (d) {
            return y(d[0]) - y(d[1]);
          })
          .attr("width", x.bandwidth());
        g.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));
        g.append("g")
          .attr("class", "axis")
          .call(d3.axisLeft(y).ticks(null, "s"))
          .append("text")
          .attr("x", 2)
          .attr("y", y(y.ticks().pop()) + 0.5)
          .attr("dy", "0.32em")
          .attr("fill", "#000")
          .attr("font-weight", "bold")
          .attr("text-anchor", "start")
          .text("Population");
        var legend = g.append("g")
          .attr("font-family", "sans-serif")
          .attr("font-size", 10)
          .attr("text-anchor", "end")
          .selectAll("g")
          .data(keys.slice().reverse())
          .enter().append("g")
          .attr("transform", function (d, i) {
            return "translate(0," + i * 20 + ")";
          });
        legend.append("rect")
          .attr("x", width - 19)
          .attr("width", 19)
          .attr("height", 19)
          .attr("fill", <any> z);
        legend.append("text")
          .attr("x", width - 24)
          .attr("y", 9.5)
          .attr("dy", "0.32em")
          .text(d => <string> d)
        ;
      })
  }

  resetChart() {
    // remove existing bars
    this.svg.selectAll("*").remove();
    // d3.select("g.parent").selectAll("*").remove();
    // let update = this.svg.selectAll('g').remove();
    // update = this.svg.selectAll('rect').remove();

    this.svg = d3.select("svg");
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = +this.svg.attr("width") - margin.left - margin.right,
      height = +this.svg.attr("height") - margin.top - margin.bottom,
      g = this.svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var x = d3.scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.05)
      .align(0.1);
    var y = d3.scaleLinear()
      .rangeRound([height, 0]);
    var z = d3.scaleOrdinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    d3.json(`${this.serverAddress}/api/filter`,
      function (error, d) {
        var data = d['data'];
        if (error) throw error;
        var keys = d['columns'];
        data.sort(function (a, b) {
          return a['age'] - b['age']
        });
        console.warn(data);
        x.domain(data.map(function (d) {
          return d.age;
        }));
        y.domain([0, d3.max(data, function (d) {
          return d['total'] + (d['total'] * 0.1);
        })]).nice();

        z.domain(keys);
        g.append("g")
          .selectAll("g")
          .data(d3.stack().keys(keys)(data))
          .enter().append("g")
          .attr("fill", function (d): string {
            return <string> z(d.key);
          })
          .selectAll("rect")
          .data(function (d) {
            return <any> d;
          })
          .enter().append("rect")
          .attr("x", function (d) {
            return x(d['data']['age']);
          })
          .attr("y", function (d) {
            return y(d[1]);
          })
          .attr("height", function (d) {
            return y(d[0]) - y(d[1]);
          })
          .attr("width", x.bandwidth());
        g.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));
        g.append("g")
          .attr("class", "axis")
          .call(d3.axisLeft(y).ticks(null, "s"))
          .append("text")
          .attr("x", 2)
          .attr("y", y(y.ticks().pop()) + 0.5)
          .attr("dy", "0.32em")
          .attr("fill", "#000")
          .attr("font-weight", "bold")
          .attr("text-anchor", "start")
          .text("Population");
        var legend = g.append("g")
          .attr("font-family", "sans-serif")
          .attr("font-size", 10)
          .attr("text-anchor", "end")
          .selectAll("g")
          .data(keys.slice().reverse())
          .enter().append("g")
          .attr("transform", function (d, i) {
            return "translate(0," + i * 20 + ")";
          });
        legend.append("rect")
          .attr("x", width - 19)
          .attr("width", 19)
          .attr("height", 19)
          .attr("fill", <any> z);
        legend.append("text")
          .attr("x", width - 24)
          .attr("y", 9.5)
          .attr("dy", "0.32em")
          .text(d => <string> d)
        ;
      })
  }

  updateChart(querystring) {

    this.svg.selectAll("*").remove();
    // remove existing bars
    // d3.select("g.parent").selectAll("*").remove();
    // let update = this.svg.selectAll('g')
    //   .data(this.data);
    // update.exit().remove();
    // update = this.svg.selectAll('rect')
    //   .data(this.data);
    // update.exit().remove();

    this.svg = d3.select("svg");
      var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = +this.svg.attr("width") - margin.left - margin.right,
      height = +this.svg.attr("height") - margin.top - margin.bottom,
      g = this.svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var x = d3.scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.05)
      .align(0.1);
    var y = d3.scaleLinear()
      .rangeRound([height, 0]);
    var z = d3.scaleOrdinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    d3.json(`${this.serverAddress}/api/filter?${querystring}`,
      function (error, d) {
        var data = d['data'];
        if (error) throw error;
        var keys = d['columns'];
        data.sort(function (a, b) {
          return a['age'] - b['age']
        });
        console.warn(data);
        x.domain(data.map(function (d) {
          return d.age;
        }));
        y.domain([0, d3.max(data, function (d) {
          return d['total'] + (d['total'] * 0.1);
        })]).nice();

        z.domain(keys);
        g.append("g")
          .selectAll("g")
          .data(d3.stack().keys(keys)(data))
          .enter().append("g")
          .attr("fill", function (d): string {
            return <string> z(d.key);
          })
          .selectAll("rect")
          .data(function (d) {
            return <any> d;
          })
          .enter().append("rect")
          .attr("x", function (d) {
            return x(d['data']['age']);
          })
          .attr("y", function (d) {
            return y(d[1]);
          })
          .attr("height", function (d) {
            return y(d[0]) - y(d[1]);
          })
          .attr("width", x.bandwidth());
        g.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));
        g.append("g")
          .attr("class", "axis")
          .call(d3.axisLeft(y).ticks(null, "s"))
          .append("text")
          .attr("x", 2)
          .attr("y", y(y.ticks().pop()) + 0.5)
          .attr("dy", "0.32em")
          .attr("fill", "#000")
          .attr("font-weight", "bold")
          .attr("text-anchor", "start")
          .text("Population");
        var legend = g.append("g")
          .attr("font-family", "sans-serif")
          .attr("font-size", 10)
          .attr("text-anchor", "end")
          .selectAll("g")
          .data(keys.slice().reverse())
          .enter().append("g")
          .attr("transform", function (d, i) {
            return "translate(0," + i * 20 + ")";
          });
        legend.append("rect")
          .attr("x", width - 19)
          .attr("width", 19)
          .attr("height", 19)
          .attr("fill", <any> z);
        legend.append("text")
          .attr("x", width - 24)
          .attr("y", 9.5)
          .attr("dy", "0.32em")
          .text(d => <string> d)
        ;
      })
  }

  // createChart2() {
  //   let element = this.chartContainer.nativeElement;
  //   this.host = d3.select(element);
  //   this.width = element.offsetWidth - this.margin.left - this.margin.right;
  //   this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
  //   let svg = d3.select(element).append('svg')
  //     .attr('width', element.offsetWidth)
  //     .attr('height', element.offsetHeight);
  //
  //   // chart plot area
  //   this.chart = svg.append('g')
  //     .attr('class', 'bars')
  //     .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
  //
  //   // define X & Y domains
  //   let xDomain = this.data.data.map(d => d[0]);
  //   let yDomain = [0, d3.max(this.data.data, d => d[1])];
  //
  //   // create scales
  //   this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
  //   this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);
  //
  //   // bar colors
  //   this.colors = d3.scaleLinear().domain([0, this.data.data.length]).range(<any[]>['red', 'blue']);
  //
  //   // x & y axis
  //   this.xAxis = svg.append('g')
  //     .attr('class', 'axis axis-x')
  //     .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
  //     .call(d3.axisBottom(this.xScale));
  //   this.yAxis = svg.append('g')
  //     .attr('class', 'axis axis-y')
  //     .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
  //     .call(d3.axisLeft(this.yScale));
  // }

  // updateChart() {
  //   // update scales & axis
  //   this.xScale.domain(this.data.data.map(d => d.column));
  //   this.yScale.domain([0, d3.max(this.data.data, d => d.value1)]);
  //
  //   this.colors.domain([0, this.data.data.length]);
  //   this.xAxis.transition().call(d3.axisBottom(this.xScale));
  //   this.yAxis.transition().call(d3.axisLeft(this.yScale));
  //
  //   let update = this.chart.selectAll('.bar')
  //     .data(this.data.data);
  //
  //   // remove exiting bars
  //   update.exit().remove();
  //
  //   // update existing bars
  //   this.chart.selectAll('.bar').transition()
  //     .attr('x', d => this.xScale(d.column))
  //     .attr('y', d => this.yScale(d.value1))
  //     .attr('width', d => this.xScale.bandwidth())
  //     .attr('height', d => this.height - this.yScale(d.value1))
  //     .style('fill', (d, i) => this.colors(i));
  //
  //   // add new bars
  //   update
  //     .enter()
  //     .append('rect')
  //     .attr('class', 'bar')
  //     .attr('x', d => this.xScale(d.value1))
  //     .attr('y', d => this.yScale(0))
  //     .attr('width', this.xScale.bandwidth())
  //     .attr('height', 0)
  //     .style('fill', (d, i) => this.colors(i))
  //     .transition()
  //     .delay((d, i) => i * 10)
  //     .attr('y', d => this.yScale(d.value1))
  //     .attr('height', d => this.height - this.yScale(d.value1));
  // }
}
