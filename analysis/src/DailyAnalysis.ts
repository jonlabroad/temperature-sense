import TemperatureDataProvider from "../../web/src/TemperatureDataProvider"
import WeatherDataProvider from "../../web/src/WeatherDataProvider"
import TemperatureData from "../../web/src/Data/TemperatureData"
import ThermostatData from "../../web/src/data/ThermostatData"
import WeatherData from "../../web/src/data/WeatherData";
import ThermostatBandGenerator from "./ThermostatBandGenerator";
import BandAnalyzer from "./BandAnalyzer";
import TempBandRate from "./data/TempBandRate";
import RateBinner from "./RateBinner";
import S3JsonWriter from "./aws/S3JsonWriter";
import Credentials from "./aws/Credentials";

export default class DailyAnalysis {
    private tempData : TemperatureData;
    private thermostatData : ThermostatData;
    private weatherData : WeatherData;
    private calendarDate : string;

    constructor(calendarDate : string) {
        new Credentials().init();
        this.calendarDate = calendarDate;
    }

    public analysis() {
        var tempProvider : TemperatureDataProvider = new TemperatureDataProvider();
        var weatherProvider : WeatherDataProvider = new WeatherDataProvider();

        tempProvider.readTemperature(this.calendarDate, this.acceptTempData.bind(this));
        tempProvider.readThermostatSetting(this.calendarDate, this.acceptThermoData.bind(this));
        weatherProvider.readWeatherData(this.calendarDate, this.acceptWeatherData.bind(this));
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
        var rateBinner = new RateBinner();
        var binnedRates = rateBinner.binify(allRoomRates);
        new S3JsonWriter().writeMap(`data/${this.calendarDate}/rates.json`, binnedRates);
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
