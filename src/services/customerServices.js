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
  }
}
