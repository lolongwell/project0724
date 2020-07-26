<template>
	<view class="pay-success-box">
		<view class="pay-success-icon">
			<icon type="success" size="100" />
			<p>订单支付成功！</p>
		</view>
		<view class="pay-success-info">
			<ul>
				<li>
					<span>订单编号：</span>
					<span>{{orderList.orderCode}}</span>
				</li>
				<li>
					<span>商品名称：</span>
					<span>{{orderList.orderCode}}</span>
				</li>
				<li>
					<span>拼团类型：</span>
					<span>{{orderList.orderCode}}</span>
				</li>
				<li>
					<span>支付金额：</span>
					<span>{{orderList.orderCode}}</span>
				</li>
			</ul>
		</view>
		<view class="go-index" @click="goIndex">
			<button type="default">点击回到首页</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: '',
		props: {
			kmc: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				orderList:{
					orderCode:1111111111
				},
			};
		},
	
		mounted() {
	
		},
		computed: {
			balance() {
				return this.$store.state.balance
			}
		},
		methods: {
			//回到首页
			goIndex(){
				uni.switchTab({
					url: `/pages/index/index`
				})
			}
		}
	
	};
</script>

<style lang="scss" scoped>
	.pay-success-box {
		font-size: $font-base;

		.pay-success-icon {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding: 200rpx;

			p {
				margin-top: $page-row-spacing;
				font-size: 40rpx;
			}
		}
		.pay-success-info{
				
			ul{
				padding: 0 100rpx;
				display: flex;
				flex-direction: column;
				// justify-content: center;
				// align-items: center;
				li{
					margin: 10rpx;
				}
			}
		}
		.go-index{
			width: 60%;
			margin: 60rpx auto;
			button{
				background: $my-color;
				color: #fff;
			}
		}
	}
</style>
