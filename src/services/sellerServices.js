import Api from '@/services/api'

export default {
  postSignin (user) {
    return Api().post('/login/seller', user)
  },
  postSignup (user) {
    return Api().post('/register/seller', user)
  }
}
