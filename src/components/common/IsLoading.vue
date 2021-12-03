<template>
    <van-overlay :show="show">
      <div class="wrapper">
        <!-- <div class="block" /> -->
        <van-loading size="24px" vertical type="spinner">加载中...</van-loading>
      </div>
    </van-overlay>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },

};
</script>

<style lang="scss" scoped>
.van-overlay{
  z-index: 10!important;
}
 .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

// @keyframes animate1 {
//   0% {
//     font-size: 15px;
//   }

//   50% {
//     font-size: 13px;
//   }
//   100% {
//     font-size: 8px;
//   }
// }
// .style {
//   position: fixed;
//   left: 50%;
//   top: 50%;
//   transform: translate(-50%, -50%);
//   text-align: center;
//   width: 85px;
//   height: 135px;
//   overflow: hidden;
//   // border-radius: 50%;
//   background: url("/img/bg.gif") no-repeat;
//   // background-size:contain;
//   background-size: cover;
//   background-position: 50% 50%;
//   border-radius: 50% 50% 20% 20%;
//   background-clip: content-box;
//   div {
//     position: absolute;
//     width: 100%;
//     // perspective-origin: 200px;
//     left: 50%;
//     bottom: 10%;
//     transform: translate(-50%);
//     font-size: 8px;
//     color: #fff;
//     font-weight: 600;
//     animation: animate1 1s linear infinite;
//   }
// }
  // .van-overlay {
  //   background-color: rgba(254, 219, 207, 0.4) !important;
  // }
</style>