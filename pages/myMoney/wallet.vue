<template>
	<view class="wallet-box">
		<ul>
			<li>余额</li>
			<li>{{balance}}</li>
		</ul>
	</view>
</template>

<script>
import userAPI from '@/api/user/user.js'
	export default {
		name: '',
		data() {
			return {
				balance: 0 //余额
			};
		},
		onShow() {
			this.getUserInfo()
		},
		methods: {
			getUserInfo() {
				let userid = uni.getStorageSync('userid')
				userAPI.getUserInfo(userid).then(res => {
					this.balance = res.data.yue ? res.data.yue : 0
					uni.setStorageSync('yue', res.data.yue?res.data.yue:0)
					uni.setStorageSync('czje', res.data.czje?res.data.czje:0)
					uni.setStorageSync('hyjf', res.data.hyjf?res.data.hyjf:0)
					uni.setStorageSync('hyxfe', res.data.hyxfe?res.data.hyxfe:0)
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.wallet-box {
		width: 100%;
		height: 400rpx;
		background: $my-color;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		font-size: $font-base + 10rpx;
		ul {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding: 0;
			li {
				&:nth-last-of-type(1) {
					font-size: $font-base + 30rpx;
				}
			}
		}
	}
</style>
