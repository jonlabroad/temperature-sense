import * as Moment from "moment-timezone"
import DateUtil from "../DateUtil"

export default class TemperatureElement {
    public calendarDate : number;
    public sensorName : string;
    public hourMin : number;
    public tempF : number;
    public date : Moment.Moment;
    public humidity : number;

    constructor(dataItem: AWS.DynamoDB.AttributeMap) {
        this.calendarDate = parseInt(dataItem["CalendarDate"].N);
        this.sensorName = dataItem["SensorId"].S;
        this.hourMin = parseInt(dataItem["HourMin"].N);
        this.tempF = parseFloat(dataItem["TempF"].N);
        this.date = DateUtil.getMoment(`${this.calendarDate}`, `${this.hourMin}`);
        this.humidity = dataItem["Humidity"] != undefined ? parseFloat(dataItem["Humidity"].N) : null;
    }
}