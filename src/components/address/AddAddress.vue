<template>
  <div id="add-address">
    <van-address-edit
      :area-list="areaList"
      show-set-default
      :address-info="address"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import areaList from "@/utils/area";
export default {
  computed: {
  },
  data() {
    return {
      areaList,
      address: {},
    };
  },

  methods: {
    ...mapActions("address", ["getAddressList","reqAddAddress"]),
    async onSave(content) {
      const {
        isDefault,
        name,
        province,
        tel: mobile,
        addressDetail: detailAddress,
        city,
        county,
      } = content;
      this.address = {
        name,
        isDefault: Number(isDefault),
        name,
        province,
        mobile,
        detailAddress,
        city,
        county,
        sex: 0,
      };
      await this.reqAddAddress(this.address);
      this.address = {};
      this.$store.commit("address/changeIsAdd",false);
    },
    onCancel() {
      this.address = {};
    },
  },
  mounted() {
    this.address = {};
  },
};
</script>

<style lang="scss" scoped>
</style>