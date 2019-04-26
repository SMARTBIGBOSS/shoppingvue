import Api from '@/services/api'

export default {
  postSignin (user) {
    return Api().post('/login/admin', user)
  },
  // postSignup (user) {
  //   return Api().post('/register/admin', user)
  // },
  postSignout () {
    return Api().post('/logout/admin')
  },
  fetchAdmin (id) {
    return Api().get(`/admin/${id}`)
  },
  putEditWithPass (id, admin) {
    return Api().post(`/admin/${id}/editwithpass`, admin)
  },
  putEditWithoutPass (id, admin) {
    return Api().post(`/admin/${id}/editwithoutpass`, admin)
  }
}
