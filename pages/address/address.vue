<template>
	<view class="adress-box">
		<view class="item" v-for="(item,index) in adressList">
			<view class="top">
				<view class="left">
					{{item.name}}
				</view>
				<view class="right">
					{{item.phone}}
				</view>
			</view>
			<view class="bottom">
				{{item.adress}}
			</view>
		</view>
		<view class="add-adress">
			<button class="add-btn" @click="add('add',{})">新增地址</button>
			<!-- <button @eventClick="goLink('/pages/address/addressManage')">添加收货地址</button> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				adressList: [{
						name: '我是',
						phone: '10393838444',
						adress: '我是地址1111'
					},
					{
						name: '我是',
						phone: '10393838444',
						adress: '我是地址1111'
					},
					{
						name: '我是',
						phone: '10393838444',
						adress: '我是地址1111'
					},
					{
						name: '我是',
						phone: '10393838444',
						adress: '我是地址1111'
					},
					{
						name: '我是',
						phone: '10393838444',
						adress: '我是地址1111'
					},
					{
						name: '我是',
						phone: '10393838444',
						adress: '我是地址1111'
					},
					{
						name: '我是',
						phone: '10393838444',
						adress: '我是地址1111'
					},
					{
						name: '我是',
						phone: '10393838444',
						adress: '我是地址1111'
					},
					{
						name: '我是',
						phone: '10393838444',
						adress: '我是地址1111'
					},
					{
						name: '我是',
						phone: '10393838444',
						adress: '我是地址1111'
					}
				]
			};
		},
		computed: {

		},
		methods: {
			add() {
				uni.navigateTo({
					url: `/pages/address/addressManage`
				});
			}

		}
	};
</script>

<style lang="scss" scoped>
	.adress-box {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;

		padding: 0 $page-row-spacing;
		padding-bottom: 120rpx;
		position: relative;

		.item {
			margin-top: $page-row-spacing;
			font-size: 25rpx;

			.top {
				display: flex;
				justify-content: center;
				align-items: center;

				.left {
					flex: 1;
				}

				.right {
					flex: 5;
					font-size: 20rpx;
					color: #666;

				}
			}

		}

		.add-adress {
			position: fixed;
			left: 50%;
			transform: translate(-50%);
			bottom: 10rpx;
			font-size: 20rpx;
			width: 90%;

			button {
				background: $my-color;
				color: #fff;
				height: 60rpx;
				line-height: 60rpx;
			}
		}
	}
</style>
