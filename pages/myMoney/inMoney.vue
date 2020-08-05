<template>
  <view class="in-money-box">
    <view class="in-moneys">
      <ul class="change-moneys">
        <li
          title=""
          class="item"
          :class="{ active: index === activeIndex }"
          @click="changMoney(item, index)"
          note=""
          v-for="(item, index) in moneys"
          :key="index"
        >
          <span v-if="item !== 0">{{ item }}元</span>
          <input
            v-else
            class="other"
            type="number"
            v-model="other"
            placeholder="其他"
            placeholder-style="color:#fff"
          />
        </li>
      </ul>
    </view>
    <view class="pay-moneys">
      <ul class="pay-money">
        <li
          title=""
          :class="{ 'method-active': index === methodIndex }"
          v-for="(item, index) in methods"
          :key="index"
          class="item"
          @click="changMethod(item, index)"
          note=""
        >
          {{ item }}
        </li>
      </ul>
    </view>
    <view class="submit">
      <button type="default" @click="submit">立即充值</button>
    </view>
  </view>
</template>

<script>
	import payAPI from '@/api/pay/pay.js'
export default {
  data() {
    return {
      moneys: [999, 1997, 4998, 9988, 19888, 0],
      methods: ["支付宝", "微信"],
      activeIndex: -1,
      methodIndex: -1,
      money: 0,
      other: '',
      method: "",
    };
  },
  methods: {
    changMoney(val, i) {
      this.activeIndex = i;
      this.money = val;
    },
    changMethod(val, i) {
      //验证选择的金额
      if (!this.money && (this.activeIndex == 5 && !this.other)) {
        uni.showToast({
					title: '请选择充值金额',
					icon: 'none',
					duration: 2000
				});
        return;
      }
      this.methodIndex = i;
      this.method = val;
    },

    submit() {
      if (this.methodIndex == -1) {
				uni.showToast({
					title: '请选择充值方式',
					icon: 'none',
					duration: 2000
				});
        return;
			}
			let sum = 0
			if (this.activeIndex == 5) {
				sum = this.other
			} else {
				sum = this.money
			}
      if (this.method === "微信") {
        uni.setStorageSync('orderSource', '2')  // 1：商品订单；2：充值订单
        uni.setStorageSync('orderDetail', JSON.stringify({
          spmc: '微信充值',
          ddh: '',
          ddje: sum,
          method: 'wx'
        }))
        uni.navigateTo({
          url: `/pages/order/detail`,
        });
      } else {
        // uni.setStorageSync('orderSource', '2')  // 1：商品订单；2：充值订单
        // uni.setStorageSync('orderDetail', JSON.stringify({
        //   spmc: '支付宝充值',
        //   ddh: '',
        //   ddje: sum,
        //   method: 'wx'
        // }))
        // uni.navigateTo({
        //   url: `/pages/order/detail`,
        // });
		let o = {
			userid:uni.getStorageSync('userid'),
			openid:uni.getStorageSync('openid'),
			czje:sum,
			spmc:'支付宝充值'
		}
		payAPI.payOrderByZFB(o).then(res=>{
			if(res.data.data.code === 1000){
				window.location.href = res.data.data.data.qr_code
				
			}else{
				uni.showToast({
					title: '支付不成功',
					icon: 'none',
					duration: 2000
				});
				setTimeout(function() {
					uni.navigateTo({
						url:'../my/my'
					})
				}, 2000)
			}
			
		})
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.in-money-box {
  height: 100%;

  .in-moneys {
    height: 100px;
    width: 100%;
    background: red;

    .change-moneys {
      height: 100%;
      width: 100%;
      padding: 5rpx 10rpx;
      background: pink;
      display: flex;
      flex-wrap: wrap;
      display: flex;
      justify-content: center;
      align-items: center;

      .active {
        background: red !important;
      }

      .item {
        // flex: 1;
        width: 25%;
        height: 30px;
        background: #ccc;
        margin: 0 20rpx;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;

        .other {
          text-align: center;
          font-size: 35rpx;
          color: #fff;
        }
      }
    }
  }

  .pay-money {
    width: 100%;
    height: 200rpx;
    margin-top: $page-row-spacing;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10rpx;

    .method-active {
      border: 1px solid red;
    }

    .item {
      flex: 1;
      width: 20%;
      height: 100rpx;
      margin: 0 30rpx;
      background: pink;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .submit {
    margin-top: 40rpx;

    button {
      background: $my-color;
      color: #fff;
      width: 80%;
    }
  }
}
</style>
