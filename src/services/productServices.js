import Api from '@/services/api'

export default {
  getProductByCatalog (seller, catalogeId) {
    return Api().get(`/${seller}/product/${catalogeId}`)
  },
  postProduct (seller, product) {
    return Api().post(`/${seller}/product/add`, product)
  },
  deleteProduct (id) {
    return Api().delete(`/product/delete/${id}`)
  },
  fetchOneProduct (id) {
    return Api().get(`/product/${id}`)
  },
  putProduct (seller, id, product) {
    return Api().put(`/${seller}/product/edit/${id}`, product)
  },
  fetchMainImg (id) {
    return Api().get(`/seller/product/${id}/mainImg`)
  }
}
