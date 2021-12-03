<template>
  <div id="home">
    <router-view/>
    <tabs-nav />
  </div>
</template>

<script>
import TabsNav from "@/components/Nav";
export default {
  components: {
    TabsNav,
  },
};
</script>

<style lang="scss" scoped>
#home {
  height: 100%;
}
</style>