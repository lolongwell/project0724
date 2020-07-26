<template>
	<view class="icon-input">
		<image class="img" :src="icon" mode=""></image>
		<input class="ipt" :type="iptType" @blur="getValue" value="" :placeholder="placeholderTxt" placeholder-class="ipt-placeholder" />
		<view class="btn" v-show="hasBtn" @click="handleBtn">
			{{btnTxt}}
		</view>
	</view>
</template>

<script>
	export default {
		name: "iconInput",
		props: {
			iptType: {
				type: String,
				default: 'text'
			},
			icon: {
				type: String,
				default: '../../static/images/default.png'
			},
			placeholderTxt: {
				type: String,
				default: '请输入'
			},
			hasBtn: {
				type: Boolean,
				default: false
			},
			btnTxt: {
				type: String,
				default: '按钮'
			},
		},
		data() {
			return {
				
			}
		},
		methods:{
			getValue(e) {
				this.$emit('getValue', e.detail.value)
			},
			handleBtn() {
				this.$emit('handleBtn', this.btnTxt)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.icon-input {
		width: 80vw;
		height: 80rpx;
		padding: 10rpx 30rpx;
		border-radius: 36rpx;
		box-sizing: border-box;
		background: #fff;
		display: flex;
		justify-content: start;
		align-items: center;
		.img {
			width: 30rpx;
			height: 30rpx;
			margin-right: 30rpx;
		}
		.ipt {
			flex: 1;
			height: 100%;
		}
		.btn {
			font-size: 24rpx;
			color: #FF0000;
			margin-left: 20rpx;
		}
	}
	.ipt-placeholder {
		color: #ccc;
	}
</style>
