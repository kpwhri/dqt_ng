import {Directive, ElementRef, HostListener, Renderer} from '@angular/core';
import * as D3 from 'd3';

@Directive({
  selector: 'bar-graph'
})

export class BarGraphDirective {

  // private data:Array<number>;  // raw chart data
  private htmlElement:HTMLElement;

  constructor(private elementRef:ElementRef, private renderer: Renderer) {
    this.htmlElement = this.elementRef.nativeElement;  // reference to <bar-graph> element from the main template
    console.log(this.htmlElement);
    console.log(D3);

    let d3:any = D3;

    var data = [{
      "date": "2016-10-01",
      "sales": 110,
      "searches": 67
    }, {
      "date": "2016-10-02",
      "sales": 114,
      "searches": 61
    }, {
      "date": "2016-10-03",
      "sales": 110,
      "searches": 50
    }, {
      "date": "2016-10-04",
      "sales": 132,
      "searches": 22
    }];

    // set the dimensions and margins of the graph
    var margin = {
        top: 20,
        right: 80,
        bottom: 30,
        left: 50
      },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // parse the date / time
    var parseDate = d3.timeParse("%Y-%m-%d");
    var formatTime = d3.timeFormat("%e %B");

    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
    var sales = function (d) {
      return d["sales"];
    }
    var searches = function (d) {
      return d.searches;
    }

    // define the line
    var line = d3.line()
      .x(function (d) {
        return x(d.date);
      })
      .y(function (d) {
        return y(d.sales);
      });

    var svg = d3.select(this.htmlElement).append("svg")
      .attr("class", "bar-graph")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var tooltip = d3.select("body").append("div")
      .style("opacity", 0);

    // format the data
    data.forEach(function (d) {
      d.date = parseDate(d.date);
    });

    x.domain(d3.extent(data, function (d) {
      return d.date;
    }));

    y.domain([0, d3.max(data, function (d) {
      return d.sales > d.searches ? d.sales : d.searches;
    })]);

    // Add the line path.
    svg.append("path")
      .attr("class", "line")
      .style("fill", "none")
      .attr("d", line(data))
      .style("stroke", "orange")
      .style("stroke-width", "2px");

    // change line to look at searches
    line.y(function (d) {
      return y(d.searches);
    });

    // Add the second line path.
    svg.append("path")
      .attr("class", "line")
      .style("fill", "none")
      .attr("d", line(data))
      .style("stroke", "steelblue")
      .style("stroke-width", "2px");

    // Add sales to the scatterplot
    svg.selectAll(".sales-circle")
      .data(data)
      .enter().append("circle")
      .attr('class', 'sales-circle')
      .attr("r", 4)
      .attr("cx", function (d) {
        return x(d.date);
      })
      .attr("cy", function (d) {
        return y(d.sales);
      })
      .style("fill", "orange");

    // Add searches to the scatterplot
    svg.selectAll(".searches-circle")
      .data(data)
      .enter().append("circle")
      .attr("r", 4)
      .attr('class', 'searches-circle')
      .attr("cx", function (d) {
        return x(d.date);
      })
      .attr("cy", function (d) {
        return y(d.searches);
      })
      .style("fill", "steelblue")
      .on("mouseover", function (d) {
        tooltip.transition()
          .duration(200)
          .style("opacity", .9);
        tooltip.html(formatTime(d["date"]) + "<br/> Searches: " + d["searches"])
          .style("left", (d3.event.pageX + 5) + "px")
          .style("top", (d3.event.pageY - 28) + "px")
          .classed("tooltip", true);
      })
      .on("mouseout", function (d) {
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      });

    // draw legend
    var legend = svg.selectAll(".legend")
      .data(color.domain())
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function (d, i) {
        return "translate(0," + i * 20 + ")";
      });

    // draw legend colored rectangles
    legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

    // draw legend text
    legend.append("text")
      .style("font", "14px open-sans")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function (d) {
        return d;
      });

    // Add the X Axis
    svg.append("g")
      .style("font", "14px open-sans")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%d/%m")));

    // Add the Y Axis
    svg.append("g")
      .style("font", "14px open-sans")
      .call(d3.axisLeft(y));

    // Add Axis labels
    svg.append("text")
      .style("font", "14px open-sans")
      .attr("text-anchor", "middle")
      .attr("transform", "translate(" + (-margin.left / 2) + "," + (height / 2) + ")rotate(-90)")
      .text("Sales / Searches");

    svg.append("text")
      .style("font", "14px open-sans")
      .attr("text-anchor", "middle")
      .attr("transform", "translate(" + (width / 2) + "," + (height + (margin.bottom)) + ")")
      .text("Date");
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('yellow');
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }
  private highlight(color: string) {
    let d3:any = D3;
    this.renderer.setElementStyle(d3.select('tooltip'), 'backgroundColor', color);
  }
}
