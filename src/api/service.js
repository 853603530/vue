import axios from '@/utils/axios';

const api_all = {
    // 登录
    login(username,password) {
        return axios({
            url: '/api/wx/login/',
            method: 'POST',
            data: {
                username: username,
                password: password,
            }
        })
    },
    // 注册
    register(username,password,email) {
        return axios({
            url: '/api/wx/register/',
            method: 'POST',
            data: {
                username: username,
                password: password,
                email: email,
            }
        })
    },
    userInfo() {
        return axios({
            url: '/api/user/userInfo',
            method: 'POST'
        })
    },
    tool_box_free(q,pageindex,pagesize) {
        return axios({
            url: '/api/free/tool/box',
            method: 'POST',
            data: {
                q: q,
                pageindex: pageindex,
                pagesize: pagesize,
            }
        })
    },
    tool_box(q,pageindex,pagesize) {
        return axios({
            url: '/api/data/tool/box',
            method: 'POST',
            data: {
                q: q,
                pageindex: pageindex,
                pagesize: pagesize,
            }
        })
    },
    developer_info(userid) {
        return axios({
            url: '/api/free/developer/info',
            method: 'POST',
            data: {
                userid: userid
            }
        })
    },
    developer_box(userid,uid,pageindex,pagesize) {
        return axios({
            url: '/api/free/developer/box',
            method: 'POST',
            data: {
                userid: userid,
                uid:uid,
                pageindex:pageindex,
                pagesize:pagesize
            }
        })
    },
    subscribe_box(pageindex,pagesize) {
        return axios({
            url: '/api/data/subscribe/box',
            method: 'POST',
            data: {
                pageindex:pageindex,
                pagesize:pagesize
            }
        })
    },
};

export default api_all