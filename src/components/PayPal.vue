<template>
  <div>
    <div id="paypal-button-container"></div>
    <v-dialog v-model="dialog" hide-overlay persistent width="300">
      <div v-if="success">
        <v-alert :value="true" color="success" icon="check_circle" transition="scale-transition">
          Payment successfuly done.
        </v-alert>
      </div>
      <div v-if="error">
        <v-alert :value="true" color="error" icon="warning" transition="scale-transition">
          Payment failed! Something went wrong.
        </v-alert>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import TransactionService from '@/services/transactionServices'
import PayPal from 'paypal-checkout'
export default {
  name: 'PayPal',
  props: ['amount', 'item', 'shipping'],
  data () {
    return {
      // total: this.amount,
      error: false,
      success: false,
      // product: this.item,
      dialog: false
    }
  },
  watch: {
    dialog (val) {
      if (!val) {
        return val
      } else {
        setTimeout(() => {
          this.dialog = false
          this.$router.go(-1)
        }, 3000)
      }
    }
  },
  methods: {
    sendDataPaypal (creds) {
      // console.log(this.item)
      TransactionService.executePayment(sessionStorage.getItem('id'), creds).then(response => {
        this.dialog = true
        if (response.data.data) {
          console.log(response.data.data)
          this.error = false
          this.success = true
        } else {
          this.success = false
          this.error = true
        }
      })
      console.log(creds)
    }
  },
  mounted () {
    // console.log(this.item)
    // console.log(this.amount)
    // console.log(this.shipping)
    let client = {
      sandbox: 'AdLgswqL1fNcvq_WN6I0MUrGQAh6GQipmTesnnxyE6UJHae_MKG9NaY3R7GBA11WZ90nF8noLkstjsxr'
    }
    let payment = (data, actions) => {
      // console.log(this.item)
      // Make a call to the REST api to create the payment
      return actions.payment.create({
        payment: {
          transactions: [
            {
              item_list: {
                items: [
                  {
                    name: this.item.name,
                    sku: '001',
                    price: this.item.price.toString(),
                    currency: 'EUR',
                    quantity: parseInt(this.item.quantity, 10)
                  }
                ],
                shipping_address: {
                  recipient_name: this.shipping.recipient_name,
                  line1: this.shipping.address,
                  city: this.shipping.city,
                  state: this.shipping.province,
                  postal_code: this.shipping.postal_code,
                  country_code: this.shipping.country,
                  phone: this.shipping.contact_num
                }
              },
              amount: {
                currency: 'EUR',
                // total: "1.00"
                total: this.amount,
                details: {
                  subtotal: this.item.price.toString(),
                  tax: '0',
                  shipping: this.item.shipping_price.toString()
                }
              },
              description: this.item._id
            }
          ]
        }
      })
    }
    let onAuthorize = (data) => {
      var paymentdata = {
        paymentID: data.paymentID,
        payerID: data.payerID,
        amount: this.amount
      }
      this.sendDataPaypal({data: paymentdata})
    }
    PayPal.Button.render({
      env: 'sandbox', // sandbox | production
      commit: true,
      style: {
        label: 'paypal',
        size: 'medium',
        shape: 'pill',
        color: 'gold',
        tagline: false
      },
      client,
      payment,
      onAuthorize

    }, '#paypal-button-container')
  }
}
</script>

<style scoped>

</style>
