<template>
  <div id="app">
    <div class="hide-overflow" style="position: relative;">
      <v-app>
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
          <!--<v-text-field justify-center-->
            <!--color="white"-->
            <!--label="Search"-->
          <!--&gt;</v-text-field>-->
        </v-spacer>

        <v-btn icon>
        <v-icon slot="badge" dark small>done</v-icon>
        <v-icon large>account_circle</v-icon>
        </v-btn>

        <v-label @click="showAccount">{{userName}}</v-label>

        <v-btn flat small to="/signin" v-if="isshow">Sign In</v-btn>
        <v-btn flat small to="/signout" v-if="!isshow" @click="showDialog">Sign Out</v-btn>
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
      <signout :dialog="dialog" @update-dialog="updateDialog"></signout>

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
      </v-app>
    </div>
    <!--<router-view/>-->
  </div>
</template>

<script>
import SignOut from '@/components/SignOut'
import Vue from 'vue'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)

export default {
  name: 'App',
  components: {
    'signout': SignOut
  },
  data () {
    return {
      userName: 'UserName',
      isLogged: 'NO',
      itemsNum: 1,
      notices: 10,
      icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-linkedin',
        'fab fa-instagram'
      ],
      dialog: false,
      isshow: false
    }
  },
  created () {
    this.loadToolbar()
  },
  methods: {
    loadToolbar () {
      // console.log(this.$cookies.get('user'))
      if (this.$cookies.get('user') === null) {
        this.isshow = true
      } else {
        this.isshow = false
        this.userName = this.$route.query.userName
        this.getLogo(this.$route.query._id, this.$route.query.role)
      }
    },
    getLogo (id, role) {
      if (role === 'seller') {

      }
      if (role === 'customer') {

      }
    },
    showAccount () {
      if (this.$cookies.get('user') === null) {
        this.router.push('/signin')
      } else {
        this.router.push('/showAccount')
      }
    },
    showDialog () {
      this.dialog = true
    },
    updateDialog (dialog) {
      this.dialog = dialog
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
