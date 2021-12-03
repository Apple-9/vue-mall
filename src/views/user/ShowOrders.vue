<template>
  <div id="order-area">
    <div class="title">
      <h2>我的订单列表</h2>
    </div>
    <van-tabs v-model="active">

      <van-tab title="全部">
        <OrderList :showOrders="orderList" tab="全部" />
      </van-tab>
      <van-tab title="待支付">
        <OrderList :showOrders="noPayList" tab="待支付"/>
      </van-tab>
      <van-tab title="已支付">
       <OrderList :showOrders="payedList" tab="已支付"/>
       </van-tab>
      <!-- <van-tab title="待发货" @click="$toast('模块未开发')"></van-tab> -->
    </van-tabs>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import OrderList from"@/components/order/ShowOrderList";
export default {
  components: {
    OrderList,
  },
  computed: {
    ...mapState("order", ["orderList"]),
    ...mapGetters("order", ["noPayList", "payedList"]),
  },
  data() {
    return {
      active: "0",
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push({name:"User"});
    },
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/order/order.scss";
</style>