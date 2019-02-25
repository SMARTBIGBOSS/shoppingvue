import Api from '@/services/api'

export default {
  postSignin (user) {
    return Api().post('/login/seller', user)
  },
  postSignup (user) {
    return Api().post('/register/seller', user)
  },
  postAddCatalog (user, catalog) {
    return Api().post(`/catalogue/add/${user}`, catalog)
  },
  fetchAllCatalog (user) {
    return Api().get(`/catalogues/${user}`)
  },
  fetchOneCatalog (id) {
    return Api().get(`/catalogue/${id}`)
  },
  putCatalog (user, id, catalog) {
    return Api().put(`/catalogue/edit/${user}/${id}`, catalog)
  },
  deleteCatalog (id) {
    return Api().delete(`/catalogue/remove/${id}`)
  },
  fetchLogo (id) {

  }
}
