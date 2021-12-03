<template>
  <div id="app">
    <router-view />

  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">

@import "@/assets/css/common.scss";
@import "@/assets/css/reset.scss";
@import url("////at.alicdn.com/t/font_2299472_85375hk8193.css");
@import url("../src/assets/css/user.scss");
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  // 配置❓
  width: 100%;
  height: 100%;
  // background: #cccc;
  margin: 0 auto;
  max-width: 800px;
  overflow: hidden;
}
body,
html {
  width: 100%;
  height: 100%;
}
</style>
