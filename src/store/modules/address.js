export default {
    namespaced: true,
    state: {
        addressList: [],
        editAddress: null,
        // isAdd: false,
    },
    mutations: {
        assignAddressList(state, data) {
            //在这里映射最适合
            state.addressList = data.map(({ id, name, province, county, city, detailAddress: addressDetail, mobile: tel, sex, isDefault, completeAddress: address }) => ({
                id,
                name,
                province,
                county,
                //掉了，打扰了
                city,
                addressDetail,
                tel,
                address,
                sex,
                isDefault: Boolean(isDefault),

            }));

        },
        addAddress(state, address) {
            state.addressList.push(address);
        },
        deleteAddress(state, id) {
            state.addressList = state.addressList.filter(item => item.id !== id);
        },
        updateAddress(state, data) {
            const {
                id,
                name,
                province,
                county,
                city,
                addressDetail,
                tel,
                sex,
                isDefault,
                address
            } = data;
            state.addressList = state.addressList.map(item => {
                if (item.id === id) {
                    item = {
                        id,
                        name,
                        province,
                        county,
                        //掉了，打扰了
                        city,
                        addressDetail,
                        tel,
                        address,
                        sex,
                        isDefault,
                    };
                    //debugger
                }
                return item;
            })
        },
        setDefaultAddress(state, id) {
            state.addressList = state.addressList.map(item => {
                if (item.id === id) {
                    item.isDefault = 1;
                } else {
                    item.isDefault = 0;
                }
                return item;
            })
        },
        addEditAddress(state, id) {
            state.addressList.forEach(({ sex, ...item }) => {
                if (item.id === id) {
                    state.editAddress = item;
                }
            })
        },
        clearEditAddress(state) {
            state.editAddress = null;
        },
    },
    actions: {
        /**
         * 获取地址列表
         * @param {*} param0 
         * @returns 
         */
        async getAddressList({ commit }) {
            const res = await axios.get(api.addressOptions);
            if (!res.data.status) {
                return;
            }
            commit("assignAddressList", res.data.data);
        },
        /**
         * 发送添加地址
         * @param {*} param0 
         * @param {*} address 
         * @returns 
         */
        async reqAddAddress({ dispatch }, address) {
            const addRes = await axios.post(api.addressOptions, address);
            if (!addRes.data.status) {
                Toast.fail("添加失败");
                return;
            }
            debugger;
            Toast.success("添加成功");
            await dispatch("getAddressList");
        },
        /**
         * 删除地址
         * @param {*} param0 
         * @param {*} id 
         * @returns 
         */
        async reqDeleteAddress({ dispatch }, id) {
            const deleteRes = await axios.delete(api.addressOptions + "/" + id);
            if (!deleteRes.data.status) {
                Toast.fail("删除失败");
                return;
            }
            Toast.success("删除成功");
            await dispatch("getAddressList");
        },
        /**
         * 更新地址
         * @param {*} param0 
         * @param {*} address 
         * @returns 
         */
        async reqUpdateAddress({ dispatch }, address) {
            const updateRes = await axios.put(api.addressOptions, address);
            if (!updateRes.data.status) {
                Toast.fail("修改失败");
                return;
            }
            Toast.success("修改成功");
            await dispatch("getAddressList");
        }
    },

    getters: {
        //只能有一个默认地址
        //判断是否有默认地址，存储默认地址
        defaultAddress: state => {
            let address = null;
            state.addressList.forEach(item => {
                if (item.isDefault) {
                    address = item;
                }
            });
            if (!address && state.addressList.length) {
                address = state.addressList[0];
            }
            // //debugger;
            return address;
        },
        listAddress: state => {
            return state.addressList.map(({
                id,
                name,
                tel,
                address,
                isDefault
            }) => ({
                id,
                name,
                address,
                tel,
                isDefault,
            }))
        }
    }
}