<template>
  <view class="login">
    <!-- <header-logo></header-logo> -->
    <view>
      <head-portrait></head-portrait>
    </view>
    <view class="form">
      <view>
        <p>请设置新密码</p>
        <p>设置密码，提高账户定会性</p>
      </view>
      <ul class="input-list">
        <li class="input-item">
          <input type="password" placeholder="请使用数字与大小写字母的组合" />
        </li>
        <li class="input-item">
          <input type="password" placeholder="请使用数字与大小写字母的组合" />
        </li>
      </ul>
    </view>

    <view class="buttons">
      <a class="orange button large">确定</a>
    </view>
	<view class="footer"><img class="_footer" src="../../static/login-footer.png" alt="" /></view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.login {
  width: 680rpx;
  margin: 0 auto;

  > .form {
    padding: 0 10rpx;
    margin-top: 50rpx;
    > view {
      color: $font-color-base;
      > p:nth-child(2) {
        color: #b4b4b4;
        font-size: $font-sm;
      }
    }
    .input-list {
      list-style: none;
      padding: 0;
      margin: 0;
      font-size: $font-sm;
      margin-top: 40rpx;
      .input-item {
        border-bottom: 1px dashed $font-color-light;
        overflow: hidden;
        margin-top: 40rpx;
        line-height: 30rpx;
        > * {
          float: left;
        }
        .uni-input-placeholder {
          font-size: 50px;
          color: #b4b4b4;
          font-size: $font-sm;
        }
        > input {
          width: 100%;
          font-size: $font-sm;
        }
      }
    }
  }
  > .buttons {
    text-align: center;
    > a {
      margin: 0 20rpx;
      margin-top: 60rpx;
    }
  }
  .footerLogo {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .footer {
  	margin-top: 80rpx;
  	text-align: center;
  	._footer {
  		width: 315rpx;
  		height: auto;
  		margin: 0 auto;
  	}
  }
}
</style>
