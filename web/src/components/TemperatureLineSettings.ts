export default class TemperatureLineSettings {
    public showHvacBands : boolean = true;
    public showHvacRates : boolean = true;
    public showHvacSetting : boolean = true;

    public constructor(fields?: {
        showHvacBands? : boolean,
        showHvacRates? : boolean,
        showHvacSetting? : boolean
    }) {
        if (fields) {
            (<any>Object).assign(this, fields);
        }
    }
}