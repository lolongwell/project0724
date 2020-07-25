<template>
	<view class="intergral-exchange-box">
		<view class="header">
			<view class="left">
				<view class="title">
					
				</view>
				<view class="content">
					
				</view>
			</view>
			<view class="right">
				
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				moneys: ['999元', '1997元', '4998元', '9988元', '19888元', '其他'],
				methods: ['支付宝', '微信'],
				activeIndex: '',
				methodIndex: ''
			};
		},
		methods: {

			changMoney(val, i) {
				this.activeIndex = i
				console.log(i)
				console.log(val)
			},

			changMethod(val, i) {
				this.methodIndex = i
			},

			submit() {
				//发送请求
			}
		}
	};
</script>

<style lang="scss" scoped>
	.intergral-exchange-box {
		.header{
			height: 300rpx;
			background: red;
		}
	}
</style>
