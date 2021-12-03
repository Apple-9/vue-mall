import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vant from 'vant'
import loading from "@/components/common/IsLoading"
// import leftNav from "@/components/common/LeftNav/index.vue"
import leftNav from "@/components/common/LeftNav"
import { Toast, Dialog } from 'vant';
import 'vant/lib/index.css' //导入所有
import 'amfe-flexible'
import './rem.js'
import '@vant/touch-emulator';
import axios from "axios";
import http from "@/http";
import api from "@/api"
//工具
import delay from "@/utils/delay"
import initWhoami from "./utils/initWhoami"
import authorization from "./utils/localStorage"
//⭐注册全局组件
Vue.component("IsLoading", loading);
Vue.component("LeftNav", leftNav);
Toast.setDefaultOptions({ duration: 1500 })

Vue.use(vant);

window.axios = axios;
window.api = api;
window.delay = delay;
window.Toast = Toast;
window.Dialog = Dialog;

//导航栏
Vue.config.productionTip = false;
//初始化whoami
;
(async() => {
    await initWhoami(authorization, store, api, axios);
    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app')
})();
// 生成vue
// new Vue({
//     router,
//     store,
//     render: h => h(App)
// }).$mount('#app');