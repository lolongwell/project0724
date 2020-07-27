<template>
  <view class="new-goods">
    <img class="top-pic" src="../../static/banners/b1.jpg" alt="">
    <view class="box">
      <ul>
        <li v-for="(item, index) in list" :key="index" @click="goDetail(item.id)">
          <img class="img" :src="item.sppic" alt="">
          <view class="detail">
            <text>{{item.spmc}}</text>
            <text class="price">￥{{item.ptjg}}</text>
            <view class="kt">
              <view class="left">
                <img src="../../static/images/mp.png" alt="">
                <text>{{item.ptlx == 2 ? '2人团' : item.ptlx == 5 ? '5人团' : item.ptlx == 10 ? '10人团' : ''}}</text>
              </view>
              <view class="right">
                <img src="../../static/images/wc.png" alt="">
                <text>去开团</text>
              </view>
            </view>
          </view>
        </li>
      </ul>
    </view>
  </view>
</template>

<script>
	import productAPI from "@/api/product/product.js";

  export default {
    name: 'newGoods',
    data() {
      return {
        list: []
      }
    },
    onShow() {
      productAPI.productList("spfl").then((res) => {
        this.list = res.data.obj.results
      });
    },
    methods: {
      goDetail(id) {
        uni.navigateTo({
					url: '/pages/detail/detail?id=' + id
				})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .new-goods {
    width: 100vw;
    padding: 10rpx 10rpx 20rpx;
    background: #ec3b3b;
    .top-pic {
      width: 100%;
    }
    .box {
      background: #ffffff;
      padding: 20rpx;
      border-radius: 16rpx;
      ul {
        list-style: none;
        width: 100%;
        margin: 0;
        padding: 0;
        padding-bottom: 20rpx;
        li {
          display: flex;
          margin-bottom: 20rpx;
          .img {
            width: 200rpx;
            height: 200rpx;
            margin-right: 20rpx;
          }
          .detail {
            font-size: 32rpx;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .price {
              color: #ec3b3b;
            }
            .kt {
              width: 400rpx;
              border: 1rpx solid #ec3b3b;
              display: flex;
              justify-content: space-between;
              .left {
                display: flex;
                padding: 10rpx;
                img {
                  width: 40rpx;
                  height: 40rpx;
                  margin-right: 10rpx;
                }
              }
              .right {
                display: flex;
                background: #ec3b3b;
                padding: 10rpx;
                color: #ffffff;
                img {
                  width: 40rpx;
                  height: 40rpx;
                  margin-right: 10rpx;
                }
              }
            }
          }
        }
      }
    }
  }
</style>