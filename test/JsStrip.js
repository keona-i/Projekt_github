const pixel = require("node-pixel");
const firmata = require('firmata');

let board = new firmata.Board('/dev/cu.usbmodem143101',function(){

    strip = new pixel.Strip({
        strips: [ {pin: 6, length: 30}, ],
        gamma: 1.2,
        firmata: board,
        controller: "FIRMATA",
    });

strip.on("ready", function() {
	// Set the entire strip to pink.
	strip.color('#0B1B1E');

	// Set first and seventh pixels to turquoise.
	strip.pixel(0).color('#1D3513');
	strip.pixel(6).color('#1D3513');

	// Display initial state.
	strip.show();
	// Loop the following command forever
	// at 12fps until Arduino powers down.

	loop = setInterval(function () {
	//Shift all pixels clockwise
		 strip.shift(1, pixel.FORWARD, true);
		strip.show();
	    }, 1000 / 12);
	});


	
	



	
});