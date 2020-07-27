<template>
	<view class="register">
		<text class="tip">*请使用该微信号绑定的手机号注册</text>
		<icon-input class="item" iptType="number" placeholderTxt='手机号' @getValue="getValue('phone', $event)"></icon-input>
		<view class="input-code">
			<icon-input class="item" ref="code" iptType="number" placeholderTxt='验证码' @getValue="getValue('code', $event)"></icon-input>
			<span v-if="!isSendCaptcha" class="code-text" @click="handleBtn">获取验证码</span>
			<span v-else class="code-text" @click="handleBtn">重新发送{{timerNum}}</span>
		</view>
		<icon-input class="item" placeholderTxt='邀请码' @getValue="getValue('invitationCode', $event)"></icon-input>
		<icon-input class="item" placeholderTxt='真实姓名' @getValue="getValue('actualName', $event)"></icon-input>
		<icon-input class="item" iptType="password" placeholderTxt='请设置密码' @getValue="getValue('password1', $event)"></icon-input>
		<icon-input class="item" iptType="password" placeholderTxt='请确认密码' @getValue="getValue('password2', $event)"></icon-input>
		<button class="item btn" type="default" @click="sumbit">确认</button>
	<!-- 	<view class="tip">
			已有账号<text>登录</text>
		</view> -->
	</view>
</template>

<script>
	import IconInput from '@/components/common/IconInput.vue'
	import RegisterAPI from '@/api/register/register'
	export default {
		components: {
			IconInput
		},
		data() {
			return {
				phone: '',
				code: '',
				invitationCode: '',
				actualName: '',
				password1: '',
				password2: '',
				codeText: '', //验证码文字
				isSendCaptcha: false,
				timerNum: 60,
				timeClock: null,
				isCode:false

			};
		},
		computed: {},
		methods: {
			sumbit() {

				let {
					phone,
					code,
					invitationCode,
					actualName,
					password1,
					password2
				} = this
				let reg = /^1[3456789]\d{9}$/
				// if (!phone) {
				// 	uni.showToast({
				// 		title: '请输入手机号码！',
				// 		icon: 'none',
				// 		duration: 2000
				// 	});
				// 	return
				// }
				// if (!reg.test(phone)) {
				// 	uni.showToast({
				// 		title: '手机号输入格式不对，请重新输入！',
				// 		icon: 'none',
				// 		duration: 2000
				// 	});
				// 	return
				// }
				// if (!actualName) {
				// 	uni.showToast({
				// 		title: '请输入用户名！',
				// 		icon: 'none',
				// 		duration: 2000
				// 	});
				// 	return
				// }
				// if (!code) {
				// 	uni.showToast({
				// 		title: '请输入验证码！',
				// 		icon: 'none',
				// 		duration: 2000
				// 	});
				// 	return
				// }
				// if (this.isCode) {
				// 	uni.showToast({
				// 		title: '请输入正确的验证码！',
				// 		icon: 'none',
				// 		duration: 2000
				// 	});
				// 	return
				// }
				// if (!password1) {
				// 	uni.showToast({
				// 		title: '请输入密码',
				// 		icon: 'none',
				// 		duration: 2000
				// 	});
				// 	return
				// }
				// if (password1 !== password2) {
				// 	uni.showToast({
				// 		title: '两次输入的密码不一致，请检查！',
				// 		icon: 'none',
				// 		duration: 2000
				// 	});
				// 	return
				// }

               //提交注册
			   let data={
				   mobilePhone:this.phone,
				   userName:this.actualName,
				   password:this.password1,
				   ghbm:this.invitationCode,
				   
				   
			   }
			   RegisterAPI.submitRegister(data).then(res=>{
				   console.log('注册',res)
			   })

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
				let {
					phone
				} = this
				if (!phone) {
					uni.showToast({
						title: '请输入手机号！',
						icon: 'none',
						duration: 2000
					});
					return
				}
				this.isSendCaptcha = true
				this.sendCodeTime()

				if (phone) {
                      
					RegisterAPI.getPhoneCode(phone).then(res => {
						console.log('res',res)
						if(res.respCode === '0'){
							this.isCode = true
							
						}else{
							this.isCode = false
						}
						
					})
				}
			},
			sendCodeTime() {
				console.log('zoule')

				this.timerNum = 60
				this.isSendCaptcha = true
				clearInterval(this.timeClock);
				if (this.isSendCaptcha) {
					this.timerNum = 60;
					this.timeClock = setInterval(() => {
						this.timerNum--;
						if (this.timerNum === 0) {
							clearInterval(this.timeClock);
							this.isSendCaptcha = false
						}
					}, 100)
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

		.input-code {
			position: relative;

			.code-text {
				position: absolute;
				right: 20rpx;
				top: 50%;
				font-size: $font-base;
				color: $base-red;
				// transform: translateY(-50%);

			}
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
