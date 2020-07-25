<template>
	<view>
		<ul class="group-type">
			<li class="item" v-for="item in groupType" :key="item.text">
				<image class="img" :src="item.url" mode=""></image>
				<text>{{item.text}}</text>
			</li>
		</ul>
		<view class="goods-floor">
			<!-- 左侧楼层 -->
			<ul class="floor-nav">
				<li v-for="(item, index) in floorNav" :key="item.id" @click="setFloorNavMountClick(index)">{{ item.name }}</li>
			</ul>
			<!-- 右侧的内容区域 -->
			<ul class="floor-list">
				<li v-for="item in floorList" :key="item.id">
					<image class="good-img" src="../../static/images/default.png" mode=""></image>
					<view class="good-info">
						<text class="tit">{{item.title}}</text>
						<text class="price">￥ {{item.price}}</text>
						<text class="rebate">拼团及返{{item.rebate}}</text>
						<view class="cart">
							<view class="left">
								<image class="p-icon" src="../../static/images/default.png" mode=""></image>
								<text>{{item.type == '1' ? '2人团' : item.type == '2' ? '5人团' : item.type == '3' ? '10人团' : ''}}</text>
							</view>
							<view class="right">
								<image class="c-icon" src="../../static/images/default.png" mode=""></image>
							</view>
						</view>
					</view>
				</li>
			</ul>
		</view>
	</view>
</template>

<script>
	export default {
		name: "groupBuy",
		components: {},
		data() {
			return {
				groupType: [{
						text: '十人拼团',
						url: '../../static/images/default.png'
					},
					{
						text: '五人拼团',
						url: '../../static/images/default.png'
					},
					{
						text: '二人拼团',
						url: '../../static/images/default.png'
					}
				],
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
				floorList: []
			};
		},
		onShow() {
			this.floorList = [
				{
					title: '2020款男鞋韩版潮鞋百搭...',
					price: '358',
					rebate: '25%',
					type: '1'
				},
				{
					title: '2020款男鞋韩版潮鞋百搭...',
					price: '358',
					rebate: '25%',
					type: '1'
				},
				{
					title: '2020款男鞋韩版潮鞋百搭...',
					price: '358',
					rebate: '25%',
					type: '1'
				}
			]
		},
		methods: {
			setFloorNavMountClick(index) {
				console.log(index)
				switch (index) {
					case 0:
						this.floorList = [
							{
								title: '2020款男鞋韩版潮鞋百搭...',
								price: '358',
								rebate: '25%',
								type: '1'
							},
							{
								title: '2020款男鞋韩版潮鞋百搭...',
								price: '358',
								rebate: '25%',
								type: '1'
							},
							{
								title: '2020款男鞋韩版潮鞋百搭...',
								price: '358',
								rebate: '25%',
								type: '1'
							}
						]
						break;
					case 1:
						this.floorList = [
							{
								title: '2020款男鞋韩版潮鞋百搭...',
								price: '458',
								rebate: '15%',
								type: '2'
							},
							{
								title: '2020款男鞋韩版潮鞋百搭...',
								price: '458',
								rebate: '15%',
								type: '2'
							},
							{
								title: '2020款男鞋韩版潮鞋百搭...',
								price: '458',
								rebate: '15%',
								type: '2'
							}
						]
						break;
					case 2:
						this.floorList = [
							{
								title: '2020款男鞋韩版潮鞋百搭...',
								price: '558',
								rebate: '5%',
								type: '3'
							},
							{
								title: '2020款男鞋韩版潮鞋百搭...',
								price: '558',
								rebate: '5%',
								type: '3'
							}
						]
						break;
					case 3:
						this.floorList = [
							{
								title: '2020款男鞋韩版潮鞋百搭...',
								price: '658',
								rebate: '25%',
								type: '1'
							}
						]
						break;
					default: 
					this.floorList = []
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.group-type {
		width: 100%;
		height: 180rpx;
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

			.img {
				width: 100rpx;
				height: 100rpx;
				margin-bottom: 20rpx;
			}
		}
	}

	.goods-floor {
		width: 100vw;
		height: calc(100vh - 180rpx);
		display: flex;
		align-items: flex-start;
		.floor-nav {
			width: 200rpx;
			height: 100%;
			overflow: auto;
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
			li {
				margin: 20rpx auto;
				padding: 10rpx;
				text-align: center;
				box-sizing: border-box;
				display: flex;
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
						width: 240rpx;
						padding: 10rpx;
						display: flex;
						justify-content: space-around;
						border: 1rpx solid #FF0000;
						border-radius: 6rpx;
						.left {
							display: flex;
							align-items: center;
							padding-left: 10rpx;
							.p-icon {
								width: 40rpx;
								height: 40rpx;
								margin-right: 10rpx;
							}
						}
						.right {
							display: flex;
							justify-content: center;
							align-items: center;
							.c-icon {
								width: 40rpx;
								height: 40rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
