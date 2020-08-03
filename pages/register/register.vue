<template>
  <view class="register">
    <text class="tip">*请使用该微信号绑定的手机号注册</text>
    <view class="icon-input">
      <image class="img" src="../../static/images/default.png" mode=""></image>
      <input
        class="ipt"
        type="number"
        maxlength="11"
        placeholder="手机号"
        placeholder-class="ipt-placeholder"
        v-model="phone"
      />
    </view>

    <view class="icon-input">
      <image class="img" src="../../static/images/default.png" mode=""></image>
      <input
        class="ipt"
        type="number"
        maxlength="6"
        placeholder="验证码"
        placeholder-class="ipt-placeholder"
        v-model="veriCode"
      />
      <view class="ipt-btn" @click="handleBtn">
        {{ codeText }}
      </view>
    </view>

    <view class="icon-input">
      <image class="img" src="../../static/images/default.png" mode=""></image>
      <input
        class="ipt"
        placeholder="邀请码"
        placeholder-class="ipt-placeholder"
        v-model="yqm"
      />
    </view>

    <view class="icon-input">
      <image class="img" src="../../static/images/default.png" mode=""></image>
      <input
        class="ipt"
        placeholder="姓名"
        placeholder-class="ipt-placeholder"
        v-model="realName"
      />
    </view>

    <view class="icon-input">
      <image class="img" src="../../static/images/default.png" mode=""></image>
      <input
        class="ipt"
        type="password"
        placeholder="密码"
        placeholder-class="ipt-placeholder"
        v-model="password1"
      />
    </view>
    <view class="icon-input">
      <image class="img" src="../../static/images/default.png" mode=""></image>
      <input
        class="ipt"
        type="password"
        placeholder="再次确认"
        placeholder-class="ipt-placeholder"
        v-model="password2"
      />
    </view>

    <button class="item btn" type="default" @click="sumbit">确认</button>
  </view>
</template>

<script>
import { mapState } from "vuex";
import RegisterAPI from "@/api/register/register";
import { checkLogin } from "../../util.js";

export default {
  data() {
    return {
      phone: "",
      veriCode: "", // 验证码
      yqm: "", // 邀请码
      yqrId: "", // 邀请人id
      realName: "",
      password1: "",
      password2: "",
      codeText: "", //验证码文字
      isSendCaptcha: false,
      timerNum: 60,
      timeClock: null,
      codeText: "获取验证码",
    };
  },
  computed: {
    ...mapState(["hasLogin"]),
  },
  onLoad(option) {
    this.yqm = option.yqm || "";
		this.yqrId = option.yqrid || "";
		if (option.yqm) {
			checkLogin()
		}
  },
  methods: {
    sumbit() {
      let { phone, veriCode, realName, password1, password2 } = this;
      if (!realName) {
        uni.showToast({
          title: "请输入用户名！",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      if (!veriCode) {
        uni.showToast({
          title: "请输入验证码！",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      if (!password1) {
        uni.showToast({
          title: "请输入密码",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      if (password1 !== password2) {
        uni.showToast({
          title: "两次输入的密码不一致，请检查！",
          icon: "none",
          duration: 2000,
        });
        return;
      }

      //提交注册
      let data = {
        mobilePhone: this.phone,
        userName: this.phone,
        realName: this.realName,
        password: this.password1,
        ghbm: this.veriCode,
        yqrId: this.yqrId,
        openid: uni.getStorageSync("openid"),
        session_key: uni.getStorageSync("session_key"),
        nickName: uni.getStorageSync("nickName"),
        sex: uni.getStorageSync("sex"),
        province: uni.getStorageSync("province"),
        country: uni.getStorageSync("country"),
        avatarUrl: uni.getStorageSync("avatarUrl"),
        unionid: uni.getStorageSync("unionid"),
      };
      console.log("data", data);
      RegisterAPI.submitRegister(data).then((res) => {
        console.log("注册", res);
        if (res.data.ok && res.data.data.token) {
          uni.showToast({
            title: "恭喜您，注册成功！",
            duration: 1000
          });
          let token = res.data.data.token;
          this.$store.commit("login", token);
          uni.getStorageSync("sex")
          setTimeout(() => {
            window.location.href = "http://sjblake.cn/index.html"
          }, 1500);
        } else {
          uni.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1000
          });
        }
      });
    },
    handleBtn() {
      if (this.isSendCaptcha) return;
      let { phone } = this;
      console.log(phone);
      let reg = /^1[3456789]\d{9}$/;
      if (!phone) {
        uni.showToast({
          title: "请输入手机号！",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      if (!reg.test(phone)) {
        uni.showToast({
          title: "手机号输入格式不对，请重新输入！",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      // this.isSendCaptcha = true;
      // this.sendCodeTime();
      if (phone) {
        RegisterAPI.getPhoneCode(phone).then((res) => {
          console.log("res", res);
          if (res.statusCode == 200) {
            this.isSendCaptcha = true;
            this.sendCodeTime();
          }
        });
      }
    },
    sendCodeTime() {
      console.log("zoule");
      this.timerNum = 60;
      this.isSendCaptcha = true;
      this.timeClock && clearInterval(this.timeClock);
      if (this.isSendCaptcha) {
        this.timerNum = 60;
        this.timeClock = setInterval(() => {
          this.timerNum--;
          this.codeText = `重新发送${this.timerNum}`;
          if (this.timerNum === 0) {
            clearInterval(this.timeClock);
            this.isSendCaptcha = false;
            this.codeText = "获取验证码";
          }
        }, 1000);
      }
    },
  },
};
</script>

<style lang="scss">
.register {
  width: 100vw;
  height: 100vh;
  padding-top: 44rpx;
  box-sizing: border-box;
  background: #ff0000;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  .item {
    margin-top: 40rpx;
  }

  .input-code {
    position: relative;

    .code-text {
      position: absolute;
      right: 20rpx;
      top: 50%;
      font-size: $font-base;
      color: $base-red;
      // transform: translateY(-50%);
    }
  }

  .tip {
    color: #ffffff;
    font-size: 28rpx;
  }

  .btn {
    width: 80vw;
    border: none;
    border-radius: 36rpx;
    color: #ff0000;
  }
}

.icon-input {
  width: 80vw;
  height: 80rpx;
  padding: 10rpx 30rpx;
  margin: 20rpx 0;
  border-radius: 36rpx;
  box-sizing: border-box;
  background: #fff;
  display: flex;
  justify-content: start;
  align-items: center;

  .img {
    width: 30rpx;
    height: 30rpx;
    margin-right: 30rpx;
  }

  .ipt {
    flex: 1;
    height: 100%;
  }

  .ipt-btn {
    font-size: 24rpx;
    color: #ff0000;
    margin-left: 20rpx;
  }
}

.ipt-placeholder {
  color: #ccc;
}
</style>
