<template>
	<view class="intergral-exchange-box">
		<view class="header">
			<view class="left ">
				<view class="title ">
					<span>积分狂欢</span>
					<span>好礼</span>
					<span>大派送</span>
				</view>
				<view class="content ">
					<ul>
						<li>积分兑换好礼赢，赶紧来参加吧！</li>
						<li>每日签到 赚取积分</li>
					</ul>
				</view>
			</view>
			<view class="right ">
				<image class="img"  src="../../static/images/default.png" mode=""></image>
			</view>

		</view>
		<view class="my-integral">
			<span>我的积分</span>
			<span>{{integral}}</span>
		</view>
		<view class="turntable">
			<turntable @updateIntegral="updateIntegral"></turntable>
		</view>
		<view class="exchange-list-box">
			<exchange-list :intergralList="intergralList"></exchange-list>
		</view>
	</view>
</template>

<script>
	import ExchangeList from '@/components/integral/exchange-list.vue'
	import Turntable from '@/components/integral/turntable.vue'
	import productAPI from "@/api/product/product.js";

	export default {
		components: {
			ExchangeList,
			Turntable
		},
		data() {
			return {
				intergralList: [],
				integral: uni.getStorageSync('hyjf')
			};
		},
		onLoad() {
			this.getGoodList();
		},
		methods: {
			getGoodList() {
				let o = {
					jfspfl:1
				}
				productAPI.integralList(o).then((res) => {
					this.intergralList = res.data.obj.results
					console.log('this.intergralList', this.intergralList)
				});
			},
			updateIntegral(val) {
				this.integral = val
			}
		}
	};
</script>

<style lang="scss" scoped>
	.intergral-exchange-box {

		.header {
			height: 200rpx;
			display: flex;
			padding: 0 30rpx;
			margin-top: 40rpx;

			.left {
				flex: 3;
				display: flex;
				flex-direction: column;

				.title {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					font-weight: bold;
					color: #303133;
					// font-size: $font-base + 30rpx;

					span {
						&:nth-of-type(2) {
							color: red;
							margin-left: 30rpx;
							margin-right: 10rpx;
						}
					}
				}

				.content {
					flex: 2;
					padding-top: 30rpx;
					color: #999;
					font-size: 20rpx;
				}

			}

			.right {
				flex: 1;
				.img{
					width:100%;
					height: 100%;
				}
			}
		}

		.my-integral {
			margin-top: 30rpx;
			height: 100rpx;
			border-top: 1px solid #999;
			border-bottom: 1px solid #999;
			padding: 20rpx 0 0 100rpx;
			font-size: 30rpx;

			span {
				&:nth-of-type(2) {
					margin-left: 10rpx;
					font-size: 40rpx;
					color: $my-color;
				}
			}
		}
	}
</style>
