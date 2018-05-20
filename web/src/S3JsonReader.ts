export default class S3JsonReader
{
    private static BASE_URL = "https://s3.amazonaws.com/fantasyeplmatchtracker/data"

    constructor()
    {
    }

    public read(path : string, successFunc : Function)
    {
        return $.ajax({
          url: `${S3JsonReader.BASE_URL}/${path}`,
          type: "GET",
          cache: false,
          dataType: "json",
          success: function (data) {
            successFunc(data);
          }
        });
    }
}