import Api from '@/services/api'

export default {
  getProductByCatalog (user, catalogeId) {
    return Api().get(`/product/${user}/${catalogeId}`)
  },
  postProduct (user, product) {
    return Api().post(`/product/add/${user}`, product)
  },
  deleteProduct (id) {
    return Api().delete(`/product/delete/${id}`)
  },
  fetchOneProduct (id) {
    return Api().get(`/product/${id}`)
  },
  putProduct (user, id, product) {
    return Api().put(`/product/edit/${user}/${id}`, product)
  },
  fetchMainImg (id) {
    return Api().get(`/seller/product/${id}/mainImg`)
  }
}
