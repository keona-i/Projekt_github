// Das Modul express wird aufgereufen und in der varibale express dargestellt
const express = require('express');
//der befehl um express zu starten und vor zubreiten
const app = express();
// die konstante Port wert, so kann man es ändern und es ändert alles im text 
const port = 3000

const http = require('http').createServer(app);

const io = require('socket.io');
//verbinden das mit express da express http schon hat
const io_server = io(http);



app.get('/',function (req){
	res.sendFile(__dirname + '/HelloWorld.vue');
});


io_server.on('connection', function(socket) {  //bestätigt die verbindung
	 console.log("Connected")
	 socket.on('playMessage', function(spalt, player) {  //Sendet es nach socket 
	 	socket.emit('test',test) // hört (Listen for event), in socket was abgefragt wird
	 	console.log(test);
	 });
	});


// listen = ein funktion von der express app .. hört welche anschluss ist also 3000
// wenn es funktionoert dan macht es die zweite event 
  
// wenn nur () steht = function mit geschweifte Klammer 
http.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)}); 