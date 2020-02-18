## Mein Projekt

In Programmiersprache 2 war die Aufgabe ein „Full Stack“ Projekt zu bauen.
Hier sollte das Backend mit den Frontend verbunden werden. Dabei sollte eine 
Led-Streifen mit ein gebaut werden. Als Semesterprojekt Thema hatte ich drei Vorschläge. 
Der erste Vorschlag was das Spiel „Cyclone LED Arcade Game“. Der zweite Vorschlag war das Spiel 
„Vier - Gewinnt“. Der letzte Vorschlag war, dass im Interface verschiede Buttons angeklickt werden 
und die Led die Farbe ändert.

Ich habe mich für das Spiel „Vier - Gewinnt“ entschieden.


## Benutzung

Erst wird im Terminal mit cd der Order wo sich die Daten vom Backend befinden reingezogen. Mit nodemon  JsStrip.js 
wird es gestartet. In ein zweiten Terminal wird auch mit cd und den Ordner wo sich die Daten vom Frontend befinden 
reingezogen. Das wird mit npm run serve gestartet. Sind die LED´s mit dem Arduino am Computer/Laptop angeschlossen 
kann gespielt werden. Das Interface befindet sich auf http: localhost: 8080. Wird auf das Interface geklickt fällt ein 
„Chip“ in form der LED runter, so können zwei Spieler mit einander spielen. 


## Aufbau 


* gameboard : 		        Das stellt „virtuelle“ die ganze Spielfläche dar. 
		 		                So kann jede LED angesprochen werden 
                        

* mapFromXY : 		        Damit wird gesagt, dass die Spalten und Zeilen mit
				                X und Y angesprochen werden.
                        

* drop : 				          Mit dieser Funktion wird gesagt, dass die „Chip“ runter fällt. 
				                Das es so aussieht wie im echten Spiel.
                        

* writeGameboardToLEDs :	Das ist die Funktion wo der Spieler 1 und 2 ein Farbe erhalten.


* applyGravit : 			    Das hilft die drop funktion, so das es die Schwerkraft simuliert wird.


* Socket : 			          Das sind die Verbindung mit Backend und Frontend. Die sind 					
                         wichtig um überhaupt die Möglichkeit zu haben auf das 						
                          Interface anzuklicken und es ändert sich auf die LED Spielfläche.




## ToDos

Die nächsten Schritte, um das Projekt zu vervollständigen wären:
 	
	- Wenn ein Spieler gewinnt, soll das erkannt werden. Und die ganze Spielfläche 			  
    wird in die Farbe angezeigt vom gewonnen Spieler.

	- Im Interface wird Spieler 1 und 2 zugewiesen, so kann nicht in den jeweiligen Tap 	   
    Fenster angeklickt werden.
