<template>
  <div id="index">
    <div class="search">
      <van-search v-model="value" placeholder="请输入搜索关键词..." @search="onSearch"/>
    </div>
    <div class="swipe" @click="$router.push({name:'Type'})">
      <van-swipe :autoplay="3000" height="80" indicator-color="white">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image" alt="这是图片" class="img" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="menu-nav">
      <van-grid :border="true" :column-num="3" :square="false">
        <van-grid-item
          v-for="(item,index) in showCategoryList"
          :key="item.id"
          @click="handle(index)"
        >
          <img :src="item.imgSrc" class="img" />
          <span>{{ item.category }}</span>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="goods-list">
      <div class="theme">
        <div class="hot-sale">热销排行榜</div>
        <div class="all-buy">大家都在买</div>
        <div class="go-more">
          <van-button plain type="default" round @click="$router.push({name:'Type'})">查看更多</van-button>
        </div>
      </div>
      <van-list v-model="isLoading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-card
          v-for="goods in goodsList"
          :key="goods.id"
          :origin-price="goods.originPrice"
          :price="goods.discountPrice"
          :desc="goods.desc"
          :title="goods.name"
          :thumb="goods.imgSrc"
          @click="$router.push(`/product/${goods.id}`)"
        />
      </van-list>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      value: "",
      images: ["/img/s1.jpg", "/img/s2.png", "/img/s3.jpg"],
      list: [],
      goodsList: [],
      page: 1,
      size: 6,
      isLoading: false,
      finished: false,
    };
  },
  computed: {
    ...mapState("goods", ["showCategoryList"]),
    loading() {
      let val = true;
      if (this.goodsList.length) {
        val = false;
      }
      return val;
    },
  },
  methods: {
    ...mapActions("goods", ["getCategoryList"]),
    onSearch(){
      Toast('模块未开发');
    },
    async onLoad() {
      setTimeout(() => {
        this.isLoading = false;
        this.finished = true;
      }, 3000);
    },
    handle(index) {
      this.$store.commit("goods/changeSelectedCategoryActive", index);
      this.$router.push({ name: "Type" });
    },
  },
  async mounted() {
    await this.getCategoryList();
    const res = await axios.get(
      api.category + "/" + this.showCategoryList[0].id
    );
    if (res.data.status) {
      this.goodsList = res.data.data.types[0].goods;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/page/index.scss";
</style>