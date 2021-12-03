export default {
    namespaced: true,
    state: {
        orderList: [],
        curOrder: [], //cart_id,goods 外加支付方式
        // goods,carr_id

        /* 
        两种方式：
         */
        payType: null,
    },
    mutations: {
        //增删改查
        //增加，更改
        addOrderList(state, order) {
            state.orderList.push(order);
        },
        //怎么传参func(id,num)
        updateOrderList(state, orderId, num) {
            state.orderList = state.orderList.map(item => {
                if (item.id === orderId) {
                    item.quantity = num;
                }
                return item;
            })
        },
        assignOrderList(state, orders) {
            state.orderList = orders.filter(item => item.order_carts.length !== 0);
        },
        deleteOrderList(state, orderId) {
            state.orderList = state.orderList.filter(item => item.id !== orderId);
        },
        clearOrderList(state) {
            state.orderList = [];
        },
        //当前订单
        //增删改
        addCurOrder(state, order) {
            // const { id, quantiity, good } = order
            // if (order.)
            state.curOrder = order;
        },
        clearCurOrder(state) {
            state.curOrder = [];
        },
        addPayType(state, type) {
            state.payType = type;
        },
        clearPayType(state, type) {
            state.payType = null;
        },
    },
    actions: {
        //获取
        async getOrderList({ commit }) {
            const res = await axios.get(api.order);
            if (!res.data.status) {
                return;
            }
            commit("assignOrderList", res.data.data);

        }
        //增加
        //删除

    },
    getters: {
        totalPrice: state => {
            let price = 0;
            state.curOrder.forEach(item => {
                price += item.quantity * item.goods.discountPrice.toFixed(2);
                //debugger
            });
            return price * 100;
        },
        noPayList: state => {
            return state.orderList.filter(item => !item.isPay && item.order_carts.length);
        },
        payedList: state => {
            return state.orderList.filter(item => item.isPay && item.order_carts.length);
        }

    }
}