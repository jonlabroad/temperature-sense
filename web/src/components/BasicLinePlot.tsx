import * as React from "react";
import * as ReactDOM from "react-dom";

import * as d3 from "d3"
import TemperatureDBReader from "../temperature/TemperatureDBReader"
import ThermostatSettingDBReader from "../temperature/ThermostatSettingDBReader"
import TemperatureData from "../data/TemperatureData"
import TemperatureElement from "../data/TemperatureElement"
import * as Moment from "moment-timezone"
import ColorPicker from "../plotting/ColorPicker"
import * as Highcharts from "highcharts"
import ThermostatData from "../data/ThermostatData";
import DateUtil from "../DateUtil"

export interface BasicLinePlotProps {
    height : number;
    width : number;
    calendarDate : string;
    temperatureData : TemperatureData;
    thermostatData : ThermostatData;
}

export default class BasicLinePlot extends React.Component<BasicLinePlotProps, null> {
    private chart : Highcharts.ChartObject;

    private lastCalendarDateRead = "";

    constructor(props : any) {
        super(props);
    }

    componentDidUpdate() {
        this.renderPlot();
    }

    renderPlot() {
        var colorPicker : ColorPicker = new ColorPicker();
        var data = this.props.temperatureData;

        var chartDef : Highcharts.Options = {
            title: {
                text: "Home Temperature"
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Temp F'
                }
            },
            plotOptions: {
                line: {
                    marker: {
                        enabled: false
                    }
                }
            }
        }

        if (data != null) {
            chartDef.series = [];
            for (var key in data.data) {
                var newSeries : any = {
                    name: `${key}`,
                    data: [],
                };
                var elements : TemperatureElement[] = data.data[key] as TemperatureElement[];
                for (var i in elements) {
                    //var plotDate = DateUtil.getDate(elements[i].calendarDate.toString(), elements[i].hourMin.toString());
                    var plotDate = DateUtil.getMoment(elements[i].calendarDate.toString(), elements[i].hourMin.toString());
                    newSeries.data.push([plotDate.unix()*1000 + Moment.tz("America/New_York").utcOffset()*60*1000, elements[i].tempF]);
                }
                chartDef.series.push(newSeries);
            }
        }
        this.chart = Highcharts.chart('container', chartDef);
        this.renderThermoSetting(this.props.thermostatData);
    }

    private renderThermoSetting(data : ThermostatData) {
        if (data == null) {
            return;
        }
        
        var off = "off";
        var inBand = false;
        var currentMode = off;
        var beginX;
        var endX;
        var bands : Highcharts.PlotBands[] = [];
        for (var i in data.data) {
            if (data.data[i].hvacState != undefined) {
                if (data.data[i].hvacState != currentMode) {
                    if (inBand) {
                        endX = data.data[i].date;
                        bands.push({
                            from: beginX.unix()*1000 + Moment.tz("America/New_York").utcOffset()*60*1000,
                            to: endX.unix()*1000 + Moment.tz("America/New_York").utcOffset()*60*1000,
                            color: this.getBandColor(currentMode)
                        });
                        inBand = false;
                    }
                    else {
                        beginX = data.data[i].date;
                        inBand = data.data[i].hvacState != off;
                    }
                    currentMode = data.data[i].hvacState;
                }
            }
        }
        if (inBand) {
            bands.push({
                from: beginX.unix()*1000 + Moment.tz("America/New_York").utcOffset()*60*1000,
                to: data.data[data.data.length - 1].date.unix()*1000 + Moment.tz("America/New_York").utcOffset()*60*1000,
                color: this.getBandColor(currentMode)              
            });
        }

        var newOptions : Highcharts.Options = {
            xAxis: {
                plotBands: bands,
            }   
        }
        this.chart.update(newOptions);
    }

    private getBandColor(hvacState : string) : string {
        if (hvacState == 'cooling') {
            return '#EBF5FF';
        }
        if (hvacState == 'heating') {
            return '#FFEBEB';
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
        return [minDate, maxDate];
    }

    private getBands(data : ThermostatData) {

    }

    render() {
        return (
            <div>
              <div id="container"></div>
            </div>
        );
    }
}