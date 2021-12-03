<template>
  <div id="my-detail">
     <LeftNav/>
    <van-cell-group>
      <van-cell title="头像">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #extra>
          <img :src="imgSrc" class="img" />
          <!-- <i class="iconfont icon-arrowright"></i> -->
        </template>
      </van-cell>
      <van-cell title="昵称" arrow-direction>
        <template #extra>
          <span>{{ nickName }}</span>
        </template>
      </van-cell>
      <van-cell  title="性别">
        <template #extra>
          <span>{{ sex?"女":"男" }}</span>
        </template>
      </van-cell>
      <van-cell title="备注">
        <template #extra>
          <span>{{ desc }}</span>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("user", ["account", "avatar", "nickName", "email"]),
    ...mapGetters("user", ["desc", "sex"]),
        isLogin(){
      let status = false;
      if(this.account){
        status = true
      }
      return status;
    },
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

  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/user/my.scss";
</style>