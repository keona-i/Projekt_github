<template>
  <b-container>
    <div class="hello">
      <title>index</title>
      <meta charset="utf-8" />
      <b-row class="justify-content-md-center">
        <b-col sm="3">
          <label>  </label>
        </b-col>
      </b-row>
        <b-card no-body>
          <b-tabs card>
	  <!-- Die Tap für Spieler 1 und 2 und die Buttons mit Bootstrap vue.-->
            <b-tab title="Player 1" active>
              <b-card>
              	<b-button class="playbtn" pill variant="outline-secondary" v-on:click="sendValues(1,1)">1<br/>⬇</b-button>
                <b-button class="playbtn" pill variant="outline-secondary" v-on:click="sendValues(2,1)">2<br/>⬇</b-button>
                <b-button class="playbtn" pill variant="outline-secondary" v-on:click="sendValues(3,1)">3<br/>⬇</b-button>
                <b-button class="playbtn" pill variant="outline-secondary" v-on:click="sendValues(4,1)">4<br/>⬇</b-button>
                <b-button class="playbtn" pill variant="outline-secondary" v-on:click="sendValues(5,1)">5<br/>⬇</b-button>
              </b-card>
            </b-tab>
              <b-tab title="Player 2" active>
              <b-card>
              <b-button class="playbtn" pill variant="outline-secondary" v-on:click="sendValues(1,2)">1<br/>⬇</b-button>

              <b-button class="playbtn" pill variant="outline-secondary" v-on:click="sendValues(2,2)">2<br/>⬇</b-button>

              <b-button class="playbtn" pill variant="outline-secondary" v-on:click="sendValues(3,2)">3<br/>⬇</b-button>

              <b-button class="playbtn" pill variant="outline-secondary" v-on:click="sendValues(4,2)">4<br/>⬇</b-button>

              <b-button class="playbtn" pill variant="outline-secondary" v-on:click="sendValues(5,2)">5<br/>⬇</b-button>

          </b-card>
            </b-tab>
          </b-tabs>
        </b-card>
        <p>
        </p>
        <b-button class="resetbtn" pill variante="secondary" v-on:click="sendReset()">Reset</b-button>
    
  
        
      
    </div>
  </b-container>
</template>

<script>
// holt sich die daten von socket.io-client.
  import io from "socket.io-client";

export default {
  name: "HelloWorld",
  
  // kann auf lokalhost:3000 angesehen werden
  data: function(){
    return {
      socket: io.connect("http://10.0.0.1:3000"),
      


    };
  },
  props: {
    msg: String
  },
  //sendet es und ist die verbing zur Js-datei
  // wird auf den Button Play 1 auf 1 geklickt, schickt es die Daten welche Spalte es reingeworden wird und von welcher Spieler.
 // es werden die daten für Reset an die Js-datei geschickt, die beiden Daten können im Terminal nach gelesen werden.
 methods:{
    sendValues(spalt, player){
      this.socket.emit("playMessage",spalt, player); 
    },
    sendReset() {
      this.socket.emit("resetMessage");
    }
     
}, 


 

};

	
    

</script>
// die CSS sind für die "Schönheit" und Gestaltung 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.playbtn {
  margin-left: 10px;
}
.resetbtn{
  margin-top: 30px;

}
.arrows {
	letter-spacing: 1.8em;
	margin-left: 2.52em;
}
</style>
