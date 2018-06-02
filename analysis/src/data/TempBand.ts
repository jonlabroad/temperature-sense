import * as Moment from "moment-timezone"

export default class TempBand {
    public start : Moment.Moment;
    public stop : Moment.Moment;
    public thermoStatus : string;
    public binCenter : number;

    public constructor(start : Moment.Moment, stop : Moment.Moment, status : string, binCenter : number) {
        this.start = start;
        this.stop = stop;
        this.thermoStatus = status;
        this.binCenter = binCenter;
    }
}