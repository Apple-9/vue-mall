<template>
  <div id="product">
    <LeftNav title="商品详情" />
    <div id="goods">
      <van-image width="100%" height="50%" :src="detailGoods.imgSrc" alt="这是商品图片"/>
      <div class="goods-detail">
        <div class="goods">
          <div class="name">{{ detailGoods.name }}</div>
          <div class="sale-num">销量 {{ detailGoods.saleNum }}</div>
        </div>
        <div class="price">
          <div class="del-price">折后价:￥{{ detailGoods.discountPrice }}</div>
          <div class="origin-price">原价:￥{{ detailGoods.originPrice }}</div>
        </div>
        <div class="desc">{{ detailGoods.desc }}</div>
        <div class="delivery">配送 预计24H发货，第三方物流配送，包邮</div>
      </div>
    </div>
    <!-- <div class="buy-button"> -->
    <van-goods-action>
      <van-icon name="shopping-cart-o" v-if="!cartList.length" />
      <van-icon
        name="shopping-cart-o"
        v-else
        :badge="cartNum"
        @click="$router.push({name:'Cart'})"
      />
      <van-goods-action-button type="danger" text="加入购物车" @click="addCart" />
      <van-goods-action-button type="danger" text="立即购买" @click="buyNow" />
    </van-goods-action>
    <!-- </div> -->
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      selectedGoodsId: "",
    };
  },
  computed: {
    ...mapState("goods", ["detailGoods"]),
    ...mapState("cart", ["selectedGoodsList", "cartList"]),
    ...mapState("user", ["account"]),
    ...mapGetters("cart", ["cartNum"]),
    ...mapState("address", ["addressList"]),
  },
  methods: {
    ...mapActions("goods", ["getDetailGoods"]),
    ...mapActions("cart", ["getCartList", "reqAddCart", "reqUpdateCart"]),
    async addCart() {
      if (!this.account) {
        Toast.fail("你还没有登录");
        this.$router.push({ name: "Login" });
        return;
      }
      let cartGoods = this.cartList.find(
        (item) => item.good.id === this.selectedGoodsId
      );
      if (!cartGoods) {
        await this.reqAddCart({ goods_id: this.selectedGoodsId, quantity: 1 });
      } else {
        const { quantity, cart_id: id } = cartGoods;
        await this.reqUpdateCart({ id, quantity: quantity * 2 });
      }
    },
    async buyNow() {
      if (!this.account) {
        Toast.fail("你还没有登录");
        this.$router.push({ name: "Login" });
        return;
      }
      if (!this.addressList.length) {
        Toast.fail("你还没有收货人");
        this.loadingMsg = "正在前往联系人...";
        await delay(1000);
        this.$router.push({ name: "Address" });
        return;
      }
      this.$store.commit("order/addCurOrder", [
        { goods: this.detailGoods, quantity: 1 },
      ]);
      this.$store.commit("order/addPayType", 0);
      this.$router.push({ name: "Order" });
    },
  },
  async mounted() {
    //路由中的每一部分都是string
    this.selectedGoodsId = +this.$route.params.id;
    //⭐优化
    await this.getDetailGoods(this.selectedGoodsId);
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/page/product.scss";
</style>