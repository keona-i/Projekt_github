const pixel = require("node-pixel"); 
const firmata = require('firmata');
//"node-pixel" & "firmata" sind die verbunde libary die benötigt werden für das projekt.
//Die verbindung mit Socket(http), die dazugehörige Port 
const express = require('express');
const app = express();
const port = 3000
const http = require('http').createServer(app);
const io = require('socket.io');
const io_server = io(http);

//Gameboard mit den Array, stellt das Spielfeld dar, so kann das ganze angesprochen werden.
//Die einzele Pixel hat nur drei faktoren 0,1,2 (frei,Spieler1 stein besetzt , Spieler2 stein besetzt).

let gameboard = [
					[0,0,0,0,0],
					[0,0,0,0,0],
					[0,0,0,0,0],
					[0,0,0,0,0],
					[0,0,0,0,0],
					[0,0,0,0,0],	
				]


// Da wird den usb-port angeben, wo die Hardwear (Arduino) angeschlossen ist
let board = new firmata.Board('/dev/cu.usbmodem143301',function(){
// gibt an welche Pin die LED Streifen mit dem Arduino angeschlossen ist und wie viel Ledpixel es sind.
    strip = new pixel.Strip({
        strips: [ {pin: 6, length: 30}, ],
        gamma: 1.2,
        firmata: board,
        controller: "FIRMATA",
    });

    // function remap ändert den verlauf wie die pixelstreifen weiter laufen  
	function remap(pixelNum) {
	      let mappedPixel = pixelNum;
	      const pixelsPerRow = 6;
	      let currentRow = Math.ceil((pixelNum+1)/pixelsPerRow);
	      let rowPixelNbr = pixelNum % pixelsPerRow;
	      let isOddRow = currentRow % 2 == 0;

	      if(isOddRow) mappedPixel = ((currentRow-1)*pixelsPerRow) + (pixelsPerRow - (rowPixelNbr+1));

	      return mappedPixel;
    }
    // function mapFrom x,y sind die Vertikalen und Horizentalen Spalten
    function mapFromXY(x,y) {
    	let invY = 5 - y;
	    let mappedPixel = invY + (x*6);

	    return mappedPixel;	    
    }

	strip.on("ready", function() {
		// Set the entire strip to blue
		strip.color('#010611');

		// Set first and seventh pixels to turquoise.
		//strip.pixel(remap(0)).color('#1D3513');
		//#010611 - Blau
		//#8E8E00 - Gelb

		
		// mit strip.show() werden die Pixelen erst aufleuchten.
		strip.show();

		// Loop the following command forever
		// at 12fps until Arduino powers down.

		
		/*loop = setInterval(function () {
		//Shift all pixels clockwise
			 strip.shift(1, pixel.FORWARD, true);
			strip.show();
		    }, 1000 / 12);
		});*/

		gravityloop = setInterval(applyGravity, 50);
		
		//function ist da das der Chip runter fällt, wenn der spieler die Taste im Ui drückt
		//wenn die splate voll ist wird es im Terminal angzeigt

		function drop(spalt, player) {
			if (gameboard[0][spalt-1] == 0){
				// Wenn es frei ist (0), dan kommt die Mümze rein.
				gameboard[0][spalt-1] = player;
			} else {
				// wenn Die Münze Besetzt 
				console.log("spalte ist voll");
			}
			writeGameboardToLEDs();
			//schicke erste reihe ans frontend
		}
		//wenn Spieler 1 taste im Ui drückt bekommt es die farbe Rot
		//wenn Spieler 2 taste im ui drückt bekommt es die farbe grün
		//mit der function kann die drop function gesehen werden auf dem Hardwear = Spielbrett
		function writeGameboardToLEDs() {
			for (var y = 0; y < gameboard.length; y++) {
				for (var x = 0; x < gameboard[0].length; x++) {
					let pixelcolor = '#010611'; 
					if (gameboard[y][x] == 1) pixelcolor = '#590404';
					else if (gameboard[y][x] == 2) pixelcolor = '#1D3513';

					strip.pixel(remap(mapFromXY(x,y))).color(pixelcolor);
				}
			}
			strip.show();
		}
		// function applyGravity ist dazu da das die Chips überhaupt runterfallen die Simulieren die Schwerkraft
		function applyGravity() {
			for (var y = gameboard.length-2; y >= 0 ; y--) {
				for (var x = 0; x < gameboard[0].length; x++) {
					//prüfe ob münze vorhanden, und slot darunter frei
					if (gameboard[y][x] > 0 && gameboard[y+1][x] == 0) {
						//wenn ja, münze in slot darunter "verschieben"
						gameboard[y+1][x] = gameboard[y][x];
						gameboard[y][x] = 0;
					}
				}
			}
			writeGameboardToLEDs();
		}

		function resetGame(reset){
			
				if (gameboard == 0) {
				// Wenn es frei ist (0), dan kommt die Mümze rein.
				gameboard = reset;
				}else {
					console.log("Reset die Spiel");
				}
				toGameboard();
			}

		function toGameboard(){
			for (var y = 0; y < gameboard.length; y++){
				for (var x = 0; x < gameboard[0].length; x++){
					let pixelcolor = '#010611';
					//if (gameboard[y][x] == 1) pixelcolor = '#010611';
					//else if (gameboard[y][x] == 2) pixelcolor = '#010611';
					 if (gameboard[y][x] = 0) pixelcolor = '#010611';
					
					

					strip.pixel(remap(mapFromXY(x,y))).color(pixelcolor);
				}
			}
			strip.show();
		}
				
			
			
		

		
		
		

		// server.js app.get () ...
		//Holt dich die informationen von der Vue-ui-httm dokument- mit frage und antwort 	
		app.get('/',function (req,res){
			res.sendFile(__dirname + '/viergewinnt_ui/viergewinnt/src/components/HelloWorld.vue');
		});

		io_server.on('connection', function(socket) {  //bestätigt die verbindung, man liest es im terminal
			 console.log("Connected")

			 socket.on('playMessage', function(spalt, player) {  //Sendet es nach socket und holt sich die "verbing/info" durch die Html/Vue ui.
			 	console.log(spalt+" "+player);
			 	drop(spalt, player);
			 });

			 socket.on('resetMessage', function(reset) {  //Sendet es nach socket 
			 	console.log("reset");
			 	resetGame(reset);
			 });
			 
			
		});
	});
});
//  hört nur nach dem Port der angeben ist  
http.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)}); 
