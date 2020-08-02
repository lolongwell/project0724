<template>
	<view class="order-list-box">
		<view class="order-list" v-for="(item, index) in goodsList" :key="index">
			<view class="order-info">
				<view class="left">
					<img :src="'/yplg/' + item.pic"></img>
				</view>
				<view class="right">
					<view class="top">
						{{item.spmc}}
					</view>
					<view class="middle">
						<view class="price">
							 {{item.zffs == 'jfdh' ? item.spjf : '¥' + item.spdj}}
							<span v-show="item.spsl">x {{item.spsl}}</span>
						</view>
						<!-- todo：这里只有拼团信息状态才有 -->
						<view class="tip" v-show="item.wczt === '0'">
							拼团中
						</view>
					</view>
					<view class="bottom">
						<!-- todo:这里要区分：拼团信息卡片不能点击；待收货写死点击；已完成也是卡片不能点击 -->
						<!-- <button class="status" v-for="(val,i) in item.status">{{val}}</button> -->
						<!-- 拼团信息：卡片 -->
						<button v-if="item.wczt === '0'" class="status ptz-card">未拼中返：￥{{item.flmx}}</button>
						<!-- 待付款 -->
						<button v-if="item.wczt === '1'" class="status ptz-card" @click="goPay(item.spId)">待付款</button>
                          
						<!-- 待收货 -->
						<view class="dsh-btn-box" v-else-if="item.wczt === '2'">
							<button class="status " v-for="(items,index) in thfsList" @click="thHandle(items.value,item.id)">{{items.name}}</button>
						</view>
						<!-- 已完成 -->
						<view class="ywc-card-box" v-else-if="item.wczt === '3'">
							<!-- 拼团成功 -->

							<view class="">
								<!-- 已兑换积分 -->
								<button v-show="item.thfs === '2' && item.flmx === null " class="status ydh-card">已兑换积分：{{item.dhjf}}</button>
								<!-- 已提货 -->
								<button v-show="item.thfs === '1' && item.flmx === null" class="status yth-card">已提货</button>
								<!--拼团不成功返利 -->
								<button v-show="!!item.flmx" class=" status fl-card">未拼中返利￥{{item.flmx}}</button>
								
								<view v-show="item.zffs == 'jfdh'" class=" status fl-card">积分兑换商品</view>
							</view>
							<view class="">
								
							</view>
						</view>
						<!-- <button v-else-if="item.wczt === 3" class="status ywc-card">已购物返利33333：￥{{item.flmx}}</button> -->

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
				thfsList: [] // 提货方式字典数据
			}

		},

		watch: {
			goodsList() {
				console.log(333333)
				console.log('改变了1111111111111111111',this.goodsList)
			}
		},

		computed: {
			orderList() {
				return this.$store.state.orderList
			},
			orderStatus() {
				return this.$store.state.orderStatus
			},
			// goodsList(){
			// 	return this.$store.state.goodsList
			// }
		},
		mounted() {
			console.log('goodsList',this.goodsList)

			// 获取地点数据-提货方式 
			this.getDicData('thfs').then(res => {
				this.thfsList = res.data.data.map(item => {
					return {
						name: item.typename,
						value: item.typecode
					}
				})
			})

			console.log('this.thfsList',this.thfsList)
		},
		methods: {
			//点击提货方式：发送请求刷新列表
			thHandle(val, id) {
				uni.showModal({
					title: '提示',
					content: val === '1' ? '是否提货？' : '是否兑换积分',
					success: (res) => {
						if (res.confirm) {
							// 1.获取入参
							let th = {
								thfs: val,
								id: id
							}
							// 2.发送请求，刷新列表
							orderAPI.updateOrder(th).then(res => {
								console.log('es', res)
								if (res.data.respCode === '0') {
									uni.showToast({
										title: '操作成功！',
										duration: 3000
									});
									this.$store.commit('orderStatusUpdate', '2')
									this.getList()

								} else {
									uni.showToast({
										title: '操作成功！',
										duration: 3000
									});
								}
								// 3.todo:存入数据更新到全局
								this.$store.state.commit('orderListUpdate',res.data.obj.results)
							})

						} else if (res.cancel) {
							return;
						}
					}
				});
			},
			// 待付款
			goPay(id){
		
				uni.navigateTo({
				   url: '/pages/detail/detail?id=' + id
				});
			},
			getList() {
				// 1.判断是否登录，没有登录就跳进登录页面
				// 2.获取当前需要的订单入参
				let id = uni.getStorageSync('userid') // 拿到用户信息，从里面拿用户id
				let orderData = {
					userId: id, //用户id
					wczt: '2' // 点击的是哪一种状态
				}
				//3.发送请求
				orderAPI.orderList(orderData).then(res => {
					if (res.data.respCode === '0') {
						this.goodsList = res.data.obj.results
						//4.更新全局orderList
						this.$store.commit('orderListUpdate', this.goodsList)
					}

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

					img {
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
						font-size: 14px;
						flex-wrap: wrap;
						button{
							// font-size: $font-base + 10rpx;
							
						}
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
                            flex-wrap: wrap;


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
								flex: 1;
								flex-wrap: wrap;
							}
						}

						.status {
							height: 100%;
							// line-height: 50rpx;
							font-size:28rpx;
							line-height: 40rpx;
							margin-right: 10rpx;
							text-align: left;
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
