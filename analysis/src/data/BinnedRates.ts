import RateBinKey from "./RateBinKey";
import DiffRate from "./DiffRate";

export default class BinnedRates {
    public rates : Map<RateBinKey, DiffRate> = new Map<RateBinKey, DiffRate>();
    
}