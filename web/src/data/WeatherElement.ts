import * as Moment from "moment-timezone"
import DateUtil from "../DateUtil"

export default class WeatherElement {
    public calendarDate : number;
    public hourMin : number;
    public tempF : number;
    public date : Moment.Moment;
    public windSpeed : number;
    public precipProbability : number;
    public precipIntensity : number;
    public precipType : string;
    public summary : string;
    public icon : string;
    public cloudCover : number;
    public humidity : number;

    constructor(dataItem: AWS.DynamoDB.AttributeMap) {
        this.calendarDate = parseInt(dataItem["CalendarDate"].N);
        this.hourMin = parseInt(dataItem["HourMin"].N);
        this.tempF = parseFloat(dataItem["Temperature"].N);
        this.date = DateUtil.getMoment(`${this.calendarDate}`, `${this.hourMin}`);
        this.windSpeed = parseFloat(dataItem["WindSpeed"].N);
        this.precipIntensity = parseFloat(dataItem["PrecipIntensity"].N);
        this.precipProbability = parseFloat(dataItem["PrecipProbability"].N);
        this.precipType = dataItem["PrecipType"].S;
        this.summary = dataItem["Summary"].S;
        this.icon = dataItem["Icon"].S;
        this.cloudCover = parseFloat(dataItem["CloudCover"].N);
        this.humidity = dataItem["Humidity"] != null ? parseFloat(dataItem["Humidity"].N) : null;
    }
}