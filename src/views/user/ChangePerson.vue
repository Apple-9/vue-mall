<template>
  <div id="set">
    <LeftNav title="完善个人信息"></LeftNav>
    <van-form @submit="onSubmit">
      <van-field v-model="email" type="text" name="email" label="邮箱" placeholder="请填写邮箱" />
      <van-field v-model="nickName" type="text" name="nickName" label="昵称" placeholder="请填写昵称" />
      <van-field v-model="desc" type="text" name="desc" label="备注" placeholder="请填写备注" />
      <van-field name="sex" label="性别">
        <template #input>
          <van-radio-group v-model="sex" direction="horizontal">
            <van-radio name="1" checked-color="#EF006E">男</van-radio>
            <van-radio name="0" checked-color="#EF006E">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field name="uploader" label="头像上传">
        <template #input>
          <van-uploader v-model="imgSrc" :after-read="afterRead" accept="image/*" :max-count="1"></van-uploader>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button color="#EF006E" block type="info" native-type="submit">修改</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      email: "",
      sex: "1",
      nickName: "",
      desc: "",
      imgSrc: [],
      avatar: null,
    };
  },
  computed: {
    // ...mapState("user", ["email", "sex", "nickName", "desc", "avatar"]),
  },
  methods: {
    ...mapActions("user", ["updateUserMsg"]),
    onClickLeft() {
      this.$router.push({name:"Set"});
    },
    async afterRead(file) {
      //上传头像
      const vm = this;
      const formData = new FormData();
      formData.append("avatar", file.file);
      const res = await axios.post(api.imgOptions, formData);
      vm.avatar = res.data.data.imgSrc;

    },
    async onSubmit() {
      const vm = this;
      //⭐邮箱验证正则
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      const { email, sex, nickName, avatar, desc } = vm;
      // debugger;
      //❓判断是否为空，原来如此，只要一开始去获取了，就不会造成是否为空的问题了
      let submitOptions = {};
      const options = {
        email,
        sex,
        nickName,
        avatar,
        desc,
      };
      for (const key in options) {
        if (!options[key]) {
          submitOptions[key] = options[key];
        }
      }
      // debugger;
      if (!reg.test(email) && email) {
        Toast.fail("邮箱格式错误!");
        // debugger;
        return;
      }
      await this.updateUserMsg({
        email,
        sex,
        nickName,
        avatar,
        desc,
      });
     
      //再清空页面的信息
      vm.email = "";
      vm.nickName = "";
      vm.sex = "1";
      vm.desc = "";
      vm.imgSrc = [];
      vm.avatar = null;
      await delay(2000);
      vm.$router.push({name:"Set"});
    },
  },
  mounted() {
    //从store中提取，赋值给全局状态
    const vm = this;
    const { email, sex, desc, nickName } = vm.$store.state.user;
    vm.email = email;
    vm.sex = String(sex);
    vm.desc = desc;
    vm.nickName = nickName;
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/user/my.scss";
</style>