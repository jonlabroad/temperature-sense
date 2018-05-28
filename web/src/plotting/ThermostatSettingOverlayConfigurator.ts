import ThermostatData from "../data/ThermostatData";
import TemperatureLinePlot from "../components/TemperatureLinePlot";
import ThermostatElement from "../data/ThermostatElement";
import XYPlotDataGenerator from "./XYPlotDataGenerator";

export default class ThermostatSettingOverlayConfigurator
{
    public generate(data : ThermostatData) : Highcharts.SeriesOptions[]
    {
        var elements : ThermostatElement[] = data.data;
        var self = this;
        var highSeries : Highcharts.SeriesOptions = new XYPlotDataGenerator().generate("Thermostat Setting", elements, function(element : ThermostatElement) : [number, number] {
            var x = element.date.unix()*1000 + TemperatureLinePlot.tzOffset;
            var y = self.getHighValue(element);
            return [x, y];
        });

        var lowSeries : Highcharts.SeriesOptions = new XYPlotDataGenerator().generate("Thermostat Setting", elements, function(element : ThermostatElement) : [number, number] {
            var x = element.date.unix()*1000 + TemperatureLinePlot.tzOffset;
            var y = self.getLowValue(element);
            return [x, y];
        });

        highSeries.color = "#d9d9d9";
        highSeries.dashStyle = "Dash";
        highSeries.crisp = true;
        highSeries.showInLegend = false;

        lowSeries.color = "#d9d9d9";
        lowSeries.dashStyle = "Dash";
        lowSeries.crisp = true;
        lowSeries.showInLegend = false;

        //return [highSeries, lowSeries];
        return [highSeries]; // Omitting low series for now
    }

    private getHighValue(element : ThermostatElement) : number {
        switch(element.hvacMode) {
            case "eco":
                return element.ecoTempHighF;
            default:
                return element.targetTempF;
        }
    }

    private getLowValue(element : ThermostatElement) : number {
        switch(element.hvacMode) {
            case "eco":
                return element.ecoTempLowF;
            default:
                return element.targetTempF;
        }
    }    
}