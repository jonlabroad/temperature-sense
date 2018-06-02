import TemperatureLinePlot from "../components/TemperatureLinePlot";
import HvacRateCalculator from "../analysis/HvacRateCalculator";
import ThermostatData from "../data/ThermostatData";

export default class ThermostatModeBandGenerator
{
    public generate(data : ThermostatData, includeOff : boolean, showRate : boolean = true) : Highcharts.PlotBands[]
    {
        var off = "off";
        var inBand = false;
        var currentMode = "";
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
                        inBand = includeOff;
                        if (inBand) {
                            beginX = data.data[i].date;
                        }
                    }
                    else {
                        beginX = data.data[i].date;
                        inBand = includeOff || data.data[i].hvacState != off;
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

        var rateCalculator = new HvacRateCalculator();
        for (var i in bands) {
            var rate = rateCalculator.calculateRate(data, bands[i].from, bands[i].to);
            if (Math.abs(rate) >= 0.1)
            {
                bands[i].label = {
                    text: `${this.getBandText(rate, showRate)}`,
                    align: "center",
                    style: {
                        fontSize: "8px",
                        color: rate > 0 ? "#E52110" : "#0A65CE"
                    }
                }
            }
        }

        return bands;
    }

    private getBandText(rate : number, show : boolean) {
        return show ? `${rate.toFixed(1)}` : "";
    }

    private getBandColor(hvacState : string) : string {
        if (hvacState == 'cooling') {
            return '#EBF5FF';
        }
        if (hvacState == 'heating') {
            return '#FFEBEB';
        }
        else {
            return "#FFFFFF";
        }
    }
}