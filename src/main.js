import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

import {init} from './util/tools'

// import VueVirtualScroller from 'vue-virtual-scroller'
// import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
// Vue.use(VueVirtualScroller)
Vue.use(ViewUI);
Vue.config.productionTip = false
init();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
