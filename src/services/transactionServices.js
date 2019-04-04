import Api from '@/services/api'

export default {
  executePayment (customerId, payment) {
    return Api().post(`/${customerId}/product/executepayment`, payment)
  },
  successPayment () {
    return Api().get('/success')
  }
}
