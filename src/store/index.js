import Vue from 'vue'
import Vuex from 'vuex'
import user from "./modules/user";
import order from "./modules/order";
import cart from "./modules/cart";
import address from "./modules/address";
import goods from "./modules/goods";
Vue.use(Vuex)

export default new Vuex.Store({
    // state,
    // getters,
    // actions,
    // mutations,
    modules: {
        user, //命名空间
        cart,
        order,
        address,
        goods
    }
})