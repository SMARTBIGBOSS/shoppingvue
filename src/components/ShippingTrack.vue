<template>
  <div id="shippingtrack">
    <v-layout row warp>
      <v-flex xs12 md10 offset-md1>
        <v-card>
          <v-card-title class="headline pl-3 pt-3">
            <v-btn flat @click="back">
              <v-icon x-large color="blue darken-2">arrow_back</v-icon>
            </v-btn>
            Trans ID: {{trans._id}}
          </v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12>
                <div class="text-xs-left title pb-2">Order Information</div>
              </v-flex>
              <v-flex xs12>
                <div class="text-xs-left subheading">Customer: {{cusName}}</div>
              </v-flex>
              <v-flex xs12 sm6>
                <div class="text-xs-left subheading">Product: {{trans.product_name}}</div>
              </v-flex>
              <v-flex xs12 sm6>
                <div class="text-xs-left subheading">Quantity: {{trans.quantity}}</div>
              </v-flex>
              <v-flex xs12 sm6>
                <div class="text-xs-left subheading">Payment: {{trans.paymentId}}</div>
              </v-flex>
              <v-flex xs12 sm6>
                <div class="text-xs-left subheading">Payment Statue: {{trans.payment_statue}}</div>
              </v-flex>
              <v-flex xs12 sm6>
                <div class="text-xs-left subheading">Shipping: {{shippingID}}</div>
              </v-flex>
              <v-flex xs12 sm6>
                <div class="text-xs-left subheading">Shipping Statue: {{trans.shipping_statue}}</div>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12>
                <div class="text-xs-left title pb-2">Shipping Information</div>
              </v-flex>
              <v-flex xs12 sm6>
                <div class="text-xs-left subheading">First Name: {{trans.firstName}}</div>
              </v-flex>
              <v-flex xs12 sm6>
                <div class="text-xs-left subheading">Last Name: {{trans.lastName}}</div>
              </v-flex>
              <v-flex xs12>
                <div class="text-xs-left subheading">Address: {{trans.address}}</div>
              </v-flex>
              <v-flex xs12 sm6>
                <div class="text-xs-left subheading">City: {{trans.city}}</div>
              </v-flex>
              <v-flex xs12 sm6>
                <div class="text-xs-left subheading">Province/Territory/County/State: {{trans.province}}</div>
              </v-flex>
              <v-flex xs12 sm6>
                <div class="text-xs-left subheading">Destination Country: {{desCountry}}</div>
              </v-flex>
              <v-flex xs12 sm6>
                <div class="text-xs-left subheading">Postal Code: {{trans.postal_code}}</div>
              </v-flex>
              <v-flex xs12 sm6>
                <div class="text-xs-left subheading">Phone Number: {{trans.contact_num}}</div>
              </v-flex>
              <v-flex xs12 sm6>
                <div class="text-xs-left subheading">Email: {{trans.email}}</div>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <!--<v-timeline>-->
              <!--<v-timeline-item-->
                <!--v-for="(year, i) in trackingInfo"-->
                <!--:key="i"-->
                <!--:color="year.color"-->
                <!--small-->
              <!--&gt;-->
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import CustomerService from '@/services/customerServices'
import ShippingService from '@/services/shippingServices'
import {countryMap} from '@/configuration/countryConfig_en'

export default {
  name: 'ShippingTrack',
  props: ['transaction'],
  data () {
    return {
      trans: this.transaction,
      cusName: '',
      shippingID: '',
      desCountry: '',
      trackingInfo: []
    }
  },
  created () {
    this.getCustomerName()
    this.getCountry()
    this.getShipping()
  },
  methods: {
    getCustomerName () {
      CustomerService.fetchCustomer(this.trans.customer_id).then(response => {
        if (response.data.data) {
          this.cusName = response.data.data.name
        }
      })
    },
    getCountry () {
      this.desCountry = countryMap[this.trans.country_code]
    },
    getShipping () {
      // let transID = {'transaction_id': this.trans._id}
      // console.log(transID.transaction_id)
      ShippingService.fetchOneShipping(this.trans._id).then(response => {
        // console.log(response)
        if (response.data.data) {
          this.shippingID = response.data.data._id
          // ShippingService.fetchRealTimeTracking(this.trans._id).then(response => {
          ShippingService.fetchOneTracking(this.trans._id).then(track => {
            console.log(track.data.track.origin_info.trackinfo)
            // this.trackingInfo = response.data
          })
        }
      })
    },
    back () {
      this.$router.go(0)
    }
  }
}
</script>

<style scoped>

</style>
