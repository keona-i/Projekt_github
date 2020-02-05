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
            <b-tab title="Player 1" active>
              <b-card><b-button class="playbtn" pill variant="outline-secondary" v-on:click="sendValues(1,2)">One</b-button>
                <b-button class="playbtn" pill variant="outline-secondary" v-on:click="sendValues(2,2)">Two</b-button>
                <b-button class="playbtn" pill variant="outline-secondary" v-on:click="sendValues(3,2)">Three</b-button>
                <b-button class="playbtn" pill variant="outline-secondary" v-on:click="sendValues(4,2)">Four</b-button>
                <b-button class="playbtn" pill variant="outline-secondary" v-on:click="sendValues(5,2)">Five</b-button>
                <b-button class="playbtn" pill variant="outline-secondary" v-on:click="sendValues(6,2)">Six</b-button>
              </b-card>
            </b-tab>
              <b-tab title="Player 2" active>
              <b-card><b-button class="playbtn" pill variant="outline-secondary" v-on:click="sendValues(1,2)">One</b-button>
              <b-button class="playbtn" pill variant="outline-secondary" v-on:click="sendValues(2,2)">Two</b-button>
              <b-button class="playbtn" pill variant="outline-secondary" v-on:click="sendValues(3,2)">Three</b-button>
              <b-button class="playbtn" pill variant="outline-secondary" v-on:click="sendValues(4,2)">Four</b-button>
              <b-button class="playbtn" pill variant="outline-secondary" v-on:click="sendValues(5,2)">Five</b-button>
              <b-button class="playbtn" pill variant="outline-secondary" v-on:click="sendValues(6,2)">Six</b-button>
          </b-card>
            </b-tab>
          </b-tabs>
        </b-card>
        <p>
        </p>
        <b-button class="resetbtn" pill variante="secondary" v-on:click="sendValues(1)">Reset</b-button>
    
  
        
      
    </div>
  </b-container>
</template>

<script>
  import io from "socket.io-client";

export default {
  name: "HelloWorld",
  
  data: function(){
    return {
      socket: io.connect("http://localhost:3000"),
      


    };
  },
  props: {
    msg: String
  },
  methods:{
    sendValues(spalt, player, reset){
      this.socket.emit(("playMessage",spalt, player)+("resetMessage",reset)); 
    }
     
},
 
    
};
</script>

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
</style>
