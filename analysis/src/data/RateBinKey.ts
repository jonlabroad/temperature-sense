import Config from "../Config";
import HvacState from "./HvacState";

class BinCenterFinder {
    public static binSizeF = Config.BinSizeF;
    public getBinCenter(tempF : number) {
        return Math.floor(tempF / BinCenterFinder.binSizeF) * BinCenterFinder.binSizeF + BinCenterFinder.binSizeF + 5;
    }
}

export default class RateBinKey {
    public binCenterF : number;
    public hvacState : string;
    public outdoorCondition : string;

    constructor(tempF : number, condition : string, hvacState : string) {
        this.binCenterF = new BinCenterFinder().getBinCenter(tempF);
        this.outdoorCondition = condition;
        this.hvacState = hvacState;
    }

    public static getHvacState(hvacState : string) : string {
        switch(hvacState) {
            case "cooling":
                return HvacState.COOLING;
            case "heating":
                return HvacState.HEATING;
            default:
                return HvacState.IDLE;
        }
    }

    public getKey() {
        return `${this.binCenterF.toFixed(1)} ${this.outdoorCondition.toString()} ${this.hvacState.toString()}`;
    }
}