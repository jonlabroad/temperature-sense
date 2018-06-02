export default class ValueBand<T>
{
    public startUnix : number;
    public endUnix : number;
    public value : T;

    public constructor(start : number, end : number, val : T) {
        this.startUnix = start;
        this.endUnix = end;
        this.value = val;
    }
}