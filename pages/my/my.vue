<template>
	<view class="container">
		<head-portrait :kmc="kmc" :isLogin='isLogin' @changIsLogin="changIsLogin"></head-portrait>
		<view class="order-section">
			<view class="order-item" @click="goLink('/pages/myMoney/inMoney')" hover-class="common-hover" :hover-stay-time="50">
				<text class="yticon icon-daifukuan"></text>
				<text>充 值</text>
			</view>
			<view class="order-item" @click="goLink('/pages/myMoney/outMoney')" hover-class="common-hover" :hover-stay-time="50">
				<text class="wkicon icon-daishouhuo"></text>
				<text>提 现</text>
			</view>
		</view>
		<view class="history-section icon">
			<list-cell icon="icon-dizhi" iconColor="#5fcda2" title="我的收货管理" @eventClick="goLink('/pages/address/address')"></list-cell>
			<list-cell icon="icon-shezhi1" iconColor="#9789f7" title="我的钱包" @eventClick="goLink('/pages/myMoney/wallet')"></list-cell>
			<list-cell icon="icon-shezhi1" iconColor="#ee883b" title="积分兑换" @eventClick="goLink('/pages/integral/exchange')"></list-cell>
			<list-cell iconFamily="wkicon" icon="icon-kefu" iconColor="#aa553b" title="资金记录" @eventClick="goLink('/pages/myMoney/history')"></list-cell>
			<list-cell icon="icon-tuandui" iconColor="#aa883b" title="修改密码" @eventClick="goLink('/pages/login/resetPassword')"></list-cell>
		</view>

		<view class="">
			<button type="default" @click="test">测试</button>
		</view>
		<!-- <recommend-fruit class="recommend __space"></recommend-fruit> -->
		<!--  #ifdef MP-WEIXIN -->
		<view class="__space"></view>
		<!--  #endif -->
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import HeadPortrait from '@/components/common/HeadPortrait.vue'
	import listCell from '@/components/mix-list-cell';
	import payApi from '@/api/pay/pay.js';

	export default {
		name: 'My',
		components: {
			listCell,
			HeadPortrait
		},
		data() {
			return {
				count: {

				},
				kmc: ''
			};
		},
		computed: {
			...mapState(['hasLogin'])
		},
		onShow() {
			console.log(4444444)
			console.log('个人中心', this.hasLogin)
			console.log('2222222222',encodeURIComponent('http://sjblake.cn/yplg'))
			let token = uni.getStorageSync('TOKEN');
			console.log('测试token',tokens)
			const openid = uni.getStorageSync('openid')
			if (openid) {
				this.isLogin = true
			} else {
				this.isLogin = false
			}
			// let user = uni.getStorageSync('user');
			// if(user) {
			// 	this.kmc = user.kmc || '';
			// }
		},
		mounted() {
			// console.log(00000000000000000)
			// console.log('2222222222',encodeURIComponent('http://sjblake.cn/yplg'))
		},
		methods: {
			goLink(url) {
				uni.navigateTo({
					url: url
				});
			},
			changIsLogin(val) {
				console.log('传参', val)
				this.isLogin = val
			},

			test() {
				
			let url = 'https://api.yiyunjf.cn/v1/wechat/auth?app_id=pya7LZA0fnMupQH5Yp4C9wZtMDAwV1RP&sub_mch_id=1601407358&snsapi_userinfo=true&callback=http%3A%2F%2Fsjblake.cn%2Fyplg'
				// uni.navigateTo({
				//    url: url
				// });
				
				let o = {
					userid: uni.getStorageSync('userid'),
					openid: uni.getStorageSync('openid'),
					czje: '0.01'
				}
				payApi.payOrder(o).then(res=>{
					alert(res)
					uni.showToast({
						title: res,
						duration: 3000
					});
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		padding: 0 10rpx;
		position: relative;
	}

	.__space {
		margin-top: 15rpx !important;
	}

	@mixin flex-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	@mixin section {
		display: flex;
		justify-content: space-around;
		align-content: center;
		background: #fff;
		border-radius: 10rpx;
	}

	.order-section {
		@include section;
		padding: 18rpx 0 28rpx;
		border-radius: 10rpx;
		box-shadow: 0 3px 3px -3px #ccc;
		position: absolute;
		top: 380rpx;
		left: 5%;
		width: 90%;

		.order-item {
			@include flex-center;
			height: 80rpx;
			flex: 1;
			font-size: $font-sm;
			color: $font-color-dark;

			&:nth-of-type(1) {
				border-right: 1px solid #333;
			}

		}

		.yticon {
			font-size: 48rpx;
			margin-bottom: 18rpx;
			color: #fa436a;
			flex: 1;
			display: flex;
			flex-direction: row;
		}

		.wkicon {
			font-size: 48rpx;
			margin-bottom: 18rpx;
			color: #fa436a;
		}

		.icon-daishouhuo,
		.icon-daifahuo {
			font-size: 52rpx;
		}

		.icon-daipingjia {
			font-size: 46rpx;
		}

		.icon-shouhoutuikuan {
			font-size: 44rpx;
		}
	}

	.history-section {
		margin-top: 120rpx;
		background: #fff;
		border-radius: 10rpx;
		box-shadow: 0 3px 3px -3px #ccc;

		.sec-header {
			display: flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40rpx;
			margin-left: 30rpx;

			.yticon {
				font-size: 44rpx;
				color: #5eba8f;
				margin-right: 16rpx;
				line-height: 40rpx;
			}
		}

		.h-list {
			white-space: nowrap;
			padding: 30rpx 30rpx 0;

			image {
				display: inline-block;
				width: 160rpx;
				height: 160rpx;
				margin-right: 20rpx;
				border-radius: 10rpx;
			}
		}
	}
</style>
