<template>
  <div id="user">
    <div class="about-me" @click="$router.push({name:'My'})">
      <van-row type="flex" justify="space-around" align="center">
        <van-col span="4">
          <img :src="imgSrc" class="img" />
        </van-col>
        <van-col span="18" offset="1">
          <div class="status">{{ nickName || "立即登录" }}</div>
        </van-col>
      </van-row>
    </div>
    <div class="more-detail">
      <van-cell-group>
        <van-cell is-link to="/my">
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <i class="iconfont icon-gerenxinxi"></i>
            <span class="custom-title">关于我</span>
          </template>
        </van-cell>
        <van-cell is-link to="/orders">
          <template #title>
            <i class="iconfont icon-order"></i>
            <span class="custom-title">我的订单</span>
          </template>
        </van-cell>
        <van-cell is-link to="/address">
          <template #title>
            <i class="iconfont icon-shouhuodizhi1"></i>
            <span class="custom-title">收货地址</span>
          </template>
        </van-cell>
        <van-cell is-link to="/set">
          <template #title>
            <i class="iconfont icon-shezhi"></i>
            <span class="custom-title">设置</span>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <div class="login-status" @click="loginStatus">
      <van-button :type="isLogin?'warning':'primary'" block size="large">{{ msg }}</van-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },

  components: {},
  computed: {
    ...mapState("user", ["account", "nickName", "email", "avatar"]),
    imgSrc() {
      let path = "/img/avatar1.png";
      if (this.isLogin) {
        if (!this.avatar) {
          path = "/img/avatar.jpg";
        } else {
          path = this.avatar;
        }
      }
      return path;
    },
    isLogin() {
      let status = false;
      if (this.account) {
        status = true;
      }
      return status;
    },
    msg() {
      let tip = "前往登录";
      if (this.isLogin) {
        tip = "退出登录";
      }
      return tip;
    },
  },

  methods: {
    loginStatus() {
      if (!this.isLogin) {
        this.$router.push({ name: "Login" });
        return;
      }
      //有账号登录
      this.$store.commit("user/initUser");
      //⭐这里能访问window
      window.localStorage.authorization = "";
      window.location.reload();//重加载
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/page/user.scss";
</style>