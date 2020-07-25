<template>
  <view v-show="show" class="_product-list">
    <title-common
      class="title"
      :title="title"
      :subTitle="subTitle"
      :more="more"
      :url="url"
      :color="color"
    ></title-common>
    <!--  #ifdef MP-WEIXIN -->
    <view class="__space"></view>
    <!--  #endif -->
    <product-list
      @showOrHide="showOrHide"
      :max="max"
      :typeId="typeId"
      :data="data"
    ></product-list>
  </view>
</template>

<script>
// 头部logo
export default {
  name: "TitleProductList",
  props: {
    title: {
      type: String,
      default: ""
    },
    subTitle: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "#5a961e"
    },
    url: {
      type: String
    },
    more: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: 0
    },
    data: {
      type: Array,
      default: []
    },
    typeId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    showOrHide(data) {
      this.show = ((!!data.length) ? true : false);
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 20rpx;
}
</style>
