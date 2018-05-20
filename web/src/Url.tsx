export default class Url {
    public static setUrl(teamId : number, gameweek : number, differentialsOnly : boolean, isCup : boolean) {
        window.history.pushState("", "", `?team=${teamId}&gameweek=${gameweek}&differentials=${differentialsOnly}&cup=${isCup}`);
    }

    public static getParameterByName(name : string, defaultValue? : string, url? : string) {
        if (!url) {
            url = window.location.href;
        }

        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
        
        if (!results)
            return defaultValue;
        
        if (!results[2])
            return defaultValue;
        
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
}