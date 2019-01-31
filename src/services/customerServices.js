import Api from '@/services/api'

export default {
  postSignin (user) {
    return Api().post('/login/customer', user)
  },
  postSignup (user) {
    return Api().post('/register/customer', user)
  }
}
