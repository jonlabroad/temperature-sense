export class EventInfoKey {
    public gameweek : number;

    constructor(gameweek : number) {
        this.gameweek = gameweek;
    }

    public hash() : string {
        return `${this.gameweek}`;
    }
}

export default class EventInfoCache {
    protected cache : { [key: string]: any; } = {};

    public get(gameweek : number) : any {
        var key = new EventInfoKey(gameweek);    
        return this.cache[key.hash()];
    }

    public update(gameweek : number, matchInfo : any) {
        var key = new EventInfoKey(gameweek);
        this.cache[key.hash()] = matchInfo;
    }
}