<template>
  <div id="app">
    <div class="hide-overflow" style="position: relative;">
      <v-toolbar absolute color="teal lighten-3" dark scroll-off-screen scroll-target="#scrolling-techniques">
        <!--<v-toolbar-side-icon></v-toolbar-side-icon>-->
        <v-btn icon to="/">
          <v-icon >home</v-icon>
        </v-btn>
        <v-toolbar-title>Overseas Shopping</v-toolbar-title>

        <v-spacer>
          <!--<v-autocomplete :loading="loading" :items="items" :search-input.sync="search"-->
            <!--v-model="search" cache-items class="mx-3" flat hide-no-data hide-details-->
            <!--label="Search" solo-inverted append-icon="search">-->
          <!--</v-autocomplete>-->
          <v-text-field justify-center
            color="white"
            label="Search"
          ></v-text-field>
        </v-spacer>

        <v-btn icon>
        <v-icon slot="badge" dark small>done</v-icon>
        <v-icon large>account_circle</v-icon>
        </v-btn>

        <v-label>{{UserName}}</v-label>

        <v-btn flat small to="/signin">Sign In</v-btn>
        <v-btn flat small to="/signup">Sign Up</v-btn>

        <v-btn icon>
        <v-badge color="red">
          <span slot="badge" small>{{itemsNum}}</span>
          <v-icon >shopping_cart</v-icon>
        </v-badge>
        </v-btn>

        <v-btn icon>
        <v-badge color="orange">
          <span slot="badge" small>{{notices}}</span>
          <v-icon>mail</v-icon>
        </v-badge>
        </v-btn>

        <v-btn icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
      </v-toolbar>
      <!--<div id="scrolling-techniques" class="scroll-y" style="max-height: 600px;">-->
        <!--<v-container style="height: 1000px;"></v-container>-->
      <!--</div>-->

      <router-view/>

      <!--<v-footer dark height="auto">-->
        <!--<v-card flat tile class="indigo lighten-1 white&#45;&#45;text text-xs-center">-->
          <!--<v-card-text>-->
            <!--<v-btn v-for="icon in icons" :key="icon" class="mx-3 white&#45;&#45;text" icon>-->
              <!--<v-icon size="24px">{{ icons }}</v-icon>-->
            <!--</v-btn>-->
          <!--</v-card-text>-->

          <!--<v-card-text class="white&#45;&#45;text pt-0">-->
            <!--Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus-->
            <!--luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus.-->
            <!--Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel-->
            <!--elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.-->
          <!--</v-card-text>-->

          <!--<v-divider></v-divider>-->

          <!--<v-card-text class="white&#45;&#45;text">&copy;2018 —-->
            <!--<strong>Vuetify</strong>-->
          <!--</v-card-text>-->
        <!--</v-card>-->
      <!--</v-footer>-->
    </div>
    <!--<router-view/>-->
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      UserName: 'UserName',
      itemsNum: 1,
      notices: 10,
      icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-linkedin',
        'fab fa-instagram'
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
