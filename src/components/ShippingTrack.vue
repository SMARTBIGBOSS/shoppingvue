<template>
  <div id="shippingtrack">
    <v-layout row warp>
      <v-flex xs12 md10 offset-md1>
        <v-card v-if="show">
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
                <div class="text-xs-left subheading">Tracking Number: {{trackingNum}}</div>
              </v-flex>
              <v-flex xs12 sm6>
                <div class="text-xs-left subheading">Carrier: {{carrier}}</div>
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
            <v-card-title>Tracking Information</v-card-title>
            <v-flex xs12 text-xs-left>
              <a href="https://www.trackingmore.com/" target="_blank">国际小包查询</a>
            </v-flex>
            <v-divider></v-divider>
            <v-card-text>
              <v-timeline align-top dense>
                <v-timeline-item v-for="(track, i) in trackingInfo" :key="i" :color="track.color" :icon="track.icon">
                  <v-layout pt-3>
                    <v-flex xs12 sm3 text-xs-left v-text="track.Date"></v-flex>
                    <v-flex xs12 sm9 text-xs-left v-if="!isEn" v-text="track.StatusDescription"></v-flex>
                    <v-flex xs12 sm9 text-xs-left v-if="isEn" >
                      <div>{{track.Details}}</div><div>Statue: {{track.StatusDescription}}</div>
                    </v-flex>
                  </v-layout>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <template>
              <track-map :geoLocation="geoCode"></track-map>
            </template>
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
import {carriersMap} from '@/configuration/carriersConfig_en'
import GoogleMap from '@/components/GoogleMap'

export default {
  name: 'ShippingTrack',
  props: ['transaction'],
  components: {
    'track-map': GoogleMap
  },
  data () {
    return {
      trans: this.transaction,
      cusName: '',
      shippingID: '',
      trackingNum: '',
      carrier: '',
      desCountry: '',
      trackingInfo: [],
      geoCode: [],
      isEn: true,
      show: false
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
          this.trackingNum = response.data.data.tracking_number
          this.carrier = carriersMap[response.data.data.carrier_code]
          ShippingService.fetchOneTracking(this.trans._id).then(res => {
            this.trackingInfo = res.data.track.origin_info.trackinfo
            if (/.*[\u4e00-\u9fa5]+.*/.test(this.trackingInfo[0].Details)) {
              this.isEn = false
            }
            this.geoCode = res.data.geo
            this.trackingInfo[this.trackingInfo.length - 1].color = 'blue'
            this.trackingInfo[this.trackingInfo.length - 1].icon = 'pin_drop'
            for (let i = 0; i < this.trackingInfo.length - 1; i++) {
              if (this.trackingInfo[i].checkpoint_status === 'delivered') {
                this.trackingInfo[i].color = 'green'
                this.trackingInfo[i].icon = 'beenhere'
              } else {
                this.trackingInfo[i].color = 'grey'
                this.trackingInfo[i].icon = 'local_shipping'
              }
            }
            // console.log(this.trackingInfo)
            console.log(this.geoCode)
            this.show = true
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
