<template>
  <view class="detail-box">
    <view class="item" v-for="(item, index) in addressList" :key="index">
      <view class="top">
        <view class="left">
          {{ item.realname }}
        </view>
        <view class="right">
          {{ item.phone }}
        </view>
      </view>
      <view class="bottom">
        {{ item.address }} {{item.detail}}
      </view>
    </view>
    <view class="add-detail">
      <button class="add-btn" @click="add('add', {})">新增地址</button>
      <!-- <button @eventClick="goLink('/pages/address/addressManage')">添加收货地址</button> -->
      <!--  @click="add('add',{})" -->
    </view>
  </view>
</template>

<script>
import orderAPI from "@/api/order/order.js";
export default {
  data() {
    return {
      addressList: [],
    };
  },
  onShow() {
		let userid = uni.getStorageSync('userid')
		if (!userid) {
			uni.showToast({
				title: '请登录',
				icon: 'none',
				duration: 2000
			});
			return
		}
    this.getList();
  },
  methods: {
    getList() {
      let o = {
        userId: uni.getStorageSync('userid')
      };
      orderAPI.getAddressList(o).then((res) => {
        this.addressList = res.data.obj.results;
      });
    },
    add() {
      uni.navigateTo({
        url: `/pages/address/addressManage`,
      });
    },

    // check(d) {
    // 	this.$api.prePage().addressData = d;
    // 	uni.navigateBack();
    // },
    // add(type, d) {
    // 	uni.navigateTo({
    // 		url: `/pages/address/addressManage?type=${type}&data=${JSON.stringify(d)}`
    // 	});
    // }
  },
};
</script>

<style lang="scss" scoped>
.detail-box {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: $font-base;

  padding: 0 $page-row-spacing;
  padding-bottom: 120rpx;
  position: relative;

  .item {
    margin-top: $page-row-spacing;
    font-size: 25rpx;

    .top {
      display: flex;
      justify-content: center;
      align-items: center;

      .left {
        flex: 1;
      }

      .right {
        flex: 5;
        font-size: 20rpx;
        color: #666;
      }
    }
  }

  .add-detail {
    position: fixed;
    left: 50%;
    transform: translate(-50%);
    bottom: 10rpx;
    font-size: 20rpx;
    width: 90%;

    button {
      background: $my-color;
      color: #fff;
      height: 60rpx;
      line-height: 60rpx;
    }
  }
}
</style>
