<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
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
        <v-btn flat small v-if="!isshow" @click="showDialog">Sign Out</v-btn>
        <v-btn flat small to="/signup">Sign Up</v-btn>

        <v-btn icon v-if="showCart">
        <v-badge color="red">
          <!--<span slot="badge" small>{{itemsNum}}</span>-->
          <v-icon >shopping_cart</v-icon>
        </v-badge>
        </v-btn>

        <v-btn icon>
        <v-badge color="orange">
          <!--<span slot="badge" small>{{notices}}</span>-->
          <v-icon>mail</v-icon>
        </v-badge>
        </v-btn>

        <v-menu bottom left>
          <template v-slot:activator="{ on }">
            <v-btn dark icon v-on="on">
              <v-icon>more_vert</v-icon>
            </v-btn>
          </template>
          <v-list v-if="loadMenu() === 2" dense dark subheader>
            <v-list-tile v-for="(item, i) in items2" :key="i" @click="goSomewhere(item.title)">
              <v-list-tile-title>{{ item.title }}
                <v-icon small dense subheader>call_made</v-icon>
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
          <v-list v-else-if="loadMenu() === 3"  dense dark subheader>
            <v-list-tile v-for="(item, i) in items3" :key="i" @click="goSomewhere(item.title)">
              <v-list-tile-title>{{ item.title }}
                <v-icon small dense subheader>call_made</v-icon>
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
          <v-list v-else-if="loadMenu() === 1"  dense dark subheader>
            <v-list-tile v-for="(item, i) in items1" :key="i" @click="goSomewhere(item.title)">
              <v-list-tile-title>{{ item.title }}
                <v-icon small dense subheader>call_made</v-icon>
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
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
      showCart: true,
      icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-linkedin',
        'fab fa-instagram'
      ],
      items1: [
        { title: 'Orders' }
      ],
      items2: [
        { title: 'Seller Home' },
        { title: 'Order List' }
      ],
      items3: [
        { title: 'Admin Home' }
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
    this.loadMenu()
  },
  // watch: {
  //   userName () {
  //     console.log(this.userName())
  //   }
  // },
  methods: {
    goSomewhere (title) {
      if (title === 'Orders') {
        this.$router.push('/transactions')
      } else if (title === 'Seller Home') {
        this.$router.push('/seller_home')
      } else if (title === 'Order List') {
        this.$router.push('/transactions')
      } else if (title === 'Admin Home') {
        this.$router.push('/adminHome')
      }
    },
    loadMenu () {
      if (sessionStorage.getItem('role') === 'seller') return 2
      else if (sessionStorage.getItem('role') === 'admin') return 3
      else if (sessionStorage.getItem('role') === 'customer') return 1
      else return 0
    },
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
            this.showCart = false
          } else {
            this.logoExist = false
          }
        })
      } else if (role === 'customer') {
        CustomerService.fetchCustomer(id).then(response => {
          if (response.data.data != null) {
            this.logoURL = response.data.data.logo_id.path
            this.logoExist = true
          } else {
            this.logoExist = false
          }
        })
      } else {
        this.showCart = false
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
