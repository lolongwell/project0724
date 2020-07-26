<template>
	<view class="register">
		<text class="tip">*请使用该微信号绑定的手机号注册</text>
		<icon-input class="item" placeholderTxt='手机号' @getValue="getValue('phone', $event)"></icon-input>
		<icon-input class="item" placeholderTxt='验证码' hasBtn btnTxt="获取验证码" @getValue="getValue('code', $event)"></icon-input>
		<icon-input class="item" placeholderTxt='009'></icon-input>
		<icon-input class="item" placeholderTxt='真实姓名'></icon-input>
		<icon-input class="item" placeholderTxt='请设置密码'></icon-input>
		<icon-input class="item" placeholderTxt='请确认密码'></icon-input>
		<button class="item btn" type="default" @click="sumbit">确认</button>
		<view class="tip">
			已有账号<text>登录</text>
		</view>
	</view>
</template>

<script>
	import IconInput from '@/components/common/IconInput.vue'
	export default {
		components: {IconInput},
		data() {
			return {
				phone: '',
				code: ''
			};
		},
		methods:{
			sumbit() {
				console.log(this.phone)
				console.log(this.code)
			},
			getValue(type, val) {
				switch (type) {
					case 'phone':
						this.phone = val
						break
					case 'code':
						this.code = val
						break
				}
			}
		}
	}
</script>

<style lang="scss">
.register {
	width: 100vw;
	height: 100vh;
	padding-top: 44rpx;
	box-sizing: border-box;
	background: #FF0000;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
	.item {
		margin-top: 40rpx;
	}
	.tip {
		color: #FFFFFF;
		font-size: 28rpx;
	}
	.btn {
		width: 80vw;
		border: none;
		border-radius: 36rpx;
		color: #FF0000;
	}
}
</style>
