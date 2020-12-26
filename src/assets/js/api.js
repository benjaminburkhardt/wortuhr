
var colorPicker;

function createColorPicker(){

    colorPicker = new iro.ColorPicker("#picker", {
        // Set the size of the color picker
        width: 320,
        // Set the initial color to pure red
        color: "#f00"
    });
}


function sendRequest() {


    var red = colorPicker.color.red+100;
    var green = colorPicker.color.green +100;
    var blue = colorPicker.color.blue +100;
    var brightness = Math.round((Math.round(colorPicker.color.hsv.v/100*255) / 255) * 100)+100;

    console.log(red);
    console.log(green);
    console.log(blue);
    console.log(brightness);

    const options = {
        method: 'get',
    params: {'r': red.toString(), 'g': green.toString(), 'b': blue.toString(), 'br' : brightness.toString() }
    };

    var rqUrl = 'http://wortuhs/pixelgraphic'
    var rqUrl2 = 'http://wortuhr/pixelgraphic'

    var params = "?r="+red+"&g="+green+"&b="+blue+"&br="+brightness;
    console.log(rqUrl)
    // cordova.plugin.http.sendRequest(rqUrl, options, function(response) {
    //     // prints 200
    //     console.log(response);
    // }, function(response) {
    //     // prints 403
    //     console.log(response.status);
    //
    //     //prints Permission denied
    //     console.log(response.error);
    // });

    httpGet(rqUrl+params);

}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
