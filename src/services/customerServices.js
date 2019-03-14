import Api from '@/services/api'

export default {
  postSignin (user) {
    return Api().post('/login/customer', user)
  },
  postSignup (user) {
    return Api().post('/register/customer', user)
  },
  fetchCustomer (id) {
    return Api().get(`/customer/${id}`)
  },
  putCustomerWithoutPass (id, customer) {
    return Api().put(`/customer/${id}/editwithoutpass`, customer)
  },
  putCustomerWithPass (id, customer) {
    return Api().put(`/customer/${id}/edit`, customer)
  },
  fetchAddresses (id) {
    return Api().get(`/customer/${id}/addresses`)
  },
  postAddress (id, address) {
    return Api().post(`/customer/${id}/address/add`, address)
  },
  fetchOneAddress (id) {
    return Api().get(`/customer/address/${id}`)
  },
  putAddress (customer, id, address) {
    return Api().put(`/customer/${customer}/address/${id}/edit`, address)
  },
  deleteAddress (id) {
    return Api().delete(`/customer/address/${id}`)
  },
  postLogo (id, logo) {
    return Api().post(`/customer/${id}/uploadLogo`, logo)
  },
  fetchLogo (id) {
    return Api().get(`/customer/${id}/logo`)
  }
}
