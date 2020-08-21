import Vue from 'vue'
import router from './router'
import login from '@/components/login';

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(login),
}).$mount('#app')