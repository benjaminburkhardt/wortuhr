
var colorPicker;

/**
 * Instantiate the picker
 */
function createColorPicker(){

    colorPicker = new iro.ColorPicker("#picker", {
        // color picker options
        // Option guide: https://iro.js.org/guide.html#color-picker-options
        width: 280,
        color: "rgb(255, 0, 0)",
        borderWidth: 1,
        borderColor: "#fff",
    });


}

/**
 * Reads parameters from picker and returns current values
 * @returns {{r: *, b: *, g: *}}
 */
function getPickerParameters(){
    var red = colorPicker.color.red + 100;
    var green = colorPicker.color.green + 100;
    var blue = colorPicker.color.blue + 100;
    var brightness = Math.round((Math.round(colorPicker.color.hsv.v/100*255) / 255) * 100) + 100;

    console.log("R "+red);
    console.log("G "+green);
    console.log("B "+blue);
    console.log("BR "+brightness);

    //var params = "?r="+red+"&g="+green+"&b="+blue+"&br="+brightness;

    var params = {
        r: red,
        g: green,
        b: blue}

    return params;
}

// TODO: Trigger this as soon as picker is created!
function updatePickerWithRgb(red, blue, green, brightness){
    console.log(red)
    colorPicker.color.red = red;
    colorPicker.color.blue = blue;
    colorPicker.color.green = green;
   // TODO: Brightness!

}

