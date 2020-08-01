<template>
	<view class="order-detail-box">
		<ul>
			<li>
				<span>商品名称</span>
				<span>{{detailList.spmc}}</span>
			</li>
			<li>
				<span>订单编号</span>
				<span>{{detailList.ddh}}</span>
			</li>
			<li>
				<span>商家名称</span>
				<span>悠品乐购</span>
			</li>
			<li>
				<span>商品价格</span>
				<span>{{detailList.ddje}}</span>
			</li>
			<li>
				<span>还需支付</span>
				<span>￥{{detailList.ddje}}</span>
			</li>
		</ul>
		<view class="pay-method">
			<p>选择支付方式</p>
			<view class="pay-wechar" @click="payHandle">
				<view class="left">
                  <img src=""></img>
				</view>
				<view class="center">
					<p>微信支付1</p>
					<p>微信支付，安全快捷(只能在微信内使用)</p>
				</view>
				<view class="right">
					<span class="cell-more yticon icon-you icon-uni"></span>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import moneyAPI from "@/api/money/money.js";
import {requestPayOpenid, getUrlParam, payment} from '../../util'
export default {
  data() {
    return {
      detailList: {}
    };
  },
  computed: {
    orderDetails() {
      return this.$store.state.orderDetails;
    },
	},
	onLoad() {
    let orderDetail = JSON.parse(uni.getStorageSync('orderDetail'))
    let orderInfo = {
      money: orderDetail.ddje,
      method: orderDetail.method,
      spmc: orderDetail.spmc
    }
		let local = window.location.href
		let pay_openid = getUrlParam('openid')
		if (pay_openid) {
			console.log('pay_openid', local)
			payment(pay_openid, orderInfo)
		}
	},
  onShow() {
    this.detailList = JSON.parse(uni.getStorageSync('orderDetail'))
    console.log("aaa", uni.getStorageSync('orderDetail'));
  },
  methods: {
    payHandle() {
			requestPayOpenid()
    },
  },
};
</script>

<style lang="scss" scoped>
.order-detail-box {
  padding: $page-row-spacing 0;
  font-size: $font-base;

  ul {
    padding: 0;
    background: #fff;

    li {
      font-size: 30rpx;
      display: flex;
      // justify-content: space-around;
      border-top: 1px solid #ddd;
      padding: $page-row-spacing 0;
      justify-content: space-between;
      padding: 20rpx;

      span {
        // flex: 1;
        &:nth-of-type(1) {
          flex: 1;
        }

        &:nth-of-type(2) {
          flex: 3;
        }
      }
    }
  }

  .pay-method {
    margin-top: 30rpx;

    .pay-wechar {
      margin-top: $page-row-spacing;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 30rpx;

      .left {
        flex: 1;
      }

      .center {
        flex: 6;
        display: flex;
        flex-direction: column;

        p {
          padding: 10rpx;

          &:nth-of-type(2) {
            color: #999;
          }
        }
      }

      .right {
        flex: 1;
        text-align: right;
      }
    }
  }
}
</style>
