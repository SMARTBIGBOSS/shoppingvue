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
  props: ['amount', 'item'],
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
      if (!val) return

      setTimeout(() => (this.dialog = false), 4000)
    }
  },
  methods: {
    sendDataPaypal (creds) {
      // console.log(this.item)
      TransactionService.executePayment(sessionStorage.getItem('id'), creds).then(response => {
        this.dialog = true
        if (response.data.data) {
          console.log(response.data.data)
          this.success = true
        } else {
          this.error = true
        }
      })
      console.log(creds)
    }
  },
  mounted () {
    console.log(this.item.price)
    console.log(this.amount)
    let client = {
      sandbox: 'AdLgswqL1fNcvq_WN6I0MUrGQAh6GQipmTesnnxyE6UJHae_MKG9NaY3R7GBA11WZ90nF8noLkstjsxr'
    }
    let payment = (data, actions) => {
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
                    price: this.item.price,
                    currency: 'EUR',
                    quantity: parseInt(this.item.quantity, 10)
                    // name: "item",
                    // sku: "item",
                    // price: "1.00",
                    // currency: "USD",
                    // quantity: 1
                  }
                ]
              },
              amount: {
                currency: 'EUR',
                // total: "1.00"
                total: this.amount
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

      client,
      payment,
      onAuthorize

    }, '#paypal-button-container')
  }
}
</script>

<style scoped>

</style>
