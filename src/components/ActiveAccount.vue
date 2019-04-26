<template>
    <div id="active">
      <div v-if="isActive">
        <h1>Your Account is Active.</h1>
        <h1>Now You can Login Your Account.</h1>
      </div>
      <div v-else>
        <h2>{{errMsg}}</h2>
      </div>
    </div>
</template>

<script>
import CustomerService from '@/services/customerServices'
import SellerService from '@/services/sellerServices'

export default {
  name: 'ActiveAccount',
  data () {
    return {
      isActive: false,
      errMsg: ''
    }
  },
  created () {
    console.log(this.$route.path === '/active/customer')
    if (this.$route.path === '/active/customer') {
      CustomerService.activeAccount(this.$route.query.code).then(respond => {
        if (respond.data.data !== null) {
          this.isActive = true
        } else {
          this.errMsg = respond.data.message
        }
        // console.log(respond.data)
      })
    } else if (this.$route.path === '/active/seller') {
      SellerService.activeAccount(this.$route.query.code).then(respond => {
        if (respond.data.data !== null) {
          this.isActive = true
        } else {
          this.errMsg = respond.data.message
        }
        // console.log(respond.data)
      })
    }
  }
}
</script>

<style scoped>

</style>
