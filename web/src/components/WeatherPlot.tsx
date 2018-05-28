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
import WeatherSymbolProvider from "../WeatherSymbolProvider";
import TemperatureLinePlot from "./TemperatureLinePlot";

export interface WeatherPlotProps {
    id : string;
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
            var pt : [number, number] = [element.date.unix()*1000 + WeatherPlot.tzOffset, element.tempF];
            return pt;
        }
        return null;
    }

    private renderIcons(chart : Highcharts.ChartObject) {
        if (chart.series[0])
        {
            var lastPtHourMin : number = -100;
            for (var i in chart.series[0].data) {
                var weatherElement = this.props.weatherData.data[i];
                if (weatherElement.hourMin - lastPtHourMin > 100)
                {
                    var icon = weatherElement.icon;
                    var iconUrl = WeatherSymbolProvider.getSymbolUrl(icon);
                    chart.renderer
                        .image(iconUrl, chart.xAxis[0].toPixels(chart.series[0].data[i].x), 30, 50, 50)
                        .add();
                    lastPtHourMin = weatherElement.hourMin;
                }
            }
        }
    }

    renderTemperatureSeries(data : WeatherData)
    {
        var chartDef = new BaseLinePlotConfigurator().configure("Outdoor Temperature", "Time", "Temp (F)");
        if (data != null) {
            chartDef.series = [];
            var newSeries = new XYPlotDataGenerator().generate("Temperature", data.data, this.createDataPoint.bind(this));
            chartDef.series.push(newSeries);
        }
        chartDef.legend = {
            enabled: false
        };
        this.chart = Highcharts.chart(this.props.id, chartDef, this.renderIcons.bind(this));
    }

    renderPlot() {
        this.renderTemperatureSeries(this.props.weatherData);
    }

    render() {
        return (
           <div id={this.props.id} className="weather-plot"></div>
        );
    }
}