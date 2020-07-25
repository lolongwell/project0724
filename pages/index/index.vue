<template>
	<view class="container">
		<!-- header -->
		<!-- <header-logo></header-logo> -->
		<!-- <header-tip></header-tip> -->
		<!-- <nav-bar class="__space"></nav-bar> -->
		<!-- <contact></contact> -->
		<!-- banner -->
		<view class="swp-container">
			<swiper class="_swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="banner in bannerList" :key="banner.pic">
					<view class="_swiper-item"><img :src="banner.pic" @click="bannerLink(banner)" :alt="banner.alt" /></view>
				</swiper-item>
			</swiper>
		</view>
		
		<!--  #ifdef MP-WEIXIN -->
		<view class="__space"></view>
		<!--  #endif -->

		<!-- links -->
		<home-links class="__space"></home-links>

		<!-- 促销 -->
		<!--    <view class="sale-infos __space">
      <view class="info" @click="toUrl('')">促销</view>
      <view class="info" @click="toUrl('')">促销</view>
    </view> -->
		<tips class="tips __space"></tips>
		<!--  #ifdef MP-WEIXIN -->
		<view class="__space"></view>
		<!--  #endif -->
		<image src="../../static/images/banner1.jpg" mode="" class="banner-img"></image>
		<view class="banner-img banner-img2">
			<image src="../../static/images/banner1.jpg" mode="" class="img"></image>
			<image src="../../static/images/banner1.jpg" mode="" class="img"></image>
		</view>
		
		<uni-tab :dataSource="tabList" @handle="switchTab"></uni-tab>
        <view class="hot" v-show="showTab == 0">
        	<view v-for="mod in filterModules">
        	    <product-list
        	        class="product-list __space"
        	        :title="mod.typename"
        	        :more="true"
        	        :typeId="mod.typecode"
        	        :url="cUrl(mod.typecode,mod.typename)"
        	    ></product-list>
        	    <!--  #ifdef MP-WEIXIN --> 
        	    <view class="__space"></view>
        	    <!--  #endif -->
        	</view>
        </view>
		
		<view class="integral" v-show="showTab == 1">
			<view v-for="mod in filterModules">
			    <product-list
			        class="product-list __space"
			        :title="mod.typename"
			        :more="true"
			        :typeId="mod.typecode"
			        :url="cUrl(mod.typecode,mod.typename)"
			    ></product-list>
			    <!--  #ifdef MP-WEIXIN --> 
			    <view class="__space"></view>
			    <!--  #endif -->
			</view>
		</view>

		<!-- 情感装 -->
		<!-- <title-product-list
			class="product-list __space"
			title="小地家族"
			:more="true"
			:max="4"
			url="/pages/productList/productList?type=10&title=小地家族"
			:data="goodsListEmo"
		></title-product-list> -->
		<!--  #ifdef MP-WEIXIN -->
		<!-- <view class="__space"></view> -->
		<!--  #endif -->
		
		<!-- 小地单挑 -->
		<!-- <title-product-list
			class="product-list __space"
			:max="8"
			title="小地单挑"
			:more="true"
			url="/pages/productList/productList?type=9&title=小地单挑"
			:data="goodListSF"
		></title-product-list> -->
		<!--  #ifdef MP-WEIXIN -->
		<!-- <view class="__space"></view> -->
		<!--  #endif -->
		
		<!-- 年卡 -->
		<!-- <title-product-list
			class="product-list __space"
			title="超级年卡"
			:more="true"
			:max="4"
			url="/pages/productList/productList?type=14&title=超级年卡&source=1"
			:data="goodsListZx"
		></title-product-list> -->
		<!--  #ifdef MP-WEIXIN -->
		<!-- <view class="__space"></view> -->
		<!--  #endif -->

		<!-- 抢鲜 -->
		<!-- <title-product-list
			class="product-list __space"
			title="抢鲜"
			:more="true"
			v-if="goodsListPre.length"
			:max="4"
			url="/pages/productList/productList?type=5&title=抢鲜"
			:data="goodsListPre"
		></title-product-list> -->
		<!--  #ifdef MP-WEIXIN -->
		<!-- <view class="__space"></view> -->
		<!--  #endif -->
		
		<!-- 应季果 -->
		<!-- <title-product-list
			class="product-list __space"
			title="伙伴严选"
			:more="true"
			:max="6"
			v-if="goodsListSeason.length"
			url="/pages/productList/productList?type=15&title=伙伴严选"
			:data="goodsListSeason"
		></title-product-list> -->
		<!--  #ifdef MP-WEIXIN -->
		<!-- <view class="__space"></view> -->
		<!--  #endif -->
		<!-- 合作伙伴 -->
		<!-- <title-common class="title" title="合作伙伴" :more="true" url></title-common> -->
		<!-- <view class="customer">
			<view class="customer-logo" v-for="(custom, $index) in customList" :key="$index">
				<a :href="custom.url" target="_blank"><img :src="custom.pic" :alt="custom.name" /></a>
			</view>
		</view> -->

		<!-- footer -->
		<!-- <footer-logo></footer-logo> -->

		<!-- <uni-popup ref="ad" type="center" :mask-click="true">
			<view class="uni-image ad-content">
				<image class="image" @click="adImgClick" :src="adPicUrl" mode="scaleToFill" />
				<view class="uni-image-close"><view class="yticon icon-fork" @click="closeAd"></view></view>
			</view>
		</uni-popup> -->
	</view>
</template>

<script>
import { mapState } from 'vuex';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import HomeLinks from '@/components/common/HomeLinks.vue';
import ProductList from '@/components/common/ProductList.vue'
import UniTab from '@/components/uni-tab/uni-tab.vue'
import ProductAPI from '../../api/product/product';
import NewsAPI from '../../api/news/news';
import FileAPI from '@/api/file/file';
import OrderAPI from '@/api/order/order.js';
export default {
	name: 'home',
	components: { uniPopup, HomeLinks, ProductList, UniTab },
	data() {
		return {
			loadTimes: 0,
			titleNViewBackground: '',
			swiperCurrent: 0,
            swiperLength: 0,
            modules: [],
			//   **** banner属性 ****
			indicatorDots: true,
			autoplay: true,
			interval: 5000,
			duration: 200,
			//   **** banner属性 ****
			bannerList: [], 
			goodListSF: [],
			goodsListZx:[],
			goodsListSeason: [],
			goodsListPre: [],
			goodsList: [],
			goodsListEmo: [],
			customList: [],
			// 广告
			adLink: '',
			adPicUrl: '',
			newTaskPopup: true,
			tabList: [
				{text: '热门'},
				{text: '积分乐兑'}
			],
			showTab: 0
		};
	},
	computed: {
        ...mapState(['cartData', 'hasLogin']),
        filterModules(){ // 过滤展示 1<= 序号 <= 9 的模块
            let data = JSON.parse(JSON.stringify(this.modules));
            data = data.sort(function(a,b){
                return a.orderNum - b.orderNum;
            })
            return data.filter(function(a){
                return a.orderNum>=1 && a.orderNum <= 9;
            })
        },
		cUrl(){
			return function(code,name){
				return '/pages/productList/productList?type='+code+'&title=' + name
			}
		}
	},
	onLoad(options) {
		// if (this.loadTimes == 0) this.getAD();
		// let kid = options.kid;
		// 设置kid
		// let currkid = uni.getStorageSync('user').kid;
		// if (!currkid) {
		// 	uni.setStorageSync('share-kid', kid);
		// 	// 若登录
		// 	if (this.hasLogin) {
		// 		// update kid
		// 		this.$_log('invite-kid', kid);
		// 		this.$store.commit('updateKid', kid);
		// 	}
		// }
	},
	onShow() {
		// if (this.loadTimes) this.closeAd();
		// this.loadTimes++;
        this.loadData();
        this.getModules();
		if (this.cartData.length) {
			uni.setTabBarBadge({
				index: 2,
				text: this.cartData.length.toString()
			});
		} else {
			uni.removeTabBarBadge({
				index: 2
			});
		}
	},
	methods: {
		getAD() {
			// this.$refs['ad'].close();
			FileAPI.getFileByName('广告').then(res => {
				let data = res.data.obj.results;
				if (data.length) {
					this.adPicUrl = this.getPicUrl(data[0].pic);
					let url = data[0].url;
					let info = url.split('/');
					if (info[0] == 'product') {
						this.adLink = '/pages/detail/detail?id=' + info[1];
					} else if (info[0] == 'article') {
						this.adLink = '/pages/articleDetail/articleDetail?id=' + info[1];
					}
					this.$nextTick(()=>{
						this.$refs['ad'].open();
					})
					
				}
			});
		},
		getModules() {
			OrderAPI.getDic('spfl').then(res=>{
                this.modules =  res.data.data;
			})
		},
		
		adImgClick() {
			this.closeAd();
			this.toUrl(this.adLink);
		},
		closeAd() {
			this.$refs['ad'].close();
		},
		loadData() {
			// ProductAPI.productList({ spfl: 9 }).then(res => {
			// 	let data = res.data.obj.results;
			// 	this.$_log('独家首发', data);
			// 	this.goodListSF = [];
			// 	this.setListData(data, 'goodListSF');
			// });
			
			// ProductAPI.productList({ spfl: 14 }).then(res => {
			// 	let data = res.data.obj.results;
			// 	this.$_log('年卡', data);
			// 	this.goodsListZx = [];
			// 	this.setListData(data, 'goodsListZx');
			// });


			// ProductAPI.productList({ spfl: 10 }).then(res => {
			// 	let data = res.data.obj.results;
			// 	this.$_log('情感装', data);
			// 	this.goodsListEmo = [];
			// 	this.setListData(data, 'goodsListEmo');
			// });

			// ProductAPI.productList({ spfl: 5 }).then(res => {
			// 	let data = res.data.obj.results;
			// 	this.$_log('预售', data);
			// 	this.goodsListPre = [];
			// 	this.setListData(data, 'goodsListPre');
			// });

			// ProductAPI.productList({ spfl: 15 }).then(res => {
			// 	let data = res.data.obj.results;
			// 	this.$_log('伙伴严选', data);
			// 	this.goodsListSeason = [];
			// 	this.setListData(data, 'goodsListSeason');
			// });

			NewsAPI.newsList({ xwfl: '3' }).then(res => {
				let banners = res.data.obj.results;
				banners.forEach(v => {
					v.pic = this.getPicUrl(v.pic);
				});
				this.bannerList = banners;
			});

			NewsAPI.newsList({ xwfl: '4' }).then(res => {
				let customs = res.data.obj.results;
				customs.forEach(v => {
					v.pic = this.getPicUrl(v.pic);
				});
				this.customList = customs.slice(0, 12);
			});
		},
		bannerLink(obj) {
			if (obj.url.indexOf('http') > -1) {
				window.location.href = obj.url;
			} else {
				uni.navigateTo({
					url: obj.url
				});
			}
		},
		setListData(data, listName) {
			data.forEach(v => {
				let o = Object.assign(v, {
					id: v.id,
					title: v.name,
					price: v.price,
					label: v.gs,
					pic: this.getPicUrl(v.pic),
					unit: '',
					describe: v.gs
				});
				this[listName].push(o);
			});
		},
		getPicUrl(url) {
			if (url.indexOf('http') > -1) return url;
			return this.$request.BASE_URL + url;
		},
		navToDetailPage(item) {
			let id = item.title;
			this.toUrl(`/pages/product/product?id=${id}`);
		},
		toUrl(url) {
			uni.navigateTo({
				url: url
			});
		},
		switchTab(val) {
			console.log(val)
			this.showTab = val.index
		}
	}
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
		height: 100%;
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
		> a {
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
		content: '';
		display: block;
		clear: both;
	}
}
</style>
