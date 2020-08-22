import Vue from 'vue';
import router from './router';
import App from './App';
import store from './store';
import axios from "./api/";

Vue.config.productionTip = false;
Vue.prototype.$api = axios;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')