import Vue from 'vue';
import router from './router';
import App from './App';
import store from './store';
import axios from "./api/";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.config.productionTip = false;
Vue.prototype.$api = axios;
Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')