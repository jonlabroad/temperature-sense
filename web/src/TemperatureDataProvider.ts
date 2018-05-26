import TemperatureData from "./data/TemperatureData"
import ThermostatData from "./data/ThermostatData";
import TemperatureDBReader from "./temperature/TemperatureDBReader"
import ThermostatSettingDBReader from "./temperature/ThermostatSettingDBReader"

export default class TemperatureDataProvider {
    private tempReader : TemperatureDBReader;
    private thermoReader : ThermostatSettingDBReader;
    
    constructor() {
        this.tempReader = new TemperatureDBReader();
        this.thermoReader = new ThermostatSettingDBReader();
    }

    public readTemperature(calendarDate : string, handleFunc?: (data: TemperatureData) => void) {
        var self = this;
        this.tempReader.query(calendarDate,
            function(err: AWS.AWSError, data: TemperatureData) {
                handleFunc(data);
            }
        );
    }

    public readThermostatSetting(calendarDate : string, handleFunc?: (data: ThermostatData) => void) {
        var self = this;
        this.thermoReader.query(calendarDate,
            function(err: AWS.AWSError, data: ThermostatData) {
                handleFunc(data);
            }
        );
    }
}