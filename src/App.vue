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
        <!--<v-icon slot="badge" dark small>done</v-icon>-->
        <v-icon large v-if="!logoExist">account_circle</v-icon>
          <v-avatar size="30px" class="mb-3" v-else>
            <img :src="logoURL">
          </v-avatar>
        </v-btn>

        <v-btn flat small @click="showAccount">{{userName}}</v-btn>

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
        <template>
          <signout :dialog="dialog" @update-dialog="updateDialog"></signout>
        </template>
        <router-view/>
      </v-app>
    </div>
  </div>
</template>

<script>
import SellerService from '@/services/sellerServices'
import CustomerService from '@/services/customerServices'
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
      userName: 'Welcome',
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
      isshow: true,
      user_id: '',
      user_role: '',
      logoURL: '',
      logoExist: false
    }
  },
  created () {
    this.loadToolbar()
    this.getLogo()
  },
  // watch: {
  //   userName () {
  //     console.log(this.userName())
  //   }
  // },
  methods: {
    // reload () {
    //   return true
    // },
    loadToolbar () {
      // console.log(this.$cookies.get('user'))
      if (sessionStorage.getItem('id') === null) {
        this.isshow = true
      } else {
        this.isshow = false
        this.userName = sessionStorage.getItem('name')
        this.user_id = sessionStorage.getItem('id')
        this.user_role = sessionStorage.getItem('role')
        // console.log(this.user_id)
        this.getLogo(this.user_id, this.user_role)
      }
    },
    getLogo (id, role) {
      if (role === 'seller') {
        SellerService.fetchSeller(id).then(response => {
          if (response.data.data != null) {
            this.logoURL = response.data.data.logo_id.path
            this.logoExist = true
          } else {
            this.logoExist = false
          }
        })
      }
      if (role === 'customer') {
        CustomerService.fetchCustomer(id).then(response => {
          if (response.data.data != null) {
            this.logoURL = response.data.data.logo_id.path
            this.logoExist = true
          } else {
            this.logoExist = false
          }
        })
      }
    },
    showAccount () {
      if (sessionStorage.getItem('id') === null) {
        this.$router.push('/signin')
      } else {
        this.$router.push({path: '/showAccount'})
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
