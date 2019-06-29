import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2'
import VueCurrencyFilter from 'vue-currency-filter'

Vue.use(VueSweetalert2)
Vue.use(VueCurrencyFilter, {
  symbol : 'Rp',
  thousandsSeparator: '.',
  fractionCount : 2,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing : true
})

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
