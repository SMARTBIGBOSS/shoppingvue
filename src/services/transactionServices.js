import Api from '@/services/api'

export default {
  executePayment (customerId, payment) {
    return Api().post(`/${customerId}/product/executepayment`, payment)
  },
  fetchByCustomer (customer) {
    return Api().get(`/${customer}/orders`)
  },
  fetchBySeller (seller) {
    return Api().get(`/${seller}/orderslist`)
  }
}
