import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/ShowHome.vue'
import Type from '@/views/ShowType.vue';
import Product from "@/views/ShowProduct"
import Cart from '@/views/user/ShowCarts.vue';
import Index from '@/views/ShowIndex.vue';
import User from '@/views/ShowUser.vue';
import Orders from '@/views/user/ShowOrders.vue';
import Address from '@/views/user/ShowAddress.vue';
import Set from '@/views/user/ShowSet.vue';
import My from '@/views/user/ShowMy.vue';
import Person from '@/views/user/ChangePerson.vue'
import Login from '@/views/ShowLogin.vue';
import Register from '@/views/ShowRegister.vue';
import Order from '@/views/SubmitOrder.vue';
import EditAddress from "@/views/user/EditAddress"
import store from "@/store"
Vue.use(VueRouter);
const routes = [
    { //   /orders
        path: "/login",
        name: "Login",
        component: Login,
        beforeEnter: (to, from, next) => {
            if (store.state.user.account) {
                next({ name: "Home" })
                return;
            }
            next()
        }
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
    {
        path: "/product/:id",
        name: "Product",
        component: Product,
    },
    {
        path: "/order",
        name: "Order",
        component: Order,
        beforeEnter: (to, from, next) => {
            if (!store.state.user.account) {
                next({ name: "Login" })
                return;
            }
            next()
        }
    },

    {
        path: "/address",
        name: "Address",
        component: Address,
        beforeEnter: (to, from, next) => {
            if (!store.state.user.account) {
                next({ name: "Login" })
                return;
            }
            next();
        }
    },
    {
        path: "/address/:id",
        name: "EditAddress",
        component: EditAddress,
        beforeEnter: (to, from, next) => {
            if (!store.state.user.account) {
                next({ name: "Login" })
                return;
            }
            next()
        }

    },
    {
        path: "/set",
        name: "Set",
        component: Set,
        beforeEnter: (to, from, next) => {
            if (!store.state.user.account) {
                next({ name: "Login" })
                return;
            }
            next()
        }
    },
    {
        path: "/my",
        name: "My",
        component: My,
        beforeEnter: (to, from, next) => {
            if (!store.state.user.account) {
                next({ name: "Login" })
                return;
            }
            next()
        }
    },
    {
        path: "/person",
        name: "Person",
        component: Person,
        beforeEnter: (to, from, next) => {
            if (!store.state.user.account) {
                next({ name: "Login" })
                return;
            }
            next()
        }
    },
    {
        path: "/", //⭐⭐ / 不是精准匹配，比如你配置/abc，那只要是/abc/ddd/aaa，/abc/qq
        name: "Home",
        component: Home,
        redirect: '/index',
        children: [{
                path: "/type",
                name: "Type",
                component: Type,
            }, {
                path: "/cart",
                name: "Cart",
                component: Cart,
                beforeEnter: (to, from, next) => {
                    if (!store.state.user.account) {
                        next({ name: "Login" })
                        return;
                    }
                    next()
                }
            },
            {
                path: "/user",
                name: "User",
                component: User,
                beforeEnter: (to, from, next) => {
                    next()
                }
            },
            {
                path: "/orders",
                name: "Orders",
                component: Orders,
                beforeEnter: (to, from, next) => {

                    if (!store.state.user.account) {
                        next({ name: "Login" })
                        return;
                    }
                    next()
                }

            },
            {
                path: "/index",
                name: "Index",
                component: Index,
            },
        ]
    },
];
//导航守卫⭐⭐

const router = new VueRouter({
    routes
});
export default router