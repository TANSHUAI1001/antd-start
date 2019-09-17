import axios from 'axios';
import {baseURL} from "./config";


axios.defaults.baseURL = baseURL;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 1000;

axios.interceptors.request.use(config => {
    return config;
},error => {
    return Promise.reject(error);
});

// history.pushState()主要是在不刷新浏览器的情况下，创建新的浏览记录并插入浏览记录队列中
// window.history.pushState("/login");
axios.interceptors.response.use(res => {
    if(res.data.code === '401'){
        console.log(401);
        window.location.href = "/login";
        return false;
    };
    return Promise.resolve(res);
},error => {
    console.log("error");
    // window.location.href = "/login";
    return Promise.reject(error);
});

export default axios;