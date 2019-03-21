<template>
  <div class="homepage">
    <v-layout column>
      <div id="toolbar">

      </div>
      <div id="advertise">
        <v-layout justify-center>
          <v-flex xs12 sm6>
            <v-carousel>
              <v-carousel-item v-for="(item,i) in items" :key="i">
                <img src="item.src" style="width:200px;height:auto;">
              </v-carousel-item>
            </v-carousel>
          </v-flex>
        </v-layout>
      </div>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data () {
    return {
      items: [
        {src: '/static/advertise/1.jpg'},
        {src: '/static/advertise/2.jpg'},
        {src: '/static/advertise/3.jpg'},
        {src: '/static/advertise/4.jpg'},
        {src: '/static/advertise/5.jpg'},
        {src: '/static/advertise/6.jpg'}
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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
