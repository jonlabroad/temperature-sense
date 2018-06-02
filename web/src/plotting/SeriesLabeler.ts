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
            case "temp-piz-water1":
                return "Water Heater";
            case "temp-piz-kitchen1":
                return "Kitchen";
            default:
                return datasetName;
        }
    }
}