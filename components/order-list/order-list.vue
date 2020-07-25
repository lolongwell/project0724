<template>
	<view class="order-list-box">
		<view class="order-list" v-for="(item, index) in goodsList">
			<view class="order-info">
				<view class="left">
					<image src="../../static/images/default.png" mode=""></image>
				</view>
				<view class="right">
					<view class="top">
						{{item.name}}
					</view>
					<view class="middle">
						<view class="price">
							¥ {{item.price}}
							<span v-show="item.count">x {{item.count}}</span>
						</view>
						<view class="tip" v-show="orderStatus.index === 0">
							拼团中
						</view>
					</view>
					<view class="bottom">
						<button class="status" v-for="(val,i) in item.status">{{val}}</button>
					</view>
				</view>
			</view>
			<view class="line">

			</view>
			<view class="bottom">
				<ul>
					<li>订单编号：{{item.orderCode}}</li>
					<li>下单时间:{{item.timer}}</li>
				</ul>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		components: {},
		props: {
			goodsList: {
				type: Array,
				default: () => []
			},
			orderStatus: {
				type: Object,
				default: () => [{}]
			}
		},
		data() {
			return {

			}

		},
		mounted() {
			console.log(this.goodsList)
			console.log(this.orderStatus)
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.order-list-box {
		margin-top: $page-row-spacing;
		padding: 0 $page-row-spacing;
		font-size: $font-base - 10rpx;

		.order-list {
			margin-bottom: 30rpx;
			background: #fff;
			padding: 10rpx;
			border-radius: 20rpx;
			box-shadow: 0 0 20rpx 1rpx #bbb;

			.order-info {
				display: flex;

				.left {
					flex: 2;
                   margin-right: $page-row-spacing;
					image {
						height: 100%;
						width: 100%;
					}
				}

				.right {
					flex: 5;
					display: flex;
					flex-direction: column;
					flex-wrap: wrap;
					.top,
					.middle,
					.bottom {
						flex: 1;
					}

					.middle {
						display: flex;
						margin-top: 20rpx;

						.price {
							flex: 1;
                            color: red;
							font-weight: bolder;
							span {
								margin-left: 10rpx;
							}
						}

						.tip {
							flex: 1;
							color: $my-color;
							text-align: right;
						}

					}

					.bottom {
						margin-top: 20rpx;
						display: flex;
						.status {
							height: 50rpx;
							line-height: 50rpx;
							font-size: 10rpx;
							margin-right: 10rpx;
						}

					}
				}
			}

			.line {
				height: 1rpx;
				width: 100%;
				background: #ccc;
				margin-top: 20rpx;
			}

			.bottom {
				margin-top: 10rpx;
                text-align: left;
				color: #aaa;
			}

		}
	}
</style>
