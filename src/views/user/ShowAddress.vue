<template>
  <div id="address">
    <van-nav-bar title="收货地址列表" left-arrow @click-left="$router.push({name:'User'})" />
    <div class="address-list">
      <van-address-list
        v-model="defaultId"
        :list="listAddress"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @select="onSelect"
      />
    </div>
    <!-- <van-dialog v-model="show" title="添加地址" show-cancel-button confirm-button-text="确认"> -->
    <van-dialog v-model="show" title="添加地址" :show-cancel-button="true" :show-confirm-button="false">
      <AddAddress />
    </van-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import AddAddress from "@/components/address/AddAddress";
export default {
  components: {
    AddAddress,
  },
  data() {
    return {
      editId: null,
      defaultId: null,
      show: false,
    };
  },
  computed: {
    // ...mapState("address", ["isAdd"]),
    ...mapGetters("address", ["listAddress", "defaultAddress"]),
  },
  // watch: {
  //   isAdd(newVal) {
  //     this.show = newVal;
  //   },
  // },
  methods: {
    ...mapActions("address", ["getAddressList"]),
    onAdd() {
      this.show = true;
      // this.$store.commit("address/changeIsAdd", this.show);
    },
    onEdit(item) {
      //要传给另一个组件
      this.$store.commit("address/addEditAddress", item.id);
      this.$router.push(`/address/${item.id}`);
    },
    //⭐请求过于频繁
    async onSelect(item) {
      //不符合条件返回
      if (item.id === this.defaultId) {
        Toast.fail("默认地址");
        return;
      }
      const res = await axios.put(api.addressOptions, {
        id: item.id,
        isDefault: 1,
      });
      if (!res.data.status) {
        Toast.fail("设置失败");
        return;
      }
      Toast.success("设置成功");
      //经过以上后，需要重新，为了减少请求，设置默认就不请求了，直接改变store
      //需要重新请求address
      await this.getAddressList();
    },
  },
  mounted() {
    if (this.defaultAddress) {
      this.defaultId = this.defaultAddress.id;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/user/address.scss";
</style>