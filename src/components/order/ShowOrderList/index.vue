<template>
  <div id="show-orders">
    <div class="empty-order" v-if="!orderList.length">您还没有订单记录</div>
    <div class="order-list" v-else>
      <div class="order" v-for="order in orderList" :key="order.id">
        <van-card
          v-for="cart in order.order_carts"
          :key="cart.id"
          :num="cart.quantity"
          :price="cart.good.originPrice"
          :desc="cart.good.desc"
          :title="cart.good.name"
          :thumb="cart.good.imgSrc"
          :origin-price="cart.good.discountPrice"
          @click="$router.push(`/product/${cart.good.id}`)"
        />
        <div class="price">总价￥{{ order.noDiscountFinalPrice }}, 实付款￥{{ order.discountFinalPrice }}</div>
        <van-row type="flex" justify="end">
          <van-col span="5">
            <van-button round type="default" @click="$toast('模块未开发')">更多</van-button>
          </van-col>
          <van-col span="8">
            <van-button round :type="order.style" @click="$toast('模块未开发')">{{ order.msg }}</van-button>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showOrders: {
      type: Array,
      default: [],
    },
    tab: {
      type: String,
      default: "全部",
      page:1,
      size:6,
      loading:true,
      finished:false,
    },
  },
  computed: {
    orderList() {
      let list;
      if (!this.showOrders.length) {
        list = [];
        return list;
      }
      if (this.tab === "全部") {
        list = this.showOrders.map((item) => {
          let msg, style;
          if (item.isPay) {
            msg = "删除订单";
            style = "warning";
          } else {
            msg = "前往支付";
            style = "primary";
          }
          return {
            ...item,
            msg,
            style,
          };
        });
      } else if (this.tab === "待支付") {
        list = this.showOrders.map((item) => ({
          ...item,
          msg: "前往支付",
          style: "primary",
        }));
      } else if ((this.tab = "已支付")) {
        // debugger
        list = this.showOrders.map((item) => ({
          ...item,
          msg: "删除订单",
          style: "warning",
        }));
      }
      // debugger;
      return list;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>