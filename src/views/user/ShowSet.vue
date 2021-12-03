<template>
  <div id="set">
    <LeftNav />
    <van-cell-group>
      <van-cell to="/person" title="个人设置" is-link></van-cell>
      <van-cell @click="show = !show" title="更改密码" is-link></van-cell>
    </van-cell-group>
    <van-dialog
      @confirm="onConfirm"
      v-model="show"
      title="修改密码"
      show-cancel-button
      confirm-button-text="修改"
    >
      <van-form>
        <van-field
          v-model="originPassword"
          type="password"
          name="原密码"
          label="原密码"
          placeholder="请输入原密码"
        />
        <van-field v-model="newPassword" type="password" name="新密码" label="新密码" placeholder="密码" />
        <van-field
          v-model="surePassword"
          type="password"
          name="确认密码"
          label="确认密码"
          placeholder="密码"
        />
      </van-form>
    </van-dialog>
  </div>
</template>

<script>
// import SetPwd from "@/components/user/Private";
import { mapActions } from "vuex";
export default {
  components: {
    // SetPwd,
  },
  data() {
    return {
      show: false,
      originPassword: "",
      newPassword: "",
      surePassword: "",
    };
  },
  methods: {
    ...mapActions("user", ["changePwd"]),
    onClickLeft() {
      this.$router.push({ name: "User" });
    },
    async onConfirm() {
      //验证
      //1.原密码和修改密码一致 ⭐后台已帮我验证了
      // 2.新密码和确认密码不一致
      //谁先好
      //3.密码强度
      const { originPassword, newPassword, surePassword } = this;
      if (originPassword === newPassword) {
        Toast.fail("原密码和新密码一致");
        return;
      } else if (newPassword !== surePassword) {
        Toast.fail("两次密码不一致");
        return;
      }

      //成功
      await this.changePwd({
        originPassword,
        newPassword,
      });
      this.newPassword = "";
      this.originPassword = "";
      this.surePassword = "";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/user/my.scss";
</style>