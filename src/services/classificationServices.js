import Api from '@/services/api'

export default {
  fetchActiveClasByType (type) {
    return Api().get(`/admin/classification/type_active/${type}`)
  },
  fetchClasByType (admin, type) {
    return Api().get(`/admin/${admin}/classification/type/${type}`)
  },
  postClassification (admin, classi) {
    return Api().post(`/admin/${admin}/classification`, classi)
  },
  putClassification (admin, id, classi) {
    return Api().put(`/admin/${admin}/classification/${id}`, classi)
  },
  deleteClassification (admin, id) {
    return Api().delete(`/admin/${admin}/classification/${id}`)
  }
}
