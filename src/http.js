import axios from "axios";
// 添加请求拦截器
axios.interceptors.request.use(function(config) {
    // ⭐在发送请求之前做些什么
    config.headers["authorization"] = window.localStorage.getItem("authorization");
    config.headers["content-type"] = "application/json";
    //⭐⭐图像请求头的处理
    if (config.method === "post" && config.url.includes("/api/img")) {
        config.headers["content-type"] = "multipart/form-data"
    }
    // console.log(config);
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
        // 对响应数据做点什么
        // console.log(response);
        // 这是个response对象，如果不需要的话，就直接返回response.data吧

        // return JSON.parse(response.data);
        return response;
    },
    function(error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    });