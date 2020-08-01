<template>
  <ul class="good-list">
    <li v-for="(item, index) in goodListData" :key="index" @click="goGoodDetail(item.id)">
      <img class="pic" :src="item.sppic" alt="">
      <view class="detail">
        <text class="tit">{{item.spmc}}</text>
        <view class="fl">
          <text>拼团即返 {{item.flbfb}}%</text>
          <text>{{item.ptlx == 2 ? '二人团' : item.ptlx == 5 ? '五人团' : item.ptlx == 10 ? '十人团' : ''}}</text>
        </view>
        <view class="price">
          <text>￥{{item.ptjg}}</text>
          <img src="../../static/images/car.png" alt="">
        </view>
      </view>
    </li>
  </ul>
</template>

<script>
const {globalData} = getApp();
  export default {
    name: 'goodList',
    props: ['goodListData'],
    computed: {
      // newGoodListData() {
      //  let {goodListData} = this
      //  goodListData.forEach(v => {
      //    v.sppic = globalData.BASE_URL + v.sppic
      //  })
      //  // console.log(goodListData)
      //  return goodListData
      // }
    },
    methods: {
      goGoodDetail(id) {
		  console.log('goodListData',this.goodListData)
        uni.navigateTo({
           url: '/pages/detail/detail?id=' + id
        });
      }
    }
  }
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
      display:  flex;
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