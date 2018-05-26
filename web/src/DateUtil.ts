import * as Moment from "moment-timezone"
import Config from "./Config"

export default class DateUtil {
    public static getNow() : Moment.Moment {
        return Moment().tz("America/New_York");
    }
    
    public static getTodayCalendarDate() {
        var now : Moment.Moment = DateUtil.getNow();
        return this.getCalendarDate(now);
    }

    public static getCalendarDate(date : Moment.Moment) : string {
        return `${date.year()}${this.numberWith1LeadingZero(date.month()+1)}${this.numberWith1LeadingZero(date.date())}`
    }

    public static getYear(calendarDate : string) : number {
        return parseInt(calendarDate.substr(0, 4));
    }

    public static getMonth(calendarDate : string) : number {
        return parseInt(calendarDate.substr(4, 2));
    }

    public static getDay(calendarDate : string) : number {
        return parseInt(calendarDate.substr(6, 2));
    }

    public static getHour(hourMin : string) : number {
        if (hourMin.length == 3) {
            return parseInt(hourMin[0]);
        }
        else {
            return parseInt(hourMin.substr(0,2));
        }
    }

    public static getMin(hourMin : string) : number {
        return parseInt(hourMin.substr(hourMin.length - 2, 2));
    }

    public static numberWith1LeadingZero(num : number) : string {
        var numString = num < 10 ? "0" : "";
        numString += `${num}`;
        return numString;
    }

    public static numberWith3LeadingZero(num : number) : string {
        var numString = "";
        numString += num < 1000 ? "0" : "";
        numString += num < 100 ? "0" : "";
        numString += num < 10 ? "0" : "";
        numString += `${num}`;
        return numString;
    }    

    public static getMoment(calendarDate: string, hourMin: string) : Moment.Moment {
        var moment : Moment.Moment = Moment(`${calendarDate} ${DateUtil.numberWith3LeadingZero(parseInt(hourMin))}`, "YYYYMMDD HHmm", );
        return moment;
    }

    public static getDate(calendarDate: string, hourMin: string) : Date {
        var date = new Date(DateUtil.getYear(calendarDate), DateUtil.getMonth(calendarDate) - 1, DateUtil.getDay(calendarDate),
                            DateUtil.getHour(hourMin), DateUtil.getMin(hourMin), 0, 0);
        date.setDate(DateUtil.getDay(calendarDate));
        return date;
    }
}