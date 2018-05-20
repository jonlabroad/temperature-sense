export default abstract class CacheKey {
    public abstract hash() : string;
    public abstract path() : string;
}