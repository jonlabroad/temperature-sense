export default class SeriesLabeler
{
    public static getLabel(datasetName : string)
    {
        switch(datasetName) {
            case "Nest":
                return "LivingRoom (Nest)";
            case "temp-piz-br1":
                return "Master Bedroom";
            case "temp-piz-entr1":
                return "Entranceway";
            case "temp-piz-lr1":
                return "LivingRoom";
            case "temp-piz-office-1":
                return "Office";
            default:
                return datasetName;
        }
    }
}