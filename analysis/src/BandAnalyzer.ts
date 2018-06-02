import TempBand from "./data/TempBand";
import ThermostatData from "../../web/src/data/ThermostatData";
import TemperatureData from "../../web/src/data/TemperatureData";
import WeatherData from "../../web/src/data/WeatherData";
import TemperatureElement from "../../web/src/data/TemperatureElement";
import TempBandRate from "./data/TempBandRate";

export default class BandAnalyzer {
    private tempData: TemperatureData;
    private weatherData: WeatherData;
    private bands: TempBand[];

    public constructor(tempData: TemperatureData, weatherData: WeatherData, bands: TempBand[]) {
        this.bands = bands;
        this.tempData = tempData;
        this.weatherData = weatherData;
    }

    public calculateBandRate(id: string): TempBandRate[] {
        var roomData: TemperatureElement[] = this.tempData.data[id] as TemperatureElement[];
        var bandRates = new Array<TempBandRate>();
        for (var i in this.bands) {
            var bandExtent = this.getBandExtent(this.bands[i], roomData);

            // TODO filter any bands that look funky (windows open, spikey data (AC on and heat going up, etc) invalid)
            var rate = this.calculateRate(bandExtent, roomData);
            bandRates.push(new TempBandRate(this.bands[i], rate));
        }
        return bandRates;
    }

    private calculateRate(bandExtent: [number, number], data: TemperatureElement[]): number {
        var startElement = data[bandExtent[0]];
        var endElement = data[bandExtent[1]];
        var rate = (endElement.tempF - startElement.tempF) / (endElement.date.unix() - startElement.date.unix()) * 3600;
        return rate;
    }

    private getBandExtent(band: TempBand, tempData: TemperatureElement[]): [number, number] {
        var iStart = -1;
        var iEnd = -1;
        for (var i in tempData) {
            var element = tempData[i];
            if (element.date >= band.start && element.date <= band.stop) {
                if (iStart < 0) {
                    iStart = parseInt(i);
                }
                iEnd = parseInt(i);
            }            
        }
        if (iEnd < 0) {
            console.log([band, iStart, iEnd]);
        }
        return [iStart, iEnd];
    }
}