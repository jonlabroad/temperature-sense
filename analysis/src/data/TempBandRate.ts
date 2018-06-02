import TempBand from "./TempBand";

export default class TempBandRate extends TempBand {
    public rate : number;

    public constructor(band : TempBand, rate : number) {
        super(band.start, band.stop, band.thermoStatus, band.binCenter);
        this.rate = rate;
    }
}