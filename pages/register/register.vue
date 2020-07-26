<template>
	<view class="register">
		<text class="tip">*请使用该微信号绑定的手机号注册</text>
		<icon-input class="item" iptType="number" placeholderTxt='手机号' @getValue="getValue('phone', $event)"></icon-input>
		<icon-input class="item" iptType="number" placeholderTxt='验证码' hasBtn btnTxt="获取验证码" @getValue="getValue('code', $event)" @handleBtn="handleBtn"></icon-input>
		<icon-input class="item" placeholderTxt='邀请码' @getValue="getValue('invitationCode', $event)"></icon-input>
		<icon-input class="item" placeholderTxt='真实姓名' @getValue="getValue('actualName', $event)"></icon-input>
		<icon-input class="item" iptType="password" placeholderTxt='请设置密码' @getValue="getValue('password1', $event)"></icon-input>
		<icon-input class="item" iptType="password" placeholderTxt='请确认密码' @getValue="getValue('password2', $event)"></icon-input>
		<button class="item btn" type="default" @click="sumbit">确认</button>
		<view class="tip">
			已有账号<text>登录</text>
		</view>
	</view>
</template>

<script>
	import IconInput from '@/components/common/IconInput.vue'
	import RegisterAPI from '@/api/register/register'
	export default {
		components: {IconInput},
		data() {
			return {
				phone: '',
				code: '',
				invitationCode: '',
				actualName: '',
				password1: '',
				password2: '',
			};
		},
		methods:{
			sumbit() {
				let {phone, code, invitationCode, actualName, password1, password2} = this
				let reg = /^1[3456789]\d{9}$/
				if (!reg.test(phone)) {
					uni.showToast({
						title: '手机号输入格式不对，请重新输入！',
						icon: 'none',
						duration: 2000
					});
					return
				}
				if (password1 !== password2) {
					uni.showToast({
						title: '两次输入的密码不一致，请检查！',
						icon: 'none',
						duration: 2000
					});
					return
				}
			},
			getValue(type, val) {
				switch (type) {
					case 'phone':
						this.phone = val
						break
					case 'code':
						this.code = val
						break
					case 'invitationCode':
						this.invitationCode = val
						break
					case 'actualName':
						this.actualName = val
						break
					case 'password1':
						this.password1 = val
						break
					case 'password2':
						this.password2 = val
						break
				}
			},
			handleBtn(val) {
				console.log(val)
				let {phone} = this
				if (val == '获取验证码') {
					RegisterAPI.getPhoneCode(phone).then(res => {
						
					})
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
