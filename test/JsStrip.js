const pixel = require("node-pixel");
const firmata = require('firmata');
//const von server.js da rein
const express = require('express');
const app = express();
const port = 3000
const http = require('http').createServer(app);
const io = require('socket.io');
const io_server = io(http);

//let drop(int Player 1);

let gameboard = [
					[0,0,0,0,0],
					[0,0,0,0,0],
					[0,0,0,0,0],
					[0,0,0,0,0],
					[0,0,0,0,0],
					[0,0,0,0,0],	
				]


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

    function mapFromXY(x,y) {
    	let invY = 5 - y;
	    let mappedPixel = invY + (x*6);

	    return mappedPixel;	    
    }

	strip.on("ready", function() {
		// Set the entire strip to pink.
		strip.color('#010611');

		// Set first and seventh pixels to turquoise.
		//strip.pixel(remap(0)).color('#1D3513');
		//#010611 - Blau
		//#8E8E00 - Gelb

		
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

		gravityloop = setInterval(applyGravity, 50);
		

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
				
			
			
		

		
		// //function reset(){
		// 	if (gameboard[0][spalte +1] == 0){
		// 		gameboard[0][spalte +1] = reset;
		// 	}else{
		// 		console.log("resetspalte");
		// 	}
				// }
		

		/*function Reset(){
		    gameboard = 0;
			if (drop() >= 0) pixelcolor = "#010611";
			else if (writeGameboardToLEDs() >= 0);

		}*/
		

		// server.js app.get () ...
		// server.js io_server.on ....	
		app.get('/',function (req,res){
			res.sendFile(__dirname + '/viergewinnt_ui/viergewinnt/src/components/HelloWorld.vue');
		});

		io_server.on('connection', function(socket) {  //bestätigt die verbindung
			 console.log("Connected")

			 socket.on('playMessage', function(spalt, player) {  //Sendet es nach socket 
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
//  von server.js http.listen ... 
http.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)}); 