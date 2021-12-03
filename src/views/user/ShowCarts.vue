<template>
  <div id="cart">
    <div class="title">
      <div class="name">购物车</div>
    </div>
    <div class="empty-cart" v-if="!cartNum">
      <van-image
        width="100%"
        height="100%"
        src="/img/empty_cart.jpg"
        @click="$router.push({name:'Type'})"
      />
    </div>
    <div class="cart-list" v-else>
      <div class="goods-list">
        <div class="goods" v-for="cart in showCartList" :key="cart.cart_id">
          <!-- @click.stop="$router.push(`/product/${goods.goods_id}`)" -->
          <van-row type="flex" justify="space-around" align="center">
            <van-col span="2">
              <van-checkbox v-model="cart.isChecked" checked-color="#c6538c" :name="cart.id" />
            </van-col>
            <van-col span="22">
              <van-swipe-cell>
                <van-card
                  :price="cart.good.discountPrice"
                  :desc="cart.good.desc"
                  :title="cart.good.name"
                  class="goods-card"
                  :thumb="cart.good.imgSrc"
                  :origin-price="cart.good.originPrice"
                  @click-thumb="$router.push(`/product/${cart.good.id}`)"
                >
                  <template #bottom>
                    <van-stepper
                      :value="cart.quantity"
                      :disable-input="true"
                      @plus="updatedCartQuantity('+',cart)"
                      @minus="updatedCartQuantity('-',cart)"
                      min="0"
                    />
                  </template>
                </van-card>
                <template #right>
                  <van-button
                    square
                    text="删除"
                    type="danger"
                    class="delete-button"
                    @click="deleteCart(cart.cart_id)"
                  />
                </template>
              </van-swipe-cell>
            </van-col>
          </van-row>
        </div>
      </div>
      <!-- <div class="submit"> -->
      <van-submit-bar :price="totalPrice" button-text="结算" @submit="onSubmit">
        <van-checkbox
          v-model="ischeckedAll"
          @click="toggleAll"
          checked-color="#c6538c"
        >{{ checkedAllMsg }}</van-checkbox>
      </van-submit-bar>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("cart", ["cartList"]),
    ...mapGetters("cart", ["cartNum", "isSelectedAll"]),
    checkedAllMsg() {
      let msg = "全选";
      if (this.ischeckedAll) {
        msg = "取消全选";
      }
      return msg;
    },
    totalPrice() {
      let msg = 0;
      this.showCartList.forEach((item) => {
        if (!item.isChecked) {
          return;
        }
        msg += item.good.discountPrice * item.quantity.toFixed(2);
      });
      return msg * 100;
    },
  },
  data() {
    return {
      value: 1,
      showCartList: [],
      ischeckedAll: null,
      checkedList: [],
      selectedGoods: [],
      // orderCarts:[],//提交订单的购物车
      // checkedAllStatus: null,
    };
  },
  methods: {
    ...mapActions("cart", ["reqDeleteCart","reqUpdateCart"]),
    onSubmit() {
      //1.不提交订单的情况
      /*
        1.没有选中商品
      */
      let orderCarts = [];
      // this.showCartList.map(({ isChecked, cart_id:id, quantity, good:goods }) => {
      this.showCartList.map(({ isChecked, cart_id, quantity, good: goods }) => {
        if (!isChecked) {
        } else {
          //⭐，提交订单后的购物车随机生成购物车订单
          orderCarts.push({ quantity, goods, cart_id });
        }
      });
      if (!orderCarts.length) {
        Toast.fail("您还没有选中商品");
        return;
      }
      //
      //提交到store中 商品的信息
      this.$store.commit("order/addCurOrder", orderCarts);
      this.$store.commit("order/addPayType", 1);
      this.$router.push({name:"Order"});
    },
    async updatedCartQuantity(type, { quantity, cart_id: id }) {
      if(type === "+"){
        await this.reqUpdateCart({quantity:++quantity,id});
      }else{
        await this.reqUpdateCart({quantity:--quantity,id})
      }
    },
    async deleteCart(id) {
      await this.reqDeleteCart(id);
    },
    toggleAll() {
      this.showCartList = this.showCartList.map((item) => {
        //⭐，有选中或没选中的要怎样变化
        if (this.ischeckedAll && (!item.isChecked || item.isChecked)) {
          // if (this.ischeckedAll) {
          item.isChecked = true;
        } else {
          item.isChecked = false;
        }
        return item;
      });
    },
  },
  mounted() {
    this.showCartList = this.cartList;
    this.ischeckedAll = this.isSelectedAll;
  },
  //侦听器
  watch: {
    cartList: {
      handler(newVal) {
        this.showCartList = newVal;
      },
      deep: true,
      immediate: true,
    },
    showCartList: {
      handler(newShowCartList, oldName) {
        this.showCartList = newShowCartList;
        // debugger
        this.showCartList.every((item) => item.isChecked === true)
          ? (this.ischeckedAll = true)
          : (this.ischeckedAll = false);
        this.showCartList.forEach((item) => {
          this.$store.commit("cart/changeCheckedCart", item);
        });
      },
      immediate: true,
      deep: true,
    },
  },
  //data每变化一次就会执行这个函数，👉慎用👈
  updated() {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/cart/cart.scss";
</style>