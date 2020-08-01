<template>
  <view class="reset-password-box">
    <view class="form">
      <ul class="input-list">
        <li class="input-item">
          <input type="text" placeholder="收货人" v-model="form.realname" />
        </li>
        <li class="input-item">
          <input type="number" placeholder="手机号" v-model="form.phone"/>
        </li>
        <li>
          <span class="region">所属区域：</span>
          <view class="row b-b" @click="addressChange">
            <text class="a-text">{{ form.address }}</text>
            <text class="yticon icon-shouhuodizhi"></text>
          </view>
          <!-- <view class="uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-db">
								<picker mode=multiSelector @change="change" @columnchange="bindPickerChange" :value="index" :range="array">
									<view class="uni-input">{{array[0][index[0]]}},{{array[1][index[1]]}},{{array[2][index[2]]}}</view>
								</picker>
							</view>
						</view>
					</view> -->
        </li>

        <li class="input-item input-address">
          <input type="text" placeholder="详细地址" v-model="form.detail" />
        </li>
        <li class="input-item sumit">
          <button type="default" @click="addSubmit">提 交</button>
        </li>
      </ul>
    </view>
  </view>
</template>

<script>
import orderAPI from "@/api/order/order.js";
export default {
  data() {
    return {
      form: {
        phone: "",
        realname: "",
        address: "",
        detail: "",
        userId: uni.getStorageSync('userid')
      },
      isPhone: false,
      errorPhone: false,
      array: [
        ["请选择省份", "湖北", "湖南"],
        ["请选择市", "武汉", "长沙"],
        ["请选择市", "新洲"],
      ],
      index: [0, 0, 0],
      regionId: "",
    };
  },
  methods: {
    addSubmit() {
      console.log(this.form);
      // 校验
      if (!this.form.realname) {
        this.$api.msg("请输入收货人");
        return;
      }
      if (!this.form.phone) {
        this.$api.msg("请输入手机号码");
        return;
      }
      if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(this.form.phone)) {
        this.$api.msg("请输入正确的手机号码");
        return;
      }
      if (!this.form.detail) {
        this.$api.msg("请输入详细地址");
        return;
      }
      let data = JSON.parse(JSON.stringify(this.form));
      // 新增地址-提交
      console.log("data", data);
      orderAPI.addAddress(data).then((res) => {
        console.log('添加地址', res)
				if (res.data.respCode == 0) {
					uni.showToast({
						title: '添加成功',
						duration: 1500
					});
					setTimeout(() => {
						uni.navigateBack();
					},1500)
				}
      });
    },
    // 获取省市区信息
    bindPickerChange(e) {
      console.log(e.detail);
      this.regionId = e.detail.column;
      if (this.regionId === 0) {
        this.index[0] = e.detail.value;
      } else if (this.regionId === 1) {
        this.index[1] = e.detail.value;
      } else {
        this.index[2] = e.detail.value;
      }
      // 省市数组
      console.log(this.index);
    },
    change(e) {
      this.index = e.detail.value;
      console.log(this.index);
    },
    // 改变收货地址
    addressChange() {
      uni.chooseLocation({
        success: (data) => {
          console.info("dizhi", data);
          // this.addressData.address = data.address;
          this.form.address = data.address;
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.reset-password-box {
  display: flex;
  flex-direction: column;
  margin-top: 10%;
  margin-left: 50%;
  width: 70%;
  transform: translate(-50%, -10%);

  ul {
    padding-left: 0;

    .input-item {
      height: 60rpx;
      width: 100%;
      // margin-top: 20rpx;
      position: relative;
      border-bottom: 1px solid #999;
      input {
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        padding-left: 20rpx;
        font-size: 20rpx;
      }

      .icon-item {
        position: absolute;
        left: 10rpx;
        top: 50%;
        transform: translateY(-50%);
      }

      .captcha {
        position: absolute;
        right: 10rpx;
        top: 50%;
        transform: translateY(-50%);
        font-size: 10rpx;
        color: $my-color;
      }

      .v-item {
        position: absolute;
        bottom: -30rpx;
        color: red;
        font-size: 20rpx;
      }
    }

    .input-address {
      border-top: 1px solid #999;
      margin-top: 20rpx;
    }

    .region {
      font-size: 15rpx;
      color: #333;
      display: inline-block;
      margin-top: 50rpx;
    }

    .uni-list {
      background-color: transparent;
      line-height: 60rpx;
      padding-left: 20rpx;
      // color: #999;
    }
    .a-text {
      font-size: 15rpx;
    }

    .sumit {
      border: 0;
      margin-top: 20rpx;

      button {
        border: 1px solid $my-color;
        color: $my-color;
        height: 50rpx;
        line-height: 50rpx;
      }
    }
  }
}

.uni-input {
  height: 60rpx;
  font-size: 10rpx;
}
</style>
