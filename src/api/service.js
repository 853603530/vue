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
    register(username,password,email,code,userType) {
        return axios({
            url: '/api/wx/register/',
            method: 'POST',
            data: {
                username: username,
                password: password,
                email: email,
                code:code,
                userType:userType
            }
        })
    },
    subscribe_add(box_id,subscribe_id) {
        return axios({
            url: '/api/data/subscribe/add',
            method: 'POST',
            data: {
                box_id: box_id,
                subscribe_id: subscribe_id
            }
        })
    },
    subscribe_del(box_id,subscribe_id) {
        return axios({
            url: '/api/data/subscribe/del',
            method: 'POST',
            data: {
                box_id: box_id,
                subscribe_id: subscribe_id
            }
        })
    },
    box_enable(box_id,subscribe_id) {
        return axios({
            url: '/api/data/box/enable',
            method: 'POST',
            data: {
                box_id: box_id,
                subscribe_id: subscribe_id
            }
        })
    },
    box_disabled(box_id,subscribe_id) {
        return axios({
            url: '/api/data/box/disabled',
            method: 'POST',
            data: {
                box_id: box_id,
                subscribe_id: subscribe_id
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
    developer_box_auth(pageindex,pagesize) {
        return axios({
            url: '/api/data/developer/box',
            method: 'POST',
            data: {
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
    create_tool() {
        return axios({
            url: '/api/data/create/tool',
            method: 'POST'
        })
    },
    update_tool(id,title,url,js,css,desc) {
        return axios({
            url: '/api/data/update/tool',
            method: 'POST',
            data: {
                id:id,
                title:title,
                url:url,
                js:JSON.stringify(js),
                css:JSON.stringify(css),
                desc:desc,
            }
        })
    },
    edit_tool(id) {
        return axios({
            url: '/api/data/edit/tool',
            method: 'POST',
            data: {
                id:id,
            }
        })
    },
    audit_tool(id) {
        return axios({
            url: '/api/data/audit/tool',
            method: 'POST',
            data: {
                id:id,
            }
        })
    },
    check_email(email) {
        return axios({
            url: '/api/free/check/email',
            method: 'POST',
            data: {
                email:email,
            }
        })
    },
    check_code(email) {
        return axios({
            url: '/api/free/email/code',
            method: 'POST',
            data: {
                email:email,
            }
        })
    },
};

export default api_all