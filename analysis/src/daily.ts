import TemperatureDataProvider from "../../web/src/TemperatureDataProvider"
import WeatherDataProvider from "../../web/src/WeatherDataProvider"
import TemperatureData from "../../web/src/Data/TemperatureData"
import ThermostatData from "../../web/src/data/ThermostatData"
import Credentials from "../../web/src/aws/Credentials"
import WeatherData from "../../web/src/data/WeatherData";
import ThermostatBandGenerator from "./ThermostatBandGenerator";
import BandAnalyzer from "./BandAnalyzer";
import TempBandRate from "./data/TempBandRate";

class DailyAnalysis {
    private tempData : TemperatureData;
    private thermostatData : ThermostatData;
    private weatherData : WeatherData;

    constructor() {
        new Credentials().init();
    }

    public analysis(calendarDate : string) {
        var tempProvider : TemperatureDataProvider = new TemperatureDataProvider();
        var weatherProvider : WeatherDataProvider = new WeatherDataProvider();

        tempProvider.readTemperature(calendarDate, this.acceptTempData.bind(this));
        tempProvider.readThermostatSetting(calendarDate, this.acceptThermoData.bind(this));
        weatherProvider.readWeatherData(calendarDate, this.acceptWeatherData.bind(this));
    }

    private process() {
        if (this.tempData == null || this.thermostatData == null || this.weatherData == null) {
            return;
        }

        var bands = new ThermostatBandGenerator(this.thermostatData).calculate();
        var analyzer = new BandAnalyzer(this.tempData, this.weatherData, bands);
        var allRoomRates = new Map<string, TempBandRate[]>();
        for (var room in this.tempData.data) {
            var bandRates : TempBandRate[] = analyzer.calculateBandRate(room);
            allRoomRates[room] = bandRates;
        }

        console.log(allRoomRates);
    }

    private acceptTempData(data : TemperatureData) {
        this.tempData = data;
        this.process();
    }

    private acceptThermoData(data : ThermostatData) {
        this.thermostatData = data;
        this.process();
    }

    private acceptWeatherData(data : WeatherData) {
        this.weatherData = data;
        this.process();
    }

}

var analyzer = new DailyAnalysis();
analyzer.analysis("20180601");