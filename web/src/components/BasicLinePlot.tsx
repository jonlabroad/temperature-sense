import * as React from "react";
import * as ReactDOM from "react-dom";

import * as d3 from "d3"
import TemperatureDBReader from "../temperature/TemperatureDBReader"
import TemperatureData from "../data/TemperatureData"
import TemperatureElement from "../data/TemperatureElement"
import * as Moment from "moment-timezone"
import ColorPicker from "../plotting/ColorPicker"
import * as Highcharts from "highcharts"

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

        var chartDef : Highcharts.Options = {
            title: {
                text: "Home Temperature"
            },
            yAxis: {
                title: {
                    text: 'Temp F'
                }
            },
            plotOptions: {
                line: {
                    marker: {
                        enabled: true
                    }
                }
            }
        }

        chartDef.series = [];
        for (var key in data.data) {
            var newSeries : any = {
                name: `${key}`,
                data: []
            };
            var elements : TemperatureElement[] = data.data[key] as TemperatureElement[];
            for (var i in elements) {
                newSeries.data.push([elements[i].date, elements[i].tempF]);
            }
            chartDef.series.push(newSeries);
        }
        console.log(chartDef);
        Highcharts.chart('container', chartDef);
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
              <div id="container"></div>
            </div>
        );
    }
}