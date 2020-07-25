<template>
	<view class="content">
		<!-- 头像 -->
		<!-- <head-portrait></head-portrait> -->

		<!-- <view class="mark">
			<p>地址标签</p>
			<view>
				<p v-for="item in tags" :key="item" :class="{ active: addressData.bq == item }" @click="addressData.bq = item">{{ item }}</p>
			</view>
		</view> -->
		<view class="row b-b">
			<text class="tit">收货地址分类</text>
			<picker class="input" @change="bindPickerChange" :value="type" :range="typeList" range-key="name">
				<view class="uni-input">{{ typeList[index].name }}</view>
			</picker>
		</view>
		<view class="row b-b">
			<text class="tit">姓名</text>
			<input class="input" type="text" v-model="addressData.realname" placeholder="收货人姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">电话</text>
			<input class="input" type="number" v-model="addressData.phone" placeholder="收货人手机号码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b" @click="cl">
			<text class="tit">地址</text>
			<text class="input">{{ addressData.address }}</text>
			<text class="yticon icon-shouhuodizhi"></text>
		</view>
		<view class="row b-b">
			<text class="tit">详细地址</text>
			<input class="input" type="text" v-model="addressData.detail" placeholder="楼号、门牌" placeholder-class="placeholder" />
		</view>
		<!-- <view class="row b-b">
			<text class="tit">邮政编码</text>
			<input class="input" type="number" v-model="addressData.postcode" placeholder="邮政编码" placeholder-class="placeholder" />
		</view> -->
		<view class="row default-row">
			<text class="tit">设为默认</text>
			<switch @change="dc" :checked="addressData.sfmr" color="#00468c" />
		</view>

		<view class="submit"><a class="orange button large" @click="confirm">保存并使用</a></view>
		
		<view class="tips">
			<rich-text :nodes="addressRules"></rich-text>
		</view>
	</view>
</template>

<script>
import orderAPI from '../../api/order/order';
import NewsAPI from '../../api/news/news';
import { mapState } from 'vuex';
export default {
	data() {
		return {
			index: 0,
			type: '',
			addressRules: '',
			addressData: {
				address: '',
				detail: '',
				id: '',
				phone: '',
				postcode: '',
				realname: '',
				shdzfl: '2',
				sfmr: false,
				userId: ''
			},
			typeList:[]
		};
	},
	computed:{
		...mapState(['addressList']),
	},
	onLoad(option) {
		this.$_log('onLoad');
		let data = JSON.parse(option.data);
		this.type = option.type;
		let title = '';
		if (option.type == 'add') title = '新增收货地址';
		else {
			this.setAddress(data);
			title = '编辑收货地址';
			this.index =  data.shdzfl - 2;
		}
		uni.setNavigationBarTitle({
			title
		});
		NewsAPI.newsList({ xwfl: '9' }).then(res => {
			let news = res.data.obj.results;
			this.addressRules = news[0].content;
		});
		orderAPI.getDic('shdzfl').then(res=>{
			this.typeList = [];
			res.data.data.forEach(v=>{
				this.typeList.push({
					name:v.typename,
					type:v.typecode
				})
			})
		})
		let user = uni.getStorageSync('user');
		this.addressData.userId = user.id;
	},
	methods: {
		bindPickerChange(e) {
			this.index = e.target.value;
			this.addressData.shdzfl = this.typeList[this.index].type;
		},
		setAddress(data) {
			this.addressData = {
				address: data.address,
				// bq: 'string',
				detail: data.detail,
				id: data.id,
				phone: data.phone,
				postcode: data.postcode,
				realname: data.realname,
				shdzfl: data.shdzfl,
				sfmr: !!data.sfmr,
				userId: data.userId
			};
		},
		cl() {
			uni.chooseLocation({
				success: data => {
					console.info('dizhi', data);
					this.addressData.address = data.address;
				}
			});
		},
		
		dc(e) {
			console.info(e);
			this.addressData.sfmr =  e.detail.value?1:0;
		},

		confirm() {
			if(this.addressData.shdzfl != 2 || this.type == 'edit'){
				let shdzflFlag = false;
				this.addressList.forEach(v=>{
					if(v.shdzfl == 3){
						this.$api.msg('周日地址只能保存一个');
						shdzflFlag = true;
					}
				})
				if(shdzflFlag) return;
			}
			this.addressData.shdzfl = this.typeList[this.index].type;
			let data = JSON.parse(JSON.stringify(this.addressData));
			if (!data.realname) {
				this.$api.msg('请填写收货人姓名');
				return;
			}
			if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.phone)) {
				this.$api.msg('请输入正确的手机号码');
				return;
			}
			if (!data.address) {
				this.$api.msg('请在地图选择所在位置');
				return;
			}
			if (!data.detail) {
				this.$api.msg('请填写详细地址');
				return;
			}
			// if (!data.postcode) {
			// 	this.$api.msg('请填写详细地址');
			// 	return;
			// }
			data.sfmr ? (data.sfmr = 1) : (data.sfmr = 0);
			if (this.type == 'add')
				orderAPI.addAddress(data).then(res => {
					this.$_log('添加地址：', res.data);
					uni.showToast({
						title: '添加成功!',
						icon: 'none'
					});
					uni.navigateBack();
				});
			else
				orderAPI.updateAddress(data).then(res => {
					this.$_log('更新地址：', res.data);
					uni.showToast({
						title: '更新成功!',
						icon: 'none'
					});
					uni.navigateBack();
				});
		}
	}
};
</script>

<style lang="scss">
page {
	background: $page-color-base;
}

.content {
	background: #ffffff;
	padding: 0 20rpx;

	.mark {
		margin: 40rpx 0;
		padding: 10rpx;
		border: 1px dashed $border-color-dark;
		> p {
			width: 100%;
			height: 40rpx;
			line-height: 40rpx;
			font-size: $font-base;
			color: white;
			background-color: $bgColor-blue;
			border-radius: 10rpx;
			text-align: center;
		}
		> view {
			overflow: hidden;
			> p {
				width: calc(20% - 8rpx);
				float: left;
				margin-right: 10rpx;
				text-align: center;
				line-height: 50rpx;
				height: 50rpx;
				font-size: $font-base;
				background-color: $bgColor-green;
				color: white;
				border-radius: 10rpx;
				margin-top: 5rpx;
				&:nth-child(5n) {
					margin-right: 0;
				}
				&.active {
					background-color: $bgColor-blue;
				}
			}
		}
	}

	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 30rpx;
		height: 80rpx;

		.tit {
			flex-shrink: 0;
			width: 190rpx;
			font-size: 30rpx;
			color: $font-color-dark;
		}
		.input {
			flex: 1;
			font-size: 30rpx;
			color: $font-color-dark;
		}
		.icon-shouhuodizhi {
			font-size: 36rpx;
			color: $font-color-light;
		}
	}
	.default-row {
		margin-top: 16rpx;
		.tit {
			flex: 1;
		}
		switch {
			transform: translateX(16rpx) scale(0.9);
		}
	}
	.submit {
		text-align: center;
	}
	
	.tips{
		margin-top: 30rpx;
	}
}
</style>
