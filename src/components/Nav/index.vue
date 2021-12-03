<template>
  <van-tabbar
    v-model="active"
    route
    :border="false"
    active-color="#EF006E"
    inactive-color="#D3D3D3"
  >
    <van-tabbar-item replace to="/type">
      <template>
        <i class="iconfont icon-feneli-copy"></i>
      </template>
    </van-tabbar-item>
    <van-tabbar-item v-if="!cartNum" replace to="/cart">
      <template>
        <i class="iconfont icon-gouwuche"></i>
      </template>
    </van-tabbar-item>
    <van-tabbar-item v-else :badge="cartNum" replace to="/cart">
      <template>
        <i class="iconfont icon-gouwuche"></i>
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/index">
      <template>
        <i class="iconfont icon-yemian-activate"></i>
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/orders">
      <template>
        <i class="iconfont icon-order"></i>
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/user">
      <template>
        <i class="iconfont icon-profile"></i>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      active: 2,
    };
  },
  computed: {
    // ...mapState("cart",["orderCart"])
    ...mapGetters("cart", ["cartNum"]),
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>