<template>
  <ul class="good-list">
    <li
      v-for="(item, index) in intergralList"
      :key="index"
      @click="goJFDetail(item.id)"
    >
      <img class="pic" :src="item.sppic" alt="" />
      <view class="detail">
        <view class="fl">
          <text> {{ item.spmc }} </text>
        </view>
        <view class="price">
          <text>{{ item.spjf }} 积分</text>
        </view>
      </view>
    </li>
  </ul>
</template>

<script>
const { globalData } = getApp();
export default {
  name: "intergralList",
  props: ["intergralList"],
  computed: {

  },
  methods: {
    goJFDetail(id) {
      console.log("zoule");
      uni.navigateTo({
        url: "/pages/detail/JFDetail?id=" + id,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.good-list {
  width: 100%;
  height: 100%;
  padding: 20rpx;
  box-sizing: border-box;
  overflow-y: auto;

  li {
    float: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: calc(50% - 20rpx);
    border-radius: 16rpx;
    margin-top: 30rpx;
    background: #ffffff;
    &:nth-child(2n + 1) {
      margin-right: 30rpx;
    }
    .pic {
      width: 100%;
      height: 260rpx;
    }
    .detail {
      margin-top: 20rpx;
      padding: 10rpx;
      font-size: 28rpx;
      .tit {
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
      }
      .fl {
        display: flex;
        justify-content: space-between;
        font-size: 22rpx;
        margin-top: 10rpx;
      }
      .price {
        display: flex;
        justify-content: space-between;
        color: red;
        margin-top: 10rpx;
        img {
          width: 30rpx;
          height: 15px;
        }
      }
    }
  }
}
</style>