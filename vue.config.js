// const px2rem = require("postcss-px2rem");
if (process.env.NODE_ENV === 'production') {
    console.log("生踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩");
}
module.exports = {
    css: {
        extract: false
    },
    //配置本地服务器
    // devServer: {
    //     proxy: {
    //         '/api': {
    //             target: 'http://mall.api.sanyue.kim',
    //             // pathRewrite: { '^/api': '' },
    //             changeOrigin: true, // target是域名的话，需要这个参数，
    //             secure: false, // 设置支持https协议的代理
    //         }
    //     }
    // },
    lintOnSave: false,
    // publicPath: process.env.NODE_ENV === 'production' ?
    //     './' : '/'
    // assetsPublicPath: '/',

    // css: {
    //     loaderOptions: {
    //         postcss: {
    //             plugins: [
    //                 px2rem({
    //                     remUnit: 75
    //                 })
    //             ]
    //         }
    //     }
    // }
}