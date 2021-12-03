<template>
  <div id="edit-address">
    <!-- <van-nav-bar left-arrow @click-left="onLeft" /> -->
    <LeftNav title="编辑地址"></LeftNav>
    <van-address-edit
      :area-list="areaList"
      :address-info="addressMsg"
      show-delete
      show-set-default
      @save="onSave"
      @delete="onDelete"
      save-button-text="修改"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import areaList from "@/utils/area";
export default {
  data() {
    return {
      areaList,
      addressMsg: null,
  
    };
  },
  computed: {
    ...mapState("address", ["editAddress",]),
    id() {
      let temp = null;
      if (this.editAddress) {
        temp = this.editAddress.id;
      }
      return temp;
    },
  },
  methods: {
    ...mapActions("address",['reqDeleteAddress',"reqUpdateAddress"]),
    async onSave(content) {
      const {
        id,
        name,
        province,
        city,
        addressDetail: detailAddress,
        tel: mobile,
        isDefault,
      } = content;
      let updateOptions = {
        id,
        name,
        province,
        mobile,
        isDefault: Number(isDefault),
        city,
        detailAddress,
      };
      await this.reqUpdateAddress(updateOptions);
      this.$store.commit("address/clearEditAddress");
      this.$router.push({ name: "Address" });
    },
    //无论删除还是修改，都得清空editAddress
    async onDelete() {
      await this.reqDeleteAddress(this.id);
      this.$store.commit("address/clearEditAddress");
      this.$router.push({ name: "Address" });
    },
    onLeft() {
      this.$store.commit("address/clearEditAddress");
      this.$router.push({ name: "Address" });
    },
  },
  created() {
    //⭐判断
    if (!this.editAddress) {
      return null;
    }
    let areaCode;
    for (const key in this.areaList.county_list) {
      if (this.areaList.county_list[key] === this.editAddress.county) {
        areaCode = key;
        // //debugger
      }
    }
    this.addressMsg = { ...this.editAddress, areaCode };
  },
};
</script>

<style lang="scss" scoped>
#edit-address{
  width: 100%;
  height: 100%;
  padding: 3%;
  box-sizing: border-box;
  ::v-deep .van-switch--on{
     background: #d4237a;
  }
  ::v-deep .van-button--danger{
     background: #d4237a;
  }
}
</style>