import TempBandRate from "./data/TempBandRate";
import BinnedRates from "./data/BinnedRates";
import RateBinKey from "./data/RateBinKey";
import DiffRate from "./data/DiffRate";
import OutdoorCondition from "./data/OutdoorCondition";

export default class RateBinner {
    constructor() {

    }

    public binify(bands : Map<string, TempBandRate[]>) : Map<string, BinnedRates> {
        var binned = new Map<string, BinnedRates>();
        for (var room in bands) {
            binned.set(room, new BinnedRates());
            var binnedRate = binned.get(room);
            for (var iband in bands[room]) {
                var band : TempBandRate = bands[room][iband];
                var key = new RateBinKey(band.binCenter, OutdoorCondition.DAY_SUNNY, RateBinKey.getHvacState(band.thermoStatus));
                var existingRate = binnedRate.rates[key.getKey()];
                if (existingRate == null || existingRate == undefined) {
                    binnedRate.rates[key.getKey()] = new DiffRate(band.rate);
                }
                else {
                    // It already existss, combine them with an avg
                    binnedRate.rates[key.getKey()] = this.combineRates(existingRate, new DiffRate(band.rate));
                }
            }
            binned.set(room, binnedRate);
        }
        return binned;
    }

    private combineRates(rate1 : DiffRate, rate2 : DiffRate) : DiffRate {
        var rate = (rate1.rate + rate2.rate) / (rate1.numAveraged + rate2.numAveraged);
        var newRate = new DiffRate(rate);
        newRate.numAveraged = rate1.numAveraged + rate2.numAveraged;
        return newRate;
    }
}