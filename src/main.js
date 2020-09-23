import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {init} from './util/tools'

// import VueVirtualScroller from 'vue-virtual-scroller'
// import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
// Vue.use(VueVirtualScroller)

Vue.config.productionTip = false
init();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
