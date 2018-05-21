import * as Moment from "moment-timezone"
import DateUtil from "../DateUtil"

export default class ThermostatElement {
    public calendarDate : number;
    public hourMin : number;
    public targetTempF : number;
    public ecoTempHighF : number;
    public ecoTempLowF : number;
    public hvacMode : string;
    public hvacState: string;
    public leaf : boolean;
    public targetTempHighF: number;
    public targetTempLowF: number;
    public date : Moment.Moment;

    constructor(dataItem: AWS.DynamoDB.AttributeMap) {
        this.calendarDate = parseInt(dataItem["CalendarDate"].N);
        this.hourMin = parseInt(dataItem["HourMin"].N);
        this.date = DateUtil.getMoment(`${this.calendarDate}`, `${this.hourMin}`);
        this.targetTempF = parseInt(this.getFieldNotUndefined(dataItem, "TargetTempF", "N"));
        this.ecoTempHighF = parseInt(this.getFieldNotUndefined(dataItem, "EcoTempHighF", "N"));
        this.ecoTempLowF = parseInt(this.getFieldNotUndefined(dataItem, "EcoTempLowF", "N"));
        this.hvacMode = this.getFieldNotUndefined(dataItem, 'HvacMode', 'S');
        this.hvacState = this.getFieldNotUndefined(dataItem, 'HvacState', 'S');
        this.leaf = this.getFieldNotUndefined(dataItem, 'Leaf', 'BOOL') == 'true';
        this.targetTempHighF = parseInt(this.getFieldNotUndefined(dataItem, "TargetTempHighF", "N"));
        this.targetTempLowF = parseInt(this.getFieldNotUndefined(dataItem, 'TargetTempLowF', "N"));
    }

    private getFieldNotUndefined(element : any, fieldName : string, subfield : string) : string {
        if (element[fieldName] == null || element[fieldName] == undefined) {
            return null;
        }
        return element[fieldName][subfield];
    }
}