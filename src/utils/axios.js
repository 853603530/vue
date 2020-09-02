import axios from 'axios'; // 导入node_modules里的axios
import qs from 'qs'; //引入数据格式化
import router from '../router';

//axios.defaults.baseURL = "http://127.0.0.1:8080/"; // 后端接口 ip:port

// 请求拦截器
axios.interceptors.request.use((request) => {
    //在发送请求之前做某件事
    var token = localStorage.getItem('Authorization');
    if (token) {
        request.headers.common['Authorization'] = token;
    }
    if(request.method  === 'post'){
        request.data = qs.stringify(request.data);
    }
    return request;
},(error) =>{
    console.log('错误的传参');
    return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(function (response) {
    // 所有请求完成后都要执行的操作
    return response;
}, function (error) {
    if (error.response && error.response.data.url==='/user/userInfo') {
        switch (error.response.status) {
            case 401:
                // 返回 401 清除token信息并跳转到登录页面
                //store.commit(types.LOGOUT);
                router.replace({
                    path: 'index',
                    query: {redirect: router.currentRoute.fullPath}
                })
                break;
            case 404:
                // 返回 401 清除token信息并跳转到登录页面
                //store.commit(types.LOGOUT);
                router.replace({
                    path: 'index',
                    query: {redirect: router.currentRoute.fullPath}
                })
        }
    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
});


export default axios // 导出axios

