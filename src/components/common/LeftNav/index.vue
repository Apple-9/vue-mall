<template>
  <van-nav-bar :title="title" @click-left="$router.go(-1)">
    <template #left>
      <!-- <van-icon name="search" size="18" /> -->
      <i class="iconfont icon-fanhuitubiao"></i>
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>