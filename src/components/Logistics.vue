<template>
  <div id="logistics">
    <v-layout row warp>
      <v-flex xs12 md10 offset-md1>
        <v-card>
          <v-card-title class="headline pl-3 pt-3">Trans ID: {{trans._id}}</v-card-title>
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
                <div class="text-xs-left subheading">Last Name: {{trans.lastname}}</div>
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
                <div class="text-xs-left subheading">Country: {{trans.shipping_statue}}</div>
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
              <v-flex xs12 sm8 md6 offset-sm2 offset-md3>
                <v-text-field label="Shipping Number" outline></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-btn round color="warning" dark class="text-none" large>Update</v-btn>
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import CustomerService from '@/services/customerServices'
export default {
  name: 'logistics',
  props: ['transaction'],
  data () {
    return {
      trans: this.transaction,
      cusName: '',
      shippingID: ''
    }
  },
  created () {
    this.getCustomerName()
  },
  methods: {
    getCustomerName () {
      CustomerService.fetchCustomer(this.trans.customer_id).then(response => {
        if (response.data.data) {
          this.cusName = response.data.data.name
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
