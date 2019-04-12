<template>
  <div id="shippingtrack"></div>
</template>

<script>
export default {
  name: 'ShippingTrack',
  props: ['transaction'],
  data () {
    return {
      transactionID: this.transaction
    }
  }
}
</script>

<style scoped>

</style>
