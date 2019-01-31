import Api from '@/services/api'

export default {
  postSignin (user) {
    return Api().post('/login/admin', user)
  }
}
