import * as React from "react";
import * as ReactDOM from "react-dom";

import * as d3 from "d3"
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
import WeatherElement from "../data/WeatherElement";
import WeatherData from "../data/WeatherData";

export interface WeatherPlotProps {
    id : string;
    height : number;
    width : number;
    calendarDate : string;
    weatherData : WeatherData;
}

export default class WeatherPlot extends React.Component<WeatherPlotProps, null> {
    private chart : Highcharts.ChartObject;
    public static tzOffset : number = Moment.tz(Config.timezone).utcOffset()*60*1000;
    private lastCalendarDateRead = "";

    constructor(props : any) {
        super(props);
    }

    componentDidUpdate() {
        this.renderPlot();
    }

    private createDataPoint(element : WeatherElement) : [number, number] {
        if (element != null)
        {
            var plotDate = DateUtil.getMoment(element.calendarDate.toString(), element.hourMin.toString());
            var pt : [number, number] = [plotDate.unix()*1000 + WeatherPlot.tzOffset, element.tempF];
            return pt;
        }
        return null;
    }

    renderTemperatureSeries(data : WeatherData)
    {
        var chartDef = new BaseLinePlotConfigurator().configure("Outdoor Temperature", "Time", "Temp (F)");
        if (data != null) {
            chartDef.series = [];
            var newSeries = new XYPlotDataGenerator().generate("Temperature", data.data, this.createDataPoint.bind(this));
            chartDef.series.push(newSeries);
        }
        this.chart = Highcharts.chart(this.props.id, chartDef);
    }

    renderPlot() {
        this.renderTemperatureSeries(this.props.weatherData);
    }

    render() {
        return (
            <div>
              <div id={this.props.id}></div>
            </div>
        );
    }
}