import ThermostatModeBandGenerator from "../plotting/ThermostatModeBandGenerator";
import TemperatureElement from "../data/TemperatureElement";
import TemperatureLinePlot from "../components/TemperatureLinePlot";
import ValueBand from "./ValueBand";
import ThermostatData from "../data/ThermostatData";
import ThermostatElement from "../data/ThermostatElement";

export default class HvacRateCalculator {
    public contructor() {

    }

    public calculateBands(data : ThermostatData) : ValueBand<number>[] {
        var valueBands = [];
        var bands = new ThermostatModeBandGenerator().generate(data, true);
        for (var iBand in bands) {
            var plotBand = bands[iBand];
            var beginUnix = plotBand.from;
            var endUnix = plotBand.to;
            var rate = this.calculateRate(data, beginUnix, endUnix);
            valueBands.push(new ValueBand(beginUnix, endUnix, rate));
        }
        return valueBands;
    }

    public calculateRate(data : ThermostatData, beginUnix : number, endUnix: number) : number {
        var iDataBegin = 0;
        var iDataEnd = 0;
        var beginFound = false;
        var elements : ThermostatElement[] = data.data;
        for (var i = 0; i < elements.length; i++) {
            var element : ThermostatElement = elements[i];
            var unix = element.date.unix()*1000 + TemperatureLinePlot.tzOffset;
            if (!beginFound && unix >= beginUnix) {
                iDataBegin = i;
                iDataEnd = i;
                beginFound = true;
            }
            if (unix > endUnix) {
                break;
            }
            iDataEnd = i;
        }
        console.log([iDataBegin, iDataEnd]);
        console.log(elements[iDataEnd].tempF, elements[iDataBegin].tempF);
        console.log(elements[iDataEnd].date.unix(), elements[iDataBegin].date.unix());
        var rate = (elements[iDataEnd].tempF - elements[iDataBegin].tempF)/(elements[iDataEnd].date.unix() - elements[iDataBegin].date.unix())*3600;
        console.log(rate);
        return rate;
    }
}