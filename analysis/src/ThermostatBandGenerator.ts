import TemperatureData from "../../web/src/Data/TemperatureData"
import ThermostatData from "../../web/src/data/ThermostatData"
import WeatherData from "../../web/src/data/WeatherData";
import TempBand from "./data/TempBand";

export default class ThermostatBandGenerator {
    private thermoData : ThermostatData;
    
    constructor(thermoData : ThermostatData) {
        this.thermoData = thermoData;
    }

    public calculate() : TempBand[] {
        var off = "off";
        var currentMode = this.thermoData.data[0].hvacState;
        var beginX = this.thermoData.data[0].date;
        var endX;
        var bands : TempBand[] = [];
        var data = this.thermoData.data;
        for (var i in data) {
            var element = data[i];
            if (element.hvacState != undefined) {
                if (element.hvacState != currentMode) {
                    bands.push(new TempBand(beginX, endX, currentMode, -1));
                    beginX = element.date;
                }
                endX = element.date;
                currentMode = element.hvacState;
            }
        }
        bands.push(new TempBand(beginX, endX, currentMode, -1));
        return bands;
    }
}