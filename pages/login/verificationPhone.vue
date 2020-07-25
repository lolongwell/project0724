<template>
  <view class="login">
    <!-- <header-logo></header-logo> -->
    <view>
      <head-portrait></head-portrait>
    </view>
    <view class="form">
      <view>
        <p>请输入您的验证码</p>
        <p>
          短信验证码已发送至您注册时的手机
          <span>138****2219</span>
        </p>
      </view>
      <ul>
        <li>
          <input type="text"  placeholder="请输入6位验证码" />
          <p v-if="time<1" class="send" @click="getVerification">获取验证码</p>
          <p v-else class="countdown">
            已发送
            <br />
            <span>{{time}}</span>s
          </p>
        </li>
      </ul>
    </view>

    <view class="buttons">
      <a class="orange button large">确定</a>
    </view>
    <footer-logo class="footerLogo"></footer-logo>
  </view>
</template>

<script>
export default {
  data() {
    return {
      time: 0,
    };
  },
  methods: {
      getVerification(){
          let _this=this;
          _this.time=120;
          let a=setInterval(function(){
              _this.time--;
              if(_this.time<1){
                  clearInterval(a);
              }
          },1000)
      },
  },
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
    > ul {
      list-style: none;
      padding: 0;
      margin: 0;
      font-size: $font-sm;
      margin-top: 40rpx;
      > li {
        border-bottom: 1px dashed $font-color-light;
        overflow: hidden;
        height: 60rpx;
        line-height: 60rpx;
        > * {
          float: left;
        }
        .uni-input-placeholder {
          font-size: 50px;
          color: #b4b4b4;
          font-size: $font-base;
        }
        > input {
          width: 500rpx;
          font-size: $font-base;
          line-height: 60rpx;
          height: 60rpx;
        }
        > p {
          line-height: 30rpx;
          float: right;
          text-align: right;
          color: #b4b4b4;
          height: 60rpx;
          &.send{
              line-height: 60rpx;
              background-color: $base-green;
              color: white;
              padding: 0 20rpx;
              border-radius: 10rpx;
          }
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
}
</style>
