export default {
    namespaced: true,
    state: {
        selectedCategoryActive: null,
        showCategoryList: [],
        showTypeList: [],
        detailGoods: null,
        // selectedTypeId: null,
        // curPage: 1,
    },
    mutations: {
        changeSelectedCategoryActive(state, id) {
            state.selectedCategoryActive = id;
        },
        clearSelectedCategoryActive(state) {
            state.selectedCategoryActive = null;
        },
        assignShowCatregoryList(state, data) {
            state.showCategoryList = data.map(({ id, category, imgSrc }) => ({
                id,
                category,
                imgSrc
            }));
        },
        assignShowTypeList(state, data) {
            state.showTypeList = data.map(({ id, type }) => ({
                id,
                type,
            }));
        },
        assignDetailGoods(state, goods) {
            const {
                name,
                imgSrc,
                desc,
                originPrice,
                discountPrice,
                saleNum,
                id
            } = goods;
            state.detailGoods = {
                name,
                imgSrc,
                desc,
                originPrice,
                discountPrice,
                saleNum,
                id
            }
        },
        clearDetail(state) {
            state.detailGoods = null;
        }

    },
    actions: {
        async getCategoryList({ commit }) {
            const res = await axios.get(api.category);
            //⭐首页导航过来,默认id
            if (!res.data.status) {
                Toast.fail("获取数据失败");
                return;
            }
            commit("assignShowCatregoryList", res.data.data);
        },
        /**
         * 根据categoryId获取二级目录
         * @param {*} param0 
         * @param {*} categoryId 一级目录Id
         * @returns 
         */
        async getTypeList({ commit }, categoryId) {
            const temRes = await axios.get(api.category + "/" + categoryId);
            if (!temRes.data.status) {
                return;
            }
            commit("assignShowTypeList", temRes.data.data.types)
        },
        async getDetailGoods({ commit }, goodsId) {
            // commit("clearDetail");
            const res = await axios.get(api.goodsOptions + "/" + goodsId);
            if (!res.data.status) {
                Toast.fail("加载失败");
                return;
            }
            commit("assignDetailGoods", res.data.data);
        }
    }
}