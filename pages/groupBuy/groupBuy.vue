<template>
	<view>
		<ul class="group-type">
			<li class="item" v-for="(item,index) in groupType" :key="item.text" @click="ptTypeHandle(item.pt_value,index)">
				<img class="img" :src="item.pt_url"></img>
				<text :class="{'ptlx-btn':index === ptlxIndex}">{{item.pt_name}}</text>
			</li>
		</ul>
		<view class="goods-floor">
			<!-- 左侧楼层 -->
			<ul class="floor-nav">
				<!-- <li :class="curIndex === -1"  @click="setFloorNavMountClick(-1)"> 全部</li> -->
				<li v-for="(item, index) in floorNav" :key="item.id" :class="ptspType == item.spfl  ? 'selected' : ''" @click="setFloorNavMountClick(index,item.spfl)">{{ item.spfl2 }}</li>
			</ul>
			<!-- 右侧的内容区域 -->
			<ul class="floor-list">
				<li v-for="item in floorList" :key="item.id" @click="goGoodDetail(item.id)">
					<img class="good-img" :src="item.sppic"></img>
					<view class="good-info">
						<text class="tit">{{item.spmc}}</text>
						<text class="price">￥ {{item.ptjg}}</text>
						<text class="rebate">拼团即返{{item.flbfb}}%</text>
						<view class="cart">
							<view class="left">
								<img src="../../static/images/mp.png" alt="">
								<!-- <image class="p-icon" src="../../static/images/default.png" mode=""></image> -->
								<!-- <icon class="p-icon"   type="personal" size="26"/> -->
								<text class="p-text">{{item.ptlx == '2' ? '2人团' : item.ptlx == '5' ? '5人团' : item.ptlx == '10' ? '10人团' : ''}}</text>
							</view>
							<view class="right">
								<!-- <image class="c-icon" src="../../static/images/car.png" mode=""></image> -->
								<!-- <img src="../../static/images/wc.png" alt=""> -->
								<img src="../../static/images/wc.png" alt="">
								<text>去开团</text>
							</view>
						</view>
					</view>
				</li>
			</ul>
		</view>
	    
		 <!-- <button type="default" @click="test()">测试</button> -->
	</view>
</template>

<script>
	import productAPI from '@/api/product/product.js'
	import OrderAPI from "@/api/order/order.js";
	export default {
		name: "groupBuy",
		components: {},
		data() {
			return {
				// 拼团类型
				groupType: [{
						pt_name: '十人拼团',
						pt_value: 10,
						pt_url: '../../static/images/pt_10.png'
					},
					{
						pt_name: '五人拼团',
						pt_value: 5,
						pt_url: '../../static/images/pt_5.png'
					},
					{
						pt_name: '二人拼团',
						pt_value: 2,
						pt_url: '../../static/images/pt_2.png'
					}
				],
				// 左侧商品类型数据
				floorNav: [{
						id: 1,
						name: '全部'
					},
					{
						id: 2,
						name: '小地家族'
					},
					{
						id: 3,
						name: '小地单挑'
					},
					{
						id: 4,
						name: '二十四鲜'
					},
					{
						id: 5,
						name: '抢鲜'
					},
					{
						id: 6,
						name: '小地家族'
					},
					{
						id: 7,
						name: '小地家族'
					},
					{
						id: 8,
						name: '小地家族'
					}
				],
				// 右侧商品列表数据
				floorList: [],
				curIndex: '0', //左侧导航索引
				ptlx: '', // 拼团类型
				ptlxIndex: '' // 拼团类型索引
			};
		},
		computed: {
			ptspType() {
				return this.$store.state.ptspType
			}
		},
		onShow() {
			// 获取右边的列表数据
			this.getPtspList()
			this.getPtlxList()
		},
		watch: {
			ptspType(val) {
				console.log('val', val)
				this.curIndex = val
			}
		},
		methods: {
			test(){
				OrderAPI.test().then(res=>{
					console.log('res121212121212',res.data.data.msg)
				})
			},
			// 拼团类型 10 5 2 
			ptTypeHandle(type, i) {
				console.log('点击的拼团类型', type)
				console.log('点击的拼团类型', i)
				// 发送请求获取相应的数据
				this.ptlx = type
				this.ptlxIndex = i
				// this.$store.commit('ptspTypeUpdate', '0')
				this.getPtspList()

			},
			// 获取左侧商品分类
			getPtlxList() {
				OrderAPI.getDic("spfl").then((res) => {
					this.floorNav = res.data.obj.results
					// let obj = {
					// 	spfl: '0',
					// 	spfl2: '全部'

					// }
					// this.floorNav.unshift(obj)
					console.log('this.floorNav', this.floorNav)
				});
			},
			//  获取右边的列表数据
			getPtspList() {
				// if (this.ptspType === '0') {
				// 	this.$store.commit('ptspTypeUpdate', '')

				// }
				let o = {
					spfl: this.ptspType,
					ptlx: this.ptlx
				}

				productAPI.productList(o).then(res => {
					console.log('res拼团', res)
					let data = res.data.obj.results
					data.forEach(v => {
						v.sppic = '/yplg/' + v.sppic
					})
					this.floorList = data
					console.log('resthis.floorList', this.floorList)
				})

			},
			// 点击左侧的类型
			setFloorNavMountClick(index, type) {
				this.curIndex = index
				// this.ptspType = type
				this.$store.commit('ptspTypeUpdate', type)
				this.getPtspList()

			},
			// 进入拼团商品详情
			goGoodDetail(id) {
				uni.navigateTo({
					url: '/pages/detail/detail?id=' + id
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.group-type {
		width: 100%;
		// height: 180rpx;
		padding: 30rpx 20rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		box-sizing: border-box;
		background: #FFFFFF;

		li {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: $font-base;

			.img {
				width: 100rpx;
				height: 100rpx;
				margin-bottom: 20rpx;
			}

			.ptlx-btn {
				color: $my-color;
			}
		}
	}

	.goods-floor {
		width: 100vw;
		height: calc(100vh - 180rpx);
		display: flex;
		align-items: flex-start;
		font-size: $font-base;

		.floor-nav {
			// width: 200rpx;
			height: 100%;
			overflow: auto;
			padding-left: 0;

			li {
				margin: 20rpx auto;
				padding: 10rpx;
				text-align: center;
				box-sizing: border-box;
			}
		}

		.floor-list {
			flex: 1;
			height: 100%;
			overflow: auto;
			background-color: #fff;
			padding-left: 20rpx;
			font-size: $font-base;

			li {
				margin: 10rpx auto;
				padding: 10rpx;
				text-align: center;
				box-sizing: border-box;
				display: flex;

				&:nth-of-type(1) {
					margin-top: 0;
					padding-top: 0;
				}

				.good-img {
					width: 180rpx;
					height: 180rpx;
					margin-right: 20rpx;
				}

				.good-info {
					flex: 1;
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					align-items: flex-start;

					.tit {
						width: 100%;
						height: 40rpx;
						font-size: 32rpx;
						overflow: hidden;
						text-align: left;
					}

					.price {
						font-size: 28rpx;
						color: #ff0000;
					}

					.rebate {
						font-size: 28rpx;
						color: #ff0000;
					}

					.cart {
						// width: 240rpx;
						// padding: 10rpx;
						display: flex;
						justify-content: space-around;
						border: 1rpx solid $my-color;
						border-radius: 6rpx;
						font-size: $font-base;

						.left {
							display: flex;
							align-items: center;
							padding-left: 10rpx;
							img{
								width: 30rpx;
								height: 30rpx;
							}

							.p-icon {
								width: 40rpx;
								height: 40rpx;
								margin-right: 10rpx;
							}

							.p-text {
								margin: 0 20rpx;
							}
						}

						// .right {
						// 	display: flex;
						// 	justify-content: center;
						// 	align-items: center;

						// 	.c-icon {
						// 		width: 40rpx;
						// 		height: 40rpx;
						// 	}
						// }
						.right {
							display: flex;
							background: #ec3b3b;
							padding: 10rpx;
							color: #ffffff;

							img {
								width: 40rpx;
								height: 40rpx;
								margin-right: 10rpx;
							}
						}
					}
				}
			}
		}
	}

	.selected {
		color: $my-color;
		background-color: #fff;
		border-left: 2px solid $my-color;
	}
</style>
