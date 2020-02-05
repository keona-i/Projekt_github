const pixel = require("node-pixel");
const firmata = require('firmata');
//const von server.js da rein
const express = require('express');
const app = express();
const port = 3000
const http = require('http').createServer(app);
const io = require('socket.io');
const io_server = io(http);


let board = new firmata.Board('/dev/cu.usbmodem143301',function(){

    strip = new pixel.Strip({
        strips: [ {pin: 6, length: 30}, ],
        gamma: 1.2,
        firmata: board,
        controller: "FIRMATA",
    });

	function remap(pixelNum) {
	      let mappedPixel = pixelNum;
	      const pixelsPerRow = 6;
	      let currentRow = Math.ceil((pixelNum+1)/pixelsPerRow);
	      let rowPixelNbr = pixelNum % pixelsPerRow;
	      let isOddRow = currentRow % 2 == 0;

	      if(isOddRow) mappedPixel = ((currentRow-1)*pixelsPerRow) + (pixelsPerRow - (rowPixelNbr+1));

	      return mappedPixel;
    }

	strip.on("ready", function() {
		// Set the entire strip to pink.
		strip.color('#010611');

		// Set first and seventh pixels to turquoise.
		strip.pixel(remap(0)).color('#1D3513');
		strip.pixel(remap(1)).color('#1D3513');
		strip.pixel(remap(2)).color('#1D3513');
		strip.pixel(remap(3)).color('#1D3513');
		strip.pixel(remap(4)).color('#1D3513');
		strip.pixel(remap(5)).color('#1D3513');
		strip.pixel(remap(6)).color('#1D3513');
		
		
		
		// Display initial state.
		strip.show();
		// Loop the following command forever
		// at 12fps until Arduino powers down.

		
		/*loop = setInterval(function () {
		//Shift all pixels clockwise
			 strip.shift(1, pixel.FORWARD, true);
			strip.show();
		    }, 1000 / 12);
		});*/


		
		



	// server.js app.get () ...
	// server.js io_server.on ....	
	app.get('/',function (req,res){
	res.sendFile(__dirname + '/HelloWorld.vue');
});


io_server.on('connection', function(socket) {  //bestätigt die verbindung
	 console.log("Connected")
	 socket.on('playMessage', function(spalt, player) {  //Sendet es nach socket 
	 	socket.emit('test',test) // hört (Listen for event), in socket was abgefragt wird
	 	console.log(test);
	 });
	});

	});
});
//  von server.js http.listen ... 
http.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)}); 