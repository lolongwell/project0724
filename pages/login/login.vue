<template>
	<view class="login">
		<!-- <header-logo></header-logo> -->
		<view class="logo-text">登 &nbsp; 录</view>
		<view class="form">
			<view>
				<view>
					<font>用户名：</font>
					<input type="text" v-model="user" />
				</view>
				<view>
					<font>密 &nbsp; 码：</font>
					<input type="password" v-model="password" />
				</view>
				<view><a>忘记密码</a></view>
			</view>
		</view>

		<view class="buttons"><a class="orange button large" @click="login">登录</a></view>
		<view class="footer"><img class="_footer" src="../../static/login-footer.png" alt="" /></view>
	</view>
</template>

<script>
import LoginAPI from '../../api/login/login';
export default {
	data() {
		return {
			user: 'admin',
			password: '123456'
		};
	},
	methods: {
		login() {
			if (!this.user || !this.password) {
				uni.showToast({
					title: '请输入用户名和密码！',
					duration: 3000,
					icon: 'none'
				});
				return;
            }

			LoginAPI.checkuser({ userName: this.user, password: this.password }).then(res => {
                // var [error, res] = data;
				console.info('登录： ', res.data);
                let token = res.data.attributes.token;
				uni.setStorageSync("userName", this.user);
                this.$store.commit('login',token);
                uni.navigateBack();
			});
		}
	}
};
</script>

<style lang="scss">
.login {
	width: 680rpx;
	margin: 0 auto;
	.logo-text {
		text-align: center;
		font-size: $font-title-lg;
		color: $base-green;
		padding: 15rpx 0;
		margin-top: 40rpx;
	}
	> .form {
		> view {
			list-style: none;
			padding: 0;
			margin: 0;
			font-size: $font-sm;
			> view {
				border-bottom: 1px dashed $font-color-light;
				overflow: hidden;
				margin-top: 20rpx;
				line-height: 30rpx;
				> * {
					float: left;
				}
				> input {
					width: 550rpx;
					font-size: $font-sm;
				}
				&:last-child {
					border: none;
					text-align: right;
					margin-top: 10rpx;
				}
			}
		}
	}
	> .buttons {
		text-align: center;
		> a {
			margin: 0 20rpx;
			margin-top: 100rpx;
		}
	}
	.footerLogo {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
	}
}
.footer {
	margin-top: 50rpx;
	text-align: center;
	._footer {
		width: 315rpx;
		height: auto;
		margin: 0 auto;
	}
}
</style>
