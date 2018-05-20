export default class ColorPicker
{
    private colorIndex = 0;
    private availableColors : string[] = ["steelblue", "Crimson", "Coral", "Orange", "Green", "Brown", "Purple", "Sienna", "MediumTurquoise", "Thistle", "Magenta"];

    public pick() : string {
        var color = this.availableColors[this.colorIndex];
        this.colorIndex = (this.colorIndex + 1) % this.availableColors.length;
        return color;
    }
}