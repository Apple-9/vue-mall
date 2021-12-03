export default {
    namespaced: true,
    state: {
        cartList: [],
    },
    mutations: {
        updateQuantity(state, {
            goods_id,
            quantity
        }) {
            state.cartList = state.cartList.map(item => {

                if (item.good.id === goods_id) {
                    item.quantity = quantity;
                }
                return item;
            })
        },
        //增删改查
        //获取购物车
        assignCart(state, data) {
            state.cartList = data.map(({ id: cart_id, good, quantity, discountFinalPrice, noDiscountFinalPrice }) => ({
                    cart_id,
                    good,
                    quantity,
                    noDiscountFinalPrice,
                    discountFinalPrice,
                    isChecked: false,
                }))
                // state.cartList = goods;
        },
        //增加购物车 

        addCart(state, data) {
            const { id: cart_id, goods, quantity, discountFinalPrice, noDiscountFinalPrice } = data;
            state.cartList.push({
                cart_id,
                goods,
                quantity,
                discountFinalPrice,
                noDiscountFinalPrice,
                isChecked: false,
            })
        },
        updateCart(state, {
            cart_id,
            quantity,
        }) {
            state.cartList = state.cartList.map(item => {
                if (item.good.cart_id === cart_id) {
                    item.quantity = quantity;
                }
                return item;
            })
        },
        //⭐以数组的形式为更好点
        deleteCart(state, carts) {
            //debugger;
            if (typeof carts !== "object") {
                state.cartList = state.cartList.filter(item => item.cart_id !== carts);
            } else {
                for (let i = 0; i < carts.length; i++) {
                    state.cartList = state.cartList.filter(item => item.cart_id !== carts[i]);
                }
            }

            //debugger;
        },
        clearCart(state) {
            state.cartList = [];
        },
        changeCheckedCart(state, {
            id,
            isChecked
        }) {
            state.cartList.map(item => {
                if (item.cart_id === id) {
                    item.isChecked = isChecked;
                }
            })

        }
    },
    getters: {
        cartNum: state => {
            let num = 0;
            state.cartList.forEach(item => {
                num += item.quantity;
            });
            return num;
        },
        isSelectedAll: state => {
            return state.cartList.every(item => item.isChecked);
        }
    },
    actions: {
        //⭐异步请求购物车的数量
        async getCartList({ commit }) {
            const getRes = await axios.get(api.cartOptions);
            if (!getRes.data.status) {
                return;
            }
            commit("assignCart", getRes.data.data);

        },
        /**
         * 
         * @param {*} state 
         * @param {*} goods  参数 quantity goods_id
         */
        async reqAddCart({ commit, dispatch }, goods) {
            const addRes = await axios.post(api.cartOptions, goods);
            if (!addRes.data.status) {
                Toast.fail("添加失败");
                return;
            }
            // commit("addCart", addRes.data.data);
            await dispatch("getCartList");
            Toast.success("添加成功");
        },
        /**
         * 
         * @param {*} param0 
         * @param {*} cart_id 
         * @returns 
         */
        async reqDeleteCart({ commit, dispatch }, cart_id) {
            const deleteRes = await axios.delete(api.cartOptions + "/" + cart_id);
            if (!deleteRes.data.status) {
                Toast.fail("删除失败");
                return;
            }
            // commit("deleteCart", cart_id);
            await dispatch("getCartList");
            Toast.success("删除成功");
        },
        /**
         * 
         * @param {*} param0 
         * @param {*} goods 
         * @returns 
         */
        async reqUpdateCart({ commit, dispatch }, goods) {
            const updateRes = await axios.put(api.cartOptions, goods);
            if (!updateRes.data.status) {
                // Toast.fail("修改失败");
                return;
            }
            await dispatch("getCartList");
            // Toast.success("修改成功");
        }

    }
}