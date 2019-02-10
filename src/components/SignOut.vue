<template>
  <div id="signout">
  <v-layout row justify-center>

    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Sign Out</v-card-title>

        <v-card-text>Are you sure to sign out?</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" flat="flat" @click="cancelDialog">Cancel</v-btn>

          <v-btn color="green darken-1" flat="flat" @click="signOut">Sign Out</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
  </div>
</template>

<script>
import adminService from '@/services/adminServices'
import Vue from 'vue'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)

export default {
  name: 'SignOut',
  props: ['dialog'],
  data () {
    return {
      openStatus: this.dialog
    }
  },
  methods: {
    cancelDialog () {
      this.openStatus = false
      this.$emit('update-dialog', this.openStatus)
    },
    signOut () {
      adminService.postSignout().then(response => {
        this.$cookies.remove('user')
        this.openStatus = false
        this.$emit('update-dialog', this.openStatus)
        this.$router.go(0)
        this.$router.push('/')
      })
    }
  }
}
</script>

<style scoped>
  #signout{
    min-width: 500px;
    margin-top: 100px;
  }
</style>
