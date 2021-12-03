<template>
  <div id="login">
    <div class="container">
      <div class="img">
        <img
          src="/img/i3.jpg"
          alt="这是图标"
          @click="$router.push({ name: 'Index' })"
        />
      </div>
      <van-form @submit="onSubmit" validate-first @failed="onFailed">
        <van-field
          v-model="account"
          name="account"
          label="账号"
          placeholder="请您输入用户账号..."
          :rules="[{ required: true, message: '' }]"
          label-width="50px"
          label-align="center"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="请您输入用户密码..."
          :rules="[{ required: true, message: '' }]"
          label-width="50px"
          label-align="center"
        />
        <div style="margin: 16px 0">
          <van-button block native-type="login" color="#EF006E"
            >登录</van-button
          >
        </div>
        <div class="goto-register">
          <van-cell value="没有用户，前往注册" size="large" to="register" />
        </div>
      </van-form>
      <div class="logo">
        <img src="/img/i2.jpg" alt @click="$router.push({ name: 'Index' })" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      account: "",
      password: "",
    };
  },
  methods: {
    ...mapActions("user", ["getUserMsg"]),
    ...mapActions("order", ["getOrderList"]),
    ...mapActions("address", ["getAddressList"]),
    ...mapActions("cart", ["getCartList"]),
    async onSubmit(val) {
      const res = await axios.post(api.login, {
        account: val.account,
        password: val.password,
      });
      if (!res.data.status) {
        Toast.fail(res.data.msg);
        this.password = "";
        return;
      }
      //⭐登录之后会返回authorization，然后将其存放到localStorage
      window.localStorage.setItem("authorization", res.headers.authorization);
      await this.getUserMsg();
      await this.getOrderList();
      await this.getAddressList();
      await this.getCartList();
      this.$router.push("/");
    },
    onFailed() {
      if (!this.account || !this.password) {
        Toast.fail("用户账号或密码都不能为空");
      }
      // else if (!this.account) {
      //   Toast.fail("用户账号不能为空");
      // } else if (!this.password) {
      //   Toast.fail("用户密码不能为空");
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/page/login.scss";
</style>