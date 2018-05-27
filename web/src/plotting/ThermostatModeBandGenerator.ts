import TemperatureData from "../data/TemperatureData";
import TemperatureLinePlot from "../components/TemperatureLinePlot";

export default class ThermostatModeBandGenerator
{
    public generate(data : TemperatureData) : Highcharts.PlotBands[]
    {
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
                            from: beginX.unix()*1000 + TemperatureLinePlot.tzOffset,
                            to: endX.unix()*1000 + TemperatureLinePlot.tzOffset,
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
                from: beginX.unix()*1000 + TemperatureLinePlot.tzOffset,
                to: data.data[data.data.length - 1].date.unix()*1000 + TemperatureLinePlot.tzOffset,
                color: this.getBandColor(currentMode)              
            });
        }
        return bands;
    }

    private getBandColor(hvacState : string) : string {
        if (hvacState == 'cooling') {
            return '#EBF5FF';
        }
        if (hvacState == 'heating') {
            return '#FFEBEB';
        }
    }
}