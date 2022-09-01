import axios from 'axios'
// import store from './store';

// 创建axios实例
const ins = axios.create({
    baseURL: "https://mallapi.duyiedu.com/",
});

ins.interceptors.request.use((request) => {
    console.log(request);
    return request;
    // if (resp.url.includes('/passport')) {
    //     return resp;
    // }
    // return {
    //     ...resp,
    //     params: {
    //         ...resp,
    //         appkey: store.state.user.appkey,
    //     }
    // }
}, (error) => Promise.reject(error));

ins.interceptors.response.use((response) => {
    if (response.data.status !== 'fail') {
        return response.data.data;
    } else {
        return response.data.msg;
    }
}, (error) => Promise.reject(error));

export default ins;