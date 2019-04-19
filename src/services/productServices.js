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
  fetchAllProducts () {
    return Api().get('/products')
  },
  putProduct (seller, id, product) {
    return Api().put(`/${seller}/product/edit/${id}`, product)
  },
  putDetailImage (seller, id, images) {
    return Api().put(`/${seller}/product/${id}/productDetail`, images)
  },
  putBodyImage (seller, id, image) {
    return Api().put(`/${seller}/product/${id}/productBody`, image)
  },
  fetchByRegion (rId) {
    return Api().get(`/product/region/${rId}`)
  },
  fetchByRegionAndCatalog (rId, cId) {
    return Api().get(`/product/${rId}/${cId}`)
  }
}
