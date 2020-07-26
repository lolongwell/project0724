<template>
	<view class="reset-password-box">
		<view class="form">
			<ul class="input-list">
				<li class="input-item">
					<icon type="success" class="icon-item" size="20" />
					<input type="number" placeholder="手机号" v-model="form.phone" />
				</li>
				<li class="input-item">
					<icon type="success" class="icon-item" size="20" />
					<input type="password" placeholder="请设置密码" v-model="form.password1" />
				</li>
				<li class="input-item">
					<icon type="success" class="icon-item" size="20" />
					<input type="password" placeholder="请确认密码" v-model="form.password2" />
				</li>
				<li class="input-item">
					<icon type="success" class="icon-item" size="20" />
					<input type="" placeholder="验证码" v-model="form.captcha" />
					<span class="captcha" @click="getCaptcha">获取验证码</span>
				</li>
				<li class="input-item sumit">
					<button type="default" @click="resetPassword">确 认</button>
				</li>
			</ul>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					phone: '',
					password1: '',
					password2: '',
					captcha: ''
				},
			};

		},
		methods: {
			// 获取验证码
            getCaptcha(){
				
			},
			resetPassword() {
				console.log(this.form)
				// 校验
				var reg = /^1[3|4|5|7|8][0-9]{9}$/
				if (!this.form.phone) {
					uni.showToast({
						title: '请输入手机号！',
						duration: 3000,
						icon: 'none'
					});
					return;
				}
				if (!reg.test(this.form.phone)) {
					uni.showToast({
						title: '请输入正确的手机号！',
						duration: 3000,
						icon: 'none'
					});
					return;
				}
				
			}
		}

	};
</script>

<style lang="scss" scoped>
	.reset-password-box {
		display: flex;
		flex-direction: column;
		margin-top: 50%;
		margin-left: 50%;
		width: 70%;
		transform: translate(-50%, -50%);

		ul {
			padding-left: 0;

			.input-item {
				height: 60rpx;
				width: 100%;
				background: #fff;
				border-radius: 10rpx;
				margin-top: 30rpx;
				position: relative;

				input {
					height: 100%;
					position: absolute;
					left: 0;
					top: 0;
					padding-left: 80rpx;
				}

				.icon-item {
					position: absolute;
					left: 10rpx;
					top: 50%;
					transform: translateY(-50%);
				}

				.captcha {
					position: absolute;
					right: 10rpx;
					top: 50%;
					transform: translateY(-50%);
					font-size: 10rpx;
					color: $my-color;
				}

				.v-item {
					position: absolute;
					bottom: -30rpx;
					color: red;
					font-size: 20rpx;
				}
			}

			.sumit {
				button {
					border: 1px solid $my-color;
					color: $my-color;
				}
			}
		}
	}
</style>
