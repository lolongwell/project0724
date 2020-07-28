<template>
	<view class="order-list-box">
		<view class="order-list" v-for="(item, index) in goodsList">
			<view class="order-info">
				<view class="left">
					<image src="../../static/images/default.png" mode=""></image>
				</view>
				<view class="right">
					<view class="top">
						{{item.spmc}}
					</view>
					<view class="middle">
						<view class="price">
							¥ {{item.spdj}}
							<span v-show="item.count">x {{item.count}}</span>
						</view>
						<!-- todo：这里只有拼团信息状态才有 -->
						<view class="tip" v-show="item.wczt === 0">
							拼团中
						</view>
					</view>
					<view class="bottom">
						<!-- todo:这里要区分：拼团信息卡片不能点击；待收货写死点击；已完成也是卡片不能点击 -->
						<!-- <button class="status" v-for="(val,i) in item.status">{{val}}</button> -->
						<!-- 拼团信息：卡片 -->
						<button v-if="item.wczt === 0" class="status ptz-card">未拼中返：2000</button>



						<!-- 待收货 -->
						<view class="dsh-btn-box" v-else-if="item.wczt === 2">
							<button class="status " v-for="(item,index) in thfsList" @click="thHandle(item.value)">{{item.name}}</button>
						</view>
						<!-- 已完成 -->
						<view class="ywc-card-box" v-else-if="item.wczt === 3">
							<!-- 拼团成功 -->

							<view class="">
								<!-- 已兑换积分 -->
								<button v-show="item.thfs === 2 && item.flmx === '' " class="status ydh-card">已兑换积分：50</button>
								<!-- 已提货 -->
								<button v-show="item.thfs === 1 && item.flmx === '' " class="status yth-card">已提货</button>
							</view>
							<view class="">
								<!--拼团不成功返利 -->
								<button v-show="item.flmx !== ''" class=" status fl-card">￥{{item.flmx}}</button>
							</view>



						</view>
						<!-- <button v-else-if="item.wczt === 3" class="status ywc-card">已购物返利：￥{{item.flmx}}</button> -->

					</view>
				</view>
			</view>
			<view class="line">

			</view>
			<view class="bottom">
				<ul>
					<li>订单编号：{{item.ddh}}</li>
					<li>下单时间:{{item.fktime}}</li>
				</ul>
			</view>
		</view>

	</view>
</template>

<script>
	import orderAPI from '@/api/order/order.js'
	export default {
		components: {},
		props: {
			goodsList: {
				type: Array,
				default: () => []
			},
		},
		data() {
			return {
				thfsList: [{
						name: '兑换积分',
						value: '2'
					},
					{
						name: '提货',
						value: '1'
					}
				]
			}

		},

		computed: {
			orderList() {
				return this.$store.state.orderList
			},
			orderStatus() {
				return this.$store.state.orderStatus
			},
		},
		mounted() {
			console.log('this.orderList', this.orderList)
			console.log('this.orderStatus', this.orderStatus)


			this.getDicData('thfs').then(res => {
				console.log('res', res)
			})
		},
		methods: {
			//点击提货方式：发送请求刷新列表
			thHandle(val) {
				// 1.获取入参
				let th = {
					userId: uni.getStorageSync('user').userId,
					thfs: val,
					wczt: 2
				}
				// 2.发送请求，刷新列表
				orderAPI.orderList(th).then(res => {
					console.log('res', res)
					// this.goodsList = this.goodsList2

					// 3.todo:存入数据更新到全局
					// this.$store.state.commit('orderListUpdate',this.goodsList)
				})

			}

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

						.dsh-btn-box {
							display: flex;



							button {
								&:nth-of-type(1) {
									background-color: green;
								}

								&:nth-of-type(2) {
									background-color: $my-color;
								}
							}

						}

						.ywc-card-box {
							display: flex;

							.status {
								flex: 1
							}
						}

						.status {
							height: 50rpx;
							line-height: 50rpx;
							font-size: 10rpx;
							margin-right: 10rpx;
							color: #fff;
							background-color: $my-color;
						}

						.ptz-card,
						.ywc-card {
							background: $my-color;
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
