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
import BaseLinePlotConfigurator from "../plotting/BaseLinePlotConfigurator";
import XYPlotDataGenerator from "../plotting/XYPlotDataGenerator";
import Config from "../Config";
import ThermostatModeBandGenerator from "../plotting/ThermostatModeBandGenerator";
import SeriesLabeler from "../plotting/SeriesLabeler";

export interface BasicLinePlotProps {
    height : number;
    width : number;
    calendarDate : string;
    temperatureData : TemperatureData;
    thermostatData : ThermostatData;
}

export default class TemperatureLinePlot extends React.Component<BasicLinePlotProps, null> {
    private chart : Highcharts.ChartObject;
    public static tzOffset : number = Moment.tz(Config.timezone).utcOffset()*60*1000;
    private lastCalendarDateRead = "";

    constructor(props : any) {
        super(props);
    }

    componentDidUpdate() {
        this.renderPlot();
    }

    private createDataPoint(element :TemperatureElement) : [number, number] {
        var plotDate = DateUtil.getMoment(element.calendarDate.toString(), element.hourMin.toString());
        var pt : [number, number] = [plotDate.unix()*1000 + TemperatureLinePlot.tzOffset, element.tempF];
        return pt;
    }

    renderTemperatureSeries(data : TemperatureData)
    {
        var chartDef = new BaseLinePlotConfigurator().configure("Home Temperature", "Time", "Temp (F)");
        if (data != null) {
            chartDef.series = [];
            for (var key in data.data) {
                var newSeries = new XYPlotDataGenerator().generate(SeriesLabeler.getLabel(key), data.data[key], this.createDataPoint.bind(this));
                chartDef.series.push(newSeries);
            }
        }
        this.chart = Highcharts.chart('container', chartDef);
    }

    private renderThermoSetting(data : ThermostatData) {
        if (data == null) {
            return;
        }
        var newOptions : Highcharts.Options = {
            xAxis: {
                plotBands: new ThermostatModeBandGenerator().generate(data),
            }   
        }
        this.chart.update(newOptions);
    }

    renderPlot() {
        this.renderTemperatureSeries(this.props.temperatureData);
        this.renderThermoSetting(this.props.thermostatData);
    }

    render() {
        return (
            <div>
              <div id="container"></div>
            </div>
        );
    }
}