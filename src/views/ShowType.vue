<template>
  <div id="type">
    <!-- 分类 -->
    <div class="search">
      <van-search
        v-model="keyword"
        placeholder="请输入搜索关键词..."
        shape="round"
        input-align="center"
        @search="onSearch"
      />
    </div>

    <van-sidebar v-model="categoryActiveKey" @change="changeCategory">
      <van-sidebar-item v-for="item in showCategoryList" :key="item.id" :title="item.category" />
    </van-sidebar>

    <div class="type-nav">
      <van-tabs v-model="curTypeId" sticky @click="changeType">
        <!-- <van-tab title="全部" ></van-tab> -->
        <van-tab v-for="type in showTypeList" :key="type.id" :name="type.id" :title="type.type">
          <van-list
            offset="10"
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-card
              v-for="(item) in showGoodsList"
              :key="item.id"
              @click="$router.push(`/product/${item.id}`)"
              :price="item.originPrice"
              :origin-price="item.discountPrice"
              :desc="item.desc"
              :title="item.name"
              :thumb="item.imgSrc"
            >
              <template #tags>
                <van-tag plain type="danger">无接触</van-tag>
                <van-tag plain type="danger">免配送费</van-tag>
              </template>
              <template #footer>
                <div class="quantity" @click.stop="changeQuantity(item)">
                  <van-stepper
                    theme="round"
                    v-model="item.quantity"
                    min="0"
                    :show-input="false"
                    v-if="!item.quantity"
                    :show-minus="false"
                  />
                  <van-stepper theme="round" v-model="item.quantity" min="0" v-else />
                </div>
              </template>
            </van-card>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>

    <IsLoading :show="isLoading" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      categoryActiveKey: 0,
      curCategoryId: 7,
      curTypeId: 67,
      keyword: "",
      // categoryList: [], //一级目录
      // typeList: [], //二级目录
      showGoodsList: [], //展示商品
      //👆
      loading: false,
      finished: false,
      page: 1,
      size: 6,
      // cartGoods: null, //购物车 === 当前选中的商品
    };
  },
  computed: {
    ...mapState("cart", ["cartList"]),
    ...mapState("user", ["account"]),
    ...mapState("goods", [
      "showCategoryList",
      "showTypeList",
      "selectedCategoryActive",
    ]),
    isLoading() {
      let val = true;
      if (this.showCategoryList.length && this.showTypeList.length ) {
        val = false;
      }
      return val;
    },
  },
  methods: {
    ...mapActions("cart", [
      "getCartList",
      "reqAddCart",
      "reqDeleteCart",
      "reqUpdateCart",
    ]),
    ...mapActions("goods", ["getCategoryList", "getTypeList"]),
    onSearch() {
      Toast("模块未开发");
    },
    async changeQuantity({ id, quantity }) {
      let cartGoods = null;
      //有登录，直接加入购物车
      //没登录，直接改变数量，
      if (!this.account) {
        return;
      }

      //有用户登录
      cartGoods = this.cartList.find(({ good }) => good.id === id);
      if (!cartGoods) {
        //⭐添加至购物车
        await this.reqAddCart({ goods_id: id, quantity });
      } else {
        const { cart_id } = cartGoods;
        if (!quantity) {
          //⭐⭐删除购物车
          await this.reqDeleteCart(cart_id);
        } else {
          //⭐⭐⭐改变购物车的数量
          await this.reqUpdateCart({
            id: cart_id,
            quantity,
          });
        }
      }
    },
    changeType() {
      this.showGoodsList = []; //已满足加载状态了
      this.finished = false; //切换type后，设置为未完成状态；
      this.page = 1; //切换type后，需要重新还原
      // this.getGoodsList(this.curTypeId);
    },
    async changeCategory() {
      //再次调用了未变化之前的type
      // await this.changeType();
      //👇
      this.showGoodsList = [];
      this.page = 1;
      this.finished = false; //切换category也要设置为未完成状态
      //👆根据type，同理
      this.showCategoryList.find((item, index) => {
        if (index === this.categoryActiveKey) {
          this.curCategoryId = item.id;
        }
      });
      await this.getTypeList(this.curCategoryId);
      // this.getGoodsList(type_id);
    },
    async onLoad() {
      //首次加载
      //⭐凡是满足条件的就会刷新
      if (this.showGoodsList.length === 0) {
        await this.getGoodsList(this.curTypeId);
        // debugger
      } else {
        await this.getGoodsList(this.curTypeId, ++this.page, true);
        ////debugger;
      }
      //如果数据加载完毕
      this.loading = false;
    },
    /**
     * 获取二级目录的商品
     * @param {number} type_id 二级目录id
     * @param {number} page 页数
     * @param {boolean} isPaging 是否要分页
     */
    async getGoodsList(type_id, page = 1, isPaging = false) {
      // 如果这次的id与上一次的不同，则要清空
      //请求新数据
      const vm = this;
      const res = await axios.get(api.goodsOptions, {
        params: {
          type_id,
          page,
          size: vm.size,
        },
      });
      if (!res.data.status) {
        return;
      }
      let goodsData = res.data.data.map(
        ({ id, name, imgSrc, originPrice, discountPrice, desc }) => ({
          id,
          name,
          imgSrc,
          originPrice,
          discountPrice,
          desc,
          quantity: 0,
        })
      );
      // debugger
      //购物车商品重新赋值数量
      goodsData = goodsData.map((item) => {
        vm.cartList.forEach(({ good, quantity }) => {
          if (item.id === good.id) {
            item.quantity = quantity;
          }
        });
        return item;
      });
      if (!isPaging) {
        vm.showGoodsList = goodsData;
        return;
      }
      //分页
      if (res.data.data.length !== vm.size) {
        // 数据不够10条，说明已经请求完了
        //不足10条了
        //第一个type分页成功后，结束了加载了
        vm.finished = true;
      }
      //⭐拼接
      vm.showGoodsList = [...vm.showGoodsList, ...goodsData];
    },
  },
  watch: {
    cartList: {
      handler(newVal) {
        this.showGoodsList = this.showGoodsList.map((item) => {
          newVal.forEach(({ good, quantity }) => {
            if (item.id === good.id) {
              item.quantity = quantity;
            }
          });
          return item;
        });
      },
      deep: true,
      immediate: true,
    },
  },
  async mounted() {
    const vm = this;
    vm.categoryActiveKey = vm.selectedCategoryActive
      ? vm.selectedCategoryActive
      : 0;
    await vm.getCategoryList();
    // const { id } = vm.showCategoryList.find(
    //   (item, index) => index === vm.categoryActiveKey
    // );
    // vm.curCategoryId = id;
    vm.showCategoryList.find((item, index) => {
      if (index === vm.categoryActiveKey) {
        vm.curCategoryId = item.id;
      }
    });
    await vm.getTypeList(vm.curCategoryId);
    //设置默认值
    vm.curTypeId = vm.showTypeList[0].id;
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/page/type.scss";
</style>