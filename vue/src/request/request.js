import axios from "axios";
const instance = axios.create({
    //发x-www请求
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    baseURL: 'http://127.0.0.1:8888',
    timeout: 4000//超时时间
})
// 请求拦截器
instance.interceptors.request.use(
    config => {
        let token=localStorage.getItem('book_token');
        if(token){
            config.headers['Authorization']=token;//请求头中设置token
        }
        return config;//响应请求的参数
    },
    error => { }
)
// 响应拦截器
instance.interceptors.response.use(
    success => {
        return success.data;
    },
    error => { }
)
export default instance