import axios from 'axios'; // 导入node_modules里的axios
import qs from 'qs'; //引入数据格式化

//axios.defaults.baseURL = "http://127.0.0.1:8080/"; // 后端接口 ip:port

// 请求拦截器
axios.interceptors.request.use((request) => {
    //在发送请求之前做某件事
    var token = JSON.parse(localStorage.getItem('TOKEN'));
    if (token) {
        token = "TOKEN " + token;
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
    // 错误处理
    return Promise.reject(error);
});


export default axios // 导出axios

