export default class DiffRate {
    public rate : number;
    public numAveraged = 1;

    constructor(rate : number) {
        this.rate = rate;
    }
}