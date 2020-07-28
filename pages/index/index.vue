<template>
	<view class="container">
		<!-- banner -->
		<view class="swp-container">
			<swiper class="_swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="banner in bannerList" :key="banner">
					<view class="_swiper-item"><img :src="banner" /></view>
				</swiper-item>
			</swiper>
		</view>

		<!--  #ifdef MP-WEIXIN -->
		<view class="__space"></view>
		<!--  #endif -->

		<!-- links -->
		<home-links :dataList="modules" class="__space"></home-links>

		<!--  #ifdef MP-WEIXIN -->
		<view class="__space"></view>
		<!--  #endif -->
		<image src="../../static/images/banner1.jpg" mode="" @click="gotoIntegral" class="banner-img"></image>
		<view class="banner-img banner-img2">
			<image @click="goNewGoods" src="../../static/images/banner1.jpg" mode="" class="img"></image>
			<image src="../../static/images/banner1.jpg" mode="" class="img"></image>
		</view>

		<uni-tab :dataSource="tabList" @handle="switchTab"></uni-tab>
		<view class="hot" v-show="showTab == 0">
			<good-list :goodListData="goodListData"></good-list>
		</view>
		<view class="integral" v-show="showTab == 1">
			<!-- <exchange-list :intergralList="intergralList"></exchange-list> -->
			<exchange-list :intergralList="intergralList"></exchange-list>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	import HomeLinks from "@/components/common/HomeLinks.vue";
	import ProductList from "@/components/common/ProductList.vue";
	import UniTab from "@/components/uni-tab/uni-tab.vue";
	import GoodList from "@/components/common/GoodList.vue";
	import OrderAPI from "@/api/order/order.js";
	import productAPI from "@/api/product/product.js";
	import integralAPI from "@/api/integral/integral.js";
	import ExchangeList from '@/components/integral/exchange-list.vue'
	
	export default {
		name: "home",
		components: {
			HomeLinks,
			ProductList,
			UniTab,
			GoodList,
			ExchangeList
		},
		data() {
			return {
				modules: [],
				indicatorDots: true,
				autoplay: true,
				interval: 5000,
				duration: 200,
				bannerList: [
					"../../static/banners/b1.jpg",
					"../../static/banners/b2.jpg",
					"../../static/banners/b3.jpg",
				],
				goodListData: [],
				tabList: [{
					text: "热门"
				}, {
					text: "积分乐兑"
				}],
				showTab: 0,
				intergralList: []
			};
		},
		computed: {
			...mapState(["cartData", "hasLogin"]),
			// filterModules() {
			// 	// 过滤展示 1<= 序号 <= 9 的模块
			// 	let data = JSON.parse(JSON.stringify(this.modules));
			// 	data = data.sort(function(a, b) {
			// 		return a.orderNum - b.orderNum;
			// 	});
			// 	return data.filter(function(a) {
			// 		return a.orderNum >= 1 && a.orderNum <= 9;
			// 	});
			// },
			cUrl() {
				return function(code, name) {
					return "/pages/productList/productList?type=" + code + "&title=" + name;
				};
			},
		},
		onLoad(option) {
			// let ghbm = option.ghbm
			let ghbm = '00010, 456454546, "曾小贤"'
			if (ghbm) {
				let paramArr = ghbm.split(',')
				let yqm = paramArr[0], yqrId = paramArr[1]
				console.log(yqm, yqrId)
				const appId = getApp().globalData.appId
				const local = window.location.href
				console.log(appId)
				console.log(local)
				console.log(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo#wechat_redirect`)
				// let code = null
				// if (code === null || code === '') {
				// 	window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo`
				// }

			}
			this.getGoodList();
		},
		onShow() {
			this.getModules();
			if (this.cartData.length) {
				uni.setTabBarBadge({
					index: 2,
					text: this.cartData.length.toString(),
				});
			} else {
				uni.removeTabBarBadge({
					index: 2,
				});
			}
		},
		methods: {
			getModules() {
				OrderAPI.getDic("spfl").then((res) => {
					this.modules = res.data.obj.results
				});
			},
			getGoodList() {
				productAPI.productList("spfl").then((res) => {
					this.goodListData = res.data.obj.results
					console.log('this.goodListData', this.goodListData)
				});
				productAPI.integralList("jfspfl").then((res) => {
					this.intergralList = res.data.obj.results
					console.log('this.intergralList', this.intergralList)
				});
			},
			switchTab(val) {
				console.log(val);
				this.showTab = val.index;
			},
			gotoIntegral() {
				uni.navigateTo({
					url: '/pages/integral/exchange'
				})
			},
			goNewGoods() {
				uni.navigateTo({
					url: '/pages/newGoods/newGoods'
				})
			}
		},
	};
</script>

<style lang="scss" scoped>
	.swp-container {
		display: flex;
		justify-content: center;
	}

	._swiper {
		height: 450rpx;
		width: 100%;
	}

	._swiper-item {
		display: block;
		height: 550rpx;
		line-height: 550rpx;
		text-align: center;

		img {
			width: 100%;
		}
	}

	.ad-content {
		width: 450rpx;
		height: 800rpx;

		.image {
			width: 100%;
			height: 100%;
		}
	}

	.uni-image-close {
		margin-top: 20px;
		text-align: center;

		.yticon {
			display: inline-block;
			color: #fff;
			font-size: 40rpx;
		}
	}

	.tips {
		margin: 0 35rpx;
		/*  #ifdef  MP-WEIXIN  */
		padding: 0 10rpx;
		margin: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		/*  #endif  */
	}

	.title {
		margin-top: 20rpx;
	}

	.banner-img {
		width: 100vw;
		height: 300rpx;
		padding: 20rpx;
		margin-top: 20rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.banner-img2 {
		height: 150rpx;

		.img {
			width: calc(50% - 30rpx);
			height: 100%;
		}
	}

	.sale-infos {
		display: flex;
		padding: 0 35rpx;

		.info {
			flex: 1;
			width: 220rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 130rpx;
			text-align: center;
			background: #fff;
			margin-left: 20rpx;
			font-size: $font-base;

			&:first-child {
				margin-left: 0;
			}
		}
	}

	// 大客户
	.customer {
		padding: 0 35rpx;
		display: flex;

		.customer-logo {
			float: left;
			width: 96rpx;
			height: 96rpx;
			margin-right: 16rpx;
			margin-top: 15rpx;
			flex: 1;

			&:nth-child(6n) {
				margin-right: 0;
			}

			>a {
				display: block;
				width: 100%;
				height: 100%;
			}

			img {
				width: 100%;
				height: 100%;
			}
		}

		&::after {
			content: "";
			display: block;
			clear: both;
		}
	}
</style>
