<template>
  <div id="logistics">
    <div>
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
            <v-card-actions>
              <v-layout row wrap>
                <v-flex xs12 sm8 md4 offset-sm2>
                  <v-text-field v-model="tracking_number" label="Tracking Number" outline></v-text-field>
                </v-flex>
                <v-flex xs12 sm8 md3 offset-sm2 offset-md0>
                  <v-select v-model="selectCarrier" :items="carriers" label="Select carrier" solo></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-btn round color="warning" dark class="text-none" large @click="createShipping">Update</v-btn>
                </v-flex>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
    <div>
      <v-dialog v-model="dialog" hide-overlay persistent width="300">
        <v-alert :value="isSuccess" type="success">{{msg}}</v-alert>
        <v-alert :value="!isSuccess" type="error">{{msg}}</v-alert>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import CustomerService from '@/services/customerServices'
import ShippingService from '@/services/shippingServices'
import {countryMap} from '@/configuration/countryConfig_en'
import {carriersMap, findCarrier} from '@/configuration/carriersConfig_en'

export default {
  name: 'logistics',
  props: ['transaction'],
  data () {
    return {
      trans: this.transaction,
      cusName: '',
      trackingNum: '',
      carrier: '',
      desCountry: '',
      carriers: [
        '4PX', 'Yunda Express', 'ZTO Express', 'YTO Express', 'UPS'
      ],
      selectCarrier: '',
      tracking_number: '',
      carrier_code: '',
      isSuccess: false,
      msg: '',
      dialog: false
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
      ShippingService.fetchOneShipping(this.trans._id).then(response => {
        if (response.data.data) {
          this.trackingNum = response.data.data.tracking_number
          this.carrier = carriersMap[response.data.data.carrier_code]
        }
      })
    },
    createShipping () {
      if (this.tracking_number && this.selectCarrier) {
        this.carrier_code = findCarrier(carriersMap, this.selectCarrier)
        console.log(this.carrier_code)
        let tracking = {
          tracking_number: this.tracking_number,
          carrier_code: this.carrier_code,
          transaction_id: this.trans._id,
          customer_id: this.trans.customer_id,
          seller_id: this.trans.seller_id
        }
        ShippingService.postTracking(tracking).then(response => {
          if (response.data.data) {
            this.msg = 'Shipping created successfully'
            this.isSuccess = true
            this.dialog = true
            setTimeout(() => {
              this.dialog = false
              // this.isSuccess = false
              this.$emit('reset-Order-field', true)
            }, 1500)
          } else {
            this.msg = 'Shipping not created'
            this.isSuccess = false
            this.dialog = true
            setTimeout(() => {
              this.dialog = false
            }, 1500)
          }
        })
      }
    },
    back () {
      this.$router.go(0)
    }
  }
}
</script>

<style scoped>

</style>
