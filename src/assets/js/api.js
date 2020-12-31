
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

    var brightness = Math.round((Math.round(colorPicker.color.hsv.v/100*255) / 255) * 100) + 100;


    colorPicker.color.hsv = { v: 100 };

    var red = colorPicker.color.red + 100;
    var green = colorPicker.color.green + 100;
    var blue = colorPicker.color.blue + 100;

    colorPicker.color.hsv = { v: brightness-100 };

    console.log("R "+red);
    console.log("G "+green);
    console.log("B "+blue);
    console.log("BR "+brightness);

    //var params = "?r="+red+"&g="+green+"&b="+blue+"&br="+brightness;

    var params = {
        r: red,
        g: green,
        b: blue,
        br: brightness}

    return params;
}

/**
 * Update the picker in app with values from server
 * @param red
 * @param blue
 * @param green
 * @param brightness
 */
function updatePickerWithRgb(red, green, blue, brightness){

    colorPicker.color.red = red;
    colorPicker.color.blue = blue;
    colorPicker.color.green = green;

    console.log("received brightness: "+brightness)
    colorPicker.color.hsv = { v: (brightness) };
}

