import axios from '@/utils/axios';

const api_all = {
    // 获取所有博文列表
    abc(username,password) {
        return axios({
            url: '/api/wx/login/',
            method: 'POST',
            data: {
                username: username,
                password: password,
            }
        })
    }
};

export default api_all