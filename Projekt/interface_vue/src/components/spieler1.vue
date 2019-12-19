<template>
  <div class="hello">
    
   
  </div>
</template>

<script>

import io from "socket.io-client";

export default {
  name: 'spieler1',
  data:function(){
    return {
      socket: io.connect("http://localhost:3000"),
      result:"",
    };
  },
  props: {
    msg: String
  },
  methods: {
    sendValues(){
      this.socket.emit("addMessage", function(payload))
      }
    },
    mounted(){
      this.socket.on("test",payload =>{
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
