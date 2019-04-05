<template>
  <div id="transactionform">
    <v-container fluid grid-list-md>
      <v-layout row justify-center wrap>
        <v-flex xs12 md6>
          <v-card id="payment" flat v-if="isLoaded">
            <v-card-title class="display-1 pl-5 pt-5">Billing</v-card-title>
            <!--<v-layout align-start justify-space-around fill-height>-->
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs12 sm3>
                  <v-img :src="productImg" height="50px" :aspect-ratio="1" contain/>
                </v-flex>
                <v-flex xs8 sm6>
                  <p class="title left">{{targetProduct.name}}</p>
                </v-flex>
                <v-flex xs4 sm3>
                  <p class="title right">€{{targetProduct.price}}</p>
                </v-flex>
              </v-layout>
            </v-card-text>
                <v-divider></v-divider>
            <v-card-text>
              <v-flex xs12>
                <v-list>
                  <v-list-tile v-for="item in productInfo" :key="item.text">
                    <v-list-tile-content>
                      <v-list-tile-title v-text="item.text"></v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-content>
                      <v-list-tile-title class="text-xs-right" v-text="item.value"></v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-flex>
            </v-card-text>
                <v-divider></v-divider>
            <v-card-text>
              <v-flex xs12>
                <v-list>
                    <v-list-tile-title class="headline">Total</v-list-tile-title>
                    <v-list-tile-title class="headline text-xs-right">€{{total}}</v-list-tile-title>
                </v-list>
              </v-flex>
            </v-card-text>
            <v-card-actions>
              <!--<PayPal :amount="total" :button-style="myStyle" :currency="currency" :client="paypal" env="sandbox"-->
                      <!--v-on:payment-authorized="paymentAuthorized"-->
                      <!--v-on:payment-completed="paymentCompleted"-->
                      <!--v-on:payment-cancelled="paymentCancelled">-->
              <!--&lt;!&ndash;<PayPal>&ndash;&gt;-->
                <!--&lt;!&ndash;<div id="paypal-button"></div>&ndash;&gt;-->
                <!--&lt;!&ndash;<div v-if="success" class="alert alert-success">&ndash;&gt;-->
                  <!--&lt;!&ndash;<strong>Success!</strong> Payment successfuly done&ndash;&gt;-->
                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                <!--&lt;!&ndash;<div v-if="error" class="alert alert-danger">&ndash;&gt;-->
                  <!--&lt;!&ndash;<strong>Ooops!</strong>  something went wrong&ndash;&gt;-->
                <!--&lt;!&ndash;</div>&ndash;&gt;-->
              <!--</PayPal>-->
            </v-card-actions>
          </v-card>
          <v-card v-else>
            <v-card-title>{{errorMsg}}</v-card-title>
          </v-card>
        </v-flex>
        <v-flex xs12 md6>
          <v-card>
            <v-card-title class="display-1 pl-5 pt-5">Payment</v-card-title>
            <v-card-text class="title text-xs-left">Shipping address</v-card-text>
            <v-card-text>
              <!--<div class="title"></div>-->
              <v-form ref="form" v-model="valid" lazy-validation dark>
                <v-layout row>
                  <v-flex xs12 md6>
                    <v-text-field v-model="firstName" :rules="[() => !!firstName || 'This field is required']"
                                  label="First name" required outline></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field v-model="lastName" :rules="[() => !!lastName || 'This field is required']"
                                  label="Last name" required outline></v-text-field>
                  </v-flex>
                </v-layout>

                <v-text-field v-model="address" :rules="[() => !!address || 'This field is required']"
                              label="Address" required outline></v-text-field>
                <v-layout row>
                  <v-flex xs12 md6>
                    <v-select v-model="country" :items="countries" :rules="[() => !!country || 'This field is required']"
                              label="Country" required outline></v-select>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field v-model="province" :rules="[() => !!province || 'This field is required']"
                                  label="Province/Territory/County/State" required outline></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs12 md6>
                    <v-text-field v-model="city" :rules="[() => !!city || 'This field is required']"
                                  label="City/Town" required outline></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field v-model="post_code" :rules="[() => !!post_code || 'This field is required']"
                                  label="Post Code" required outline></v-text-field>
                  </v-flex>
                </v-layout>

                <v-text-field v-model="contact_num" :rules="[() => !!contact_num || 'This field is required']"
                              label="Contact Number" required outline></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn v-if="!toPay" class="text-none" color="blue lighten-2" :disabled="!valid" @click="confirmOrder">Confirm order</v-btn>
              <v-spacer></v-spacer>
              <template v-if="toPay">
                <paypal :amount="total" :item="targetProduct" :shipping="shipping"></paypal>
              </template>
            </v-card-actions>
          </v-card>
        </v-flex>
    </v-layout>
    </v-container>
  </div>
</template>

<script>
import ProductService from '@/services/productServices'
// import TransactionService from '@/services/transactionServices'
import Paypal from '@/components/PayPal'
// import PayPal from 'vue-paypal-checkout'
export default {
  name: 'Transaction',
  data () {
    return {
      // paypal: {
      //   sandbox: 'AdLgswqL1fNcvq_WN6I0MUrGQAh6GQipmTesnnxyE6UJHae_MKG9NaY3R7GBA11WZ90nF8noLkstjsxr'
      // },
      // currency: 'EUR',
      // myStyle: {
      //   label: 'paypal',
      //   size: 'medium',
      //   shape: 'pill',
      //   color: 'gold',
      //   tagline: false
      // },
      // error: false,
      // success: false,
      isLoaded: false,
      toPay: false,
      targetProduct: '',
      shipping: {},
      productImg: this.$route.params.img,
      productInfo: null,
      quantity: this.$route.params.quantity,
      total: '',
      errorMsg: '',
      valid: true,
      countries: [
        'China',
        'Ireland'
      ],
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      province: '',
      country: '',
      country_code: '',
      contact_num: '',
      post_code: ''
    }
  },
  components: {
    // PayPal
    'paypal': Paypal
  },
  created () {
    this.getProduct()
  },
  methods: {
    getProduct: function () {
      // console.log(this.$route.params)
      ProductService.fetchOneProduct(this.$route.params.productId).then(response => {
        if (response.data.data) {
          this.targetProduct = response.data.data
          this.targetProduct.quantity = this.quantity
          this.productInfo = [
            {text: 'Quantity', value: this.$route.params.quantity},
            {text: 'Type', value: this.targetProduct.class_type_id.subtitle},
            {text: 'Region', value: this.targetProduct.class_region_id.subtitle},
            {text: 'Subtotal', value: this.targetProduct.price},
            {text: 'Shipping', value: this.targetProduct.shipping_price}
          ]
          this.total = (this.targetProduct.shipping_price + this.targetProduct.price * parseInt(this.quantity, 10)).toString()
          this.isLoaded = true
          // console.log(this.targetProduct)
        } else {
          this.errorMsg = 'Lose product'
          this.isLoaded = false
        }
      })
    },
    confirmOrder () {
      if (this.country === 'Ireland') {
        this.country_code = 'IE'
      } else if (this.country === 'China') {
        this.country_code = 'C2'
      }
      let name = this.firstName + ' ' + this.lastName
      this.shipping = {
        recipient_name: name,
        address: this.address,
        city: this.city,
        province: this.province,
        country: this.country_code,
        postal_code: this.post_code,
        contact_num: this.contact_num
      }
      // console.log(this.shipping)
      this.toPay = true
    }
  }
}
</script>

<style scoped>

</style>
