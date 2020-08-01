<template>
  <view class="_hd">
    <view v-if="!isLogin" class="_p" lang="zh_CN" @click="handleLogin">
      <view class="image">
        <image class="img" src="../../static/missing-face.png" mode=""></image>
      </view>
      <p>点击登录</p>
    </view>

    <view v-if="isLogin" class="_p _ent">
      <view class="_i-en image">
        <image :src="avatar" mode="" class="avatar-img" />
      </view>
      <view class="_r">
        <p class="_e-nnn">ID：{{ id }}</p>
        <p class="_e-nnn">余额：{{ balance }}</p>
        <p class="_e-nnn">积分：{{ integral }}</p>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from "vuex";
import AuthAPI from "../../api/auth/auth";
import RegisterAPI from "@/api/register/register";
import { checkLogin, getUrlParam, getWxInfo } from "../../util.js";


export default {
  name: "",
  props: ['isLogin', 'balance', 'integral'],
  data() {
    return {
      id: uni.getStorageSync("nickName"),
			avatar: uni.getStorageSync("avatarUrl"),
    };
	},
  created() {
  },
  computed: {
    ...mapState(["hasLogin", "isEnterpriseUser", "isEnterpriseAdmin"])
  },
  methods: {
    handleLogin() {
			checkLogin()
    },
  },
};
</script>

<style lang="scss" scoped>
._hd {
  margin-top: 10rpx;
  background: #fff;
  padding: 80rpx 0 130rpx;
  border-radius: 10rpx;
  box-shadow: 0 3px 3px -3px #ccc;
  background: $my-color;
  color: #fff;
}

.enter-mode {
  padding-left: 30rpx !important;
}

._p {
  text-align: center;
  padding: 0;
  height: auto;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  position: relative;

  &._ent {
    text-align: left;
    padding-left: 25rpx;
    display: flex;
    height: 130px;
  }

  ._r {
    flex: 1;
  }

  ._e-n {
    padding-left: 35rpx;
  }

  ._e-nnn,
  ._u-ppp {
    padding-left: 35rpx;
    font-size: $font-base;
    margin-top: 10rpx;
  }

  &::after {
    border: none;
  }

  > .image {
    text-align: center;
    margin: 0 auto;
    width: 155rpx;
    height: 155rpx;
    border-radius: 50%;
    border: 1px solid $base-green;
    // padding: 10rpx;
    overflow: hidden;

    ._hd {
      width: 100%;
      height: 100%;
    }

    .img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 1px solid white;
      box-sizing: border-box;
    }
    span {
      position: absolute;
      left: 50%;
      top: 90%;
      transform: translate(-50%);
      z-index: 1111;
    }
  }

  > p {
    font-size: $font-base;
    margin-top: 10rpx;
  }

  ._i-en {
    width: 155rpx;
    height: 155rpx;
    overflow: hidden;
    border: 1px solid $base-green;
    border-radius: 50%;
    .avatar-img {
      width: 155rpx;
      height: 155rpx;
    }
    ._hd {
      border-radius: 50%;
    }

    .img {
      border-radius: 50%;
      border: 1px solid white;
      box-sizing: border-box;
    }
  }

  // 邀请
  ._qqq {
    text-align: center;
    position: absolute;
    width: 170rpx;
    height: 70rpx;
    line-height: 70rpx;
    border: 1px solid $border-color-dark;
    border-right: none;
    border-radius: 40rpx 0 0 40rpx;
    font-size: $font-base;
    right: 0;
    bottom: 0;

    &::after {
      border: none;
    }

    .wkicon {
      margin-right: 10rpx;
    }
  }
}
</style>
