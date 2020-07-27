<template>
	<view class="intergral-exchange-box">
		<view class="exchange-list-box">
			<exchange-list :intergralList="intergralList"></exchange-list>
		</view>
	</view>
</template>

<script>
	import ExchangeList from '@/components/integral/exchange-list.vue'
	export default {
		components: {ExchangeList},
		data() {
			return {
				intergralList: [
					{
					url: '../../static/images/default.png',
					name: '商品名商品名商品名商品名商品名商品名商品名商品名',
					integral: 2000
				     },
					 {
					 url: '../../static/images/default.png',
					 name: '商品名商品名商品名商品名商品名商品名商品名商品名',
					 integral: 2000
					  },
					  {
					  url: '../../static/images/default.png',
					  name: '商品名商品名商品名商品名商品名商品名商品名商品名',
					  integral: 2000
					   },
				]
			};
		},
		computed: {
			integral() {
				return this.$store.state.integral
			}
		},
		methods: {


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
				background: blue;
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
