<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div id="shipping">
    <v-container fluid>
      <v-layout row>
        <v-flex xs12>
          <v-card v-if="isCuatomer">
              <v-card-title class="display-1 pl-3 pt-3">Order List</v-card-title>
              <v-data-table :headers="orderHeaders1" :items="orders" item-key="_id">
                <template v-if="isShowData"  v-slot:items="props">
                  <tr @click="viewShippingTrack">
                    <td class="py-3">
                      <v-avatar :size="60">
                        <img :src="props.item.product_id.detail_id.path[0]" v-if="props.item.detail_id !== null">
                      </v-avatar>
                    </td>
                    <td class="text-xs-left">{{ props.item.product_name }}</td>
                    <td class="text-xs-left">€ {{ props.item.product_price }}</td>
                    <td class="text-xs-center">{{ props.item.payment_statue }}</td>
                    <td class="text-xs-center">{{ props.item.shipping_statue }}</td>
                    <td class="text-xs-center">{{ props.item.last_edit.substring(0,10) }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
          <v-card v-else>
            <v-card-title class="display-1 pl-3 pt-3">Order List</v-card-title>
            <v-data-table :headers="orderHeaders2" :items="orders" item-key="_id">
              <template v-if="isShowData"  v-slot:items="props">
                <tr @click="viewShippingTrack">
                  <td class="py-3">
                    <v-avatar :size="60">
                      <img :src="props.item.product_id.detail_id.path[0]" v-if="props.item.detail_id !== null">
                    </v-avatar>
                  </td>
                  <td class="text-xs-left">{{ props.item.product_name }}</td>
                  <td class="text-xs-left">€ {{ props.item.product_price }}</td>
                  <td class="text-xs-left">{{ props.item.customer_id }}</td>
                  <td class="text-xs-center">{{ props.item.payment_statue }}</td>
                  <td class="text-xs-center">{{ props.item.shipping_statue }}</td>
                  <td class="text-xs-center">{{ props.item.last_edit.substring(0,10)}}</td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import TransactionService from '@/services/transactionServices'
export default {
  name: 'Orders',
  data () {
    return {
      orderHeaders1: [
        {text: 'Image', sortable: false, value: 'image', width: '20%'},
        {text: 'Name', sortable: false, value: 'name', width: '40%'},
        {text: 'Price', value: 'price', width: '5%'},
        {text: 'Payment', value: 'payment_statue', width: '10'},
        {text: 'Shipping', value: 'shipping_statue', width: '10%'},
        {text: 'Date', value: 'last_edit', width: '15%'}
      ],
      orderHeaders2: [
        {text: 'Image', sortable: false, value: 'image', width: '15%'},
        {text: 'Name', sortable: false, value: 'name', width: '30%'},
        {text: 'Price', value: 'price', width: '5%'},
        {text: 'Customer', value: 'customer_id', width: '15%'},
        {text: 'Payment', value: 'payment_statue', width: '10'},
        {text: 'Shipping', value: 'shipping_statue', width: '10%'},
        {text: 'Date', value: 'last_edit', width: '15%'}
      ],
      orders: [],
      isShowData: false,
      isCuatomer: false
    }
  },
  created () {
    this.getOrder()
  },
  methods: {
    getOrder () {
      if (sessionStorage.getItem('role') === 'seller') {
        TransactionService.fetchBySeller(sessionStorage.getItem('id')).then(response => {
          if (response.data.data !== null) {
            this.orders = response.data.data
            this.isCuatomer = false
            this.isShowData = true
            // console.log(this.orders)
          }
        })
      } else if (sessionStorage.getItem('role') === 'customer') {
        TransactionService.fetchByCustomer(sessionStorage.getItem('id')).then(response => {
          if (response.data.data !== null) {
            this.orders = response.data.data
            this.isCuatomer = true
            this.isShowData = true
            // console.log(this.orders)
          }
        })
      }
    },
    viewShippingTrack () {

    }
  }
}
</script>

<style scoped>

</style>
