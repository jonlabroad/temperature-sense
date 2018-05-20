import * as React from "react";
import * as ReactDOM from "react-dom";

import * as d3 from "d3"
import TemperatureDBReader from "../temperature/TemperatureDBReader"
import TemperatureData from "../data/TemperatureData"
import TemperatureElement from "../data/TemperatureElement"
import * as Moment from "moment-timezone"
import ColorPicker from "../plotting/ColorPicker"

export interface BasicLinePlotProps {
    height : number;
    width : number;
    calendarDate : string
}

export default class BasicLinePlot extends React.Component<BasicLinePlotProps, null> {
    private reader : TemperatureDBReader;
    
    constructor(props : any) {
        super(props);
        this.reader = new TemperatureDBReader();
    }

    private readData(calendarDate : string) {
        var self = this;
        this.reader.readToday(
            function(err: AWS.AWSError, data: TemperatureData) {
                self.renderPlot(data);
        });
    }

    componentDidMount() {
        this.readData(this.props.calendarDate);
    }

    renderPlot(data : TemperatureData) {
        var colorPicker : ColorPicker = new ColorPicker();
        var svg = d3.select("svg");
        var margin = {top: 20, right: 20, bottom: 30, left: 50};
        var width = +svg.attr("width") - margin.left - margin.right;
        var height = +svg.attr("height") - margin.top - margin.bottom;
        var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scaleTime()
                .rangeRound([0, width]);
        var y = d3.scaleLinear()
                .rangeRound([height, 0]);

        //y.domain(d3.extent(thisData as Array<TemperatureElement>,
        //                   function(d) { return d.tempF}));

        x.domain(this.calculateXLimits(data));
        y.domain([55, 90]);

        for (var key in data.data)
        {
            var thisData : TemperatureElement[] = data.data[key] as TemperatureElement[];
            var line : d3.Line<TemperatureElement> = d3.line<TemperatureElement>()
                    .x(function(d: any) : number { return x(d.date) })
                    .y(function(d: any) : number { return y(d.tempF) });

            g.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x))
                .select(".domain")
                    .remove();

            g.append("g")
                    .call(d3.axisLeft(y))
                .append("text")
                    .attr("fill", "#000")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", "0.71em")
                    .attr("text-anchor", "end")
                    .text("Temperature (F)");
            
            g.append("path")
                    .datum(thisData)
                    .attr("fill", "none")
                    .attr("stroke", colorPicker.pick())
                    .attr("stroke-linejoin", "round")
                    .attr("stroke-linecap", "round")
                    .attr("stroke-width", 1.5)
                    .attr("d", line);
        }
    }

    private calculateXLimits(data : TemperatureData) : Moment.Moment[] {
        var minDate : Moment.Moment = null;
        var maxDate : Moment.Moment = null;
        for (var key in data.data) {
            var thisData : TemperatureElement[] = data.data[key] as TemperatureElement[];
            var myMinX = thisData[0].date;
            var myMaxX = thisData[thisData.length-1].date;
            if (minDate == null || myMinX < minDate) {
                minDate = myMinX;
            }
            if (maxDate == null || myMaxX > maxDate) {
                maxDate = myMaxX;
            }            
        }
        console.log([minDate, maxDate]);
        return [minDate, maxDate];
    }

    render() {
        return (
            <div>
              <svg className="container" width={this.props.width} height={this.props.height}>
              </svg>
            </div>
        );
    }
}