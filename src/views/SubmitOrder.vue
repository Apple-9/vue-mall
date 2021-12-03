<template>
  <div id="submit-order">
    <LeftNav title="确认订单"/>
    <div class="order-detail">
      <div class="default-address">
        <van-row>
          <van-col>收货人:</van-col>
          <van-col>{{ defaultAddress.name }}</van-col>
          <van-col offset="1">{{ defaultAddress.tel }}</van-col>
        </van-row>
        <van-row>
          <van-col>{{ defaultAddress.address }}</van-col>
        </van-row>
      </div>
      <div class="goods-list">
        <div class="goods" v-for="item in ordersGoods" :key="item.goods.id">
          <!-- @click.stop="$router.push(`/product/${item.goods_id}`)" -->
          <van-row type="flex" justify="space-around" align="center">
            <van-col span="22">
              <van-card
                :price="item.goods.discountPrice"
                :desc="item.goods.desc"
                :title="item.goods.name"
                class="goods-card"
                :thumb="item.goods.imgSrc"
                :origin-price="item.goods.originPrice"
                @click-thumb="$router.push(`/product/${item.goods.id}`)"
              >
                <template #bottom>
                  <span>x{{ item.quantity }}</span>
                </template>
              </van-card>
            </van-col>
          </van-row>
        </div>
        <div class="tip">采用无接触配送方式,请您放心使用!</div>
      </div>
      <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="onSubmit" />
    </div>
    <van-dialog
      show-cancel-button
      v-model="show"
      title="支付订单"
      @confirm="onConfirm"
      @cancel="$router.push({name:'Order'})"
    ></van-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("order", ["curOrder", "payType"]),
    ...mapGetters("order", ["totalPrice"]),
    ...mapGetters("address", ["defaultAddress"]),
  },
  data() {
    return {
      ordersGoods: "",
      ordersId: null,
      show: false,
    };
  },
  methods: {
    ...mapActions("order", ["getOrderList"]),
    ...mapActions("cart", ["getCartList"]),
    async onSubmit() {
      let orderCarts = [];
      let payType = this.payType ? "cart" : "immediate";
      const {
        name,
        province,
        city,
        // countity,
        county,
        addressDetail: detailAddress,
        tel: mobile,
      } = this.defaultAddress;
      //立即支付
      if (this.payType) {
        orderCarts = this.ordersGoods.map(({ cart_id }) => {
          return { cart_id };
        });
      } else {
        //❌
        // this.ordersGoods.forEach((item) => {
        //   orderCarts = [
        //     {
        //       goods_id: item.goods.id,
        //       quantity: item.quantity,
        //     },
        //   ];
        // });
        //❌
        orderCarts = this.ordersGoods.map(({ goods, quantity }) => ({
          goods_id: goods.id,
          quantity: quantity,
        }));
      }
      const res = await axios.post(api.order, {
        orderCarts,
        payType,
        name,
        province,
        city,
        county,
        detailAddress,
        mobile,
        sex: 0,
      });
      //debugger;
      if (!res.data.status) {
        await delay(2000);
        Toast.fail("提交失败");
        return;
      }
      //提交成功后
      //⭐，提交成功后再来删除购物车
      //单个商品的id
      this.ordersId = res.data.data.id; //订单id

      //重新获取订单
      await this.getOrderList();
      this.$store.commit("order/clearCurOrder");
      //如果是购物车的话
      //删除购物车 ==>后端已处理，只需重新获取购物车
      if (this.payType) {
        await this.getCartList();
      }
      this.$store.commit("order/clearPayType");
      //弹出支付
      this.show = true;
    },
    async onConfirm() {
      const pRes = await axios.put(api.pay + this.ordersId);
      Toast.loading({
        message: "支付中...",
        forbidClick: true,
      });
      await delay(2000);
      if (!pRes.data.status) {
        Toast.fail("支付失败");
        return;
      }

      //支付成功
      Toast.success("支付成功");
      await delay(2000);
      Toast.loading({
        message: "前往订单列表中...",
        forbidClick: true,
      });

      //重新获取订单，是为了改变更改订单的状态
      await this.getOrderList();
      await delay(2000);
      this.$router.push({ name: "Orders" });
    },
  },
  mounted() {
    this.ordersGoods = this.curOrder;
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/order/submitOrder.scss";
</style>