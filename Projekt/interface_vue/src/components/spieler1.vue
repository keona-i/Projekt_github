<template>
  <b-container>
    <div class="hello">
      <title>index</title>
        <meta charset="utf-8"/>
          <p></p>
            <b-row class= "justify-content-md-center">
              <b-col sm="3">
                <label> Spieler 1 : <b-form-input type="text" v-model="namefeld" :state="namefeld !=''"/></label>
              </b-col>
            </b-row>
            <b-row class= "justify-content-md-center">
              <b-col sm="3">
                <b-button 
                type="button"
                v-on:click="sendValues"
                class="btn btn-primary"
                block
                >
                </b-button>
              </b-col>
            </b-row>
    </div>
  </b-container>
</template>


</template>

<script>

import io from "socket.io-client";

export default {
  name: "spieler1",
  data:function(){
    return {
      socket: io.connect("http://localhost:3000"),
      result:"",
      namefeld: "",
    };
  },
  props: {
    msg: String
  },
  methods: {
    sendValues(){
      this.socket.emit('addMessage', function(payload))
      }
    },
    mounted(){
      this.socket.on('test',payload =>{
        this.result = payload;
      });
    }
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
</style>
