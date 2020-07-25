<template>
  <view class="_a-l">
    <view class="_a-i" v-for="(o,$index) in data" :key="$index">
      <view class="_a-i-c" @click="goPage(o.id)">
        <view class="_pic">
          <img :src="o.pic" :alt="o.describe" />
        </view>
        <view class="_if">
          <view class="_t">{{o.name}}</view>
          <view class="_des">{{o.summary}}</view>
        </view>
      </view>
      <view class="_a-i-d">
        <p>
          <span>{{o.createName}}</span>
          <span>{{o.createDate}}</span>
        </p>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "",
  props: {
    data: {
      type: Array
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    goPage(id) {
        uni.navigateTo({
				url: `/pages/articleDetail/articleDetail?id=${id}`
			});
    }
  }
};
</script>

<style lang="scss" scoped>
._a-l {
  width: 100%;
  padding: 0 30rpx;
  background: #fff;
  box-shadow: 0 3px 3px -3px #ccc;
  ._a-i {
    width: 100%;
    // height: 140rpx;
    padding: 15rpx 0;
    border-bottom: 1rpx dashed $border-color-dark;
	
    &:nth-last-child(1) {
      border-bottom: none;
    }
    > ._a-i-c {
      overflow: hidden;
      ._pic {
        margin: 0 auto;
        width: 160rpx;
        height: 110rpx;
        float: left;
        img {
          width: 100%;
          height: 100%;
        }
      }

      ._if {
        box-sizing: border-box;
        float: left;
        width: 510rpx;
        height: 110rpx;
        margin-left: 10rpx;
        ._t {
          height: 35rpx;
          margin-bottom: 10rpx;
          font-size: $font-base;
          color: $black-color;
        }
        ._des {
          height: 50rpx;
          width: 100%;
          font-size: $font-base - 2;
          line-height: $font-base - 2;
          color: $font-color-base;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
    }
    > ._a-i-d {
      font-size: $font-base - 4;
      line-height: $font-base - 2;
      color: $font-color-light;
      margin-top: 10rpx;
      >p>span{
          margin-right: 20rpx;
      }
    }
  }
}
</style>
