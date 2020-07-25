<template>
	<view class="detail">
		<!-- <header-logo></header-logo> -->
		<header-tip></header-tip>
		<contact></contact>
		<!-- banner -->
		<view class="swp-container">
			<swiper class="_swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="(img, index) in picList" :key="index">
					<view class="_swiper-item"><img :src="img" @click="bannerLink(banner)" :alt="img" /></view>
				</swiper-item>
			</swiper>
		</view>

		<view class="intro">
			<view class="name">
				<view class="left">
					<view class="pname">{{ product.name }}</view>
					<view class="gs">{{ product.gs }}</view>
				</view>
				<!-- <button type="primary" class="right share-btn" open-type="share"></button> -->
			</view>
			<view class="price">
				<view class="left">
					<view class="p-price">
						拼团价：￥
						<span>{{ q(product, 'price') }}</span>
					</view>
					<view class="">
						运费： 0
					</view>
					<view class="">
						拼团条件： 参与人数达到10人
					</view>
				</view>
				<!-- <view class="right num-set">
					<uni-number-box
						class="step"
						:min="1"
						:max="99"
						:value="number > 99 ? 99 : number"
						:isMax="number >= 99 ? true : false"
						:isMin="number === 1"
						@eventChange="numberChange"
					></uni-number-box>
				</view> -->
			</view>
			<!-- <view v-if="specList.length" class="pick-size" @click="toggleSpec">
				<view class="pick">
					<text class="pick-title">选择规格</text>
					<text class="selected-text">
						{{ specSelected.gmfs2 || "请选择规格" }}
						<text class="yticon icon-you icon-pos"></text>
					</text>
				</view>
			</view> -->
		</view>

		<!-- <view class="source" v-if="specList.length == 0 && !hideSource">
			<p>来源</p>
			<ul>
				<li>
					<text>
						果园名称：
						<text>{{ product.gymc || '' }}</text>
					</text>
				</li>
				<li>
					<text>
						地理位置：
						<text>{{ product.dlwz || '' }}</text>
					</text>
				</li>
				<li>
					<text>
						品种：
						<text>{{ product.sgpz2 || '' }}</text>
					</text>
				</li>
				<li>
					<text>
						年供应量：
						<text>{{ product.ngyl || '' }}</text>
					</text>
					<text class="dj">
						等级：
						<text>{{ product.sgdj2 || '' }}</text>
					</text>
				</li>
				<li>
					<text>
						认证资质：
						<text>{{ product.rzzz || '' }}</text>
					</text>
				</li>
			</ul>
		</view> -->

		<!-- <view class="evaluate">
			<p>舌尖上的说说</p>
			<view>
				<p class="left">
					本果品已集齐（
					<span>{{ pj.num }}</span>
					）个赞
					<view class="icon"></view>
				</p>
				<p class="right">
					差评率（
					<span>{{ pj.rate }}%</span>
					）
					<view class="icon"></view>
				</p>
			</view>
			<ul v-if="commentList.length">
				<li v-for="c in commentList" :key="c.id">
					<view class="name">
						<view class="left">
							<p>
								<font>{{ hide(c.createBy) }}</font>
								<font>{{ hide(c.createBy) }}（{{ c.createName }}）</font>
							</p>
						</view>
						<view class="right">{{ c.createDate }}</view>
					</view>
					<view class="content">{{ c.pjnr }}</view>
				</li>
			</ul>
			<view v-if="!commentList.length" class="no-comment"><text>暂无评价~</text></view>
		</view> -->

		<view class="big-tit">
			—— 商品介绍 ——
		</view>
		<view class="images" :class="{ 'pd-content': !hasImg }"><rich-text :nodes="article"></rich-text></view>

		<view class="purchase">
			<view class="left">账户余额：0.00</view>
			<view class="right" @click="purchase">立即购买</view>
		</view>
		<!-- <view class="purchase">
			<ul class="function-icon">
				<li @click="t('index')" class="li">
					<span class="icon icon-home"></span>
					<span class="_name">首页</span>
				</li>
				<li @click="t('cart')" class="li">
					<span class="icon icon-cart">
						<span class="number" v-if="cartData.length">{{ cartData.length }}</span>
					</span>
					<span class="_name">购物车</span>
				</li>
			</ul>
			<ul class="buy">
				<li @click="addToCart">加入购物车</li>
				<li @click="purchase">购买</li>
			</ul>
		</view> -->

		<footer-logo></footer-logo>

		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="stopPrevent" @click="toggleSpec">
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="a-t">
					<image :src="pl(product.pic1)"></image>
					<view class="right">
						<text>2020新款夏季男鞋子韩版潮流</text>
						<text class="price">¥{{ q(specSelected, 'jg') }}</text>
						<!-- <text class="stock">库存：188件</text> -->
						<text>团购类型： 10人团</text>
						<view class="selected">
							规格：
							<text class="selected-text">{{ specSelected.gmfs2 }}</text>
						</view>
						<view class="">
							购买数量：
							<view class="right num-set">
								<uni-number-box
									class="step"
									:min="1"
									:max="99"
									:value="number > 99 ? 99 : number"
									:isMax="number >= 99 ? true : false"
									:isMin="number === 1"
									@eventChange="numberChange"
								></uni-number-box>
							</view>
						</view>
						<view class="payway">
							支付方式：
							<view>
								<text class="item">微信支付</text>
								<text class="item">余额支付</text>
							</view>
						</view>
						<view class="">
							收货地址：
							
						</view>
					</view>
				</view>
				<!-- <view class="attr-list">
					<text>购买方式</text>
					<view class="item-list">
						<text v-for="(item, index) in specList" :key="index" class="tit" :class="{ selected: item.selected }" @click="selectSpec(item)">{{ item.gmfs2 }}</text>
					</view>
				</view> -->
				<button class="btn" @click="changeGMFS">立即支付</button>
			</view>
		</view>
	</view>
</template>

<script>
// import share from "@/components/share";
import ProductAPI from '../../api/product/product';
import CartAPI from '../../api/cart/cart';
import uniNumberBox from '@/components/uni-number-box.vue';
import { mapState } from 'vuex';
export default {
	data() {
		return {
			// indicatorDots: true,
			autoplay: true,
			interval: 5000,
			duration: 200,
			
			hideSource: false,
			bannerList: [], 
			specSelected: null,
			specList: [],
			goodID: '',
			number: 1,
			specClass: 'none',
			pj: {
				num: 0,
				rate: 0
			},
			navList: [
				{
					name: '领取优惠券',
					url: ''
				},
				{
					name: '情感装',
					url: '/pages/EmotionDress/EmotionDress'
				},
				{
					name: '29.9会员',
					url: '/pages/vipCard/vipCard'
				}
			],
			article: '', 
			imageProp: {
				mode: 'aspectFill',
				padding: '0',
				lazyLoad: true
			},
			beforeChangeAction: '',
			shareList: [],
			picList: [], 
			commentList: [],
			product: {}
		};
	},
	components: { uniNumberBox },
	onLoad(option) {
		this.goodID = option.id;
		if(option.source) this.hideSource = true;
	},
	onShow(option) {
		this.loadData(this.goodID);
		this.specSelected = null;
	},
	computed: {
		...mapState(['status', 'hasLogin', 'cartData']),
		q() {
			return function(obj, attr) {
				if (!obj) return '0.00';
				if (obj[attr]) return obj[attr].toFixed(2);
				else return '0.00';
			};
        },
        hide(){
            return function(num){
                let _4num = num.substring(num.length - 4);
                return '*******' + _4num;
            }
        },
		gmfsFilter() {
			return function(type, attr) {
				if (!type) return '';
				switch (type[attr]) {
					case '1':
						return '单次购买';
					case '2':
						return '购买三天';
					case '3':
						return '购买一周';
					case '4':
						return '购买两周';
				}
			};
		},
		indicatorDots() {
			if (this.picList.length > 1) return true;
			else return false;
		},
		hasImg() {
			if (this.article.indexOf('img') > -1) return true;
			else return false;
		}
	},
	methods: {
		
		loadData(id) {

			ProductAPI.goodsDetail(id).then(res => {
				this.$_log('商品详情：', res.data.obj);
				this.product = res.data.obj;
				this.article = this.formatRichText(res.data.obj.content);
				this.specList = res.data.obj.goodsJgList;
                this.setPicList(res.data.obj);
                this.pj.num =  parseInt(res.data.obj.xjdzs) + 0;
				// this.specSelected = this.specList[0];
				// this.specSelected.selected = true;
				// this.product.price =  this.specSelected.jg;
			});

			ProductAPI.goodComment(id).then(res => {
				this.$_log('商品评价：', res.data.obj.results);
				this.commentList = res.data.obj.results;
			});
		},

		setPicList(data) {
			this.picList = [];
			// if (data.pic && this.specList.length == 0) this.picList.push(this.pl(data.pic));
			if (data.pic1) this.picList.push(this.pl(data.pic1));
			if (data.pic2) this.picList.push(this.pl(data.pic2));
			if (data.pic3) this.picList.push(this.pl(data.pic3));
			if (data.pic4) this.picList.push(this.pl(data.pic4));
		},
		toggleSpec() {
			if (this.specClass === 'show') {
				this.specClass = 'hide';
				setTimeout(() => {
					this.specClass = 'none';
				}, 250);
			} else if (this.specClass === 'none') {
				this.specClass = 'show';
			}
		},
		changeGMFS() {
			if (this.specSelected) this.product.price = this.specSelected.jg;
			
			switch(this.beforeChangeAction) {
				case 'buy':
					this.purchase();
					break;
				case 'cart':
					this.addToCart();
					break;
				default:
					break;
			}
			
			this.toggleSpec();
		},
		numberChange(e) {
			this.number = e.number;
		},
		selectSpec(item) {
			this.specList.forEach(v => {
				v.selected = false;
			});
			item.selected = true;
			this.specSelected = item;
			this.product.price = this.specSelected.jg;
		},
		addToCart() {
			if (!this.hasLogin) {
				this.showTokenInvalidMsg();
				return;
			}
			if (!this.specSelected && this.specList.length) {
				this.toggleSpec();
				this.beforeChangeAction = 'cart';
				return;
			}
			let user = uni.getStorageSync('user').userName;
			let userName = uni.getStorageSync('user').realName;
			let product = this.$jsonClone(this.product);
			product.number = this.number;
			product.buyUser = user;
			product.createName = userName;
			if (this.specSelected) product.gmfs = this.specSelected.gmfs;
			this.$store.commit('addOrUpdateCart', product);
		},
		formatRichText(html) {
			let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
				match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
				match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
				match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
				return match;
			});
			newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
				match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
				return match;
			});
			newContent = newContent.replace(/<br[^>]*\/>/gi, '');
			newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;"');
			return newContent;
		},
		purchase() {
			if (!this.hasLogin) {
				this.showTokenInvalidMsg();
				return;
			}
			this.toggleSpec()
			// if (!this.specSelected && this.specList.length) {
			// 	this.beforeChangeAction = 'buy';
			// 	this.toggleSpec();
			// 	return;
			// }
			// let opt = {
			// 	spId: this.product.id,
			// 	spdj: this.product.price,
			// 	spname: this.product.name,
			// 	spsl: this.number,
			// 	gmfs: this.specSelected ? this.specSelected.gmfs : '',
			// 	gmfs2: this.specSelected ? this.specSelected.gmfs2 : '',
			// 	pic: this.product.pic
			// };
			// opt.spzj = opt.spdj * opt.spsl;
			// let product = {
			// 	product: [opt]
			// };
			// this.$_log('商品购买：', opt);
			// this.$store.commit('setOrderObj', product);
			// uni.navigateTo({
			// 	url: '/pages/order/createOrder'
			// });
		},
		showTokenInvalidMsg() {
			
			let pages = getCurrentPages();
			let page = pages[pages.length - 1];
			uni.showModal({
				title: '提示',
				content: '登陆失效或还未登录，是否跳转登录？',
				success: function(res) {
					if (res.confirm) {
						console.info('地址',page);
						uni.setStorageSync('redirect', '/' + page.route + '?id='+page.options.id);
						uni.switchTab({
							url: '/pages/my/my'
						});
					} else if (res.cancel) {
						return;
					}
				}
			});
		},
		pl(url) {
			return this.$request.BASE_URL + url;
		},
		t(link) {
			uni.switchTab({
				url: `/pages/${link}/${link}`
			});
		},
		bannerLink(obj) {
			return;
			uni.navigateTo({
				url: obj.url
			});
		},
		share() {},

		stopPrevent() {}
	}
};
</script>

<style lang="scss" scoped>
.swp-container {
	display: flex;
	justify-content: center;
}
._swiper {
	height: 550rpx;
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
.share-btn {
	padding: 0;
	height: 95rpx;
	line-height: 50rpx;
	font-size: $font-base;
	background-color: rgba(#000, 0);
	background-image: url('../../static/share.png');
	background-repeat: no-repeat;
	background-position: center 10rpx;
	background-size: 50rpx;
	&::after {
		color: $font-color-base;
		content: '分享';
		font-size: $font-sm;
		position: relative;
		top: 50rpx;
		border: none;
	}
	// border: none;
}

.detail {
	font-size: $font-sm;
	color: $font-color-base;
	padding-bottom: 90rpx;
	position: relative;

	.intro {
		background-color: white;
		width: 100%;
		margin-top: 20rpx;
		box-shadow: 0 3px 3px -3px #ccc;
		.name {
			overflow: hidden;
			min-height: 100rpx;
			.left {
				width: 580rpx;
				padding: 10rpx 20rpx 20rpx;
				box-sizing: border-box;
				.pname {
					font-size: $font-lg;
					font-weight: 600;
					color: $font-color-dark;
					height: 60rpx;
					line-height: 60rpx;
				}
				.gs {
					text-overflow: ellipsis;
					overflow: hidden;
					font-size: $font-sm;
					flood-color: $font-color-light;
					word-break: keep-all;
				}
			}
			.right {
				width: 100rpx;
				text-align: center;
			}
		}
		.price {
			padding: 5rpx 20rpx;
			overflow: hidden;
			border-left: none;
			border-right: none;
			.left {
				.p-price {
					color: $base-red;
					span {
						font-size: $font-title;
						font-weight: bold;
						margin: 0 10rpx;
					}
				}
			}
			.num-set {
				margin-top: 6rpx;
			}
		}
		> .pick-size {
			padding: 0 20rpx;
			height: 80rpx;
			line-height: 80rpx;
			font-size: $font-base;
			position: relative;
			border-top: 1px solid #f1f1f1;
			.pick-title {
				color: $font-color-light;
			}
			.selected-text {
				position: absolute;
				right: 30rpx;
				.icon-pos {
					margin-left: 20rpx;
				}
			}
		}
		> .description {
			padding: 15rpx 20rpx;
			line-height: 34rpx;
		}
	}
	> .source {
		background-color: white;
		margin: 20rpx auto;
		box-shadow: 0 3px 3px -3px #ccc;
		.dj {
			overflow: hidden;
			display: inline-block;
		}
		> p {
			text-align: center;
			font-size: $font-lg;

			height: 60rpx;
			line-height: 60rpx;
		}

		> ul {
			list-style: none;
			padding: 20rpx;
			margin: 0;
			padding-top: 0;
			> li {
				height: 48rpx;
				line-height: 48rpx;
				overflow: hidden;
				&:nth-child(4) > text:nth-child(1) {
					width: 280rpx;
					display: inline-block;
					text-overflow: ellipsis;
					overflow: hidden;
				}
			}
		}
	}
	> .evaluate {
		background-color: white;
		margin: 0 auto;
		margin-top: 20rpx;
		padding-bottom: 20rpx;
		box-shadow: 0 3px 3px -3px #ccc;
		> p {
			font-size: $font-lg;
			text-align: center;
			padding: 15rpx 0;
		}
		> view {
			overflow: hidden;
			padding: 0 20rpx;
		}
		.no-comment {
			background: #fff;
			text-align: center;
			align-items: center;
			height: 60rpx;
			line-height: 60rpx;
		}
		> ul {
			margin: 0;
			padding: 0 20rpx;
			list-style: none;
			> li {
				border: 1px solid $border-color-base;
				margin-top: 20rpx;
				padding: 5rpx 20rpx;
				padding-left: 10rpx;
				> .name {
					overflow: hidden;
					> .left {
						> * {
							float: left;
						}
						> img {
							width: 40rpx;
							height: 40rpx;
						}
						> p {
							height: 40rpx;
							line-height: 40rpx;
						}
					}
					> .right {
						height: 40rpx;
						line-height: 40rpx;
					}
				}
				> .content {
					padding-left: 40rpx;
				}
			}
		}
	}
	> .images {
		background-color: white;
		margin: 0 auto;
		margin-top: 20rpx;
		box-shadow: 0 3px 3px -3px #ccc;
		img {
			width: 100%;
		}
		&.pd-content {
			padding: 30rpx;
		}
	}
	> .purchase {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		height: 90rpx;
		line-height: 90rpx;
		.left {
			flex: 3;
			background: #ffaa00;
			color: #FFFFFF;
			text-align: center;
			font-size: $font-lg;
		}
		.right {
			flex: 2;
			background: #ff5500;
			color: #FFFFFF;
			text-align: center;
			font-size: $font-lg;
		}
		// 功能按钮
		.function-icon {
			display: inline-block;
			width: 220rpx;
			background: #fff;
			display: flex;
			padding: 0 20rpx;
			.li {
				display: flex;
				flex: 1;
				justify-content: center;
				align-items: center;
				.icon {
					display: inline-block;
					width: 40rpx;
					height: 40rpx;
					position: relative;
					top: -10rpx;
					&.icon-cart {
						background-image: url('../../static/tab-cart-current.png');
						background-size: 100% 100%;
						backgrount-repeat: no-repeat;
					}
					&.icon-home {
						background-image: url('../../static/tab-home-current.png');
						background-size: 100% 100%;
						backgrount-repeat: no-repeat;
					}
					> .number {
						display: inline-block;
						width: 30rpx;
						heigth: 30rpx;
						border-radius: 50%;
						position: absolute;
						top: -15rpx;
						right: -15rpx;
						color: #fff;
						background: $base-red;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}

				._name {
					position: absolute;
					font-size: $font-sm - 2;
					bottom: 8rpx;
				}
			}
		}

		.buy {
			display: inline-block;
			flex: 1;
			height: 90rpx;
			padding: 0;
			margin: 0;
			overflow: hidden;
			list-style: none;
			> li {
				text-align: center;
				color: white;
				font-size: $font-lg;
				width: 50%;
				height: 90rpx;
				float: left;
				line-height: 90rpx;
				&:nth-child(1) {
					background-color: $bgColor-green;
				}
				&:nth-child(2) {
					background-color: $bgColor-blue;
				}
			}
		}
	}

	.left {
		float: left;
	}
	.right {
		float: right;
	}
	.orange {
		color: $base-orange;
	}
	/* 规格选择弹窗 */
	.attr-content {
		padding: 10rpx 30rpx;
		.a-t {
			display: flex;
			image {
				width: 170rpx;
				height: 170rpx;
				flex-shrink: 0;
				margin-top: -40rpx;
				border-radius: 8rpx;
				border: 1px solid $border-color-base;
			}
			.right {
				display: flex;
				flex-direction: column;
				padding-left: 24rpx;
				font-size: $font-sm + 2rpx;
				color: $font-color-base;
				line-height: 42rpx;
				.price {
					font-size: $font-lg;
					color: $uni-color-primary;
					margin-bottom: 10rpx;
				}
				.selected-text {
					margin-right: 10rpx;
				}
			}
		}
		.attr-list {
			display: flex;
			flex-direction: column;
			font-size: $font-base + 2rpx;
			color: $font-color-base;
			padding-top: 30rpx;
			padding-left: 10rpx;
		}
		.item-list {
			padding: 20rpx 0 0;
			display: flex;
			flex-wrap: wrap;
			text {
				display: flex;
				align-items: center;
				justify-content: center;
				background: #eee;
				margin-right: 20rpx;
				margin-bottom: 20rpx;
				border-radius: 100rpx;
				min-width: 60rpx;
				height: 60rpx;
				padding: 0 20rpx;
				font-size: $font-base;
				color: $font-color-dark;
			}
			.selected {
				background: #fbebee;
				color: $uni-color-primary;
			}
		}
	}
	/*  弹出层 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;

		&.show {
			display: block;
			.mask {
				animation: showPopup 0.2s linear both;
			}
			.layer {
				animation: showLayer 0.2s linear both;
			}
		}
		&.hide {
			.mask {
				animation: hidePopup 0.2s linear both;
			}
			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}
		&.none {
			display: none;
		}
		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}
		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			width: 100%;
			min-height: 40vh;
			border-radius: 10rpx 10rpx 0 0;
			background-color: #fff;
			.btn {
				height: 66rpx;
				line-height: 66rpx;
				border-radius: 100rpx;
				background: $uni-color-primary;
				font-size: $font-base + 2rpx;
				color: #fff;
				margin: 30rpx auto 20rpx;
			}
		}
		@keyframes showPopup {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
		@keyframes hidePopup {
			0% {
				opacity: 1;
			}
			100% {
				opacity: 0;
			}
		}
		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}
			100% {
				transform: translateY(0%);
			}
		}
		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}
			100% {
				transform: translateY(120%);
			}
		}
	}
}
.big-tit {
	margin: 30rpx auto;
	font-size: 30rpx;
	text-align: center;
	color: #333333;
}
.payway {
	display: flex;
	justify-content: space-around;
	.item {
		display: inline-block;
		padding: 3rpx 10rpx;
		border: 1rpx solid #C0C0C0;
		border-radius: 4rpx;
		margin-right: 10rpx;
	}
}
</style>
