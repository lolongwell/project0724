<template>
	<view class="userType">
		<!-- <header-logo></header-logo> -->
		<view class="logo"><img class="login _logo" src="../../static/login-logo.png" alt="" /></view>
		<view class="buttons">
			<view class="orange button large">个人用户登录</view>
			<br />
			<view class="orange button large">企业用户登录</view>
		</view>
		<view class="footer"><img class="_footer" src="../../static/login-footer.png" alt="" /></view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="scss">
.userType {
	.buttons {
		position: absolute;
		left: 380rpx;
		top: 200rpx;
		view {
			margin: 0 20rpx;
		}
	}
	.footerLogo {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
	}
}
.logo {
	overflow: hidden;
	height: 670rpx;
}
.login {
	position: absolute;
	&._logo {
		width: 170rpx;
		left: 150rpx;
		top: 100rpx;
		height: auto;
	}
}
.footer {
	text-align: center;
	._footer {
		width: 315rpx;
		height: auto;
		margin: 0 auto;
	}
}
</style>
