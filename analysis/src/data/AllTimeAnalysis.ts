import DateUtil from "../../../web/src/DateUtil";
import DailyAnalysis from "../DailyAnalysis";

export default class AllTimeAnalysis {
    private dates : string[] = new Array<string>();
    
    constructor(startDate : string) {
        this.dates = DateUtil.getCalendarDateRange(startDate, DateUtil.getTodayCalendarDate());
    }

    public analysis() {
        for (var i in this.dates) {
            var date = this.dates[i];
            console.log(`Processing ${date}`);
            var daily = new DailyAnalysis(date);
            daily.analysis();
        }
    }
}