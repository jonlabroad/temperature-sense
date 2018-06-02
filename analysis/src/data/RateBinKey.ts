import Config from "../Config";

enum OutdoorCondition {
    NIGHT,
    DAY_SUNNY,
    DAY_CLOUDY
}

class BinCenterFinder {
    public static binSizeF = Config.BinSizeF;
    public getBinCenter(tempF : number) {
        return Math.floor(tempF / BinCenterFinder.binSizeF) * BinCenterFinder.binSizeF + BinCenterFinder.binSizeF + 5;
    }
}

export default class RateBinKey {
    public binCenterF : number;
    public outdoorCondition : OutdoorCondition;

    constructor(tempF : number, condition : OutdoorCondition) {
        this.binCenterF = new BinCenterFinder().getBinCenter(tempF);
        this.outdoorCondition = condition;
    }
}