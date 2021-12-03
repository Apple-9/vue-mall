<template>
  <div id="register">
    <div class="container">
      <div class="img">
        <img
          src="/img/i10.jpg"
          alt="这是图标"
          @click="$router.push({ name: 'Index' })"
        />
      </div>
      <van-form @submit="onSubmit" validate-first @failed="onFailed">
        <van-field
          v-model="account"
          name="account"
          label="账号"
          placeholder="请填写账号"
          :rules="[{ required: true, message: '' }]"
          label-width="50px"
        />
        <!-- :rules="[{ required: true, message: '请填写用户名' }]" -->
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="请填写密码"
          :rules="[{ required: true, message: '' }]"
          label-width="50px"
        />
        <van-field
          label-width="50px"
          v-model="email"
          type="text"
          name="email"
          label="邮箱"
          placeholder="请填写邮箱"
        />
        <van-field
          label-width="50px"
          v-model="nickName"
          type="text"
          name="nickName"
          label="昵称"
          placeholder="请填写昵称"
        />
        <van-field label-width="50px" name="sex" label="性别">
          <template #input>
            <van-radio-group v-model="sex" direction="horizontal">
              <van-radio name="1" checked-color="#EF006E">男</van-radio>
              <van-radio name="0" checked-color="#EF006E">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <div style="margin: 16px 0">
          <van-button block color="#EF006E" native-type="submit"
            >注册</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      account: "",
      password: "",
      nickName: "",
      email: "",
      sex: "1",
    };
  },
  computed: {},
  methods: {
    async onSubmit(val) {
      const vm = this;
      const { account, password, email, nickName, sex } = vm;
      // debugger;
      const submitOptions = {
        account,
        password,
        email,
        nickName,
        sex,
      };
      const res = await axios.post(api.user, submitOptions);
      if (!res.data.status) {
        Toast.fail(res.data.msg);
        return;
      }

      Toast.success(res.data.msg);
      //进入登录页面
      vm.$router.push({ name: "Login" });
    },
    //上传头像
    // async afterRead(file) {
    //   const formData = new FormData();
    //   //⭐根据后端约定好的属性名
    //   formData.append("avatar",file.file);
    //   const res = await axios.post(api.imgOptions, formData);
    //   // const res = await axios({
    //   //   method:"POST",
    //   //   url:api.imgOptions,
    //   //   headers:{'content-type': 'multipart/form-data'},
    //   //   body:formData
    //   // });
    //   // this.avatar.push(file.content);
    // },
    onFailed() {
      //校验
      const reg =
        /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!this.account || !this.password) {
        Toast.fail("账号或密码是必填项");
        // }
        //  else if (!this.account) {
        //   Toast.fail("账号不能为空");
        // } else if (!this.password) {
        //   Toast.fail("密码不能为空");
      } else if (this.email && !reg.test(this.email)) {
        Toast.fail("邮箱格式错误");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>