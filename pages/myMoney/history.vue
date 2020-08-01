<template>
  <view class="history-box">
    <view class="item" v-for="(item, index) in historyList" :key="index">
      <view class="left">
        <view class="title">
          {{ item.title }}
        </view>
        <view class="timer">
          {{ item.timer }}
        </view>
      </view>
      <view class="right" :class="{ isMoreMoney: item.ismore }">
        {{ item.money }}
      </view>
    </view>
  </view>
</template>

<script>
import userAPI from "@/api/user/user.js";
export default {
  data() {
    return {
      historyList: [],
    };
  },
  onShow() {
    this.getList();
  },
  methods: {
    getList() {
			let userId = uni.getStorageSync('userid')
      userAPI.getMoneyList(userId).then((res) => {
				if (res.success) {
					if (res.obj) {
						this.historyList = res.obj
					}
				}
			});
    },
  },
};
</script>

<style lang="scss" scoped>
.history-box {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  .item {
    display: flex;
    padding: 0 $page-row-spacing;
    margin: 10rpx;
    background-color: #fff;
    box-shadow: 0 0 10rpx 2rpx #999;

    &:nth-of-type(1) {
      margin-top: 20rpx;
    }

    .left {
      flex: 7;
      display: flex;
      flex-direction: column;

      .title {
        flex: 3;
        font-size: 30rpx;
        color: #000;
        flex-wrap: wrap;
      }

      .timer {
        flex: 1;
        color: #999;
        font-size: 20rpx;
      }
    }

    .right {
      flex: 2;
      color: green;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 20rpx;
    }

    .isMoreMoney {
      color: red;
    }
  }
}
</style>
