import S3JsonReader from "./S3JsonReader"
import CacheKey from "./CacheKey"
import DataCache from "./DataCache"

export default class CachedS3JsonReader<T extends CacheKey>
{
    public reader : S3JsonReader;
    public dataCache : DataCache<T>;
    public lastUpdated : DataCache<T>;
    private invalidateTimeMillis : Number;

    constructor(invalidateTimeMillis : Number) {
        this.invalidateTimeMillis = invalidateTimeMillis;
        this.reader = new S3JsonReader();
        this.dataCache = new DataCache<T>();
        this.lastUpdated = new DataCache<T>();
    }

    public read(key : T, successFunc : Function) {
        var lastRead = this.lastUpdated.get(key);
        var now = new Date();
        if (!lastRead || (now.getTime() - lastRead.getTime()) > this.invalidateTimeMillis) {
            var self = this;
            this.reader.read(key.path(), function(data : any) {
                self.lastUpdated.update(key, now);
                self.dataCache.update(key, data);
                successFunc(data);
            });
        }
        else {
            var data = this.dataCache.get(key);
            successFunc(data);         
        }
    }
}