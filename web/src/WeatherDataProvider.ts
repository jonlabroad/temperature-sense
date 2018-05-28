import WeatherDBReader from "./temperature/WeatherDBReader";
import WeatherData from "./data/WeatherData";

export default class WeatherDataProvider {
    private weatherReader : WeatherDBReader;
    
    constructor() {
        this.weatherReader = new WeatherDBReader();
    }

    public readWeatherData(calendarDate : string, handleFunc?: (data: WeatherData) => void) {
        var self = this;
        this.weatherReader.query(calendarDate,
            function(err: AWS.AWSError, data: WeatherData) {
                handleFunc(data);
            }
        );
    }
}