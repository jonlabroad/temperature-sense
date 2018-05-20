import CacheKey from "./CacheKey"

export default class DataCache<T extends CacheKey> {
    protected cache : { [key: string]: any; } = {};

    public get(key : T) : any {
        return this.cache[key.hash()];
    }

    public update(key : T, data : any) {
        this.cache[key.hash()] = data;
    }
}