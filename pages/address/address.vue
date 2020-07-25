<template>
	<view class="content b-t">
		<view class="list b-b" v-for="(item, index) in addressList" :key="index" @click="check(item)">
			<view class="wrapper">
				<view class="address-box">
					<text v-if="item.sfmr == '1'" class="tag">默认</text>
					<text class="address">{{ item.address }} {{ item.detail }}</text>
				</view>
				<view class="u-box">
					<text class="name">{{ item.realname }}</text>
					<text class="mobile">{{ item.phone }}</text>
					<text class="time">{{ item.shdzfl2 || "" }}</text>
				</view>
			</view>
			<text class="yticon icon-bianji" @click.stop="add('edit', item)"></text>
		</view>

		<button class="add-btn" @click="add('add',{})">新增地址</button>
	</view>
</template>

<script>
import orderAPI from '../../api/order/order';
export default {
	data() {
		return {
			source: 0,
			addressList: []
		};
	},
	onLoad() {
		
	},
	onShow() {
		this.list();
	},
	methods: {
		list() {
			let u = uni.getStorageSync('user').id;
			orderAPI
				.getAddressList({
					userId: u
				})
				.then(res => {
					this.$_log('地址列表：', res.data);
					this.addressList = res.data.obj.results;
					console.log('this.addressList',this.addressList)
				});
		},
		check(d) {
			this.$api.prePage().addressData = d;
			uni.navigateBack();
		},
		add(type, d) {
			uni.navigateTo({
				// url: `/pages/address/addressManage?type=${type}&data=${JSON.stringify(d)}`,
				url: `/pages/address/addressManage`
			});
		}
	}
};
</script>

<style lang="scss">
page {
	padding-bottom: 120rpx;
}
.content {
	position: relative;
}
.list {
	display: flex;
	align-items: center;
	padding: 20rpx 30rpx;
	background: #fff;
	position: relative;
}
.wrapper {
	display: flex;
	flex-direction: column;
	flex: 1;
}
.address-box {
	display: flex;
	align-items: center;
	.tag {
		font-size: 24rpx;
		color: $base-color;
		margin-right: 20rpx;
		background: #fffafb;
		border: 1px solid #ffb4c7;
		border-radius: 4rpx;
		padding: 4rpx 10rpx;
		line-height: 1;
		min-width: 72rpx;
	}
	.address {
		font-size: 30rpx;
		color: $font-color-dark;
	}
}
.u-box {
	font-size: 28rpx;
	color: $font-color-light;
	margin-top: 16rpx;
	.name {
		margin-right: 30rpx;
	}
	.time {
		margin-left: 30rpx;
	}
}
.icon-bianji {
	display: flex;
	align-items: center;
	height: 80rpx;
	font-size: 40rpx;
	color: $font-color-light;
	padding-left: 30rpx;
}

.add-btn {
	position: fixed;
	left: 30rpx;
	right: 30rpx;
	bottom: 16rpx;
	z-index: 95;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 690rpx;
	height: 80rpx;
	font-size: 32rpx;
	color: #fff;
	background-color: $base-color;
	border-radius: 10rpx;
	box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
}
</style>
