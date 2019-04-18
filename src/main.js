// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueLazyload from 'vue-lazyload'
import * as VueGoogleMaps from 'vue2-google-maps'
import {googleMapKey} from './keys'

Vue.use(Vuetify)
Vue.use(VueLazyload)

Vue.config.productionTip = false

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '../static/images/error.jpg',
  loading: '../static/images/loading.gif',
  attempt: 1
})

Vue.use(VueGoogleMaps, {
  load: {
    key: googleMapKey,
    libraries: 'places,drawing'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
