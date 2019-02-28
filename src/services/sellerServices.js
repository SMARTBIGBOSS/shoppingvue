import Api from '@/services/api'

export default {
  postSignin (seller) {
    return Api().post('/login/seller', seller)
  },
  postSignup (seller) {
    return Api().post('/register/seller', seller)
  },
  postAddCatalog (seller, catalog) {
    return Api().post(`/${seller}/catalogue/add`, catalog)
  },
  fetchAllCatalog (seller) {
    return Api().get(`/${seller}/catalogues`)
  },
  fetchOneCatalog (id) {
    return Api().get(`/:seller/catalogue/${id}`)
  },
  putCatalog (seller, id, catalog) {
    return Api().put(`/${seller}/catalogue/edit/${id}`, catalog)
  },
  deleteCatalog (id) {
    return Api().delete(`/catalogue/remove/${id}`)
  },
  fetchLogo (id) {

  },
  fetchSeller (sellerId) {
    return Api().get(`/seller/${sellerId}`)
  },
  putSellerWithoutPass (id, seller) {
    return Api().put(`/seller/${id}/editwithoutpass`, seller)
  },
  putSellerWithPass (id, seller) {
    return Api().put(`/seller/${id}/edit`, seller)
  }
}
