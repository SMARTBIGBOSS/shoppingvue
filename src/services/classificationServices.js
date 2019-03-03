import Api from '@/services/api'

export default {
  fetchActiveClasByType (type) {
    return Api().get(`/admin/classification/type_active/${type}`)
  },
  fetchActiveClasByRegion (region) {
    return Api().get(`/admin/classification/region_active/${region}`)
  },
  fetchClasByType (type) {
    return Api().get(`/admin/classification/type/${type}`)
  },
  fetchClasByRegion (region) {
    return Api().get(`/admin/classification/region/${region}`)
  },
  postClassification (admin, classi) {
    return Api().post(`/admin/${admin}/classification`, classi)
  },
  putClassification (admin, id, classi) {
    return Api().put(`/admin/${admin}/classification/${id}`, classi)
  },
  deleteClassification (id) {
    return Api().delete(`/admin/classification/${id}`)
  }
}
