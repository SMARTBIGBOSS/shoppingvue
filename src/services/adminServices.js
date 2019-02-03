import Api from '@/services/api'

export default {
  postSignin (user) {
    return Api().post('/login/admin', user)
  },
  postSignup (user) {
    return Api().post('/register/admin', user)
  },
  postSignout () {
    return Api().post('/logout/admin')
  }
}
