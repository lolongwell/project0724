<template>
	<view class="container">
		<navigator url="/pages/address/address?source=1" class="address-section">
			<view v-if="defaultAddress" class="order-content">
				<text class="yticon icon-shouhuodizhi"></text>
				<view class="cen">
					<view class="top">
						<text class="name">{{ addressData.realname }}</text>
						<text class="mobile">{{ addressData.phone }}</text>
					</view>
					<text class="address">{{ addressData.address }} {{ addressData.detail }}</text>
				</view>
				<text class="yticon icon-you"></text>
			</view>
			<view v-else class="add">
				<span class="yticon icon-jia2"></span>
				选择收货地址
				<text class="yticon icon-you"></text>
			</view>
		</navigator>

		<view class="cart-list">
			<view class="shop-good-list">
				<view :key="item.id" v-for="(item, index) in orderObj.product" class="good">
					<view class="left"><img :src="getPicUrl(item.pic)" /></view>
					<view class="right">
						<view class="spname">{{ item.spname }}</view>
						<view class="gmfs">{{ item.gmfs2 || '' }}</view>
						<view class="price">
							<p>
								￥
								<span>{{ item.spdj }}</span>
								元
							</p>
							<view class="num">
								<span>{{ item.spsl }}</span>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="action-section">
			<view class="total-box">
				<text class="price">合计：¥{{ total || 0 }} 元</text>
			</view>
			<button type="primary" class="no-border confirm-btn" @click="submit">确认订单</button>
		</view>

		<!-- <view class="yt-list">
      <view class="yt-list-cell" @click="toggleMask('show')">
        <view class="cell-icon">券</view>
        <text class="cell-tit clamp">优惠券</text>
        <text class="cell-tip active">选择优惠券</text>
        <text class="cell-more wanjia wanjia-gengduo-d"></text>
      </view>
      <view class="yt-list-cell">
        <view class="cell-icon hb">减</view>
        <text class="cell-tit clamp">商家促销</text>
        <text class="cell-tip disabled">暂无可用优惠</text>
      </view>
    </view> -->
		<view class="yt-list">
			<view class="yt-list-cell">
				<text class="cell-tit clamp">商品金额</text>
				<text class="cell-tip">¥{{total || 0}}</text>
			</view>
			<view class="yt-list-cell">
				<text class="cell-tit clamp">优惠金额</text>
				<text class="cell-tip red">¥{{0}}</text>
			</view>
			<view v-if="isEnterpriseUser" class="yt-list-cell">
				<text v-if="!!user.kid && !!user.qyzk" class="cell-tit clamp">企业折扣</text>
				<text class="cell-tip red">{{user.qyzk}}</text>
			</view>
			<view v-if="!isEnterpriseUser" class="yt-list-cell">
				<text v-if="!user.kid && user.qyzk" class="cell-tit clamp">个人折扣</text>
				<text class="cell-tip red">{{user.qyzk}}</text>
			</view>
			
			<view class="yt-list-cell">
				<text class="cell-tit clamp">运费</text>
				<text class="cell-tip">免运费</text>
			</view>
			<view class="yt-list-cell desc-cell">
				<text class="cell-tit clamp">备注</text>
				<input class="desc" type="text" v-model="desc" placeholder="请填写备注信息" placeholder-class="placeholder" />
			</view>
		</view>

		<footer-logo></footer-logo>

	</view>
</template>

<script>
import { mapState } from 'vuex';
import OrderAPI from '../../api/order/order';
export default {
	data() {
		return {
			maskState: 0,
			desc: '', 
			payType: 1, 
			addressData: {},
			defaultAddress: false,
			total: 0,
			spids: [],
			user: {}
		};
	},
	onLoad(option) {
		this.addressList.forEach(v=>{
			if(v.sfmr) this.defaultAddress = true;
			this.addressData = v;
		})
		this.user = uni.getStorageSync('user');
	},
	onShow() {
		this.loadData();
		if(this.addressData.id) this.defaultAddress = true;
	},
	computed: {
		...mapState(['orderObj', 'userInfo', 'addressList', 'isEnterpriseUser']),
		totalGood() {
			return 2;
		}
	},
	methods: {
		loadData() {
			this.$_log('订单数据', this.orderObj);
			this.$_log('addressData',this.addressData);
			this.calcTotal(); 
		},
		toggleMask(type) {
			let timer = type === 'show' ? 10 : 300;
			let state = type === 'show' ? 1 : 0;
			this.maskState = 2;
			setTimeout(() => {
				this.maskState = state;
			}, timer);
		},
		numberChange(data) {
			this.number = data.number;
		},
		submit() {
			let user = uni.getStorageSync('user');
			let product = [];
			this.orderObj.product.forEach(v=>{
				let o = JSON.parse(JSON.stringify(v));
				this.spids.push(o.spId);
				delete o.pic;
				product.push(o);
			})
			let option = {
				ddje: this.total,
				ddzt: '0',
				scDdspList: product,
				userId: user.id,
				addressId: this.addressData.id,
				username: user.userName
			};
			if(this.isEnterpriseUser) option.qyzk = this.user.qyzk;
			if(!option.addressId) {
				this.$api.msg('请选择地址');
				return;
			}
			OrderAPI.createOrder(option).then(res=>{
				if(res.data.ok){
					this.$store.commit('getCart');
					this.$_log('订单提交',res.data.data);
					let orderId = res.data.data.id;
					res.data.data.spids = this.spids;
					this.$_log('orderId',orderId);
					uni.navigateTo({
						url: `/pages/money/pay?id=${orderId}&data=${JSON.stringify(res.data.data)}`
					});
				}else {
				    this.$store.commit('getCart');
					uni.showToast({
						title: res.data.message,
						icon: 'none'
					})
				}
			})
		},
		getPicUrl(url) {
			if(url.indexOf('http') > -1) return url;
			else return this.$request.BASE_URL + url;
		},
		stopPrevent() {},
		calcTotal() {
			let list = this.orderObj.product;
			if (list.length === 0) {
				this.empty = true;
				return;
			}
			let total = 0;
			let checked = true;
			list.forEach(item => {
				total = total + item.spdj * item.spsl;
			});
			if(this.isEnterpriseUser) total = total * this.user.qyzk;
			if(!this.isEnterpriseUser && this.user.qyzk) total = total * this.user.qyzk;
			this.total = Number(total.toFixed(2));
		}
	}
};
</script>

<style lang="scss">
.container {
	background: #fff;
	margin: 20rpx 20rpx 0;
	border-radius: 10rpx;
	overflow: hidden;
}

page {
	padding-bottom: 100rpx;
}

.title {
	margin-top: 40rpx;
	font-size: $font-title-lg;
	color: $base-green;
	text-align: center;
}

.address-section {
	margin: 15rpx 20rpx;
	padding: 30rpx 0;
	border: 1px dashed $border-color-dark;
	border-left: none;
	border-right: none;
	position: relative;
	margin-top: 30rpx;
	.add {
		font-size: $font-lg;
		position: relative;
		line-height: $font-lg;
		> .yticon.icon-jia2 {
			color: white;
			background-color: $base-red;
			margin-right: 20rpx;
		}
		> .yticon.icon-you {
			right: 0;
			top: 2rpx;
			position: absolute;
		}
	}
	.order-content {
		display: flex;
		align-items: center;
	}

	.icon-shouhuodizhi {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 90rpx;
		color: #888;
		font-size: 44rpx;
	}

	.cen {
		display: flex;
		flex-direction: column;
		flex: 1;
		font-size: 28rpx;
		color: $font-color-dark;
	}

	.name {
		font-size: 34rpx;
		margin-right: 24rpx;
	}

	.address {
		margin-top: 16rpx;
		margin-right: 20rpx;
		color: $font-color-light;
	}

	.icon-you {
		font-size: 32rpx;
		color: $font-color-light;
		margin-right: 30rpx;
	}

	.a-bg {
		position: absolute;
		left: 0;
		bottom: 0;
		display: block;
		width: 100%;
		height: 5rpx;
	}
}

/* 购物车列表项 */
.cart-list {
	padding: 0 30rpx;
	.shop-good-list {
		.good {
			overflow: hidden;
			margin-top: 25rpx;
			font-size: $font-base;
			color: $font-color-base;
			> .left {
				float: left;
				width: 180rpx;
				height: 90rpx;
				> * {
					float: left;
				}
				> img {
					width: 160rpx;
					height: 90rpx;
				}
			}
			> .right {
				float: left;
				width: 470rpx;
				.spname {
					font-size: $font-base;
				}
				.gmfs {
					font-size: $font-sm;
					color: $font-color-light;
				}
				> .price {
					overflow: hidden;
					position: relative;
					> p {
						float: left;
						> span {
							color: $base-red;
							font-size: $font-base;
							font-weight: bold;
							margin: 0 10rpx;
						}
					}
					> .num {
						position: absolute;
						right: 0;
						bottom: 0;
						height: 40rpx;
						text-align: right;
						> span {
							display: inline-block;
							width: 80rpx;
							text-align: center;
							background-color: $bgColor-blue;
							color: white;
						}
					}
				}
			}
		}
	}
}
/* 底部栏 */
.action-section {
	/* #ifdef H5 */
	/* #endif */
	position: fixed;
	left: 0rpx;
	bottom: 0rpx;
	z-index: 95;
	display: flex;
	align-items: center;
	width: 100%;
	height: 100rpx;
	padding: 0;
	background: $bgColor-blue;
	box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, 0.5);
	.checkbox {
		height: 52rpx;
		position: relative;
		margin-left: 30rpx;
		image {
			width: 52rpx;
			height: 100%;
			position: relative;
			z-index: 5;
		}
	}
	.clear-btn {
		position: absolute;
		left: 26rpx;
		top: 0;
		z-index: 4;
		width: 0;
		height: 52rpx;
		line-height: 52rpx;
		padding-left: 38rpx;
		font-size: $font-base;
		color: #fff;
		background: #bcbcbc;
		border-radius: 0 50px 50px 0;
		opacity: 0;
		transition: 0.2s;
		&.show {
			opacity: 1;
			width: 120rpx;
		}
	}
	.total-box {
		flex: 1;
		display: flex;
		flex-direction: column;
		text-align: right;
		padding-right: 40rpx;
		.price {
			font-size: $font-lg;
			color: #fff;
		}
		.coupon {
			font-size: $font-sm;
			color: $font-color-light;
			text {
				color: $font-color-dark;
			}
		}
	}
	.confirm-btn {
		padding: 0 68rpx;
		margin: 0;
		height: 100rpx;
		line-height: 100rpx;
		border-radius: 0;
		font-size: $font-base + 2rpx;
		background: $bgColor-green;
	}
}
.yt-list {
	margin-top: 16rpx;
}

.yt-list-cell {
	display: flex;
	align-items: center;
	padding: 0 30rpx 0 40rpx;
	line-height: 70rpx;
	position: relative;

	&.cell-hover {
		background: #fafafa;
	}

	&.b-b:after {
		left: 30rpx;
	}

	.cell-icon {
		height: 32rpx;
		width: 32rpx;
		font-size: 22rpx;
		color: #fff;
		text-align: center;
		line-height: 32rpx;
		background: #f85e52;
		border-radius: 4rpx;
		margin-right: 12rpx;

		&.hb {
			background: #ffaa0e;
		}

		&.lpk {
			background: #3ab54a;
		}
	}

	.cell-more {
		align-self: center;
		font-size: 24rpx;
		color: $font-color-light;
		margin-left: 8rpx;
		margin-right: -10rpx;
	}

	.cell-tit {
		flex: 1;
		font-size: 26rpx;
		color: $font-color-light;
		margin-right: 10rpx;
	}

	.cell-tip {
		font-size: 26rpx;
		color: $font-color-dark;

		&.disabled {
			color: $font-color-light;
		}

		&.active {
			color: $base-color;
		}
		&.red {
			color: $base-color;
		}
	}

	&.desc-cell {
		.cell-tit {
			max-width: 90rpx;
		}
	}

	.desc {
		flex: 1;
		font-size: $font-base;
		color: $font-color-dark;
	}
}

/* 支付列表 */
.pay-list {
	padding-left: 40rpx;
	margin-top: 16rpx;
	background: #fff;
	.pay-item {
		display: flex;
		align-items: center;
		padding-right: 20rpx;
		line-height: 1;
		height: 110rpx;
		position: relative;
	}
	.icon-weixinzhifu {
		width: 80rpx;
		font-size: 40rpx;
		color: #6bcc03;
	}
	.icon-alipay {
		width: 80rpx;
		font-size: 40rpx;
		color: #06b4fd;
	}
	.icon-xuanzhong2 {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 60rpx;
		height: 60rpx;
		font-size: 40rpx;
		color: $base-color;
	}
	.tit {
		font-size: 32rpx;
		color: $font-color-dark;
		flex: 1;
	}
}

.footer {
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 995;
	display: flex;
	align-items: center;
	width: 100%;
	height: 90rpx;
	justify-content: space-between;
	font-size: 30rpx;
	background-color: #fff;
	z-index: 998;
	color: $font-color-base;
	box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
	.price-content {
		padding-left: 30rpx;
	}
	.price-tip {
		color: $base-color;
		margin-left: 8rpx;
	}
	.price {
		font-size: 36rpx;
		color: $base-color;
	}
	.submit {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 280rpx;
		height: 100%;
		color: #fff;
		font-size: 32rpx;
		background-color: $base-color;
	}
}

/* 优惠券面板 */
.mask {
	display: flex;
	align-items: flex-end;
	position: fixed;
	left: 0;
	top: var(--window-top);
	bottom: 0;
	width: 100%;
	background: rgba(0, 0, 0, 0);
	z-index: 9995;
	transition: 0.3s;

	.mask-content {
		width: 100%;
		min-height: 30vh;
		max-height: 70vh;
		background: #f3f3f3;
		transform: translateY(100%);
		transition: 0.3s;
		overflow-y: scroll;
	}
	&.none {
		display: none;
	}
	&.show {
		background: rgba(0, 0, 0, 0.4);

		.mask-content {
			transform: translateY(0);
		}
	}
}

/* 优惠券列表 */
.coupon-item {
	display: flex;
	flex-direction: column;
	margin: 20rpx 24rpx;
	background: #fff;
	.con {
		display: flex;
		align-items: center;
		position: relative;
		height: 120rpx;
		padding: 0 30rpx;
		&:after {
			position: absolute;
			left: 0;
			bottom: 0;
			content: '';
			width: 100%;
			height: 0;
			border-bottom: 1px dashed #f3f3f3;
			transform: scaleY(50%);
		}
	}
	.left {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex: 1;
		overflow: hidden;
		height: 100rpx;
	}
	.title {
		font-size: 32rpx;
		color: $font-color-dark;
		margin-bottom: 10rpx;
	}
	.time {
		font-size: 24rpx;
		color: $font-color-light;
	}
	.right {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 26rpx;
		color: $font-color-base;
		height: 100rpx;
	}
	.price {
		font-size: 44rpx;
		color: $base-color;
		&:before {
			content: '￥';
			font-size: 34rpx;
		}
	}
	.tips {
		font-size: 24rpx;
		color: $font-color-light;
		line-height: 60rpx;
		padding-left: 30rpx;
	}
	.circle {
		position: absolute;
		left: -6rpx;
		bottom: -10rpx;
		z-index: 10;
		width: 20rpx;
		height: 20rpx;
		background: #f3f3f3;
		border-radius: 100px;
		&.r {
			left: auto;
			right: -6rpx;
		}
	}
}
</style>
