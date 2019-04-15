import Api from '@/services/api'

export default {
  postTracking (tracking) {
    return Api().post('/order/goshipping', tracking)
  },
  fetchOneShipping (transID) {
    return Api().get(`/${transID}/shipping`)
  },
  fetchRealTimeTracking (transID) {
    return Api().get(`/${transID}/realtimetracking`)
  },
  fetchOneTracking (transID) {
    return Api().get(`/${transID}/tracking`)
  }
}
